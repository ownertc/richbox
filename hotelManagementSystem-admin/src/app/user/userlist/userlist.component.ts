import { Component, OnInit } from '@angular/core';

//请求数据

import { Http } from '@angular/http';

import {User} from "../../api.config"


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  _allChecked = false;   /*是否全选*/
  _indeterminate = false;   /*部分选中显示  -*/
 
 public _displayData = [];   /*数据*/
    
 dete = '';

  //当前的页数   双休数据绑定
  _page=1; 
  //总数量
  _totl=140; 
  //每一页的数量
  _pageSize=20;
  //是否显示loading
  _loading = false;
  user = new User();


  constructor(public http:Http) {
   }
  
  ngOnInit() {   /*初始化的时候把数据赋值个_displayData*/
    console.log(this.user.getName)
    this.requestData();
  }


  //请求数据

  requestData(){

    this._loading=false; 

    var api='http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page='+this._page;

    this.http.get(api).subscribe((response)=>{
      console.log(JSON.parse(response['_body']));

      this._displayData=JSON.parse(response['_body']).result;

      this._loading=false;

    })

  }


  //点击列表里面的checkbox的时候判断 上面的全选按钮是否选中
  _refreshStatus() {

    // every es5里面的方法
    const allChecked = this._displayData.every((value:any)=>{     
        return value.checked === true;   /*注意写法*/
      
    });
    const allUnChecked = this._displayData.every((value:any) => !value.checked);
    this._allChecked = allChecked;  /*全选*/
    this._indeterminate = (!allChecked) && (!allUnChecked);    /*部分选中显示  -*/
  }


  //全选反选功能
  _checkAll(value) {

    // alert(value);  
    if (value) {
      this._displayData.forEach((data:any) => {        
    
        data.checked = true;

      });
    } else {
      this._displayData.forEach((data:any) => {
        data.checked = false;
      });
    }
    this._refreshStatus();
  }
}
