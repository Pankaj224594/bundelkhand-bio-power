
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SidebarComponent } from './components/sidebar.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, FooterComponent, RouterLink],
  template: `
    <div class="min-h-screen flex flex-col bg-slate-50">
      <!-- Top Mobile Header / Brand Bar -->
      <header class="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50 flex justify-between items-center md:hidden">
        <div>
           <div class="text-xs text-green-400 tracking-wider uppercase">Bundelkhand Bio Power</div>
           <div class="font-serif font-bold text-lg leading-tight">GauSeva & Bio Energy</div>
        </div>
        <button (click)="toggleMobileMenu()" class="text-white p-2 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </header>

      <!-- Desktop Header -->
      <header class="hidden md:block bg-white border-b border-green-700">
        <div class="bg-green-900 text-white py-1 px-4 text-xs text-center tracking-widest uppercase">
          Pilot Project • Research & Development • Sustainability
        </div>
        <div class="container mx-auto px-6 py-6 flex items-center justify-between">
          <div class="flex items-center gap-4">
             <!-- Logo Placeholder -->
             <div class="w-12 h-12 bg-green-800 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-md">
               B
             </div>
             <div>
               <h1 class="text-2xl font-serif font-bold text-slate-900">Bundelkhand Bio Power</h1>
               <p class="text-sm text-green-700 font-medium">Integrated Renewable Energy Pilot Project</p>
             </div>
          </div>
          <div class="text-right hidden lg:block">
            <a routerLink="/page/contact" class="inline-block bg-green-800 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-900 transition-colors shadow-sm">
              Contact & Collaboration
            </a>
          </div>
        </div>
      </header>

      <div class="flex flex-1 flex-col md:flex-row container mx-auto md:my-8 md:px-4 gap-8">
        
        <!-- Sidebar Navigation (Desktop) -->
        <aside class="hidden md:block w-64 shrink-0">
          <div class="bg-green-900 rounded-lg shadow-lg overflow-hidden sticky top-8">
            <div class="p-4 bg-green-800 border-b border-green-700">
               <h2 class="text-white font-serif font-bold">Project Navigation</h2>
            </div>
            <app-sidebar></app-sidebar>
          </div>
        </aside>

        <!-- Mobile Menu (Overlay) -->
        @if (mobileMenuOpen()) {
          <div class="fixed inset-0 z-40 bg-slate-900 bg-opacity-95 md:hidden flex flex-col p-4 overflow-y-auto">
             <div class="flex justify-end mb-4">
               <button (click)="toggleMobileMenu()" class="text-white p-2">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>
             </div>
             <app-sidebar (click)="toggleMobileMenu()"></app-sidebar>
          </div>
        }

        <!-- Main Content Area -->
        <main class="flex-1 bg-white md:rounded-lg md:shadow-sm md:border border-slate-200 min-h-[600px]">
          <router-outlet></router-outlet>
        </main>

      </div>
      
      <app-footer></app-footer>
    </div>
  `
})
export class AppComponent {
  mobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }
}
