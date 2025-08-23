import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([  //bütün componentlere bir rota, modül seviyesinde belirlenmeli
      {path:"",component:ProductsComponent}
    ])
  ]
})
export class ProductsModule { }
