import type { IFileImage } from '~/types/global'
import type { AreasProfession } from './constants/profesionArea'

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

export interface IWorkExperience<T = any> {
  id: string
  jobTitle: string
  company: string
  startDate: string
  endDate: string
  description: T
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
  image?: IFileImage
  socialMedia?: SocialMedia
}

export interface IAboutMe {
  summary: string
  logo: IFileImage
  slogan: string
}

export interface ICV extends BaseEntity {
  _id?: string
  userId: string
  name: string
  userProfile: IUserProfile
  skills: ISkill[]
  languages: ILanguageItem[]
  education: IEducationItem[]
  workExperience: IWorkExperience[]
  status: 'draft' | 'published'
  aboutMe: IAboutMe
}
