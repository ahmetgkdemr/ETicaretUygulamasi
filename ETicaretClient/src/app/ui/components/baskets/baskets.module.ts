import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketsComponent } from './baskets.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BasketsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:BasketsComponent}
    ])
  ],
  exports:[
    BasketsComponent //angularda bir componenti selectoru üzerinden kullanılmak isteniyorsa kullanılacağı modüle kadar export edilmesi gerekir. Eğer arada birkaç modüle varsa tüm modüller hiyerarşik olarak export edilmelidir.Yoksa en içteki html içine yazdığın şeyi selector üzerinden kullanamazsın.
  ]
})
export class BasketsModule { }
