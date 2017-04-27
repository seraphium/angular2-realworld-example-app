/**
 * Created by zezhang on 2017/4/27.
 */
import { Component } from '@angular/core'

@Component({
  selector: 'layout-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  today: number = Date.now();
}
