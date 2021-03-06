import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, TokenPayload } from '../../auth/services';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;
  retrievedData: any;
  credentials: TokenPayload = {
    avatar: null,
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  };
  uploadedImage: File;

  constructor(
    private authService: AuthService,
    private router: Router,
    public fb: FormBuilder,
    private ng2ImgMax: Ng2ImgMaxService
  ) { }

  ngOnInit(): void {
    // console.log(this.authService.currentUser);
    this.authService.profile().subscribe(profile => {

      this.retrievedData = profile;
      this.profileForm = this.fb.group({
        avatar: [null],
        firstName: [profile.firstname, [Validators.required, Validators.pattern('[a-zA-Z].*')]],
        lastName: [profile.lastname, [Validators.required, Validators.pattern('[a-zA-Z].*')]],
        email: { value: profile.email, disabled: true },
        phoneNo: [profile.phone, Validators.required]
      });

    });

  }

  fileLoader() {
    const fileInput: HTMLElement = document.querySelector('#fileLoader');
    fileInput.click();
  }

  uploadImage(event) {
    const avatarImg: HTMLImageElement = document.querySelector('.image-wrapper img');
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);

    // Image compression
    this.ng2ImgMax.compressImage(file, 1.0).subscribe(
      result => {
        this.uploadedImage = new File([result], result.name, {type: file.type});
        // File Preview
        const reader = new FileReader();
        reader.readAsDataURL(this.uploadedImage);
        reader.onload = () => {
          avatarImg.src = reader.result as string;
        };

        this.profileForm.patchValue({
          avatar: this.uploadedImage
        });
        this.profileForm.get('avatar').updateValueAndValidity();
        console.log(this.profileForm.value.avatar);

      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );

  }

  saveProfile(formValues) {
    if (this.profileForm.valid && this.profileForm.value.avatar !== null) {

      const formValue = this.profileForm.value;

      this.credentials.avatar = formValue.avatar;
      this.credentials.firstname = formValue.firstName;
      this.credentials.lastname = formValue.lastName;
      this.credentials.phone = formValue.phoneNo;
      this.credentials.email = this.retrievedData.email;

      this.authService.updateCurrentUser(this.credentials)
        .subscribe(() => {
          console.log('Successfull!!!');
          this.router.navigate(['user/profile']);
        }, (err) => {
          console.error(err);
        });

    }
  }

  validateFirstName() {
    return this.profileForm.controls.firstName.valid || this.profileForm.controls.firstName.untouched;
  }

  validateLastName() {
    return this.profileForm.controls.lastName.valid || this.profileForm.controls.lastName.untouched;
  }

  validatePhoneNo() {
    return this.profileForm.controls.phoneNo.valid || this.profileForm.controls.phoneNo.untouched;
  }

}
