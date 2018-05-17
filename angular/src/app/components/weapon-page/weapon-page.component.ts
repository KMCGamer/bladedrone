import { Component, OnInit } from '@angular/core';
import { WeaponsService } from '../../services/weapons.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { Stat } from '../../models/stat.model';
import { Weapon } from '../../models/weapon.model';
import { Skin } from '../../models/skin.model';
import { SkinsService } from '../../services/skins.service';

const RARITY_ENUM = Object.freeze({
  Common: 0,
  Uncommon: 1,
  Advanced: 2,
  Special: 3,
  Rare: 4,
  Epic: 5,
  Unknown: 6
});

const RARITY_COLORS = {
  Common: 'black',
  Uncommon: 'green',
  Advanced: 'blue',
  Special: 'orange',
  Rare: 'pink',
  Epic: 'purple',
  Unknown: 'grey'
};

@Component({
  selector: 'app-weapon-page',
  templateUrl: './weapon-page.component.html',
  styleUrls: ['./weapon-page.component.scss']
})
export class WeaponPageComponent implements OnInit {
  weapon: Weapon;
  stats: Stat[];
  skins: Skin[];
  currentSkin: Skin;

  constructor(
    private weaponsService: WeaponsService,
    private skinsService: SkinsService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    const nameParam = this.route.snapshot.paramMap.get('name');
    this.weaponsService.getWeapon(nameParam).subscribe(weapon => {
      this.weapon = weapon;

      this.skinsService
        .getSkinsByWeaponObjectId(this.weapon._id)
        .subscribe(skins => {
          this.skins = skins.sort((a, b) => {
            return RARITY_ENUM[a.rarity] - RARITY_ENUM[b.rarity];
          });
          this.currentSkin = this.skins.find(skin => skin.name === 'Base');
        });

      const pickedStats = _.pick(this.weapon, [
        'damage',
        'accuracy',
        'range',
        'recoil',
        'fireRate'
      ]);
      this.stats = _.map(pickedStats, (value, key) => {
        return { name: key, value };
      });
    });

    // this.currentSkin = "Base";
  }

  /* Gets the category id for the weapon */
  public getCategoryId(): string {
    return this.weapon.category === 'Primary' ? '00' : '01';
  }

  public getRarityColor(skin: Skin): string {
    return RARITY_COLORS[skin.rarity];
  }

  /* Get the id for the base skin from the weapon service */
  public getBaseSkinFileId(weapon: Weapon): string {
    return this.weaponsService.getBaseSkinFileId(weapon);
  }

  /* Set the current skin of the button. TODO: and picture */
  public setCurrentSkin(skin: Skin): void {
    this.currentSkin = skin;
  }

  /* Go back to the last page */
  public goBack(): void {
    this.location.back();
  }
}
