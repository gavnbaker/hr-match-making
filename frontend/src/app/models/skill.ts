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
