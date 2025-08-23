import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUplodaOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(private productService: ProductService, spinner:NgxSpinnerService,  private alertify:AlertifyService){
    super(spinner)
  }
  ngOnInit(): void {
  }

  @Output() createProduct:EventEmitter<Create_Product>=new EventEmitter(); //1 event oluşturduk şimdi istediğimiz yerde 
  @Output() fileUploadOptions:Partial<FileUplodaOptions>={
    action:"upload",
    controller:"products",
    explanation:"Resimleri sürükleyin ve seçin.",
    isAdminPage:true,
    accept:".png,.jpg,.jpeg,.json"
  }

  create(name: HTMLInputElement,stock: HTMLInputElement,price: HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom);
    const create_product : Create_Product=new Create_Product();
    create_product.name=name.value;
    create_product.stock=parseInt(stock.value);
    create_product.price=parseFloat(price.value);


    this.productService.create(create_product,()=>{
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Ürün Başarıyla Eklenmiştir",{dissmissOthers:true,messageType:MessageType.Success,position:Position.TopRight});
      this.createProduct.emit(create_product); //2  bu şuan bir dış katmana attı yakalıcaz bunu şimdi
    }, errorMessage=>{
      this.alertify.message(errorMessage,{dissmissOthers:true,messageType:MessageType.Error,position:Position.BottomRight})
    })
  }
}
