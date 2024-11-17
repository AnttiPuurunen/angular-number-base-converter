import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
}