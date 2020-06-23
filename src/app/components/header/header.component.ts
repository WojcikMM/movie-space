import { Component } from '@angular/core';
import { HEADER_CONST } from './header.component.const';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public readonly HEADER_CONST = HEADER_CONST;
}
