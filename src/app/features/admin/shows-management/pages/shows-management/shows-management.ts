import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { ShowsManagementService } from '../../services/shows-management.service';

@Component({
  selector: 'app-shows-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shows-management.html',
  styleUrl: './shows-management.css',
})
export class ShowsManagement {
  private readonly moviesService = inject(ShowsManagementService);

  allShows$ = this.moviesService.getAllShows();
}
