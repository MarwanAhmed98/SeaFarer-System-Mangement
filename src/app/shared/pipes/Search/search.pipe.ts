import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrOfProduct: any[], text: string): any[] {
    return arrOfProduct.filter((item) => item.EmployeeName.toLowerCase().includes(text.toLocaleLowerCase()));
  }
}
