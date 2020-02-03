import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { userRoutes } from './routes';
import { ProfileComponent, ProfileEditComponent } from './profile';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './auth/footer/footer.component';
import {
  BookListComponent,
  BookReviewComponent,
  BooksBorrowedComponent,
  AddBookComponent,
  BookHistoryComponent
} from './books';
import {
  LoginComponent,
  RegisterComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
  EmailCheckComponent
} from './auth';
import { BorrowedTabComponent } from './books/borrowed-tab/borrowed-tab.component';
import { LendedTabComponent } from './books/lended-tab/lended-tab.component';
import { ProfileResolver } from './profile/profile-resolver/profile-resolver.service';
import { EditBookComponent } from './books/edit-book/edit-book.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [
    ProfileComponent,
    ProfileEditComponent,
    SidebarComponent,
    BookListComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    EmailCheckComponent,
    FooterComponent,
    BookReviewComponent,
    BooksBorrowedComponent,
    AddBookComponent,
    BookHistoryComponent,
    BorrowedTabComponent,
    LendedTabComponent,
    EditBookComponent
  ],
  providers: [
    ProfileResolver
  ]
})
export class UserModule { }
