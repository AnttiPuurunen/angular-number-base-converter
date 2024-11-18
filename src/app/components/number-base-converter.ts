import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { SelectBaseComponent } from './select-base-component';
import { ShowCalculationsComponent } from "./show-calculations-component";

@Component({
  selector: 'number-base-converter',
  standalone: true,
  imports: [FormsModule, SelectBaseComponent, ShowCalculationsComponent],
  templateUrl: './number-base-converter.html',
  styleUrl: '../styles/number-base-converter.css'
})
export class NumberBaseConverter {
  title = 'Number base converter';
  numberToConvert = 0;
  newBase = "";
  fromBase = 0;
  toBase = 0;
  // Record calculation steps to be shown
  fromDecCalculationSteps = new Array<string>();
  toDecCalculationSteps = new Array<string>();
  error = "";

  baseList = [
    { name: 'two', fancyName: 'binary', baseNumber: 2 },
    { name: 'three', fancyName: 'ternary',baseNumber: 3 },
    { name: 'four', fancyName: 'quaternary', baseNumber: 4 },
    { name: 'five', fancyName: 'quinary', baseNumber: 5 },
    { name: 'six', fancyName: 'senary', baseNumber: 6 },
    { name: 'seven', fancyName: 'septenary', baseNumber: 7 },
    { name: 'eight', fancyName: 'octal', baseNumber: 8 },
    { name: 'nine', fancyName: 'nonary', baseNumber: 9 },
    { name: 'ten', fancyName: 'decimal', baseNumber: 10 }
  ]
  
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
    this.error = "";

    if (this.fromBase != 0 && this.toBase != 0) {
      let numberToConvertString = String(this.numberToConvert);

      // Check if the number to be converted is valid for the base
      // Each digit in the number has to be smaller than the base it is in
      for (let i = 0; i < numberToConvertString.length; i++) {
          if (Number(numberToConvertString[i]) >= this.fromBase) {
            this.error = "Invalid number entered";
            return;
          }
      }
    } else if (this.fromBase == 0 || this.toBase == 0) {
      this.error = "Enter a number greater than zero";
      return;
    }

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
    this.fromDecCalculationSteps.length = 0;
    let conversionTable = [];
    let newNumber = "";
    let fancyName = this.baseList.find((element) => element.baseNumber == toBase);

    this.fromDecCalculationSteps.push("Convert from base 10 (decimal) to base " + String(toBase) + " (" + fancyName?.fancyName +"):");
    
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
    this.fromDecCalculationSteps.push(number + ' / ' + toBase + ' = ' + conversionTable[0].quotient + ' Remainder ' + conversionTable[0].remainder);

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

      this.fromDecCalculationSteps.push(String(conversionTable[conversionTable.length -2].quotient) + ' / ' + toBase + ' = ' + String(conversionTable[conversionTable.length -1].quotient) + ' Remainder ' + String(conversionTable[conversionTable.length -1].remainder))
    }

    // The number in the new base is formed from the remainders starting from the end of the array to the beginning
    for (let i = conversionTable.length - 1; i >= 0; i--) {
      newNumber += conversionTable[i].remainder;
      console.log(newNumber)
    }

    this.fromDecCalculationSteps.push(newNumber);

    return Number(newNumber);
  }

  toDecimal(fromBase: number) {
    // Convert the number to string, so its individual digits and its length can be accessed
    let number = String(this.numberToConvert);
    let newNumber = 0;
    let length = number.length;
    let fancyName = this.baseList.find((element) => element.baseNumber == fromBase);
    this.toDecCalculationSteps.length = 0;
    this.toDecCalculationSteps.push("Convert from base " + String(fromBase) + " (" + fancyName?.fancyName + ") to base 10 (decimal):")
    // The number in the new base is constructed from each digit times the base to the power of its place value
    for (let i = 0; i < number.length; i++) {
      newNumber += Number(number[i])*Math.pow(fromBase, length-1);
      if (this.toDecCalculationSteps.length == 1) 
        this.toDecCalculationSteps.push(number[i] + ' x ' + String(fromBase) + '^' + String(length-1))
      else
        this.toDecCalculationSteps.push('+ ' + number[i] + ' x ' + String(fromBase) + '^' + String(length-1))
      length--;
    }

    this.toDecCalculationSteps.push(String(newNumber));

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
