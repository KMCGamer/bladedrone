import { Component, OnInit } from '@angular/core';
import { Gun } from '../Gun';

@Component({
  selector: 'app-guns',
  templateUrl: './guns.component.html',
  styleUrls: ['./guns.component.scss']
})
export class GunsComponent implements OnInit {

  GUNS: Gun[] = [
    {name: "AR57", damage: 50, accuracy: 90},
    {name: "AK47", damage: 35, accuracy: 43},
    {name: "M4A1", damage: 2, accuracy: 24},
    {name: "DSR-1", damage: 8, accuracy: 10},
    {name: "P90", damage: 19, accuracy: 8},
  ];

  constructor() { }

  ngOnInit() {
  }

}
