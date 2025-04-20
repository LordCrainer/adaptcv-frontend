import type { BaseEntity, IFileImage } from '~/types/global'
import type { AreasProfession } from './constants'

export type yearsOfExperience =
  | 'less1year'
  | '1to2years'
  | '2to3years'
  | '5to10years'
  | '10plusyears'

export type Degree =
  | 'secondary'
  | 'highSchool'
  | 'technical'
  | 'undergraduate'
  | 'graduate'
  | 'masters'
  | 'doctorate'

export interface ISkill {
  skill: string
  yearsOfExperience: yearsOfExperience | undefined
}

type Proficiency = 'beginner' | 'intermediate' | 'advanced' | 'native'
export interface ILanguageItem {
  name: string | undefined
  proficiency: Proficiency
}

export interface IEducationItem {
  id: string
  institution: string
  degree: Degree | undefined
  fieldOfStudy: string
  startDate: string
  endDate: string
  city?: string
  country?: string
}

export interface IWorkExperience {
  id: string
  jobTitle: string
  company: string
  startDate: string
  endDate: string
  description: DEContentData
  city?: string
  country?: string
}

export interface SocialMedia {
  linkedin?: string
  github?: string
  website?: string
}
export interface IUserProfile {
  name: string
  profession: string
  areaProfession: AreasProfession | undefined
  email: string
  phone: string
  address: string
  country?: string
  city?: string
  summary?: string
  image?: IFileImage
  socialMedia?: SocialMedia
}

export interface ICV extends BaseEntity {
  userProfile: IUserProfile
  skills: ISkill[]
  languages: ILanguageItem[]
  education: IEducationItem[]
  workExperience: IWorkExperience[]
  status: 'draft' | 'published'
}
