import { JobPost } from '../jobpost';

export interface ApplicationDto {
  JobApplicationId: number;
  UserID: number;
  JobPost: JobPost;
  Status: any;
}
