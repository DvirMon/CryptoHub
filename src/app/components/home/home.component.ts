import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { Observable, of } from 'rxjs';
import { TypographyComponent } from 'src/app/shared/components/typography/typography.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, MatGridListModule, MatButtonModule, TypographyComponent]
})
export class HomeComponent {

  isMobile$: Observable<boolean> = of(true)

}
