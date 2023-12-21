import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AllProductComponent } from './components/all-product/all-product.component';
import { DetailsComponent } from './components/details/details.component';
import { BookReaderComponent } from './components/book-reader/book-reader.component';
import {LoginComponent} from "./login/login.component";
import { ReviewsComponent } from './reviews/reviews.component';
import { ContactComponent } from './contact/contact.component';
import {AboutComponent} from "./about/about.component";
import {FavoritComponent} from "./favorit/favorit.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'all', component: AllProductComponent },
  { path: 'detail', component: DetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'reader', component: BookReaderComponent },
  { path: 'about', component: AboutComponent },
  { path: 'favorites', component: FavoritComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'reviews', component: ReviewsComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
