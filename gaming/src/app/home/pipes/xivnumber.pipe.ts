import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'xivNumber'
})
export class xivNumberPipe implements PipeTransform {

  transform(value: string | null): string {
    if (value !== undefined && value !== null) {
      return value.replace(/,/g, "");
    } else {
      return "";
    }
  }
}