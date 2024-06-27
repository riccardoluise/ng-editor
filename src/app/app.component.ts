import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColorChangerComponent } from './color-changer/color-changer.component';
import { PerlinNoiseGeneratorComponent } from './perlin-noise-generator/perlin-noise-generator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ColorChangerComponent, PerlinNoiseGeneratorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-editor';
}