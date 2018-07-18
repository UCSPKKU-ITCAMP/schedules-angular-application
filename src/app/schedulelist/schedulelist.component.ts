import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-schedulelist',
  templateUrl: './schedulelist.component.html',
  styleUrls: ['./schedulelist.component.css']
})
export class SchedulelistComponent implements OnInit {

  focusedSchedule = null
  @Input('scheduleArray') scheduleArray: Array<any>;

  constructor() { }

  ngOnInit() {
  }

}
