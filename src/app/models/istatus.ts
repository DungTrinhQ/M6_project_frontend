import {IAccount} from './iaccount';
import {Icomment} from './icomment';

export interface Istatus {
  id?:number,
  content:string,
  createDate?:Date,
  account:any,
  images?:any,
  totalComments?:number,
  totalLikes?:number,
  comments?: Icomment[]

}
