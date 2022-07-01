import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

import * as _moment from 'moment';
import { Moment} from 'moment';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-date-picker-month-year',
  templateUrl: 'date-picker-month-year.html',
  styleUrls: ['date-picker-month-year.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DatePickerMonthYearComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();

  date = new FormControl(moment());

  ngOnInit(): void {
    let currentDate = this.date.value!;
    this.newItemEvent.emit(this.getMonthYear(currentDate));
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    
    this.newItemEvent.emit(this.getMonthYear(normalizedMonthAndYear))
    datepicker.close();
  }

  getMonthYear(normalizedMonthAndYear: Moment) {
    let month = normalizedMonthAndYear.month();
    let year = normalizedMonthAndYear.year().toString();
    month++;

    let monthConverted = month.toString();

    if (monthConverted.length === 1) {
      return "0" + monthConverted + year;
    }

    return monthConverted + year;
  }

}