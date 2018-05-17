import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unCamelCase'
})
export class UnCamelCasePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/([A-Z])/, ' $1').trim();
  }
}
