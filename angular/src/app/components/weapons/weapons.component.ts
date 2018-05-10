import { Component, OnInit } from '@angular/core';
import { Weapon } from '../../weapon';
import { Observable } from 'rxjs';
import { WeaponsService } from '../../services/weapons.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.sortType = 'name';
    this.sortReverse = false;
    this.tableView = false;
    this.route.queryParams.subscribe(params => {
      this.weaponsService.getAllWeapons().subscribe((weapons) => {
        this.weapons = weapons;
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
    let sorted;

    switch (method) {
      case "name": 
      case "category":
      case "type": {
        sorted = this.weapons.sort((a, b) => {
          if(a[method] < b[method]) return -1;
          else if(a[method] > b[method]) return 1;
          else return 0;
        });
        break; 
      }
      case "damage": case "mobility": case "range":
      case "recoil": case "fireRate": case "accuracy": {
        sorted = this.weapons.sort((a, b) => {
          if (b[method] === a[method]) {
            if(a.name < b.name) return -1;
            else if(a.name > b.name) return 1;
            else return 0;
          } else {
            return b[method] - a[method]; 
          }
        });
        break;
      }
      default:
        break;
    }
    this.weapons = this.sortReverse ?  sorted: sorted.reverse(); 
    this.sortType = method;
    this.sortReverse = !this.sortReverse;
  }

  public baseSkinFileId(weapon : Weapon): string {
    const AB = weapon.category == "Primary" ? "00" : "01";
    return `item_${AB}_000${weapon.weaponId}.png`;
  }

  public query(query: string) {
    this.router.navigate([], {queryParams: { filter: query }});
    this.weaponsService.queryWeapons(query).subscribe((weapons) => {
      this.weapons = weapons;
    })
  }
}
