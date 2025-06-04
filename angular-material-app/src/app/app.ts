import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Angular Material App';
  
  navigationItems = [
    { path: '/home', label: 'Home', icon: 'home' },
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/profile', label: 'Profile', icon: 'person' },
    { path: '/products', label: 'Products', icon: 'shopping_cart' },
    { path: '/settings', label: 'Settings', icon: 'settings' }
  ];
}
