import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
public test:string= "test msg"
  constructor() { }

  ngOnInit() {
  }
  testDemo(){
    alert("click");
  }

}
