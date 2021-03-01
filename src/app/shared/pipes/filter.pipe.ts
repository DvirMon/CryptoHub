import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class FilterPipe implements PipeTransform {


  transform(options: any[], filterValue: string): any[] {

    if (!options) {
      return [];
    }
    if (!filterValue) {
      return options;
    }
    filterValue = filterValue.toLocaleLowerCase();

    // return options.filter(it => {
    //   return it.toLocaleLowerCase().includes(filterValue);
    // });

    return options.filter(option =>
      option.symbol.toLowerCase().startsWith(filterValue));

  }

}
