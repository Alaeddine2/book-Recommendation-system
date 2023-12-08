import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AllProductComponent } from './components/all-product/all-product.component';
import { DetailsComponent } from './components/details/details.component';
import { BookReaderComponent } from './components/book-reader/book-reader.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import {MdbCarouselModule} from "mdb-angular-ui-kit/carousel";
//import { PDFViewerModule } from "@progress/kendo-angular-pdfviewer";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ReviewsComponent } from './reviews/reviews.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AllProductComponent,
    DetailsComponent,
    BookReaderComponent,
    LoginComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
    MdbCarouselModule,
    FormsModule,
    ReactiveFormsModule
    //PDFViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
