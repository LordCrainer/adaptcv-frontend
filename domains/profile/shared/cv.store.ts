import { defineStore } from 'pinia'
import type {
  IAboutMe,
  ICV,
  IEducationItem,
  ILanguageItem,
  ISkill,
  IUserProfile,
  IWorkExperience
} from '~/domains/profile/shared'

export const useCVStore = defineStore('cv', () => {
  const curriculumVitae = ref<ICV>()
  const userProfile = ref<IUserProfile>()
  const skills = ref<ISkill[]>([])
  const languages = ref<ILanguageItem[]>([])
  const education = ref<IEducationItem[]>([])
  const workExperience = ref<IWorkExperience[]>([])
  const aboutMe = ref<IAboutMe>()

  const status = ref<ICV['status']>('draft')

  function updateStatus(newStatus: 'draft' | 'published') {
    status.value = newStatus
  }

  function saveSection(section: keyof ICV, data: ICV[keyof ICV]) {}

  function saveAll() {
    // Save all data to local storage or API
    const cvData = <ICV>{
      userProfile: userProfile.value,
      skills: skills.value,
      languages: languages.value,
      education: education.value,
      workExperience: workExperience.value,
      aboutMe: aboutMe.value,
      status: status.value
    }
    localStorage.setItem('cvData', JSON.stringify(cvData))
  }

  return {
    userProfile,
    skills,
    languages,
    education,
    workExperience,
    status,
    aboutMe,
    updateStatus
  }
})
