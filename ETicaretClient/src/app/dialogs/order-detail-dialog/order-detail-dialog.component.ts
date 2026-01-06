import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/common/models/order.service';
import { SingleOrder } from 'src/app/contracts/order/single_order';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ComplateOrderDialogComponent, ComplateOrderState } from '../complate-order-dialog/complate-order-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent>implements OnInit{

  constructor(dialogRef: MatDialogRef<OrderDetailDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: OrderDetailDailogState | string , private orderService : OrderService, private dialogService :DialogService, private spinner: NgxSpinnerService,private toastService: CustomToastrService){
      super(dialogRef)}

  singleOrder :SingleOrder;

  displayedColumns: string[] = ['name', 'price', 'quantity','totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice: number;

  async ngOnInit() {
    this.singleOrder=await this.orderService.getOrderById(this.data as string);
    const test = this.singleOrder; // ← Buraya breakpoint koy
    debugger;
    this.dataSource=this.singleOrder.basketItems;

    this.totalPrice=this.singleOrder.basketItems.map((basketItem,index)=>basketItem.price*basketItem.quantity).reduce((price,current)=>price+current);
  }

  complateOrder(){
    this.dialogService.openDialog({
      componentType: ComplateOrderDialogComponent,
      data: ComplateOrderState.Yes,
      afterClosed : async ()=>{
        this.spinner.show(SpinnerType.BallAtom);
        await this.orderService.complateOrder(this.data as string)
        this.spinner.hide(SpinnerType.BallAtom);
        this.toastService.message("Sipariş başarıyla tamamlandı.","Sipariş Tamamlandı",{messageType: ToastrMessageType.Success,position: ToastrPosition.TopRight});
      }
    })
  }

}

export enum OrderDetailDailogState{
  Close,
  OrderCompleted
}
