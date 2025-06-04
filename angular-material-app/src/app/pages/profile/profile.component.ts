import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatListModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Full-stack developer with 5+ years of experience in Angular and Node.js.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    joinDate: new Date('2019-03-15'),
    avatar: 'assets/avatar.jpg'
  };

  notifications = {
    emailNotifications: true,
    pushNotifications: false,
    marketing: true,
    updates: true
  };

  countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Japan',
    'Australia'
  ];

  skills = [
    'Angular', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 
    'React', 'Vue.js', 'MongoDB', 'PostgreSQL', 'AWS'
  ];

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: [this.user.name, [Validators.required, Validators.minLength(2)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone],
      bio: [this.user.bio, [Validators.maxLength(500)]],
      location: [this.user.location],
      website: [this.user.website],
      country: ['United States']
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onProfileSubmit() {
    if (this.profileForm.valid) {
      console.log('Profile updated:', this.profileForm.value);
      // Here you would typically call a service to update the profile
    }
  }

  onPasswordSubmit() {
    if (this.passwordForm.valid) {
      const { newPassword, confirmPassword } = this.passwordForm.value;
      if (newPassword === confirmPassword) {
        console.log('Password updated');
        // Here you would typically call a service to update the password
        this.passwordForm.reset();
      }
    }
  }

  uploadAvatar(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Here you would typically upload the file
      console.log('Avatar uploaded:', file.name);
    }
  }
} 