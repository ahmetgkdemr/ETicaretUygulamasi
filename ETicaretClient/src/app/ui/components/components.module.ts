import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';
import { RegisterModule } from './register/register.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdatePasswordModule } from './update-password/update-password.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    BasketsModule,
    RegisterModule,
    PasswordResetModule,
    UpdatePasswordModule
    //LoginModule
  ],
  exports:[
    BasketsModule
  ]
})
export class ComponentsModule { }
