import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  public transform(value: { title: string }[], input: string): { title: string }[] {
    if (input) {
      input = input.toLowerCase();

      return value.filter(el => el.title.toLowerCase().indexOf(input) > -1);
    }

    return value;
  }
}
