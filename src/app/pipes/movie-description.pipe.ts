import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieDescription'
})
export class MovieDescriptionPipe implements PipeTransform {

  private _noDescriptionText = 'There is no description jet.';
  private _pattern = /(^.{1,250}\.{1})/;

  transform(value: string, args?: any): any {
    if (!value) {
      return this._noDescriptionText;
    } else {
      const result = value.match(this._pattern);
      return !result || result.length === 0 ? this._noDescriptionText : result[0];
    }
  }
}
