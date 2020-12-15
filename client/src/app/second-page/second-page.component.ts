import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ContactsComponent } from '../contacts/contacts.component';
import { PersonService } from '../person.service';
import { User } from '../user';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css'],
})
export class SecondPageComponent implements OnInit {
  constructor(private _personService: PersonService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('id')) {
      this.router.navigate(['/person']);
    }
    console.log(NgModel.name);
  }
  state = '';

  onSubmit(form: NgForm) {
    let attempt = this._personService
      .Login(form.value.userName, form.value.password)
      .subscribe(async (data: User) => {
        if (data.docs) {
          await console.log(data.hasOwnProperty('token'));
          console.log(data);
          let temp = data.docs;
          let _id = JSON.stringify(temp._id);

          let email = JSON.stringify(temp.email);
          let token = JSON.stringify(data.token);
          let username = JSON.stringify(temp.username);
          console.log(temp);
          localStorage.setItem('id', _id);
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          localStorage.setItem('email', email);
          this.router.navigate(['/person']);
        } else {
          console.log('wrong credentials');
          this.state = 'wrong username or password';
        }
      });
    console.log(form.value.userName);
    console.log(form.value.password);
    console.log('congrats form submitted');
  }
  cancel() {
    this.router.navigate(['/register']);
  }
}
