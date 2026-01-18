import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService :HttpClientService) { }
  //eğer ben page ve size bilgilerine -1 değerlerini verirsem backend tüm rolleri sıralasın kabülümüz olsun
  async getRoles(page: number, size: number, successCallBack?: ()=>void, errorCallBack?: (error)=>void){
    const observable : Observable<any> = this.httpClientService.get({
      controller: "roles",
      queryString: `page=${page}&size=${size}`
    })
    const promiseData=firstValueFrom(observable)
    promiseData.then(successCallBack).catch(error=>{errorCallBack})
    return await promiseData;
  }


  async create(name :string, successCallBack?: ()=>void, errorCallBack?: (error)=>void){
    const observable : Observable<any>= this.httpClientService.post({
      controller: "roles",
    },{name: name});
    
    const promiseData=firstValueFrom(observable)
    promiseData.then(successCallBack).catch(error=>{errorCallBack})
    return await promiseData as {succeeded : boolean}
  }
}
