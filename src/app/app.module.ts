import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AllProductComponent } from './components/all-product/all-product.component';
import { DetailsComponent } from './components/details/details.component';
import { BookReaderComponent } from './components/book-reader/book-reader.component';
// import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AllProductComponent,
    DetailsComponent,
    BookReaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // PdfViewerModule,
    NgxExtendedPdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
