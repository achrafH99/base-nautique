import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
   currentIndex = 0;
  testimonials = [
    {
      name: 'Alexandre',
      message: 'Une expérience incroyable, le jet-ski au coucher du soleil est inoubliable !'
    },
    {
      name: 'Alexa',
      message: "Un accueil chaleureux et des activités fun, j'ai adoré le paddle avec mes amis."
    },
    {
      name: 'Antoine',
      message: 'Professionnalisme, sécurité et sensations fortes. Une journée parfaite !'
    }
  ];

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }
}
