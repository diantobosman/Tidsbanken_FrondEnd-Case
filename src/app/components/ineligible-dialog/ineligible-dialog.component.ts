import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IneligibleService } from 'src/app/services/ineligible.service';

@Component({
  selector: 'app-ineligible-dialog',
  templateUrl: './ineligible-dialog.component.html',
  styleUrls: ['./ineligible-dialog.component.css'],
  providers: [DatePipe]
})
export class IneligibleDialogComponent implements OnInit {

  constructor(
    private readonly ineligibleService: IneligibleService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
  }

    range = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
  });

  public registerPeriod(newPeriod: NgForm):void {
    const start = this.datePipe.transform(this.range.value.start , 'yyyy-MM-ddT00:00:00.000Z');
    const end = this.datePipe.transform(this.range.value.end , 'yyyy-MM-ddT00:00:00.000Z'); 

    const newIneligablePeriod = {
      periodStart: start,
      PeriodEnd: end
    };

    console.log(newIneligablePeriod);
    this.ineligibleService.saveNewIneligible(newIneligablePeriod);

  }

}
