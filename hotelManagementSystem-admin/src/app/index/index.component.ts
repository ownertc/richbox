import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'; //导入router服务

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    
  }

}
