import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { SelectBaseComponent } from './select-base-component';

@Component({
  selector: 'number-base-converter',
  standalone: true,
  imports: [FormsModule, SelectBaseComponent],
  templateUrl: './number-base-converter.html',
  styleUrl: './number-base-converter.css'
})
export class NumberBaseConverter {
  title = 'Number base converter';
  numberToConvert = 0;
  newBase = "";
  fromBase = 0;
  toBase = 0;
  
  // Comes from select-base-component
  selectBase(num: Array<number>) {
    // 1 == comes from the fromBase-component
    if (num[0] == 1) {
      this.fromBase = num[1];
      console.log("fromBase selected: " + this.fromBase)
    }
    // 2 == comes from the toBase-component
    else if (num[0] == 2) {
      this.toBase = num[1];
      console.log("toBase selected: " + this.toBase)
    }
  }

  convertBase() {
    this.newBase = "";
    let newNumber = 0;

    if (this.fromBase != 0 && this.toBase != 0) {
      let numberToConvertString = String(this.numberToConvert);

      // Check if the number to be converted is valid for the base
      // Each digit in the number has to be smaller than the base it is in
      for (let i = 0; i < numberToConvertString.length; i++) {
          if (Number(numberToConvertString[i]) >= this.fromBase) {
            this.newBase = "Invalid number entered";
            return;
          }
      }
    } else if (this.fromBase == 0 || this.toBase == 0) {
      this.newBase = "Enter a number greater than zero";
      return;
    }
    
    console.log("Before conversion selection: tobase: " + this.toBase + " frombase: " + this.fromBase)

    if (this.numberToConvert > 0 && this.fromBase != 10 && this.toBase != 10) {
      // Convert from non-decimal base to non-decimal base
      newNumber = this.nonDecToNonDec(this.fromBase, this.toBase)
    } else if (this.numberToConvert > 0 && this.fromBase == 10 && this.toBase != 0 && this.fromBase != this.toBase) {
      // Convert from base ten to another base
      newNumber = this.fromDecimal(this.numberToConvert, this.toBase);
    } else if (this.numberToConvert > 0 && this.fromBase != 0 && this.toBase == 10 && this.fromBase != this.toBase) {
      // Convert from another base to base ten
      newNumber = this.toDecimal(this.fromBase);
    }

    this.newBase = String(newNumber);
  }

  fromDecimal(number: number, toBase: number) {
    let conversionTable = []
    let newNumber = "";

    console.log("After entering fromDecimal");
    
    // Check if the function call is coming from the convertBase()-function or
    // from the nonDecToNonDec()-function
    if (number == this.numberToConvert) {
      number = this.numberToConvert
    }
    // Round down to get only whole numbers
    conversionTable.push({
      quotient: Math.floor(number / toBase),
      remainder: (number - (Math.floor(number / toBase) * toBase))
    });
    console.log("conversionTable formed")
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

    // The number in the new base is formed from the remainders starting from the end of the array to the beginning
    for (let i = conversionTable.length - 1; i >= 0; i--) {
      newNumber += conversionTable[i].remainder;
      console.log(newNumber)
    }

    return Number(newNumber);
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

    return newNumber;
  }

  nonDecToNonDec(fromBase: number, toBase: number) {
    let newNumber = 0;
    // When converting from non-decimal base to another non-decimal base, first convert to decimal
    newNumber = this.toDecimal(fromBase);
    console.log("Non-dec to non-dec after converting to decimal: " + newNumber)

    // Then just convert from decimal to wanted base
    newNumber = this.fromDecimal(newNumber, toBase);
    console.log("After fromDecimal: " + newNumber)

    return newNumber;
  } 
}
