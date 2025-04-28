import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ContactUs } from '../../model/RedStore';
import { MasterService } from '../../service/master.service';
import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit{

  contactUsObj: ContactUs = new ContactUs();
  masterService: MasterService = inject(MasterService);
  toastr: ToastrService = inject(ToastrService);

  isFeedBackVisible: boolean = false;
  feedBackList$: Observable<ContactUs[]> = new Observable<ContactUs[]>;

  constructor(private title: Title) {
    this.title.setTitle('RedStore - Contact')
  }

  ngOnInit(): void {
    this.feedBackList$ = this.masterService.getAllFeedBacks();
  }

  sendMessage() {
    this.masterService.createMessage(this.contactUsObj).subscribe({
      next: (res) => {
        if (res) {
          this.toastr.success('Your contact form sent successfully. Thanks for your feedback!');
        } else {
          this.toastr.error('Something went wrong. Please try again!');
        }
      }
    })
  }

  getFeedback() {
    this.feedBackList$ = this.masterService.getAllFeedBacks();
    this.isFeedBackVisible = !this.isFeedBackVisible;
  }
}
