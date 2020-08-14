import {IAccount} from './iaccount';
import {Icomment} from './icomment';

export interface Istatus {
  id?:number,
  content:string,
  createDate?:Date,
  account:any,
  comments?: Icomment
}
