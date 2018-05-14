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
  currentTab: string;

  constructor(
    private weaponsService: WeaponsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.currentTab = 'all';
    this.tableView = false;
    this.route.queryParams.subscribe(params => {
      // TODO: Fix this, we shouldnt be subscribing to this every time, 
      // we only need it once per query change.
      this.weaponsService.queryWeapons(params).subscribe((weapons) => {
        if (params.type === undefined) {
          this.currentTab = "all";
        } else {
          this.currentTab = params.type;
        }
        this.weapons = weapons;
      });
    });
  }

  ngAfterContentInit() {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
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

  public isCurrentTab(tab: string): boolean {
    return this.currentTab === tab;
  }

}
