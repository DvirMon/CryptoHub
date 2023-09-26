import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, startWith } from 'rxjs';

export interface SearchResultsData {
  totalResults: number
}

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Input() initialValue!: string;
  @Input() totalResults: number = 0;
  @Input() minLength: number = 0;

  public searchControl: FormControl<string> = new FormControl();

  @Output() termChanged = new EventEmitter<string>();

  constructor() {

    this.searchControl.valueChanges
      .pipe(
        startWith(this.initialValue),
        filter((value: string ) => value !== undefined),
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),

        // ignore new term if same as previous term
        distinctUntilChanged(),

        takeUntilDestroyed(),

        filter((value: string) => value.length >= this.minLength),

      )
      .subscribe((value: string) => {

        console.log(value)

        this.termChanged.emit(value);
      });
  }

  ngOnInit() {
    // Set initial value if provided
    if (this.initialValue) {
      this.searchControl.setValue(this.initialValue);
    }


  }
}
