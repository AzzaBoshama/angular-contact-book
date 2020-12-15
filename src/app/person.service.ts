import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from './person';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  ROOT_URL = 8080;

  User = {
    username: String,
    password: String,
  };
  async getPerson() {
    await this.http.get(this.ROOT_URL + '/api/contacts').subscribe((data) => {
      console.log(data[0]);
    });
  }
  url = this.ROOT_URL + '/api/contacts';

  public createContact(name, number, job, location) {
    let temp = {
      Name: name,
      Number: number,
      Job: job,
      Location: location,
    };
    return this.http.post<Person>(this.ROOT_URL + '/api/contact', temp);
  }

  public updateContact(id, updatez: Person) {
    let temp = {
      Name: updatez.name,
      Number: updatez.number,
      Job: updatez.job,
      Location: updatez.job,
    };

    console.log(`this is from personService ${temp.Location}`);
    return this.http.put(this.ROOT_URL + '/api/contact/' + id, temp);
  }

  public deleteContact(id: number) {
    return this.http.delete(this.ROOT_URL + '/api/contact/' + id);
  }

  public getContactById(id) {
    return this.http.get<Person>(this.ROOT_URL + '/api/contact/' + id);
  }

  public getContacts() {
    return this.http.get<Person[]>(`${this.url}`);
  }

  public Login(username, password) {
    let data = {
      username,
      password,
    };
    console.log(data);
    let temp = JSON.stringify(data);
    return this.http.post<User>(this.ROOT_URL + '/api/login', data);
  }
  public register(username, password, email) {
    let data = {
      username,
      password,
      email,
    };
    return this.http.post<User>(this.ROOT_URL + '/api/register', data);
  }
}
