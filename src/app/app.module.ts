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
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { ContactComponent } from './contact/contact.component';
<<<<<<< HEAD
import { SupportComponent } from './support/support.component';
import { SupportService } from './support/support.service';
import { HttpClientModule } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
=======
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { FavoritComponent } from './favorit/favorit.component';
>>>>>>> 2db00a9490a2fbb3d974360403fe51a171bc3820


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AllProductComponent,
    DetailsComponent,
    BookReaderComponent,
    LoginComponent,
    ReviewsComponent,
    ContactComponent,
<<<<<<< HEAD
    SupportComponent
=======
    NavbarComponent,
    AboutComponent,
    FavoritComponent
>>>>>>> 2db00a9490a2fbb3d974360403fe51a171bc3820
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
    BrowserAnimationsModule, // required animations module
    MdbCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), // ToastrModule added
    MdbCollapseModule,
    HttpClientModule,
    SocialLoginModule
    //PDFViewerModule
  ],
  providers: [
    SupportService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('638133119528-bjmjpq4omvs2ld2kg2vj444s1f3iuepl.apps.googleusercontent.com',{
              discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
              scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
            }),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
