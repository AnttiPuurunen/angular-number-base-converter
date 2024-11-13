import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';

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

    if (this.fromBase != null && this.toBase != null) {
      let numberToConvertString = String(this.numberToConvert);

      // Check if the number to be converted is valid for the base
      // Each digit in the number has to be smaller than the base it is in
      for (let i = 0; i < numberToConvertString.length; i++) {
          if (Number(numberToConvertString[i]) >= this.fromBase) {
            this.newBase = "Invalid number entered";
            return;
          }
      }
    }
    
    if (this.numberToConvert > 0 && this.fromBase == 10 && this.toBase != null && this.fromBase != this.toBase) {
      // Convert from base ten to another base
      this.fromDecimal(this.toBase);
    } else if (this.numberToConvert > 0 && this.fromBase != null && this.toBase == 10 && this.fromBase != this.toBase) {
      // Convert from another base to base ten
      this.toDecimal(this.fromBase);
    }
  }

  fromDecimal(toBase: number) {
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

  toDecimal(fromBase: number) {
    // Convert the number to string, so its individual digits and its length can be accessed
    let number = String(this.numberToConvert);
    let newNumber = 0;
    let length = number.length;
    
    // The number in the new base is constructed from each digit times the base to the power of its place value
    for (let i = 0; i < number.length; i++) {
      newNumber += Number(number[i])*Math.pow(fromBase, length-1);
      length--;
    }

    this.newBase = String(newNumber);
  }
}
