import {IAccount} from './iaccount';
import {Icomment} from './icomment';

export interface Istatus {
  privacy?: number;
  id?:number,
  content:string,
  createDate?:Date,
  modifyDate?:Date,
  account?:any,
  images?:any,
  totalComments?:number,
  totalLikes?:number,
  comments?: Icomment[]

}
