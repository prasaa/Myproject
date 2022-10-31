import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showModal = -1;
  openModal(index:any){
    this.showModal = index;
  }

  close(){
    this.showModal = -1;
  }
}
