import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColorChangerComponent } from './color-changer/color-changer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ColorChangerComponent],  // Add ColorChangerComponent here
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-editor';
}