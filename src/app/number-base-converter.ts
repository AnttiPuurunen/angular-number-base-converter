import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'number-base-converter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './number-base-converter.html',
  styleUrl: './number-base-converter.css'
})
export class NumberBaseConverter {
  title = 'Number base converter';
  numberToConvert = 0;
  newBase = 0;

  convertBase() {
    this.newBase = this.numberToConvert;
  }
}
