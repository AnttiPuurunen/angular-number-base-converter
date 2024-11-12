import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  newBase = "";
  fromBase = null;
  toBase = null;
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

  convertBase() {
    this.newBase = "";
    /*
      Convert from base ten to another base
      TODO: Implement other conversions
    */
    if (this.numberToConvert > 0 && this.fromBase == 10 && this.toBase != null && this.fromBase != this.toBase) {
      this.fromTen(this.toBase)
    }
  }

  fromTen(toBase: number) {
    let conversionTable = []

    // Round down to get only whole numbers
    conversionTable.push({
      quotient: Math.floor(this.numberToConvert / toBase),
      remainder: (this.numberToConvert - (Math.floor(this.numberToConvert / toBase) * toBase))
    });

    // Check the last element of the array's quotient part
    while (conversionTable[conversionTable.length - 1].quotient > 0) {
      /* 
         Divide with the wanted base until the non-remainder part is less than one
         Keep track of the non-remainder part and the remainder of each step
         If the quotient is between zero and one, the last remainder is the previous quotient
      */

      conversionTable.push({
        quotient: Math.floor(conversionTable[conversionTable.length - 1].quotient / toBase),
        remainder: conversionTable[conversionTable.length - 1].quotient / toBase < 1 &&
          conversionTable[conversionTable.length - 1].quotient / toBase > 0 ?
          conversionTable[conversionTable.length - 1].quotient : conversionTable[conversionTable.length - 1].quotient % (toBase * (Math.floor(conversionTable[conversionTable.length - 1].quotient / toBase)))
      })
    }

    console.log(conversionTable)

    // The number in the new base is formed from the remainders starting from the end of the array to the beginning
    for (let i = conversionTable.length - 1; i >= 0; i--) {
      this.newBase += conversionTable[i].remainder;
    }
  }
}
