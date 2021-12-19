import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {}

  userRegister(user: NgForm) {
    console.log(user)
    this.securityService.userRegister({
      email:user.value.email,
      name:user.value.name,
      password:user.value.password,
      username:user.value.username,
      surname:user.value.surname,
      userId:'',
      token:''
    })
  }
}
