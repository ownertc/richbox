import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';



import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';

import { UserlistComponent } from './user/userlist/userlist.component';
import { VipComponent } from './user/vip/vip.component';
import { AdduserComponent } from './user/adduser/adduser.component';



//请求数据
import { HttpModule } from '@angular/http';

//富文本编辑器 
import { LoginComponent } from './login/login.component';

import { RoleComponent } from './role/role.component';
import { IndexComponent} from './index/index.component'; 
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { BaseInfoComponent } from './user/user-detail/base-info/base-info.component';
import { CasumDetaiComponent } from './user/user-detail/casum-detai/casum-detai.component';
import { IntergralDetailComponent } from './user/user-detail/intergral-detail/intergral-detail.component';
import { EdituserComponent } from './user/user-detail/edituser/edituser.component';
//注意：在index.html引入css  <link href="https://cdn.quilljs.com/1.2.2/quill.snow.css" rel="stylesheet">

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    ProductComponent,
    UserComponent,
    HomeComponent,
    UserlistComponent,
     VipComponent,
     LoginComponent ,
     RoleComponent ,  
     AdduserComponent,
     UserDetailComponent ,
     IndexComponent,
    BaseInfoComponent, 
    CasumDetaiComponent, 
    IntergralDetailComponent,   
    EdituserComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    FormsModule,  
    HttpClientModule,
    NgZorroAntdModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
