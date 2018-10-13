import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';

import { HomeComponent } from './home/home.component';


import { UserlistComponent } from './user/userlist/userlist.component';
import { VipComponent } from './user/vip/vip.component';
import { AdduserComponent } from './user/adduser/adduser.component';
import { EdituserComponent } from './user/user-detail/edituser/edituser.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { BaseInfoComponent } from './user/user-detail/base-info/base-info.component';
import { CasumDetaiComponent } from './user/user-detail/casum-detai/casum-detai.component';
import { IntergralDetailComponent } from './user/user-detail/intergral-detail/intergral-detail.component';

//配置路由
const routes: Routes = [
  {
    path:"login",
    component:LoginComponent,
  },
  {
    path: 'home',
    component:HomeComponent,
    children:[
      {
        path:"",
        component:IndexComponent,
      },
      {
        path: 'shop',
        component:ShopComponent 
    
      },
      {
        path: 'product',
        component:ProductComponent ,
      
      },
      {
        path: 'user',
        component:UserComponent,
         children:[   /*配置子路由*/
          {
            path: 'list',
            component:UserlistComponent 
        
          },
          {
            path: 'userDetail',
            component:UserDetailComponent ,
            children: [
              {
                path: 'baseinfo',
                component:BaseInfoComponent 
            
              },
              {
                path: 'casumDetail',
                component:CasumDetaiComponent 
            
              },
              {
                path: 'intergralDetail',
                component:IntergralDetailComponent 
              },
              {
                path: 'edituser',
                component:EdituserComponent 
            
              },
            ]
          }
          ,
          {
            path: 'add',
            component:AdduserComponent 
        
          },
          {   
            path: '**',  /*任意的路由*/
            // component:HomeComponent
            redirectTo:'list'
          }
          
        ]
    
      }
    ]

  },
  {   /*匹配不到路由的时候加载的组件*/
    path: '**',  /*任意的路由*/
    // component:HomeComponent
    redirectTo:'home'
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
