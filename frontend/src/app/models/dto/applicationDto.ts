import { JobPost } from '../jobpost';
import { User } from '../user';

export interface ApplicationDto {
  JobApplicationID: number;
  UserID: number;
  JobPost: JobPost;
  Status: any;
  User?: User;
}
