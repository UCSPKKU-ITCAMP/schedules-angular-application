import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map, tap, filter } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { resolve } from 'url';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  focusedSchedule = null;
  scheduleArray = null;
  roomArray = [];
  speakerArray = [];

  constructor(public db: AngularFireDatabase) { }

  ngOnInit() {
    this.getSchedules();
  }

  schedules = null;

  

  onTabChanged(obj: any) {
    console.log(obj.rooms)
   this.scheduleArray = obj.rooms
  }


  getSchedules() {
    this.db.list("2018/schedules").snapshotChanges().pipe(map(room => {
      return room as any
    })).subscribe(res => {
     var items = res.map((item) => {
        return item.payload.val();
      });
      
      this.schedules = items;
    })
 
  }

}
