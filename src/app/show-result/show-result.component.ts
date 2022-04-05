import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.css']
})
export class ShowResultComponent implements OnInit {
  @Input() functionName: string = '';
  @Input() returning: string = '';
  @Input() log: string = '';
  @Input() bool: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
