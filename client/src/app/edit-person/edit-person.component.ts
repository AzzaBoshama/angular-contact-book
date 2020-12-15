import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../person';
import { PersonService } from '../person.service';
@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css'],
})
export class EditPersonComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private _personService: PersonService,
    private routes: Router
  ) {}

  state = '';

  person;
  ngOnInit(): void {
    let test = this.router.snapshot.paramMap.get('id');
    console.log(test);
    this.onLoad(test);
  }
  onLoad(id) {
    let attempt = this._personService.getContactById(id).subscribe((data) => {
      console.log(data);
      this.person = data;
    });
  }
  example = 'hello biatch';
  onSubmit(form: NgForm) {
    let name = form.value.name;
    let number = form.value.number;
    let job = form.value.job;
    let location = form.value.location;

    let temp = new Person();
    let id = this.router.snapshot.paramMap.get('id');
    temp.id = id;
    temp.name = name;
    temp.job = job;
    temp.location = location;
    temp.number = number;
    console.log('this is temp' + temp.location);
    let attempt = this._personService
      .updateContact(id, temp)
      .subscribe((data) => {
        this.myFunction();
        this.routes.navigate(['person']);
      });
  }
  myFunction() {
    let myVar = setTimeout(this.alertFunc, 1000);
  }

  alertFunc() {
    alert('Data has been updated!');
  }
}
