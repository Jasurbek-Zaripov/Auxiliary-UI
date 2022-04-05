import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-inp-group',
  templateUrl: './inp-group.component.html',
  styleUrls: ['./inp-group.component.css']
})
export class InpGroupComponent implements OnInit {
  @Input() idx: number = 0;
  @Output() eveFunc: EventEmitter<any> = new EventEmitter();
  @Output() eveInp: EventEmitter<any> = new EventEmitter();
  @Output() eveOut: EventEmitter<any> = new EventEmitter();
  @Output() eveDel: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
}
