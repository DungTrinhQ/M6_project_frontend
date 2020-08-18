import {Component, Input, OnInit, } from '@angular/core';
import {Istatus} from '../../../models/istatus';
import {StatusService} from '../../../service/status/status.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {NotificationService} from '../../../service/notification.service';
import {Router} from '@angular/router';
import {IImage} from '../../../models/iimage';

@Component({
  selector: 'app-status-edit',
  templateUrl: './status-edit.component.html',
  styleUrls: ['./status-edit.component.css']
})
export class StatusEditComponent implements OnInit {

  @Input()
  currentStatus: Istatus;
  editForm: FormGroup;

  showEditForm = false;

  selectedImage:any = null;

  newImg:IImage;

  hideImg = false;


  constructor(private statusService: StatusService,
              private fb: FormBuilder,
              private storage: AngularFireStorage,
              private notice: NotificationService,
              private router: Router,
              ) { }

  ngOnInit(): void {
    this.editForm=this.fb.group({
      content:[''],
      images:[{
        url:['']
      }],
      }
    )
  }

  getCurrentStatus(){
    this.showEditForm = !this.showEditForm;
    this.editForm.patchValue(this.currentStatus);
    console.log(this.currentStatus);
  }

  showPreview(event: any) {
    console.log("hàm showpreview");
    if(this.currentStatus.images == ''){
      this.currentStatus.images = [{
        url: [''],
      }]
    }
    if (event.target.files && event.target.files[0]) {
      const imgReader = new FileReader();
      imgReader.onload = (e: any) => {
        this.currentStatus.images.map(
          image => image.url = e.target.result,
        )
      };
      imgReader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.selectedImage = null;
    }

  }

  uploadImage() {
    if(this.selectedImage !==null){
      const filePath = `status/${this.selectedImage.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
        finalize(
          ()=> fileRef.getDownloadURL().subscribe(url=>{
            this.currentStatus.images.map(
              image => image.url =  url
            );
            this.editStatus(url);
          },()=>{
            this.notice.fail("Load ảnh thất bại, xin thử lại");
          })
        )
      ).subscribe();
    } else {
      this.editStatus();
    }
  }

  editStatus(image?:any){
    if(image!=null){
      this.currentStatus.images = [{
        url: image
      }]
    }
    this.currentStatus.content = this.editForm.value.content;
    this.statusService.editStatus(this.currentStatus).subscribe(()=>{
      this.notice.success("Chỉnh sửa thành công");
      this.router.navigate(['/']);
      this.showEditForm = false;
    })

  }

  submit() {
    this.uploadImage();
  }

  deleteImg() {
    this.currentStatus.images = [];
    this.hideImg = true;

  }

  changeEditStatus() {
    this.showEditForm = false;
    window.location.reload();
  }
}
