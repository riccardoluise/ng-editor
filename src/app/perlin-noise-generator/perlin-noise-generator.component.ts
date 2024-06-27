//TODO: suddividere creazione immagine da bottoni
//TODO: bottoni, toggle

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import p5 from 'p5';

@Component({
  selector: 'app-perlin-noise-generator',
  template: `
    <div #canvasContainer></div>
    <div class="controls">
      <button (click)="generateImage(p5Instance!)">🔄 Refresh</button>
      <button (click)="downloadImage()">⬇️ Download</button>
      <button (click)="zoomInNoise()">🔍+ Zoom In Noise</button>
      <button (click)="zoomOutNoise()">🔍- Zoom Out Noise</button>
      <button (click)="increaseZoom()">➕ Increase Zoom Factor</button>
      <button (click)="decreaseZoom()">➖ Decrease Zoom Factor</button>
      <button (click)="zoomInImage()">🔍+ Zoom In Image</button>
      <button (click)="zoomOutImage()">🔍- Zoom Out Image</button>
      <p>Current noise factor: {{ noiseFactor.toFixed(5) }}</p>
      <p>Current zoom amount: {{ zoomAmount.toFixed(2) }}</p>
    </div>
  `,
  styles: [`
    .controls {
      position: fixed;
      bottom: 10px;
      width: 100%;
      padding: 10px;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
    button {
      font-size: 18px;
      padding: 10px 20px;
      margin: 5px;
    }
  `],
  standalone: true
})
export class PerlinNoiseGeneratorComponent implements OnInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  public p5Instance: p5 | null = null;  // Cambiato da private a public
  private img: p5.Image | null = null;
  noiseFactor: number = 0.1;
  zoomAmount: number = 1.1;
  imageZoom: number = 1;

  constructor() {
    this.p5Instance = null;
    this.img = null;
  }

  ngOnInit() {
    this.createCanvas();
  }

  createCanvas() {
    this.p5Instance = new p5((p: p5) => {
      p.setup = () => {
        const canvas = p.createCanvas(1080, 1920);
        canvas.parent(this.canvasContainer.nativeElement);
        p.noLoop();
        this.generateImage(p);
      };

      p.draw = () => {
        if (this.img) {
          p.background(255);
          p.push();
          p.scale(this.imageZoom);
          p.image(this.img, 0, 0);
          p.pop();
        }
      };
    });
  }

  generateImage(p: p5) {
    this.img = p.createImage(p.width, p.height);
    this.img.loadPixels();

    for (let x = 0; x < p.width; x++) {
      for (let y = 0; y < p.height; y++) {
        let noiseVal = p.noise(x * this.noiseFactor, y * this.noiseFactor);
        let c = p.color(noiseVal * 255);
        this.img.set(x, y, c);
      }
    }

    this.img.updatePixels();
    p.redraw();
  }

  downloadImage() {
    if (this.p5Instance && this.img) {
      this.p5Instance.save(this.img, 'perlin_noise_image.png');
    }
  }

  zoomInNoise() {
    this.noiseFactor *= this.zoomAmount;
    this.generateImage(this.p5Instance!);
  }

  zoomOutNoise() {
    this.noiseFactor /= this.zoomAmount;
    this.generateImage(this.p5Instance!);
  }

  increaseZoom() {
    this.zoomAmount *= 1.1;
  }

  decreaseZoom() {
    this.zoomAmount *= 0.9;
  }

  zoomInImage() {
    this.imageZoom *= 1.1;
    this.p5Instance?.redraw();
  }

  zoomOutImage() {
    this.imageZoom /= 1.1;
    this.p5Instance?.redraw();
  }
}
