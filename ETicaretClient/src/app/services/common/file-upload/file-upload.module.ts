import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DialogModule } from 'src/app/dialogs/dialog.module';



@NgModule({
  declarations: [   // bağlı componentin ilgili modülünde (kendi modülü) declare etmem gerekiyor
    FileUploadComponent  
  ],
  imports: [  // kullanacağım kütüphaneyi modülünde import ediyorum ki direkt başka bir yere modülü verip kullanabileyim.
    CommonModule,
    NgxFileDropModule,
    DialogModule  
  ],
  exports:[ //eğer ben bunu selector ile başka bir component içinde kullanacaksam componenti modülünde export etmem gerekiyor.
    FileUploadComponent  
  ]
})
export class FileUploadModule { }
