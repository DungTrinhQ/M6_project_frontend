import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {

  constructor() { }
  @Output()
  keyWord: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit(): void {
  }
  getKeyWord(event){
    let value = (<HTMLInputElement>document.getElementById("keySearch")).value;
    this.keyWord.emit(value);
  }
}
