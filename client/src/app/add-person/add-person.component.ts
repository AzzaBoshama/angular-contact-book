import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
})
export class AddPersonComponent implements OnInit {
  constructor(private _personService: PersonService, private router: Router) {}

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    let name = form.value.name;
    let number = form.value.number;
    let job = form.value.job;
    let location = form.value.location;

    let temp = {
      Name: name,
      Number: number,
      Job: job,
      Location: location,
    };
    console.log(temp);
    let attempt = this._personService
      .createContact(name, number, job, location)
      .subscribe((data) => {
        this.router.navigate(['person']);
      });
  }
}
