import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { ProfileService } from '../../services/profile.service';
import { Address } from '../../models/address';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() userId: number;

  public user: User;
  public profileImg = '../../../../../assets/avatar_hat.jpeg';

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getUserProfile(this.userId);
  }

  public getUserProfile(userId: number): void {
    this.profileService.getUserProfile(userId)
      .then(response => {
        this.user = response;
        console.log('User: ', this.user);
      });
  }

  public convertAddressToString(address: Address): string {
    return `${address.City}, ${address.State}`;
  }

}
