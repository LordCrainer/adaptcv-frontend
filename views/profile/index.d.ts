export interface ISkill {
  id: string
  skill: string
  job: string
  year_experiences: year_experiences | undefined
}

export interface ISkillForm extends Omit<ISkill, 'skill'> {
  selectedSkills?: string[]
}
