import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'select-base-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select-base-component.html',
  styleUrl: '../styles/select-base-component.css'
})

export class SelectBaseComponent {
    fromBase = 0;
    toBase = 0;
    // id for the component passed down from the parent component
    @Input() id = "";
    // EventEmitter to send the selected bases to the parent component
    @Output() baseEvent = new EventEmitter<Array<number>>();
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
    
    selectBase() {
        // Check which component it is based on the id passed from the parent component
        // Send 1 == fromBase, 2 == toBase
        if (this.id == "from") {
            this.baseEvent.emit([1, this.fromBase]);
        } else if (this.id == "to") {
            this.baseEvent.emit([2, this.toBase]);
        }
    }
}