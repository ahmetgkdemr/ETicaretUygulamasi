import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $ :any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {
//element ile nesneyi al, _renderer ile de işlem gerçekleştir.
  constructor(
    private element: ElementRef, 
    private _renderer : Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private alertifyService: AlertifyService,
    private dialogService:DialogService
  ) { 
    const img= _renderer.createElement("img");  //burada aslında img oluşturuyor ancak DOMa eklenmedi sadece oluşturturuldu
    img.setAttribute("src","../../../../assets/delete.png");
    img.setAttribute("alt","Delete Image");
    img.setAttribute("style","cursor:pointer;");
    img.width=32;
    img.height=32;
    _renderer.appendChild(element.nativeElement,img)   //element.nativeElement aslında div oluyor dive eklemek istediğim öğe de img oluyor
  }

  @Input() id:string  // 0- bu bağımsız parenttaki bir id değerini tutup (listhtml), childe (deletedirective) çekiyorum
  @Input() controller: string
  @Output() callback: EventEmitter<any> = new EventEmitter() //1- burada ben parenta yani listchtmle fırlatılacak event oluşturıyorum fırlatmadım daha. 

  @HostListener("click")
  async onClick(){
    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async ()=>{
        this.spinner.show(SpinnerType.BallAtom);
        const td: HTMLTableCellElement=this.element.nativeElement;
        //await this.productService.delete(this.id);
        await this.httpClientService.delete({controller:this.controller},this.id).subscribe(data=>{
          $(td.parentElement).animate({
            opacity:0,
            left: "+50",
            height: "toogle"
          },700,()=>{
            this.callback.emit() // 2- burada ben parenta yukarıda oluşturduğum eventi fırlatıyorum. ve html de callback çalışıyor
            this.alertifyService.message("Ürün başarıyla silinmiştir.",{
              dissmissOthers:true,
              messageType:MessageType.Success,
              position:Position.TopRight
            }) 
          })
        },(errorResponse:HttpErrorResponse) =>{
          this.spinner.hide(SpinnerType.BallAtom)
          this.alertifyService.message("Ürün silinirken beklenmeyen bir hatayla karşılaşılmıştır.",{
            dissmissOthers:true,
            messageType:MessageType.Error,
            position:Position.TopRight
          })
        })
      }
    })

  }

  // openDialog(afterClosed: any): void {
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     data: DeleteState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == DeleteState.Yes) {
  //       afterClosed();
  //     }
  //   });
  // }


}
