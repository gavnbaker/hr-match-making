import { JobPost } from "../jobpost";

export interface BookmarkDto {
  BookmarkID: number;
  UserID: number;
  JobPost: JobPost;
}
