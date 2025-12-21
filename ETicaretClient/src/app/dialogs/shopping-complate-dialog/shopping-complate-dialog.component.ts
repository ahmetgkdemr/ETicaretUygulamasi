import { Component, Inject, OnDestroy } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
declare var $ : any;

@Component({
  selector: 'app-shopping-complate-dialog',
  templateUrl: './shopping-complate-dialog.component.html',
  styleUrls: ['./shopping-complate-dialog.component.scss']
})
export class ShoppingComplateDialogComponent extends BaseDialog<ShoppingComplateDialogComponent> implements OnDestroy {
  constructor(dialogref: MatDialogRef<ShoppingComplateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShoppingComplateState
  ){
    super(dialogref)
  }
  show : boolean=false;
  complate(){
    this.show=true;
  }

  ngOnDestroy(): void {
    if (!this.show) {
        $("#basketModal").modal("show");
    }


  }

}

export enum ShoppingComplateState{
  Yes,
  No
}