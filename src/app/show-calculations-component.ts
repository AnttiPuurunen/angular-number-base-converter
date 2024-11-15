import { Component, EventEmitter, Output, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'show-calculations-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './show-calculations-component.html',
  styleUrl: './show-calculations-component.css'
})

export class ShowCalculationsComponent {
    @Input() fromDec = new Array<string>();
    @Input() toDec = new Array<string>();
    baseList = [
        { name: 'two', baseNumber: 2 },
        { name: 'three', baseNumber: 3 },
        { name: 'four', baseNumber: 4 },
        { name: 'five', baseNumber: 5 },
        { name: 'six', baseNumber: 6 },
        { name: 'seven', baseNumber: 7 },
        { name: 'eight', baseNumber: 8 },
        { name: 'nine', baseNumber: 9 },
        { name: 'ten', baseNumber: 10 }
      ]

}