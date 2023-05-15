import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Observable, of } from 'rxjs';
import { TypographyComponent } from 'src/app/shared/components/typography/typography.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, RouterModule, MatButtonModule, TypographyComponent]
})
export class HomeComponent {

  isMobile$: Observable<boolean> = of(true)

}
