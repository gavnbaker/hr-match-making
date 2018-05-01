export interface Skill {
  Name: string;
  YearsExperience?: number;
}

export interface UserSkills {
  ID?: number;
  SkillID?: number;
  UserID?: number;
  Skill: Skill;
}

export interface JobPostSkills {
  JobPostSkillsID?: number;
  JobPostID?: number;
  SkillID?: number;
  Skill: Skill;
}
