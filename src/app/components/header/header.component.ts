import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isMobile: Observable<boolean> = this.formService.isMobile()

  constructor(
    private formService: FormService
  ) { }

  ngOnInit(): void {
  }



}
