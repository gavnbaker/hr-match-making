export interface Skill {
  readonly Name: string;
  readonly YearsExperience?: number;
}

export interface UserSkills {
  readonly ID?: number;
  readonly SkillID?: number;
  readonly UserID?: number;
  readonly Skill: Skill;
}

export interface JobPostSkills {
  readonly JobPostSkillsID?: number;
  readonly JobPostID?: number;
  readonly SkillID?: number;
  readonly Skill: Skill;
}
