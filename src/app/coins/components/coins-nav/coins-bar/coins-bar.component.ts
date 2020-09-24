import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-coins-bar',
  templateUrl: './coins-bar.component.html',
  styleUrls: ['./coins-bar.component.scss']
})
export class CoinsBarComponent {


  public isMobile: Observable<boolean> = this.formService.isMobile()

  constructor(
    private formService : FormService
  ) { }
}
