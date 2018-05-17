import { Component, OnInit } from '@angular/core';
import { Weapon } from '../../models/weapon.model';
import { Observable } from 'rxjs';
import { WeaponsService } from '../../services/weapons.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-guns',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent implements OnInit {
  weapons: Weapon[];
  tableView: boolean;
  currentTab: string;
  headers = {
    name: true,
    category: true,
    type: true,
    damage: false,
    mobility: false,
    range: false,
    recoil: false,
    fireRate: false,
    accuracy: false
  };

  constructor(
    private weaponsService: WeaponsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentTab = 'all';
    this.tableView = false;
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

  /* Toggle a header you want/dont want to be seen */
  public toggleHeader(header: string): void {
    this.headers[header] = !this.headers[header];
  }

  /* Check if a header is visible */
  public headerIsActive(header: string): boolean {
    return this.headers[header];
  }

  /* Return all possible headers */
  public getAllHeaders(): string[] {
    return Object.keys(this.headers);
  }

  /* Return only the headers that are active */
  public getActiveHeaders(): string[] {
    return Object.keys(this.headers).filter(header => this.headers[header]);
  }
}
