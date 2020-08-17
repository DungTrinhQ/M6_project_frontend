import {IAccount} from '../iaccount';

export interface INotificationResponse{
  id?:number;
  type: string;
  accountSend?: IAccount;
  accountReceive?: IAccount;
  seen: boolean;
}
