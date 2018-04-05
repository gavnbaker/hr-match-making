import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../../services/profile.service';
import { User } from '../../../../models/user';
import { Address } from '../../../../data/models/address';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User;
  public profileImg = '../../../../../assets/avatar_hat.jpeg';

  constructor(private profileService: ProfileService, private location: Location) { }

  ngOnInit() {
    this.getUserProfile();
  }

  public getUserProfile(userId: number = 1002): void {
    this.profileService.getUserProfile(userId)
      .then(response => {
        this.user = response;
        console.log('User: ', this.user);
      });
  }

  public convertAddressToString(address: Address): string {
    return `${address.City}, ${address.State}`;
  }

  public goBack(): void {
    this.location.back();
  }




}
