
import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { SiteDataService } from '../services/site-data.service';

@Component({
  selector: 'app-page-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      @if (pageData(); as data) {
        <!-- Hero Image -->
        <div class="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg mb-8 border border-slate-200 bg-slate-100">
           <!-- Using standard src to support external dynamic domains like LoremFlickr -->
           <img [src]="'https://loremflickr.com/1200/600/' + (data.heroTerm || 'nature') + '?random=1'" 
                alt="Section Hero"
                class="object-cover w-full h-full hover:scale-105 transition-transform duration-700 ease-out">
           <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6 md:p-8">
              <h1 class="text-3xl md:text-4xl font-serif font-bold text-white mb-2 shadow-sm">{{ data.title }}</h1>
              @if (data.subtitle) {
                <p class="text-lg md:text-xl text-green-100 font-light italic">{{ data.subtitle }}</p>
              }
           </div>
        </div>

        <div class="bg-white shadow-sm border border-slate-200 p-8 rounded-lg">
          @for (section of data.sections; track $index) {
            <section class="mb-12 last:mb-0">
              <h2 class="text-2xl font-serif text-slate-800 border-l-4 border-green-600 pl-4 mb-6">{{ section.heading }}</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <!-- Text Content -->
                <div class="space-y-4 text-slate-700 leading-relaxed text-lg">
                  @for (para of section.content; track $index) {
                    <p>{{ para }}</p>
                  }
                  
                  @if (section.list) {
                    <ul class="mt-4 ml-2 list-disc marker:text-green-600 space-y-2 text-slate-700">
                      @for (item of section.list; track $index) {
                        <li class="pl-2">{{ item }}</li>
                      }
                    </ul>
                  }
                </div>

                <!-- Visual Content -->
                <div class="flex flex-col gap-2">
                   <div class="relative overflow-hidden rounded-lg border border-slate-200 shadow-md h-56 w-full bg-slate-100 group">
                     <!-- Using keyword + index lock to ensure variety but consistency per load -->
                     <img [src]="'https://loremflickr.com/600/400/' + (section.imageTerm || 'technology') + '?lock=' + $index"
                          [alt]="section.heading"
                          loading="lazy"
                          class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500">
                   </div>
                   <p class="text-xs text-slate-400 italic text-center">
                     Figure {{ $index + 1 }}: {{ section.heading }}
                   </p>
                </div>
              </div>

            </section>
            
            @if (!$last) {
              <hr class="border-t border-slate-100 mb-12" />
            }
          }
        </div>
      } @else {
        <div class="p-10 text-center text-slate-500">
          <p>Page content not found.</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class PageViewComponent {
  private route = inject(ActivatedRoute);
  private dataService = inject(SiteDataService);
  private routeParams = toSignal(this.route.params);
  
  pageData = computed(() => {
    const params = this.routeParams();
    const id = params ? params['id'] : 'home';
    return this.dataService.getPageById(id);
  });
}
