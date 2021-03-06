import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookService } from 'src/app/services';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  @Input() bookData: any;
  @Output() turnOffEdit = new EventEmitter();

  newBookForm: FormGroup;
  private bookTitle: FormControl;
  private author: FormControl;
  private bookReview: FormControl;
  private avatar: FormControl;
  percentDone: any = 0;
  uploadedImage: File;

  constructor(
    private bookService: BookService,
    private router: Router,
    private fb: FormBuilder,
    private ng2ImgMax: Ng2ImgMaxService
  ) { }

  ngOnInit(): void {
    this.bookTitle = new FormControl(
      this.bookData.title,
      [
        Validators.required,
        Validators.pattern('[a-zA-Z].*')
      ]
    );
    this.author = new FormControl(
      this.bookData.author,
      [
        Validators.required,
        Validators.pattern('[a-zA-Z].*')
      ]
    );
    this.bookReview = new FormControl(
      this.bookData.description,
      [
        Validators.required,
        Validators.pattern('[a-zA-Z].*'),
        Validators.maxLength(400)
      ]
    );
    this.avatar = new FormControl(
      '',
      [Validators.required]
    );

    this.newBookForm = this.fb.group({
      bookTitle: this.bookTitle,
      author: this.author,
      bookR: this.bookReview,
      avatar: [null]
    });
  }

  fileLoader() {
    const fileInput: HTMLElement = document.querySelector('#FileUpload1');
    fileInput.click();
  }

  uploadFile(event) {
    const avatarImg: HTMLImageElement = document.querySelector('.cropper img');
    const file = (event.target as HTMLInputElement).files[0];

    console.log(file);

    this.ng2ImgMax.resizeImage(file, 10000, 312).subscribe(
      result => {

        this.uploadedImage = new File([result], result.name, { type: file.type });
        console.log(this.uploadedImage);

        // File Preview
        const reader = new FileReader();
        reader.readAsDataURL(this.uploadedImage);
        reader.onload = () => {
          avatarImg.src = reader.result as string;
        };

        this.newBookForm.patchValue({
          avatar: this.uploadedImage
        });
        this.newBookForm.get('avatar').updateValueAndValidity();
        console.log(this.newBookForm.value.avatar);
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );


  }

  updateBook(newBookForm) {
    if (this.newBookForm.valid) {

      console.log(newBookForm);

      this.bookService.updateBook(
        this.newBookForm.value.bookTitle,
        this.newBookForm.value.author,
        this.newBookForm.value.bookReview,
        this.newBookForm.value.avatar,
        this.bookData._id
      )
        .subscribe((event: HttpEvent<any>) => {

          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;

            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;

            case HttpEventType.UploadProgress:
              this.percentDone = Math.round(event.loaded / event.total * 100);
              console.log(`Uploaded! ${this.percentDone}%`);
              break;

            case HttpEventType.Response:
              console.log('User successfully created!', event.body);
              this.percentDone = false;
              this.router.navigate(['user/books']);
          }
        });
    }
  }

  validBookTitle() {
    return this.bookTitle.valid || this.bookTitle.untouched;
  }

  validAuthor() {
    return this.author.valid || this.author.untouched;
  }

  validBookReview() {
    return this.bookReview.valid || this.bookReview.untouched;
  }

  disableEdit() {
    this.turnOffEdit.emit();
  }
}
