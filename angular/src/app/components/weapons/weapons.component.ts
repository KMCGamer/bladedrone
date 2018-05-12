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

  constructor(
    private weaponsService: WeaponsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
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
