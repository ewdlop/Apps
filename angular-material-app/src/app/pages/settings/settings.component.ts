import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatSliderModule,
    MatButtonToggleModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  // General Settings
  language = 'en';
  timezone = 'UTC-8';
  theme = 'dark';
  autoSave = true;
  
  // Display Settings
  fontSize = 14;
  showAnimations = true;
  compactMode = false;
  showTooltips = true;
  
  // Privacy Settings
  analytics = true;
  cookies = true;
  personalizedAds = false;
  dataSharing = false;
  
  // Notification Settings
  emailNotifications = true;
  pushNotifications = false;
  soundEnabled = true;
  notificationFrequency = 'instant';
  
  languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'ja', label: 'Japanese' }
  ];
  
  timezones = [
    { value: 'UTC-12', label: '(UTC-12:00) International Date Line West' },
    { value: 'UTC-8', label: '(UTC-08:00) Pacific Time (US & Canada)' },
    { value: 'UTC-5', label: '(UTC-05:00) Eastern Time (US & Canada)' },
    { value: 'UTC+0', label: '(UTC+00:00) Greenwich Mean Time' },
    { value: 'UTC+9', label: '(UTC+09:00) Tokyo, Seoul' }
  ];
  
  themes = [
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'auto', label: 'Auto (System)' }
  ];
  
  notificationFrequencies = [
    { value: 'instant', label: 'Instant' },
    { value: 'hourly', label: 'Hourly' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' }
  ];

  saveSettings() {
    console.log('Settings saved:', {
      language: this.language,
      timezone: this.timezone,
      theme: this.theme,
      autoSave: this.autoSave,
      fontSize: this.fontSize,
      showAnimations: this.showAnimations,
      compactMode: this.compactMode,
      showTooltips: this.showTooltips,
      analytics: this.analytics,
      cookies: this.cookies,
      personalizedAds: this.personalizedAds,
      dataSharing: this.dataSharing,
      emailNotifications: this.emailNotifications,
      pushNotifications: this.pushNotifications,
      soundEnabled: this.soundEnabled,
      notificationFrequency: this.notificationFrequency
    });
  }

  resetSettings() {
    this.language = 'en';
    this.timezone = 'UTC-8';
    this.theme = 'dark';
    this.autoSave = true;
    this.fontSize = 14;
    this.showAnimations = true;
    this.compactMode = false;
    this.showTooltips = true;
    this.analytics = true;
    this.cookies = true;
    this.personalizedAds = false;
    this.dataSharing = false;
    this.emailNotifications = true;
    this.pushNotifications = false;
    this.soundEnabled = true;
    this.notificationFrequency = 'instant';
  }

  exportSettings() {
    const settings = {
      language: this.language,
      timezone: this.timezone,
      theme: this.theme,
      autoSave: this.autoSave,
      fontSize: this.fontSize,
      showAnimations: this.showAnimations,
      compactMode: this.compactMode,
      showTooltips: this.showTooltips,
      analytics: this.analytics,
      cookies: this.cookies,
      personalizedAds: this.personalizedAds,
      dataSharing: this.dataSharing,
      emailNotifications: this.emailNotifications,
      pushNotifications: this.pushNotifications,
      soundEnabled: this.soundEnabled,
      notificationFrequency: this.notificationFrequency
    };
    
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'settings.json';
    link.click();
  }
} 