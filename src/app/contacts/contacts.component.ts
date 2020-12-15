import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { contact } from '../contact';
import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  constructor(private person: PersonService, private router: Router) {}

  Personz;
  Persons: Person;
  showData() {
    console.log(this.Personz);
  }
  ngOnInit() {
    this.person.getContacts().subscribe((data) => {
      this.Personz = data;
    });
  }
  logout() {
    localStorage.removeItem('id');

    localStorage.removeItem('username');

    localStorage.removeItem('email');

    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  refreshPage() {
    window.location.reload();
  }
  deleteContact(id) {
    this.person.deleteContact(id).subscribe((data) => {
      console.log(data);
      this.refreshPage();
      return this.person.getContacts().subscribe((data) => {
        this.Personz = data;
      });
    });
  }
}
