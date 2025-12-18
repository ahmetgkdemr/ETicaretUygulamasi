import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() { }

  private _connection: HubConnection;
  get connection(): HubConnection{ //bunun mantigi dışarıdan connecitona erişebilirmek için 
    return this._connection;
  }

  start(hubUrl : string){//bu baglanti kurmak için baglanti baslatir.
    if(!this._connection || this._connection?.state==HubConnectionState.Disconnected){
      const builder : HubConnectionBuilder =new HubConnectionBuilder();
      const hubConnection : HubConnection= builder.withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

      hubConnection.start()
      .then(()=>{
        this._connection=hubConnection; //hoca bunu bu if bloğunun en sonuna yazdı ben buraya yazdım
        console.log("SignalR Connected.");
      })
      .catch(error=>{
        setTimeout(()=>{this.start(hubUrl);},2000);
      });
    }

    this._connection.onreconnected(connectionId=>{console.log("SignalR Reconnected.")});
    this._connection.onreconnecting(error=>{console.log("SignalR Reconnecting.")}); 
    this._connection.onclose(error=>{console.log("Close Reconnection.")});
  }

  //Bu server tarafındaki bir hub metodunu cagirmak için kullanilir.
  invoke(procedureName : string , message: any , successCallBack?: (value) => void , errorCallBack?: (error) => void){
    this._connection.invoke(procedureName , message).then(successCallBack).catch(errorCallBack);
  }

 //Bu server tarafındaki bir hub metodunu dinlemek için kullanilir.
  on(procedureName : string, callBack:(...message : any) => void ){
    this._connection.on(procedureName,callBack);
  }
}
