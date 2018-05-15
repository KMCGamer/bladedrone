import { Component, OnInit } from '@angular/core';
import { WeaponsService } from '../../services/weapons.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as _ from "lodash";
import { Stat } from '../../models/stat.model';
import { Weapon } from '../../models/weapon.model';

@Component({
  selector: 'app-weapon-page',
  templateUrl: './weapon-page.component.html',
  styleUrls: ['./weapon-page.component.scss']
})
export class WeaponPageComponent implements OnInit {
  weapon: Weapon;
  stats: Stat[];
  skins: string[];
  currentSkinName: string;
  currentSkinId: string;

  constructor(
    private weaponsService: WeaponsService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    const nameParam = this.route.snapshot.paramMap.get('name');
    this.weaponsService.getWeapon(nameParam).subscribe((weapon)=>{
      this.weapon = weapon;

      const pickedStats = _.pick(this.weapon, ['damage', 'accuracy', 'range', 'recoil', 'fireRate']);
      this.stats = _.map(pickedStats, (value, key) => {
        return {name: key, value};
      });
    });
    this.currentSkinName = "Base";
  }

  /* Get the id for the base skin from the weapon service */
  public getBaseSkinFileId(weapon: Weapon): string {
    return this.weaponsService.getBaseSkinFileId(weapon);
  }

  /* Set the current skin of the button. TODO: and picture */
  public setCurrentSkin(skin: string): void {
    this.currentSkinName = skin;
  }

  /* Go back to the last page */
  public goBack() :void {
    this.location.back();
  }
}
