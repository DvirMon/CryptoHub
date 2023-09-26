import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from 'src/app/components/layout/layout.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TypographyComponent } from 'src/app/shared/components/typography/typography.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, TypographyComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {

    isMobile$: Observable<boolean> = of(true)

    layoutService: LayoutService = inject(LayoutService);

    ngOnInit(): void {
      this.layoutService.setToolbarSignal(false)

    }

    ngOnDestroy(): void {
      this.layoutService.setToolbarSignal(true)
    }

  }
