import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { SkeletonComponent } from 'src/app/shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-coins-skeleton',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, SkeletonComponent],
  templateUrl: './coins-skeleton.component.html',
  styleUrls: ['./coins-skeleton.component.scss']
})
export class CoinsSkeletonComponent {

}
