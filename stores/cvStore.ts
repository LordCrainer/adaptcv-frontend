import { defineStore } from 'pinia'
import type {
  ICV,
  IEducationItem,
  ILanguageItem,
  ISkill,
  IUserProfile,
  IWorkExperience
} from '~/features/profile'

export const useCVStore = defineStore('cv', {
  state: () => ({
    userProfile: {} as IUserProfile,
    skills: [] as ISkill[],
    languages: [] as ILanguageItem[],
    education: [] as IEducationItem[],
    workExperience: [] as IWorkExperience[],
    status: 'draft' as 'draft' | 'published'
  }),
  actions: {
    updateUserProfile(data: IUserProfile) {
      this.userProfile = data
    },
    addSkill(skill: ISkill) {
      this.skills.push(skill)
    },
    removeSkill(skill: string) {
      this.skills = this.skills.filter((s) => s.skill !== skill)
    },
    addLanguage(language: ILanguageItem) {
      this.languages.push(language)
    },
    addEducation(edu: IEducationItem) {
      this.education.push(edu)
    },
    addWorkExperience(exp: IWorkExperience) {
      this.workExperience.push(exp)
    },
    updateStatus(newStatus: 'draft' | 'published') {
      this.status = newStatus
    }
  }
})
