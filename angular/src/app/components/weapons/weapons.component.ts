import { Component, OnInit } from '@angular/core';
import { Weapon } from '../../weapon';
import { Observable } from 'rxjs';
import { WeaponsService } from '../../services/weapons.service';
import { ActivatedRoute } from '@angular/router';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-guns',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent implements OnInit {
  weapons: Weapon[];

  constructor(
    private weaponsService: WeaponsService,
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
    this.weaponsService.getAllWeapons().subscribe(weapons => {
      this.weapons = weapons;
    });
  }

  getSidearms(): void {
    this.weaponsService.getSidearms().subscribe(weapons => {
      this.weapons = weapons;
    });
  }

  getAssaultRifles(): void {
    this.weaponsService.getAssaultRifles().subscribe(weapons => {
      this.weapons = weapons;
      console.log(weapons[0]);
    });
  }

  sort(method: string): void {
    switch (method) {
      case "alpha":
        this.weapons = this.weapons.sort((a, b) => {
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0;
        });
        break;
      case "damage":
        this.weapons = this.weapons.sort((a, b) => {
          return b.damage - a.damage; 
        });
        break;
      default:
        break;
    }
  }

  public baseSkinFileId(weapon : Weapon): string {
    const AB = weapon.category == "Primary" ? "00" : "01";
    return `item_${AB}_000${weapon.weaponId}.png`;
  }
}
