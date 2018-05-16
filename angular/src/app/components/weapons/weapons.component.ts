import { Component, OnInit } from '@angular/core';
import { Weapon } from '../../models/weapon.model';
import { Observable } from 'rxjs';
import { WeaponsService } from '../../services/weapons.service';
import { ActivatedRoute } from '@angular/router';
import { map } from "rxjs/operators";

const HEADER_ORDER = [
  "name",
  "category",
  "type",
  "damage",
  "mobility",
  "range",
  "recoil",
  "fireRate",
  "accuracy"
];

@Component({
  selector: 'app-guns',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent implements OnInit {
  weapons: Weapon[];
  tableView: boolean;
  currentTab: string;
  headers: string[];
  allHeaders = [
    "name",
    "category",
    "type",
    "damage",
    "mobility",
    "range",
    "recoil",
    "fireRate",
    "accuracy"
  ];

  constructor(
    private weaponsService: WeaponsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentTab = 'all';
    this.tableView = false;
    this.headers = ["name", "category", "type"];
    this.route.queryParamMap.subscribe(paramMap => {
      this.weaponsService.queryWeapons(paramMap).subscribe(weapons => {
        this.weapons = weapons;
      });
    });
  }

  /* Switch to table view */
  public toTableView() {
    this.tableView = true;
  }

  /* Switch to card view */
  public toCardView() {
    this.tableView = false;
  }

  /* Get the id for the base skin from the weapon service */
  public getBaseSkinFileId(weapon: Weapon): string {
    return this.weaponsService.getBaseSkinFileId(weapon);
  }

  /* TODO: Fix current tabs */
  public isCurrentTab(tab: string): boolean {
    return this.currentTab === tab;
  }

  public toggleHeader(header: string) : void {
    if (this.headers.indexOf(header) !== -1) {
      this.headers.splice(this.headers.indexOf(header), 1)
      // delete this.headers[this.headers.indexOf(header)];
    } else {
      const index = HEADER_ORDER.indexOf(header);
      this.headers.push(header);
      this.headers.sort((a, b) => {
        return HEADER_ORDER.indexOf(a) - HEADER_ORDER.indexOf(b);
      });
    }
  }
}
