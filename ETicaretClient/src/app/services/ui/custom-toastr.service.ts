import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root' //proviadeIn root olduğu için direkt ioc konteynıra eklenecektir.
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) {}

  message(message: string, title: string,toastrOptions: Partial<ToastrOptions>)
  {
    this.toastr[toastrOptions.messageType](message,title,{positionClass:toastrOptions.position});
  }


}

export class ToastrOptions{
  messageType:ToastrMessageType;
  position:ToastrPosition
}

export enum ToastrMessageType{
  Error="error",
  Success="success",
  Warning="warning",
  Info="info"
}

export enum ToastrPosition{
TopRight="toast-top-right",
BottomRight="toast-bottom-right",
BottomLeft="toast-bottom-left",
TopLeft="toast-top-left",
TopFullWidth="toast-top-full-width",
BottomFullWidth="toast-bottom-full-width",
TopCenter="toast-top-center",
BottomCenter="toast-bottom-center"
}