import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isMobile: Observable<boolean> = this.formService.isMobile()

  constructor(
    private formService: FormService
  ) { }

  ngOnInit(): void {
  }

}
