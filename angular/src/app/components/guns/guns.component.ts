import { Component, OnInit } from '@angular/core';
import { Gun } from '../../Gun';
import { Observable } from 'rxjs';
import { GunService } from '../../services/gun.service';

@Component({
  selector: 'app-guns',
  templateUrl: './guns.component.html',
  styleUrls: ['./guns.component.scss']
})
export class GunsComponent implements OnInit {

  guns: Gun[]

  constructor(private gunService: GunService) { }

  ngOnInit() {
    this.getGuns();
  }

  getGuns(): void {
    this.gunService.getAllWeapons().subscribe(guns => this.guns = guns);
  }

}
