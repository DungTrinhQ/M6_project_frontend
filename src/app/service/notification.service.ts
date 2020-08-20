import { Injectable } from '@angular/core';

declare var $: any;
declare var Swal: any;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  success(message:string) {
    $(function() {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })
      Toast.fire({
        icon: 'success',
        title: message
      })

    })
  }

  fail(message:string){
    $(function() {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })
      Toast.fire({
        icon: 'error',
        title: message
      })

    })
  }
}
