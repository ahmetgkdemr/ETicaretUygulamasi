import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { FileUploadDialogComponent } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [   // bağlı componentin ilgili modülünde (kendi modülü) declare etmem gerekiyor
    FileUploadComponent,
    FileUploadDialogComponent
  ],
  imports: [  // kullanacağım kütüphaneyi modülünde import ediyorum ki direkt başka bir yere modülü verip kullanabileyim.
    CommonModule,
    NgxFileDropModule,
    MatDialogModule,MatButtonModule
    //DialogModule  //gbt çıkarttırdı hata düzelti
  ],
  exports:[ //eğer ben bunu selector ile başka bir component içinde kullanacaksam componenti modülünde export etmem gerekiyor.
    FileUploadComponent
  ]
})
export class FileUploadModule { }
