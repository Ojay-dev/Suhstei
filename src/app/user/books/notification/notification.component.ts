import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from 'src/app/services';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../auth/services';
import { RequestService } from 'src/app/services/request-service/request.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  // content: any;
  requestData;
  isAvailableNotification: boolean;
  badgeAlert: number;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
    const requestDetails = this.route.snapshot.data['request']

    this.requestData = requestDetails.filter(d => {
      if (
        d.book_requested.uploader_id === this.authService.getUserDetails()._id &&
        d.requester._id !== this.authService.getUserDetails()._id &&
        d.approved === false && d.approved === false
      ) {
        return d;
      }
    });

    this.isAvailableNotification = this.requestData.length <= 0 ? false : true;

    // this.badgeAlert = this.requestData.filter(d => d.request_viewed === false).length;
    console.log(this.requestData);

  }


}
