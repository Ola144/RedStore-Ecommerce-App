import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { MasterService } from '../../service/master.service';
import { windowTime } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent  {
  
  masterService: MasterService = inject(MasterService);


  arrowUp() {
   window.scrollTo(0, 0);
  }
}

window.addEventListener('scroll', () => {
  let arrowUp = document.querySelector('.arrowUp');
  arrowUp?.classList.toggle('active', window.scrollY > 500);
});