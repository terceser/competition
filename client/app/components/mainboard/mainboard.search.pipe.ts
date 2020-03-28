import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  public transform(value, input: string) {
    if (input) {
      input = input.toLowerCase();
      return value.filter(function (el: any) {
        return el.title.toLowerCase().indexOf(input) > -1;
      })
    }
    return value;

  }
}
