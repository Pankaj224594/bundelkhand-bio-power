
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SiteDataService } from '../services/site-data.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="p-4 space-y-1">
      <div class="md:hidden text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Menu</div>
      @for (page of pages; track page.id) {
        <a 
          [routerLink]="['/page', page.id]" 
          routerLinkActive="bg-green-700 text-white shadow-md border-r-4 border-green-400"
          class="block px-4 py-3 rounded transition-all duration-200 text-sm font-medium hover:bg-green-800 hover:text-white text-green-100 border-r-4 border-transparent group">
          {{ page.title }}
        </a>
      }
    </nav>
  `
})
export class SidebarComponent {
  private dataService = inject(SiteDataService);
  pages = this.dataService.getAllPages();
}
