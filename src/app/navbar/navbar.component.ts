import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() selectedSchedule:EventEmitter<any> = new EventEmitter();
  

  selectSchedule(selectedItem: any){
    // console.log(selectedItem);
    
    this.selectedSchedule.emit(this.schedules[selectedItem.index]);
  }

  @Input('schedules') schedules: Array<any>;
  isExpanded = false;
  constructor() { }

  ngOnInit() {
  }

}
