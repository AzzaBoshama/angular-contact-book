import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPersonComponent } from './add-person/add-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { AuthGuard } from './guards/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { SecondPageComponent } from './second-page/second-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'person', component: FirstPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: SecondPageComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'add-person',
    component: AddPersonComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-person/:id',
    component: EditPersonComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
