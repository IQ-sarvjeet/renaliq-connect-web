import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    const names = value.split(' ');
    let initials = '';

    for (let i = 0; i < names.length; i++) {
      initials += names[i][0].toUpperCase();
    }

    return initials;
  }
}
