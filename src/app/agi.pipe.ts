import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'agi'
})
export class AgiPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {
  }

  transform(value: any, digits?: any): any {
    return this.decimalPipe.transform(value / 10000000.0, digits);
  }

}
