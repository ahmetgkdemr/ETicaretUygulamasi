import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Role } from 'src/app/contracts/role/List_Role';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent{
  constructor(
    private roleService : RoleService,  
    spinner:NgxSpinnerService, 
    private alertify: AlertifyService,
    private dialogservice : DialogService){
    super(spinner)
  }

  displayedColumns: string[] = ['name', 'edit','delete'];
  dataSource : MatTableDataSource<List_Role> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  async get_Roles(){
    this.showSpinner(SpinnerType.BallAtom);
    const all_roles:{datas :List_Role[],totalCount :number}= await this.roleService.getRoles(this.paginator? this.paginator.pageIndex:0,
      this.paginator? this.paginator.pageSize:5,()=>{
      this.hideSpinner(SpinnerType.BallAtom);
    },(errorMessage)=>{
      this.alertify.message(errorMessage,{
        dissmissOthers:true,
        messageType:MessageType.Error,
        position:Position.TopRight
      })
})
    this.dataSource=new MatTableDataSource<List_Role>(all_roles.datas)
    this.paginator.length=all_roles.totalCount;
  }


  async pageChanged(){
    await this.get_Roles()
  }

  async ngOnInit() {
    await this.get_Roles();
}
}
