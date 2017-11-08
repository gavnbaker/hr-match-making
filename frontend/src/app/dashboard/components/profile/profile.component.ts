import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user = {
    name: 'John Doe',
    title: 'Web Developer',
    address: '152 Trance Ave, New York, USA',
    email: 'email@live.com',
    phone: '457-897-8597',
    skills: ['C++', 'Java', 'Visual Studio Code', 'Angular', '.Net'],
    workExperience: [
      {
        title: 'Backend Developer',
        company: 'Facebook.com',
        startDate: 'July 2015',
        endDate: 'May 2016',
        description: 'rit sunt hic. Nulla tempora soluta ea et odio, unde doloremque repellendus iure, iste.'
      },
      {
        title: 'Full Stack Developer',
        company: 'google.com',
        startDate: 'March 2015',
        endDate: 'August 2016',
        description: 'rit sunt hic. Nulla tempora soluta ea et odio, unde doloremque repellendus iure, iste.'
      },
      {
        title: 'Full Stack Developer',
        company: 'google.com',
        startDate: 'March 2015',
        endDate: 'August 2016',
        description: 'rit sunt hic. Nulla tempora soluta ea et odio, unde doloremque repellendus iure, iste.'
      },
      {
        title: 'Full Stack Developer',
        company: 'google.com',
        startDate: 'March 2015',
        endDate: 'August 2016',
        description: 'rit sunt hic. Nulla tempora soluta ea et odio, unde doloremque repellendus iure, iste.'
      }
    ],
    education: {
      name: 'Test College',
      startDate: 'July 2012',
      endDate: 'May 2015',
      degree: 'Bachelors of Science'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
