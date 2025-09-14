import { Injectable, ValueEqualityFn } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import { firstValueFrom, Observable } from 'rxjs';
import { List_Product_Image } from 'src/app/contracts/list_product_image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product :Create_Product , successCallBack?: ()=>void ,errorCallBack?: (errorMessage:string)=>void){
    this.httpClientService.post({controller:"products"},product).subscribe
    (result=>{
      successCallBack();},
      (errorResponse:HttpErrorResponse)=>{
        const _error : Array<{key: string,value: Array<string>}>= errorResponse.error;
        let message="";
        _error.forEach((v,index)=>{
          v.value.forEach((_v,_index)=>{
            message+=`${_v}<br>`
          })
        })
        errorCallBack(message);
      });
  }

//get post işlemlerinde genelde Observable döner, Observable veri geldiğinde bana haber ver tarzında bir sistemdir
//subscribe ise veri geldiğinde şunu yap diyoruz. 

  async read(page:number=0,size:number=5,successCallBack?:()=>void, errorCallBack?: (errorMessage:string)=>void) : Promise<{totalCount:number; products: List_Product[]}>{
    const promiseData:Promise<{totalCount:number; products: List_Product[]}>= firstValueFrom(
      this.httpClientService.get<{totalCount:number; products: List_Product[]}>({
        controller:"products",
        queryString:`page=${page}&size=${size}`
      }))

    promiseData
    .then(d=>successCallBack())
    .catch((errorResponce:HttpErrorResponse)=>{
      errorCallBack(errorResponce.message)
    });
    return await promiseData
 }

  async delete (id: string){
    const deleteObservable: Observable<List_Product>= this.httpClientService.delete<List_Product>({
      controller:"products"
    },id)
    await firstValueFrom(deleteObservable)
    
  }

  async readImage(id: string, successCallBack?:()=>void): Promise<List_Product_Image[]>{ // en son burada kaldın bir bak buraya 09.09.2025 33.video 27.50 saniye
    const getObservable: Observable<List_Product_Image[]> =this.httpClientService.get<List_Product_Image[]>({
      controller:"products",
      action:"getproductimages"
    },id);
    const images:List_Product_Image[]=await firstValueFrom(getObservable);
    successCallBack();
    return images;
  } 


  async deleteImage(id : string, imageId: string, successCallBack?:()=>void){
    const deleteObservable=this.httpClientService.delete({
      controller: "products",
      action:"deleteproductimage",
      queryString:`imageId=${imageId}`
    },id);
    
    await firstValueFrom(deleteObservable)
    successCallBack();//33 son 5 dakikasında kaldın 12.09.2025 bir bak incele
  }

}
//errorcallback?:any   errorcallback() ---->  Eğer bir hata olursa(hata şart değil) bana çalıştırabilmem için bir fonksiyon ver. ama vermesen de olur. 