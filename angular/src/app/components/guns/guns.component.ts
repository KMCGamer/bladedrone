import { Component, OnInit } from '@angular/core';
import { Gun } from '../../Gun';
import { Observable } from 'rxjs';
import { GunService } from '../../services/gun.service';
import { ActivatedRoute } from '@angular/router';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-guns',
  templateUrl: './guns.component.html',
  styleUrls: ['./guns.component.scss']
})
export class GunsComponent implements OnInit {
  guns: Gun[]

  constructor(
    private gunService: GunService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params.filter) {
        if (params.filter == "Assault+Rifles") {
          this.getAssaultRifles();
        } else {
          this.getSidearms();
        }
      } else {
        this.getAllWeapons();
      }
    });
  }

  getAllWeapons(): void {
    this.gunService.getAllWeapons().subscribe(guns => {
      this.guns = guns
    });
  }

  getSidearms(): void {
    this.gunService.getSidearms().subscribe(guns => {
      this.guns = guns
    });
  }

  getAssaultRifles(): void {
    this.gunService.getAssaultRifles().subscribe(guns => {
      this.guns = guns
    });
  }

  sort(method: string): void {
    switch (method) {
      case "alpha":
        this.guns = this.guns.sort((a, b) => {
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0;
        });
        break;
      case "damage":
        this.guns = this.guns.sort((a, b) => {
          return b.damage - a.damage; 
        });
        break;
      default:
        break;
    }
    
  }
}
