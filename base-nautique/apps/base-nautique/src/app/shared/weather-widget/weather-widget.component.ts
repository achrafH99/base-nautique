import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../core/services/weather/weather.service';

@Component({
  selector: 'app-weather-widget',
  imports: [CommonModule],
  templateUrl: './weather-widget.component.html',
  styleUrl: './weather-widget.component.css',
})
export class WeatherWidgetComponent implements OnInit {
  weatherNow: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
     this.weatherService.getWeather().subscribe(data => {
      this.weatherNow = data.current_condition[0];
    });
  }
}
