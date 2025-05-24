import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poster',
  imports: [CommonModule],
  templateUrl: './poster.component.html',
  styleUrl: './poster.component.css',
})
export class PosterComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.updateParallax();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateParallax();
  }

  updateParallax() {
    const poster = this.el.nativeElement.querySelector('.poster');
    const bg = this.el.nativeElement.querySelector('.poster-bg');

    const rect = poster.getBoundingClientRect();
    const offset = rect.top * 0.4; // Ratio du déplacement
    bg.style.transform = `translateY(${offset}px)`;
  }
}