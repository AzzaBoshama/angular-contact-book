import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService } from '../person.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private _personServices: PersonService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/person']);
    }
  }
  warning = '';
  onSubmit(form: NgForm) {
    let pw1 = form.value.password;
    let pw2 = form.value.password1;
    let username = form.value.name;
    let email = form.value.email;
    let state = this.checkValidity(pw1, pw2);
    if (!state) {
      this.warning = 'passwords dont match!';
    } else {
      let attempt = this._personServices
        .register(username, pw1, email)
        .subscribe((data) => {
          console.log(data);
          this.router.navigate(['/login']);
        });
    }
  }
  checkValidity(pw1, pw2) {
    if (pw1 == pw2) {
      return true;
    } else {
      return false;
    }
  }
}
