import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../service/account.service';
import {AuthenService} from '../../../service/authen.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IAccount} from '../../../models/iaccount';
import {Istatus} from '../../../models/istatus';
import {TokenStorageService} from '../../../service/tokenstorage.service';
import {FriendService} from '../../../service/friend/friend.service';
import {Icomment} from '../../../models/icomment';
import {Ifriend} from '../../../models/ifriend';
import {NotificationService} from '../../../service/notification.service';
import {CommentService} from '../../../service/comment/comment.service';
import {INewfeedResponse} from '../../../models/response-observable/inewfeed-response';
import {LikesService} from '../../../service/likes/likes.service';
import {StatusService} from '../../../service/status/status.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

declare var $: any;
declare var Swal: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  statusForm: FormGroup;
  account: IAccount = {
    avatarUrl: '',
    name: '',
    email: '',
    password: ''
  };
  statusList: Array<Istatus> = [];
  statusResult: Istatus[];
  statusResultToken: Istatus[];
  newFeedResponse: INewfeedResponse[];
  comment: Icomment;
  accountId:number;
  status_id: number;
  isFriend = false;
  isPending = false;
  isNoRelation = false;
  selectedImage:any = null;
  newStatus: Istatus;
  isHaveImage = false;

  path_id = +this.route.snapshot.paramMap.get('id');

  currentStatus: Istatus = {
    id: 0,
    content:'',
    images:[],
    totalComments:0,
    totalLikes:0,
  };


  constructor(private accountService: AccountService,
              private fb: FormBuilder,
              private authenService: AuthenService,
              private route: ActivatedRoute,
              private router: Router,
              private tokenService: TokenStorageService,
              private friendService: FriendService,
              private commentService: CommentService,
              private statusService: StatusService,
              private likesService: LikesService,
              private storage: AngularFireStorage,
              private notice: NotificationService,
              private notificationService: NotificationService) {
  }


  ngOnInit(): void {
    this.accountId = this.tokenService.getAccount();
    this.statusForm = this.fb.group({
      content: [''],
    })
    this.newStatus =  {
      account: {
        id: ''
      },
      content: '',
      images: [{
        url: ['']
      }]
    }
    this.getAccount()
    this.checkRelationShip();
    this.getNewFeed();
  }

  checkRelationShip(){
    this.friendService.checkRelationShip(this.path_id).subscribe(
      (result)=>{
        switch (result.name){
          case 'none':{
            this.isNoRelation = true;
            break;
          }
          case 'pending':{
            this.isPending = true;
            break;
          }
          case 'friend':{
            this.isFriend = true;
          }
        }
      })
  }

  getAccount() {
    this.accountService.getAccount(this.path_id).subscribe((resp: IAccount) => {
      this.account = resp;
    })
  }

  getNewFeed() {
    this.accountService.getListStatusByAccount(this.path_id).subscribe(
      (newfeed:any) => {

        this.newFeedResponse = newfeed;
        console.log(newfeed);

        this.newFeedResponse.map(
        status1 =>
            status1.status.createDate = new Date(status1.status.createDate));
        this.getAllStatus(this.newFeedResponse);
      }
    );

  }
  getAllStatus(newfeedResponse: INewfeedResponse[]){
    for(let i =0; i<= newfeedResponse.length; i++){
      this.statusList.push(newfeedResponse[i].status);
    }
  }

  addStatus() {

    this.newStatus.content = this.statusForm.value.content;
    if (this.statusForm.value.content == ""){
      this.notificationService.fail("Vui lòng nhập nội dung")
    } else {
      if(this.isHaveImage){
        this.updateImageStatus();
      }else {
        this.newStatus = {
          content: this.statusForm.value.content
        }
        this.creatStatus();
      }
    }
  }
  creatStatus(){
    this.accountService.createStatus(this.accountId,this.newStatus).subscribe(
      (httpResponse)=>{
        if(httpResponse.message == 'success'){
          this.getNewFeed()
          this.statusForm = this.fb.group({
            content: [''],
            images: [{
              url: ''
            }]
          })
          this.newStatus =  {
            account: {
              id: ''
            },
            content: '',
            images: [{
              url: ['']
            }]
          }
          this.notificationService.success("Đăng status thành công")
          this.isHaveImage = false;
        }else {
          this.notificationService.fail("Lỗi")
        }
      },()=>{
        this.notificationService.fail("Lỗi server không thể đăng")
      }
    )
  }

  updateImageStatus() {
    if(this.selectedImage !==null){
      const filePath = `avatar/${this.selectedImage.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
        finalize(
          ()=> fileRef.getDownloadURL().subscribe(url=>{
            this.newStatus.images.map(
              image => image.url =  url
            )
            this.creatStatus()
          })
        )
      ).subscribe();
      console.log(this.newStatus);

    }
  }

  loadImgFile(even:any) {
    console.log('load image')
    if(even.target.files && even.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => {
        this.newStatus.images.map(
          image => image.url =  e.target.result
        )
      }
      reader.readAsDataURL(even.target.files[0]);
      this.selectedImage = even.target.files[0];
      this.isHaveImage = true;
    }else {
      this.selectedImage = null;
    }

  }
  deleteImage(){
    this.newStatus.images = [];
  }
  sentFriendRequest() {
    this.friendService.sentFriendRequest(this.path_id).subscribe((data) => {
      if(data.message == 'success'){
        this.isPending = true;
        this.isNoRelation = false;
        this.notificationService.success("Đã gửi yêu cầu kết bạn.")
      }else{
        this.notificationService.fail("Không thể gửi yêu cầu kết bạn.")
      }
    },()=>this.notificationService.fail("Lỗi kết nối"))

  }
  addComment(event, status_id, index){
    this.comment = {
      content: event.value.content,
      account: {
        id : this.tokenService.getAccount()
      },
      status: {
        id: ['']
      }
    }
    this.commentService.createComment(this.comment,status_id).subscribe((data)=>{
      if(data.message == 'success'){
        this.notice.success("Comment thành công");
        this.loadComments(status_id,index,this.newFeedResponse);
      }else {
        this.notice.fail("Đã xảy ra lỗi, hãy thử lại.");
      }
    },()=>this.notice.fail("Lỗi kết nối sever"));
  }

  searchStatusByKeyword(event){
    let keyword = event;
    this.statusResult = (keyword) ? this.filterByKeyword(keyword) :this.statusResultToken;
  }
  filterByKeyword(keyword){
    return this.statusList.filter(res => {
      return res.content.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) != -1;
    })
  }
  getCommentByStatus(id: number) {
    return this.commentService.getCommentsByStatusId(id,this.accountId).toPromise();
  }


  async loadComments(id: number, index: number, statues: INewfeedResponse[]) {
    const comments = await this.getCommentByStatus(id);
    statues[index].status.comments = comments;
    console.log(comments)
  }

  likeStatus(id: number,index:number) {
    this.likesService.likeStatus(id,this.accountId).subscribe(
      (data)=>{
        if(data.message == 'success'){
          this.notice.success("Like thanh cong")
          this.getNewFeed();
        }else {
          this.notice.fail("like loi")
        }
      },()=>{
        this.notice.fail("loi ket noi")
      }
    )
  }

  unlikeStatus(status_id: number) {
    this.likesService.unlikeStatus(this.accountId,status_id).subscribe(
      (response)=>{
        if(response.message == 'success'){
          this.notice.success("Unlike thành công");
          this.getNewFeed();
        }else {
          this.notice.fail("Unlike thất bại")
        }

      },()=>{
        this.notice.fail("lỗi kết nối");
      }
    )

  }
  delete_comment(event,status_id,index) {
    // console.log("status id: "+event);
    this.commentService.deleteComment(event).subscribe(
      (response)=>{
        if(response.message == 'success'){
          this.notice.success("Xóa bình luận thành công.");
          this.loadComments(status_id,index,this.newFeedResponse);
        }else {
          this.notice.fail("Hãy thử lại");
        }
      },()=>{
        this.notice.fail("Lỗi kết nối");
      }
    )

  }
  loadComment(stt_id: number){
    this.status_id = stt_id;
  }

  getStatusForm(status:Istatus) {
    this.currentStatus = status;

  }

  deleteStatus(id: number) {
    this.statusService.deleteStatusById(id).subscribe(
      (response)=>{
        if(response.message == 'xóa thành công'){
          this.notice.success("Xóa thành công");
          this.getNewFeed();
        }else {
          this.notice.fail("Có lỗi xảy ra, hãy thử lại sau");

        }
      },()=>{
        this.notice.fail("Lỗi kết nối tới sever");
      }
    )
  }
}
