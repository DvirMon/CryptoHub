import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/services/dialog.service';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']

})
export class DialogComponent implements OnInit {

  public development: boolean = environment.production
  public progress: number = 0

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    console.log(this.progress)
    this.subscribeToLoader()
  }

  private subscribeToLoader() {
    this.loaderService.loader.subscribe(
      (loader) => {
        this.progress = loader.progress
      },
      () => {
      },
    )
  }



} 
