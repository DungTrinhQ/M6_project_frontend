import { Component, OnInit } from '@angular/core';
import {TestService} from './test.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Istatus} from '../../models/istatus';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(

  ) { }
  ngOnInit(): void {

  }


}
