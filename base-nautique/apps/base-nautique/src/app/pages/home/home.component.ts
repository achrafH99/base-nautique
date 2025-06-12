
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterComponent } from '../../shared/poster/poster.component';
import { ActivityCardComponent } from '../../shared/activity-card/activity-card.component';
import { CompanyIntroComponent } from '../../shared/company-intro/company-intro.component';
import { HomeCardComponent } from '../../shared/home-card/home-card.component';
import { Activity, ActivityService } from '../../core/services/activity.service';
import { CarouselComponent } from '../../shared/carousel/carousel.component';
import { WeatherWidgetComponent } from "../../shared/weather-widget/weather-widget.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, ActivityCardComponent, CompanyIntroComponent, HomeCardComponent, PosterComponent, CarouselComponent, WeatherWidgetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  activities :Activity[]= []
values = [
  {
    title: 'Sécurité',
    description: 'La sécurité de nos participants est notre priorité absolue, en mer comme à terre.',
    icon: 'fas fa-life-ring',
    color: '#3498db'
  },
  {
    title: 'Respect de la nature',
    description: 'Nous pratiquons des activités nautiques en harmonie avec l’environnement marin.',
    icon: 'fas fa-water',
    color: '#2ecc71'
  },
  {
    title: 'Accessibilité',
    description: 'Des activités adaptées à tous les âges et niveaux, pour découvrir les joies de l’eau.',
    icon: 'fas fa-swimmer',
    color: '#e67e22'
  }
];


  constructor(private activityService:ActivityService){  }
 
ngOnInit():void{
  this.activityService.getActivities().subscribe((data)=> {
    this.activities=data
  })
}

}
