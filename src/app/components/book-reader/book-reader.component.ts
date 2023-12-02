import { Component, OnInit } from '@angular/core';
// import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-book-reader',
  templateUrl: './book-reader.component.html',
  styleUrls: ['./book-reader.component.scss'],
  // providers: [PdfViewerComponent ]
})
export class BookReaderComponent implements OnInit {

  constructor() { }
  pdfSrc = "assets/books/A-Game-of-Thrones.pdf";
  ngOnInit(): void {
  }

}
