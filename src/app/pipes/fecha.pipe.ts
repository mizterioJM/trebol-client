import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fecha',
})
export class FechaPipe implements PipeTransform {
  transform(date: any, format: string): any {
    return moment(date).format(format);
  }
}
