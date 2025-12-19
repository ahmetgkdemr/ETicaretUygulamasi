import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  constructor() { }

  async loadComponent(component : ComponentKey,viewContainerRef: ViewContainerRef){
    let _component : any=null;
    switch (component) {
      case ComponentKey.BasketsComponent:
        const m= await import("../../ui/components/baskets/baskets.component");
        _component=m.BasketsComponent;
        break;
    }

    viewContainerRef.clear();
    return viewContainerRef.createComponent(_component);
  }
}


export enum ComponentKey{
  BasketsComponent
}