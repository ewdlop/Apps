import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  searchQuery = '';
  selectedCategory = 'all';
  
  categories = ['all', 'web', 'mobile', 'desktop', 'api'];
  
  products = [
    {
      id: 1,
      name: 'Angular Material Dashboard',
      description: 'A comprehensive admin dashboard built with Angular Material components.',
      price: '$49',
      image: '🚀',
      category: 'web',
      tags: ['Angular', 'Material', 'Dashboard'],
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: 'React Component Library',
      description: 'Reusable UI components for React applications with TypeScript support.',
      price: '$79',
      image: '⚡',
      category: 'web',
      tags: ['React', 'TypeScript', 'Components'],
      rating: 4.6,
      reviews: 89
    },
    {
      id: 3,
      name: 'Mobile App Template',
      description: 'Cross-platform mobile app template with modern UI and navigation.',
      price: '$99',
      image: '📱',
      category: 'mobile',
      tags: ['React Native', 'Mobile', 'Template'],
      rating: 4.9,
      reviews: 156
    },
    {
      id: 4,
      name: 'REST API Backend',
      description: 'Scalable Node.js API with authentication and database integration.',
      price: '$129',
      image: '🔧',
      category: 'api',
      tags: ['Node.js', 'API', 'Backend'],
      rating: 4.7,
      reviews: 203
    },
    {
      id: 5,
      name: 'Desktop Application',
      description: 'Cross-platform desktop app built with Electron and modern web technologies.',
      price: '$159',
      image: '💻',
      category: 'desktop',
      tags: ['Electron', 'Desktop', 'Cross-platform'],
      rating: 4.5,
      reviews: 67
    },
    {
      id: 6,
      name: 'E-commerce Solution',
      description: 'Complete e-commerce platform with shopping cart, payments, and admin panel.',
      price: '$299',
      image: '🛒',
      category: 'web',
      tags: ['E-commerce', 'Full-stack', 'Payment'],
      rating: 4.9,
      reviews: 312
    }
  ];

  get filteredProducts() {
    return this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory === 'all' || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  getStarArray(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= Math.floor(rating));
    }
    return stars;
  }
} 