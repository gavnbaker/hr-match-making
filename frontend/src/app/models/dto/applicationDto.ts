import { JobPost } from '../jobpost';
import { User } from '../user';
import { Status } from '../../enums/status';

export interface ApplicationDto {
  JobApplicationID: number;
  UserID: number;
  JobPost: JobPost;
  Status: any;
  User?: User;
}

export interface ApplicationUpdateDto {
  ApplicationDto: ApplicationDto;
  newStatus: Status;
}
