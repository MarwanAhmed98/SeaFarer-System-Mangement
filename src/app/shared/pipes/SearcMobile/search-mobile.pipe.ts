import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMobile'
})
export class SearchMobilePipe implements PipeTransform {

transform(arrOfProduct: any[], text: string): any[] {
    return arrOfProduct.filter((item) => item.Mobile.includes(text));
  }

}
