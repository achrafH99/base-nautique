import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-card',
  imports: [CommonModule],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.css',
})
export class HomeCardComponent {

  @Input() value!: {title:string; icon:string; color:string; description:string}
}
