
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FileItem {
  name: string;
  type: 'folder' | 'pdf' | 'image' | 'sheet' | 'doc';
  size?: string;
  date: string;
}

@Component({
  selector: 'app-file-manager',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-6xl mx-auto px-4 py-8 h-[85vh] flex flex-col">
      <!-- Header -->
      <header class="mb-6 flex justify-between items-end">
        <div>
          <h1 class="text-3xl font-serif font-bold text-slate-800">Document Repository</h1>
          <p class="text-slate-500 text-sm mt-1">Research Data, Technical Schematics, and Annual Reports</p>
        </div>
        <div class="flex gap-2">
           <button class="bg-green-700 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-800 transition shadow-sm flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
               <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
             </svg>
             Upload
           </button>
           <button class="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded text-sm font-medium hover:bg-slate-50 transition shadow-sm">
             New Folder
           </button>
        </div>
      </header>

      <!-- Main Interface -->
      <div class="bg-white border border-slate-200 rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden">
        
        <!-- Toolbar & Breadcrumbs -->
        <div class="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
           <div class="flex items-center gap-2 text-sm text-slate-600">
             <button (click)="goHome()" class="hover:text-green-700 hover:underline font-medium flex items-center gap-1">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                  <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd" />
               </svg>
               Home
             </button>
             @for (crumb of currentPath(); track crumb) {
               <span class="text-slate-400">/</span>
               <span class="font-medium text-slate-800">{{ crumb }}</span>
             }
           </div>
           
           <!-- Search Box -->
           <div class="relative">
             <input type="text" placeholder="Search files..." class="pl-8 pr-4 py-1.5 text-sm border border-slate-300 rounded-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 w-64 transition-all">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-slate-400 absolute left-2.5 top-2">
               <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
             </svg>
           </div>
        </div>

        <!-- File View -->
        <div class="flex-1 overflow-y-auto p-4">
          @if (currentItems().length > 0) {
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              @for (item of currentItems(); track item.name) {
                <div 
                  (click)="handleItemClick(item)"
                  class="group relative bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md hover:border-green-300 transition-all cursor-pointer flex flex-col items-center text-center h-40 justify-between">
                  
                  <!-- Icon -->
                  <div class="flex-1 flex items-center justify-center w-full">
                    @if (item.type === 'folder') {
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-16 h-16 text-blue-200 group-hover:text-blue-300 transition-colors">
                        <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                      </svg>
                    } @else if (item.type === 'pdf') {
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-14 h-14 text-red-500 opacity-90">
                        <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clip-rule="evenodd" />
                        <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                      </svg>
                    } @else if (item.type === 'sheet') {
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-14 h-14 text-green-600 opacity-90">
                         <path fill-rule="evenodd" d="M3 3a2 2 0 012-2h9.982a2 2 0 011.414.586l4.018 4.018A2 2 0 0121 7.018V21a2 2 0 01-2 2H5a2 2 0 01-2-2V3zm9.982 0V6a1 1 0 001 1h3.018L12.982 3zM6 12a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1z" clip-rule="evenodd" />
                      </svg>
                    } @else if (item.type === 'image') {
                      <div class="relative w-full h-24 bg-slate-100 rounded overflow-hidden">
                        <img [src]="'https://picsum.photos/seed/' + item.name + '/200/200'" class="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity">
                      </div>
                    } @else {
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-14 h-14 text-slate-400">
                        <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clip-rule="evenodd" />
                        <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                      </svg>
                    }
                  </div>

                  <!-- Name -->
                  <div class="w-full">
                    <div class="text-sm font-medium text-slate-700 truncate mb-0.5">{{ item.name }}</div>
                    <div class="flex justify-between text-[10px] text-slate-400">
                      <span>{{ item.date }}</span>
                      @if (item.type !== 'folder') {
                        <span>{{ item.size }}</span>
                      }
                    </div>
                  </div>

                </div>
              }
            </div>
          } @else {
            <div class="flex flex-col items-center justify-center h-full text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 mb-4 opacity-50">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
              </svg>
              <p>Folder is empty</p>
            </div>
          }
        </div>
        
        <!-- Status Bar -->
        <div class="bg-slate-50 border-t border-slate-200 px-4 py-2 text-xs text-slate-500 flex justify-between">
          <span>{{ currentItems().length }} items</span>
          <span>72% Storage Used (1.4 GB / 2 GB)</span>
        </div>

      </div>
    </div>
  `
})
export class FileManagerComponent {
  currentPath = signal<string[]>([]);
  
  // Mock File System
  fileSystem = {
    'root': [
      { name: 'Annual Reports', type: 'folder', date: 'Oct 24, 2023' },
      { name: 'Research Data', type: 'folder', date: 'Sep 15, 2023' },
      { name: 'Technical Schematics', type: 'folder', date: 'Jan 10, 2024' },
      { name: 'Gallery', type: 'folder', date: 'Feb 12, 2024' },
      { name: 'Legal & Compliance', type: 'folder', date: 'Mar 05, 2024' },
      { name: 'Project_Brief_Executive.pdf', type: 'pdf', size: '2.4 MB', date: 'Aug 01, 2023' },
    ] as FileItem[],
    'Annual Reports': [
       { name: 'FY_2023_Financials.xlsx', type: 'sheet', size: '450 KB', date: 'Apr 02, 2023' },
       { name: 'Impact_Assessment_2023.pdf', type: 'pdf', size: '5.1 MB', date: 'Dec 12, 2023' },
       { name: 'Q1_2024_Progress.pdf', type: 'pdf', size: '1.2 MB', date: 'Apr 10, 2024' }
    ] as FileItem[],
    'Research Data': [
       { name: 'Biogas_Yield_Optimization.xlsx', type: 'sheet', size: '2.1 MB', date: 'Jan 15, 2024' },
       { name: 'Nandi_Rath_Power_Logs.csv', type: 'sheet', size: '8.4 MB', date: 'Feb 20, 2024' },
       { name: 'Soil_Health_Analysis_2023.pdf', type: 'pdf', size: '3.3 MB', date: 'Nov 05, 2023' }
    ] as FileItem[],
    'Gallery': [
       { name: 'Biogas_Plant_Construction.jpg', type: 'image', size: '4.2 MB', date: 'Jun 10, 2023' },
       { name: 'Inauguration_Ceremony.jpg', type: 'image', size: '3.8 MB', date: 'Jul 01, 2023' },
       { name: 'Nandi_Rath_Prototype_V1.jpg', type: 'image', size: '2.5 MB', date: 'Sep 12, 2023' },
       { name: 'Aerial_Site_View.jpg', type: 'image', size: '8.1 MB', date: 'Oct 20, 2023' }
    ] as FileItem[],
    'Technical Schematics': [
       { name: 'Digester_Flow_Diagram.pdf', type: 'pdf', size: '1.5 MB', date: 'May 05, 2023' },
       { name: 'Microgrid_Architecture.pdf', type: 'pdf', size: '2.2 MB', date: 'May 20, 2023' }
    ] as FileItem[],
    'Legal & Compliance': [
       { name: 'Land_Use_Permit.pdf', type: 'pdf', size: '500 KB', date: 'Jan 20, 2023' },
       { name: 'Environmental_Clearance.pdf', type: 'pdf', size: '1.1 MB', date: 'Feb 15, 2023' }
    ] as FileItem[]
  };

  currentItems = computed(() => {
    const path = this.currentPath();
    if (path.length === 0) {
      return this.fileSystem['root'];
    }
    const currentFolder = path[path.length - 1];
    return (this.fileSystem as any)[currentFolder] || [];
  });

  handleItemClick(item: FileItem) {
    if (item.type === 'folder') {
      this.currentPath.update(p => [...p, item.name]);
    } else {
      // Simulate download
      alert(`Downloading ${item.name}...`);
    }
  }

  goHome() {
    this.currentPath.set([]);
  }
}
