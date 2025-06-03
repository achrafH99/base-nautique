import { Component, ElementRef, HostListener, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.css'],
})
export class PosterComponent implements AfterViewInit {
  private posterOffsetTop = 0;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const poster = this.el.nativeElement.querySelector('.poster');
    if (poster) {
      // Récupérer la position absolue de la section par rapport au haut de la page
      this.posterOffsetTop = poster.offsetTop;
    }
    this.updateParallax();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateParallax();
  }

  updateParallax() {
    const poster = this.el.nativeElement.querySelector('.poster');
    const bg = this.el.nativeElement.querySelector('.poster-bg');

    if (!poster || !bg) return;

    // Distance scrollée depuis le top jusqu'à la section
    const scrollPosition = window.scrollY;
    const relativeScroll = scrollPosition - this.posterOffsetTop;

    // Multiplier par un facteur pour l'effet parallax
    const offset = relativeScroll * 0.4;

    bg.style.transform = `translateY(${offset}px)`;
  }
}
