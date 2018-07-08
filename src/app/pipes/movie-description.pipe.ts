import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieDescription'
})
export class MovieDescriptionPipe implements PipeTransform {

  private _maxLength = 200;
  private _noDescriptionText = 'There is no description jet.';

  transform(value: any, args?: any): any {
    if (!value) {
      return this._noDescriptionText;
    } else if (value.length > this._maxLength) {
      return value.substring(0, this._maxLength) + '...';
    } else {
      return value;
    }
  }
}
