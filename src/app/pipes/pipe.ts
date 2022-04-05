import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'fulfillmentPipe'})
export class FulfillmentPipe implements PipeTransform {
  transform(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().split('_').join(' ');
  }
}
@Pipe({name: 'orderPipe'})
export class OrderPipe implements PipeTransform { 
    transform(value: number): any {
    if (value === -1) {
        return 'N/A';
    } else {
        return value;
    }
  }
}