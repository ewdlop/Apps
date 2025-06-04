import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  stats = [
    {
      title: 'Total Users',
      value: '12,345',
      icon: 'people',
      change: '+5.2%',
      changeType: 'increase'
    },
    {
      title: 'Revenue',
      value: '$98,765',
      icon: 'attach_money',
      change: '+12.1%',
      changeType: 'increase'
    },
    {
      title: 'Orders',
      value: '2,847',
      icon: 'shopping_cart',
      change: '-2.4%',
      changeType: 'decrease'
    },
    {
      title: 'Conversion',
      value: '3.45%',
      icon: 'trending_up',
      change: '+0.8%',
      changeType: 'increase'
    }
  ];

  projects = [
    {
      name: 'Angular Material App',
      progress: 85,
      status: 'In Progress',
      dueDate: 'Dec 15, 2024'
    },
    {
      name: 'E-commerce Platform',
      progress: 92,
      status: 'Near Completion',
      dueDate: 'Dec 8, 2024'
    },
    {
      name: 'Mobile App Development',
      progress: 45,
      status: 'In Progress',
      dueDate: 'Jan 20, 2025'
    },
    {
      name: 'API Integration',
      progress: 100,
      status: 'Completed',
      dueDate: 'Nov 30, 2024'
    }
  ];

  recentActivities = [
    {
      action: 'New user registered',
      user: 'John Doe',
      time: '2 minutes ago',
      icon: 'person_add'
    },
    {
      action: 'Order completed',
      user: 'Jane Smith',
      time: '15 minutes ago',
      icon: 'shopping_bag'
    },
    {
      action: 'Payment received',
      user: 'Mike Johnson',
      time: '1 hour ago',
      icon: 'payment'
    },
    {
      action: 'New review posted',
      user: 'Sarah Wilson',
      time: '2 hours ago',
      icon: 'star'
    }
  ];
} 