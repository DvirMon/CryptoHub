import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonDirective } from '../../directives/skeleton.directive';

type AllowedType = 'text' | 'span';


@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonDirective],
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent {

  @Input() type!: AllowedType;

}
