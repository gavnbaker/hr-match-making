import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  public jobs: String[] = ['Java Developer',
    'Database Admin', '.Net Developer', 'Full Stack Developer', 'C++ Developer'];

  public jobRecommendations: any[];
  constructor(private profile: ProfileService) { }

  ngOnInit() {
    this.profile.getUserJobRecommendations('name')
      .then(data => {
        this.jobRecommendations = data;
      });
  }

}
