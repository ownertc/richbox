import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'; //导入router服务

//images


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private isLogin:boolean =false
  constructor(private router:Router) { }

  ngOnInit() {
    if(this.isLogin){
      this.router.navigateByUrl('login');
    }
  
  }

}
