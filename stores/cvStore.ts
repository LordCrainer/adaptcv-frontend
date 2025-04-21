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
  ])

  const status = ref<ICV['status']>('draft')

  function updateUserProfile(data: IUserProfile) {
    userProfile.value = data
  }

  function addSkill(skill: ISkill) {
    skills.value.push(skill)
  }

  function removeSkill(skill: string) {
    skills.value = skills.value.filter((s) => s.skill !== skill)
  }

  function addLanguage(language: ILanguageItem) {
    languages.value.push(language)
  }

  function addEducation(edu: IEducationItem) {
    education.value.push(edu)
  }

  function addWorkExperience(exp: IWorkExperience) {
    workExperience.value.push(exp)
  }

  function updateStatus(newStatus: 'draft' | 'published') {
    status.value = newStatus
  }

  return {
    userProfile,
    skills,
    languages,
    education,
    workExperience,
    status,
    updateUserProfile,
    addSkill,
    removeSkill,
    addLanguage,
    addEducation,
    addWorkExperience,
    updateStatus
  }
})
