
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterComponent } from '../../shared/poster/poster.component';
import { ActivityCardComponent } from '../../shared/activity-card/activity-card.component';
import { CompanyIntroComponent } from '../../shared/company-intro/company-intro.component';
import { HomeCardComponent } from '../../shared/home-card/home-card.component';
import { Activity, ActivityService } from '../../core/services/activity.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule,ActivityCardComponent,CompanyIntroComponent,HomeCardComponent,PosterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  activities :Activity[]= []
  values = [
  {
    title: 'Sécurité avant tout',
    description: 'Nous plaçons la sécurité de nos clients au cœur de chaque activité avec du matériel certifié et une équipe expérimentée.',
    icon: 'fas fa-shield-alt',
    color: '#e63946' // Rouge sécurisant, sérieux
  },
  {
    title: 'Aventure & Adrénaline',
    description: 'Des expériences uniques sur l’eau, pour faire monter l’adrénaline dans un cadre exceptionnel à Djerba.',
    icon: 'fas fa-water',
    color: '#1d3557' // Bleu profond = mer, aventure
  },
  {
    title: 'Accueil chaleureux',
    description: 'Une équipe passionnée, toujours souriante, prête à vous faire vivre des souvenirs inoubliables.',
    icon: 'fas fa-house-user',
    color: '#f4a261' // Orange doux, chaleureux
  }
];

  constructor(private activityService:ActivityService){  }
 
ngOnInit():void{
  this.activityService.getActivities().subscribe((data)=> {
    this.activities=data
  })
}

}
