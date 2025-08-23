import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $:any

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit{
  constructor(private productService:ProductService,  spinner:NgxSpinnerService, private alertify: AlertifyService){
    super(spinner)
  }

  displayedColumns: string[] = ['name', 'stock', 'price','createdDate', 'updatedDate','edit','delete'];
  dataSource : MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  async get_products(){
    this.showSpinner(SpinnerType.BallAtom);
    const all_products:{totalCount:number; products: List_Product[]}= await this.productService.read(this.paginator? this.paginator.pageIndex:0,
      this.paginator? this.paginator.pageSize:5,()=>{
      this.hideSpinner(SpinnerType.BallAtom);
    },(errorMessage)=>{
      this.alertify.message(errorMessage,{
        dissmissOthers:true,
        messageType:MessageType.Error,
        position:Position.TopRight
      })
})
    this.dataSource=new MatTableDataSource<List_Product>(all_products.products)
    this.paginator.length=all_products.totalCount;
  }

  async pageChanged(){
    await this.get_products()
  }

  async ngOnInit() {
    await this.get_products();
}

/* delete(id :string,event){
  const img=event.srcElement
  $(img.parentElement.parentElement).fadeOut(2000);
} */

}
