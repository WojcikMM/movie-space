import { Component } from '@angular/core';
import { GLOBAL_CONST } from '../../global.const';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public readonly rootPathUrl: string = GLOBAL_CONST.ROUTES.ROOT;
}
