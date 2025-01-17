import { Component } from '@angular/core';

@Component({
  selector: 'app-color-changer',
  templateUrl: './color-changer.component.html',
  styleUrls: ['./color-changer.component.scss'],
  standalone: true  // This ensures the component is standalone
})
export class ColorChangerComponent {
  backgroundColor = 'white';

  changeColor() {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange'];
    this.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  }
}
