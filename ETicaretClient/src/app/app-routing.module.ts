import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';
import { ProductsComponent } from './ui/components/products/products.component';
//birinci aşama componentlerin kendi modülleri seviyesinde rotalandırılması gerekiyordu
//ikinci aşama ise bu kendi modülleri seviyesinde rotalandırılan modüllerin ana modülde rotalandırılması gerekiyor
const routes: Routes = [ 
  {
  path:"admin", component : LayoutComponent ,children: [
    {path:"", component:DashboardComponent},
    {path: "customers", loadChildren: () =>import("./admin/components/customer/customer.module").then
      (module => module.CustomerModule)},
    {path: "products", loadChildren: () => import("./admin/components/products/products.module").then
      (module=> module.ProductsModule)},
    {path:"orders",loadChildren: ()=>import("./admin/components/order/order.module").then
      (module=>module.OrderModule)}
  ]
  },
  {path:"",component:HomeComponent},
  {path:"basket", loadChildren:()=>import("./ui/components/baskets/baskets.module").then
      (module=>module.BasketsModule)},
  {path:"products",loadChildren:()=>import("./ui/components/products/products.module").then
      (module=>module.ProductsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],   //ben childlardan gelen rotaları root rota olarak birliştirdik ve buraya ekledik.
  exports: [RouterModule]
})
export class AppRoutingModule { }
