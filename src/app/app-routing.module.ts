import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AllProductComponent } from './components/all-product/all-product.component';
import { DetailsComponent } from './components/details/details.component';
import { BookReaderComponent } from './components/book-reader/book-reader.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'all', component: AllProductComponent },
  { path: 'detail', component: DetailsComponent },
  { path: 'reader', component: BookReaderComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
