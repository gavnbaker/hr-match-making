import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../../services/profile.service';
import { User } from '../../../../models/user';
import { Address } from '../../../../data/models/address';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User;
  public profileImg = '../../../../../favicon.ico';

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getUserProfile();
  }

  public getUserProfile(userId: number = 3): void {
    this.profileService.getUserProfile(userId)
      .then(response => {
        this.user = response;
        console.log('User: ', this.user);
      });
  }

  public convertAddressToString(address: Address): string {
    return `${address.Street}, ${address.City}, ${address.State}, ${address.ZipCode}, ${address.Country}`;
  }


}
