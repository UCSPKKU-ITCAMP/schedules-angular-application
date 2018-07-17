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

  scheduleArray = [];
  roomArray = [];
  speakerArray = [];

  // scheduleArray = [];

  constructor(public db: AngularFireDatabase) { }

  ngOnInit() {
    // this.db.list('datas').snapshotChanges(['child_changed']).subscribe(snapshot => {
    //   if (snapshot) {
    //     console.log('snapahaot', snapshot);
    //     this.scheduleArray = [];
    //     this.roomArray = [];
    //     this.speakerArray = [];
    //   }
    // });
    this.getSchedules();
  }

  focusedSchedule = null;
  getSchedules() {

    this.db.list('datas/rooms').snapshotChanges().pipe(
      map(rooms => {
        return rooms.map(room => {
          let index = room.payload.val();
          index['key'] = room.key;
          return index;
        })
      })
    ).subscribe(res => {
      this.roomArray = res;
    })

    this.db.list('datas/speakers').snapshotChanges().pipe(
      map(speakers => {
        return speakers.map(speaker => {
          let index = speaker.payload.val();
          index['key'] = speaker.key;
          return index;
        })
      })
    ).subscribe(res => {
      this.speakerArray = res;
    });

    // forkJoin([this.db.list('datas/rooms').snapshotChanges().pipe(
    //   map(rooms => {
    //     return rooms.map(room => {
    //       let index = room.payload.val();
    //       index['key'] = room.key;
    //       return index;
    //     })
    //   })
    // ), this.db.list('datas/speakers').snapshotChanges().pipe(
    //   map(speakers => {
    //     return speakers.map(speaker => {
    //       let index = speaker.payload.val();
    //       index['key'] = speaker.key;
    //       return index;
    //     })
    //   })
    // )]).subscribe(pair => {
    //     console.log('forkjoin');
    //     console.log(pair,'fsfdsfsd');
    // })

    this.db.list('datas/schedules').valueChanges().pipe(
       map(schedules => {
        return schedules.map(schedule => {
          let index = schedule;
          this.speakerArray.map(x => console.log(x));
          index['speaker'] = this.speakerArray.filter(x => schedule['speaker_id'] == x['key'])[0];
          index['room'] = this.roomArray.filter(x => schedule['room_id'] == x['key'])[0];
          return index;
        })
      })
    ).subscribe(res => {
      console.log("schedule response", res);
      this.scheduleArray = res;
    })
  }

}
