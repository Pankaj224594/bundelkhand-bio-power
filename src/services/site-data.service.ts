
import { Injectable, signal } from '@angular/core';

export interface Section {
  heading: string;
  content: string[];
  list?: string[];
  imageTerm?: string; // Specific keyword for the section image
}

export interface PageData {
  id: string;
  title: string;
  subtitle?: string;
  heroTerm?: string; // Keyword for the main hero image
  sections?: Section[];
}

@Injectable({
  providedIn: 'root'
})
export class SiteDataService {
  private pages = signal<PageData[]>([
    {
      id: 'home',
      title: 'Bundelkhand GauSeva & Integrated Bio Energy',
      subtitle: 'Gaushala-Based Circular Renewable Energy Model for Rural Sustainability',
      heroTerm: 'india,village,farm',
      sections: [
        {
          heading: 'Project Overview',
          imageTerm: 'sustainability,green',
          content: [
            'This pilot project represents an integrated approach to rural sustainability, combining traditional Gaushala practices with modern renewable energy technologies.',
            'Our mission is to demonstrate a zero-waste, circular economy model where every by-product of the Gaushala is utilized to generate clean energy, organic fertilizers, and value-added products.'
          ]
        },
        {
          heading: 'Key Objectives',
          imageTerm: 'solar,agriculture',
          content: [
            'To establish a replicable model for energy-independent Gaushalas.',
            'To validate the efficacy of Nandi Rath (Bull Treadmill) systems for power generation.',
            'To produce Bio-CNG and Bio-Fertilizers from agricultural and cattle waste.',
            'To provide a research platform for government and academic stakeholders.'
          ],
          list: [
            'Animal Welfare Focused',
            'Circular Economy Principles',
            'Renewable Energy Integration',
            'Community Impact'
          ]
        }
      ]
    },
    {
      id: 'repository',
      title: 'Document & Media Repository',
      subtitle: 'Centralized Digital Library for Research Data and Reports',
      heroTerm: 'library,archive',
      sections: [] // Handled by FileManagerComponent
    },
    {
      id: 'gaushala-animal-welfare',
      title: 'Gaushala & Animal Welfare',
      heroTerm: 'cow,calf,cattle',
      sections: [
        {
          heading: 'Core Philosophy',
          imageTerm: 'cow,affection',
          content: [
            'At the heart of our project is the ethical treatment and care of cows and bulls. The Gaushala serves as the central node for all downstream energy and agricultural activities.',
            'We prioritize the health and well-being of non-milking cattle, ensuring they remain productive members of the ecosystem without exploitation.'
          ]
        },
        {
          heading: 'Infrastructure',
          imageTerm: 'stable,barn',
          content: [
            'The facility is designed with spacious sheds, open grazing areas, and dedicated medical care units. Ventilation and hygiene are maintained at high standards to ensure herd health.'
          ]
        }
      ]
    },
    {
      id: 'nandi-rath',
      title: 'Nandi Rath – Bull Treadmill Energy System',
      heroTerm: 'bull,ox',
      sections: [
        {
          heading: 'Concept & Mechanism',
          imageTerm: 'gear,mechanical',
          content: [
            'The Nandi Rath is a specialized treadmill system designed to harness the muscular energy of bulls in a cruelty-free manner. It allows bulls to walk at a natural pace, engaging a gearbox system that drives a generator.',
            'This system transforms the physical activity of non-milking bulls—essential for their health—into usable electricity for the campus.'
          ]
        },
        {
          heading: 'Operational Pilot',
          imageTerm: 'generator,electricity',
          content: [
            'Current pilot units are operational, providing intermittent power for fodder cutting machines and water pumps. Data is being collected on power output relative to walking duration and speed.'
          ]
        }
      ]
    },
    {
      id: 'biogas-bio-cng',
      title: 'Biogas & Bio-CNG',
      heroTerm: 'biogas,pipeline',
      sections: [
        {
          heading: 'Waste to Energy',
          imageTerm: 'manure,compost',
          content: [
            'Cow dung and agricultural residue are collected daily and fed into our anaerobic digesters. This process mitigates methane emissions that would otherwise occur from open decomposition.'
          ]
        },
        {
          heading: 'Bio-CNG Production',
          imageTerm: 'tank,gas',
          content: [
            'The raw biogas acts as a precursor for Bio-CNG (Compressed Biogas). Through scrubbing and compression, we aim to produce fuel suitable for cooking and transport applications within the pilot campus.'
          ]
        }
      ]
    },
    {
      id: 'circular-by-products',
      title: 'Circular By-Products & Fertilizers',
      heroTerm: 'soil,sprout',
      sections: [
        {
          heading: 'Bio-Slurry Management',
          imageTerm: 'fertilizer,farming',
          content: [
            'The digestate from the biogas plant is processed into nutrient-rich bio-slurry. This liquid fertilizer is distributed to local experimental farming plots to validate crop yield improvements.'
          ]
        },
        {
          heading: 'Bio-Coal & PROM',
          imageTerm: 'coal,rock',
          content: [
            'Solid fractions of the waste are converted into Bio-Coal briquettes for thermal application and Phosphate Rich Organic Manure (PROM) to reduce soil dependency on chemical fertilizers.'
          ]
        }
      ]
    },
    {
      id: 'dairy-products',
      title: 'Dairy & Value-Added Products (Pilot Scope)',
      heroTerm: 'dairy,milk',
      sections: [
        {
          heading: 'Micro-Dairy Unit',
          imageTerm: 'cheese,ghee',
          content: [
            'A small-scale demonstration unit processes milk into value-added products such as Ghee and Paneer. The focus is on quality control and traditional processing methods powered by renewable energy.'
          ]
        },
        {
          heading: 'Demonstration Goals',
          imageTerm: 'market,food',
          content: [
            'This module serves strictly to demonstrate the economic viability of value addition for smallholder farmers. It is currently a non-commercial research pilot.'
          ]
        }
      ]
    },
    {
      id: 'waste-management',
      title: 'Waste Management Modules',
      heroTerm: 'recycle,plastic',
      sections: [
        {
          heading: 'Plastic Pyrolysis',
          imageTerm: 'industry,processing',
          content: [
            'To address rural plastic waste, a small-batch pyrolysis reactor converts plastic waste into industrial-grade fuel oil. This ensures the campus maintains a "Zero-Waste" status.'
          ]
        },
        {
          heading: 'Biodiesel from UCO',
          imageTerm: 'oil,beaker',
          content: [
            'Used Cooking Oil (UCO) is collected and transesterified into biodiesel, which powers farm machinery and backup generators, closing the loop on kitchen waste.'
          ]
        }
      ]
    },
    {
      id: 'renewable-power',
      title: 'Renewable Power Support',
      heroTerm: 'solar,wind',
      sections: [
        {
          heading: 'Solar & Wind Integration',
          imageTerm: 'solarpanel,windmill',
          content: [
            'While bio-energy is our focus, solar PV arrays and small-scale wind turbines provide base-load support to the microgrid. This hybrid approach ensures 24/7 reliability for critical Gaushala operations.'
          ]
        }
      ]
    },
    {
      id: 'future-research',
      title: 'Green Hydrogen & Bio-Ethanol (Future Research)',
      heroTerm: 'hydrogen,laboratory',
      sections: [
        {
          heading: 'Research Roadmap',
          imageTerm: 'scientist,research',
          content: [
            'Future phases of the project will explore the reforming of biogas into Green Hydrogen and the fermentation of cellulosic biomass into Bio-Ethanol.',
            'These advanced modules are currently in the feasibility study stage and will be developed in collaboration with academic partners.'
          ]
        }
      ]
    },
    {
      id: 'integrated-model',
      title: 'Integrated Pilot Model',
      heroTerm: 'ecosystem,nature',
      sections: [
        {
          heading: 'The Circular Ecosystem',
          imageTerm: 'cycle,recycle',
          content: [
            'The Integrated Model visualizes how inputs (Feed, Water, Waste) and outputs (Energy, Manure, Products) flow between modules without leakage. It represents a self-sustaining micro-economy suitable for rural replication.'
          ],
          list: [
            'Input: Agricultural Waste -> Output: Biogas',
            'Input: Biogas -> Output: Electricity & Bio-CNG',
            'Input: Slurry -> Output: Organic Fertilizer',
            'Input: Bull Labor -> Output: Mechanical Energy'
          ]
        }
      ]
    },
    {
      id: 'research-impact',
      title: 'Research, Validation & Impact',
      heroTerm: 'analysis,data',
      sections: [
        {
          heading: 'Data Collection',
          imageTerm: 'chart,graph',
          content: [
            'Sensors installed across the campus monitor energy generation, waste processing rates, and emission reductions. This data is available for review by policy makers and researchers.'
          ]
        },
        {
          heading: 'Socio-Economic Impact',
          imageTerm: 'community,people',
          content: [
            'We study the potential for job creation in waste management and renewable energy maintenance for rural youth, providing a blueprint for economic upliftment.'
          ]
        }
      ]
    },
    {
      id: 'media-updates',
      title: 'Media, Research & Updates',
      heroTerm: 'newspaper,news',
      sections: [
        {
          heading: 'Publications',
          imageTerm: 'document,writing',
          content: [
            'Access our technical whitepapers, feasibility studies, and monthly progress reports documenting the performance of the pilot modules.'
          ]
        },
        {
          heading: 'Gallery',
          imageTerm: 'gallery,photo',
          content: [
            'Visual documentation of the Nandi Rath prototype, Biogas plant construction, and Bio-slurry application trials.'
          ]
        }
      ]
    },
    {
      id: 'contact',
      title: 'Contact & Collaboration',
      heroTerm: 'handshake,meeting',
      sections: [
        {
          heading: 'Get in Touch',
          imageTerm: 'email,contact',
          content: [
            'We welcome inquiries from government bodies, academic institutions, and sustainability researchers interested in studying or collaborating on this pilot model.'
          ]
        },
        {
          heading: 'Office Address',
          imageTerm: 'building,office',
          content: [
            'Bundelkhand Bio Power Private Limited',
            'Pilot Campus, Bundelkhand Region, Uttar Pradesh, India.'
          ]
        },
        {
          heading: 'Email',
          imageTerm: 'internet,laptop',
          content: [
            'info@bundelkhandbiopower.org (Representative Email)'
          ]
        }
      ]
    }
  ]);

  getAllPages() {
    return this.pages();
  }

  getPageById(id: string) {
    return this.pages().find(p => p.id === id);
  }
}
