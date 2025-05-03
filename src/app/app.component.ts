import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  showLoader: boolean = false;
  router: Router = inject(Router);

  ngOnInit() {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoader = true;
      } else if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel) {
        this.showLoader = false;
      }
    });
  }
}
