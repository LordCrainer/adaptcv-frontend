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

type Sections = Pick<ICV, 'userProfile' | 'skills' | 'languages' | 'education' | 'workExperience' | 'aboutMe'>

const CvSections = (curriculumVitae: ICV): Record<keyof Sections, () => ICV[keyof Sections]> => ({
  userProfile: () => curriculumVitae.userProfile,
  skills: () => curriculumVitae.skills,
  languages: () => curriculumVitae.languages,
  education: () => curriculumVitae.education,
  workExperience: () => curriculumVitae.workExperience,
  aboutMe: () => curriculumVitae.aboutMe,

})

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

  function saveSection(section: keyof Sections, data: ICV[keyof ICV]) {
    if (!data) {
      console.error(`Error: ${section} data is undefined or null`)
      return
    }
    if (curriculumVitae.value) {
      CvSections(curriculumVitae.value)[section]
    } else {
      console.error('Error: curriculumVitae is undefined')
    }
  }

  function saveAll(cvData: ICV) {
    try {
      localStorage.setItem('cvData', JSON.stringify(cvData))
    } catch (error) {
      console.error('Error saving CV data to localStorage:', error)
    }
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
