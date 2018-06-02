import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'capitalize'})

// pipe used to capitalize only the first letter of the first word
export class CapitalizePipe implements PipeTransform {

  transform(value: any) {
    if (value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  }

}
