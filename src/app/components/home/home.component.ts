import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Observable, of } from 'rxjs';
import { TypographyComponent } from 'src/app/shared/components/typography/typography.component';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../layout/layout.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, RouterModule, MatButtonModule, TypographyComponent]
})
export class HomeComponent implements OnInit, OnDestroy {

  isMobile$: Observable<boolean> = of(true)

  layoutService: LayoutService = inject(LayoutService);

  ngOnInit(): void {
    this.layoutService.setToolbarSignal(false)

  }

  ngOnDestroy(): void {
    this.layoutService.setToolbarSignal(true)
  }

}
