import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-biodata',
  templateUrl: './biodata.component.html',
  styleUrls: ['./biodata.component.scss']
})
export class BiodataComponent implements OnInit {


  @Input()
  cvList: Array<any> = [];

  @Output()
  cvSelectedEventEmitter = new EventEmitter();

  cvSelected(cv: any){
    this.cvSelectedEventEmitter.emit(cv);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
