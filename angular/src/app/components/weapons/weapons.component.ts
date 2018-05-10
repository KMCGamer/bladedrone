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
  tableView: boolean;
  sortType: string;
  sortReverse: boolean;

  constructor(
    private weaponsService: WeaponsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sortType = 'alpha';
    this.sortReverse = false;

    this.tableView = false;
    this.route.queryParams.subscribe(params => {
      this.weaponsService.queryWeapons(params.filter).subscribe((weapons) => {
        this.weapons = weapons;
        this.sort(this.sortType);
      });
    });
  }

  public toTableView() {
    this.tableView = true;
  }

  public toCardView() {
    this.tableView = false;
  }

  sort(method: string): void {
    switch (method) {
      case "alpha":
        const sorted = this.weapons.sort((a, b) => {
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0;
        });
        this.weapons = this.sortReverse ? sorted.reverse() : sorted; 
        this.sortType = method;
        this.sortReverse = !this.sortReverse;
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
