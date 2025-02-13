import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'xivDecimal'
})
export class xivDecimalPipe implements PipeTransform {

  transform(value: string | null): string {
    if (value !== undefined && value !== null) {
      var decimal: string[] | null = value?.match(/\.([0-9]+)/g);
      return decimal ? decimal[0].replace('.','') : '00';
    } else {
      return '00';
    }
  }
}