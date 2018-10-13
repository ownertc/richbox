import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  options= [
    { value: 'vip1', label: 'vip1' },
    { value: 'vip2', label: 'vip2' }
  
  ] 

  //双休数据绑定的数据
  inputData={

    inputValue:'',
    age:''  ,
    sex:'B',
    checkOptions: [
      { label: 'php', value: 'php', checked: true },
      { label: 'java', value: 'java' },
      { label: 'h5', value: 'h5', checked: true  }
    ],

    checkedOption:this.options[ 0 ],
    date:'',
    content:'这是默认的内容111',
    face:''

  }
  /*select选中的内容,建议把options 放在外面 checkedOption放在对象里面 */
      

  constructor() { }

  ngOnInit() {
  }


  //changeImg 文本框改变的时候出发的事件

  changeImg(event){
      if(!event.target.files[0]) {
        return;
      }
      let file = event.target.files[0];  

    
      var reader = new FileReader();
      reader.readAsDataURL(file); // 读出 base64
      reader.onloadend =  ()=>{
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
          var dataURL = reader.result;

          console.log(dataURL);

          this.inputData.face=dataURL;
          // 下面逻辑处理
      };

  }

  //提交

  doSubmit(){


    console.log(this.inputData.content);


    //Wed Mar 28 2018 00:00:00 GMT+0800 (中国标准时间)

    
    // var d=new Date(this.inputData.date);


    // console.log(d.getFullYear(),d.getMonth(),d.getDate());
    

    // console.log(d.getTime()); /*日期转化成时间戳*/

    // console.log(this.checkedOption);

    // 日期：
  }
}
