
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-slate-900 text-slate-300 py-12 mt-12 border-t border-slate-700">
      <div class="container mx-auto px-6 text-center md:text-left">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-white font-serif font-bold text-lg mb-4">Bundelkhand Bio Power</h3>
            <p class="text-sm text-slate-400">
              Pioneering Integrated Renewable Energy & Sustainable Gaushala Models.
            </p>
            <p class="text-xs text-slate-500 mt-2">Pilot Project • Research Oriented</p>
          </div>
          <div>
            <h3 class="text-white font-serif font-bold text-lg mb-4">Quick Links</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-green-400">Research Validation</a></li>
              <li><a href="#" class="hover:text-green-400">Impact Assessment</a></li>
              <li><a href="#" class="hover:text-green-400">Collaboration</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-white font-serif font-bold text-lg mb-4">Contact</h3>
            <p class="text-sm">Bundelkhand Region, Uttar Pradesh, India</p>
            <p class="text-sm mt-2">info@bundelkhandbiopower.org</p>
          </div>
        </div>
        <div class="border-t border-slate-800 mt-8 pt-8 text-center text-xs text-slate-500">
          &copy; {{ currentYear }} Bundelkhand Bio Power Private Limited. All Rights Reserved.
          <br>
          <span class="opacity-50">Website design for Pilot Project Demonstration.</span>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
