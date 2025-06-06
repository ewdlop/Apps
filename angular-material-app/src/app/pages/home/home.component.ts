import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatProgressBarModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  features = [
    {
      title: 'Material Design',
      description: 'Beautiful, accessible components following Material Design principles.',
      icon: 'palette',
      progress: 90
    },
    {
      title: 'Responsive Layout',
      description: 'Flexible grid system that works on all screen sizes.',
      icon: 'devices',
      progress: 85
    },
    {
      title: 'Modern Angular',
      description: 'Built with the latest Angular features and best practices.',
      icon: 'code',
      progress: 95
    },
    {
      title: 'TypeScript',
      description: 'Type-safe development with excellent IDE support.',
      icon: 'construction',
      progress: 88
    }
  ];
  
  technologies = ['Angular', 'Material', 'TypeScript', 'SCSS', 'RxJS'];
} 