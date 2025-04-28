import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ITeam } from '../../model/RedStore';
import { MasterService } from '../../service/master.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent implements OnInit {

  masterService: MasterService = inject(MasterService);
  teamList$: Observable<ITeam[]> = new Observable<ITeam[]>;

  constructor(private title: Title) {
    this.title.setTitle('RedStore - About Us')
  }

  ngOnInit() {
    this.teamList$ = this.masterService.getAllTeam();
  }
}
