export interface ISkill {
  id: string
  skill: string
  job: string
  yearsOfExperience: yearsOfExperience | undefined
}

export interface ISkillForm extends Omit<ISkill, 'skill'> {
  selectedSkills?: string[]
}

type LanguageProficiency = 'beginner' | 'intermediate' | 'advanced' | 'native'
export interface ILanguageItem {
  name: string | undefined
  proficiency: LanguageProficiency
}

export interface IEducationItem {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
}
