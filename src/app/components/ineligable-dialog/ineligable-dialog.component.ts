import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IneligableService } from 'src/app/services/ineligable.service';

@Component({
  selector: 'app-ineligable-dialog',
  templateUrl: './ineligable-dialog.component.html',
  styleUrls: ['./ineligable-dialog.component.css'],
  providers: [DatePipe]
})
export class IneligableDialogComponent implements OnInit {

  constructor(
    private readonly ineligableService: IneligableService,
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
    this.ineligableService.saveNewIneligable(newIneligablePeriod);

  }

}
