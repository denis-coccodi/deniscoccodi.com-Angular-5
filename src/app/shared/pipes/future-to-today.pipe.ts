import { Pipe, PipeTransform } from '@angular/core';
import { CoreService } from '../services/core.service';

@Pipe({
  name: 'futureToToday'
})

// transform a future date into the string 'today' (current event end dates are set to future dates in the database)
export class FutureToTodayPipe implements PipeTransform {

  constructor(private coreService: CoreService) {}

  transform(date: string): string {
    const currentDate = new Date();
    const dateArray = date.split(' ');
    if (+dateArray[1] > +currentDate.getFullYear()) {
      return this.coreService.getLang() === 'eng' ? 'Today' : 'Oggi';
    } else {
      return date;
    }
  }

}
