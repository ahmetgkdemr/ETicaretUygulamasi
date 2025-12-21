import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(@Inject("baseSignarRUrl") private baseSignarRUrl : string) { }


  start(hubUrl : string){//bu baglanti kurmak için baglanti baslatir.
    hubUrl=this.baseSignarRUrl+hubUrl;

      const builder : HubConnectionBuilder =new HubConnectionBuilder();
      const hubConnection : HubConnection= builder.withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

      hubConnection.start()
      .then(()=>{
        console.log("SignalR Connected.");})
      .catch(error=>{
        setTimeout(()=>{this.start(hubUrl);},2000);});

    hubConnection.onreconnected(connectionId=>{console.log("SignalR Reconnected.")});
    hubConnection.onreconnecting(error=>{console.log("SignalR Reconnecting.")}); 
    hubConnection.onclose(error=>{console.log("Close Reconnection.")});

    return hubConnection;
  }

  //Bu server tarafındaki bir hub metodunu cagirmak için kullanilir.
  invoke(hubUrl : string,procedureName : string , message: any , successCallBack?: (value) => void , errorCallBack?: (error) => void){
    this.start(hubUrl).invoke(procedureName , message).then(successCallBack).catch(errorCallBack);
  }

 //Bu server tarafındaki bir hub metodunu dinlemek için kullanilir.
  on(hubUrl: string,procedureName : string, callBack:(...message : any) => void ){
    this.start(hubUrl).on(procedureName,callBack);
  }
}
