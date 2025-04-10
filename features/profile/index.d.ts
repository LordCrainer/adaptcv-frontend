export interface ISkill {
  id: string
  skill: string
  job: string
  year_experiences: year_experiences | undefined
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
  school: string
  degree: string
  field_of_study: string
  start_date: string
  end_date: string
}
