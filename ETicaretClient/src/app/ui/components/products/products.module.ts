import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([  //bütün componentlere bir rota, modül seviyesinde belirlenmeli
      {path:"",component:ProductsComponent}
    ])
  ]
})
export class ProductsModule { }
