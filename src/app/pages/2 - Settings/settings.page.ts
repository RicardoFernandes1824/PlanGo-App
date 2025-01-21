import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  
  ngOnInit() {
    const prefersDark = localStorage.getItem('dark-theme') === 'true';
    document.body.classList.toggle('dark-theme', prefersDark);
  }

  toggleDarkMode(event: any) {
    const isDarkMode = event.detail.checked;
    document.body.classList.toggle('dark-theme', isDarkMode);
    localStorage.setItem('dark-theme', String(isDarkMode));
  }
}