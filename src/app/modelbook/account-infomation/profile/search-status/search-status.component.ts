import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-status',
  templateUrl: './search-status.component.html',
  styleUrls: ['./search-status.component.css']
})
export class SearchStatusComponent implements OnInit {

  @Output()
  keyword_status_search: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  getKeyWord(event){
    let value = (<HTMLInputElement>document.getElementById("keyStatusSearch")).value;
    this.keyword_status_search.emit(value);
  }

}
