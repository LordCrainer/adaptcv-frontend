import { defineStore } from 'pinia'
import type {
  ICV,
  IEducationItem,
  ILanguageItem,
  ISkill,
  IUserProfile,
  IWorkExperience
} from '~/features/profile'

export const useCVStore = defineStore('cv', () => {
  const userProfile = ref<IUserProfile>()
  const skills = ref<ISkill[]>([])
  const languages = ref<ILanguageItem[]>([])
  const education = ref<IEducationItem[]>([])
  const workExperience = ref<IWorkExperience[]>([])

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
