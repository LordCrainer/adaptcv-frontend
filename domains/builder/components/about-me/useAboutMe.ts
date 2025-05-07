import { useCVStore } from '~/domains/builder/store/cv.store'
import { ref } from 'vue'
import type { IAboutMe } from '~/domains/builder/shared'
import type { IFileImage } from '~/types/global'

const DEFAULT_ABOUT_ME: IAboutMe = {
  logo: {
    src: ''
  },
  summary: '',
  slogan: ''
}

export const useAboutMe = () => {
  const { updateSection, curriculumVitae } = useCVStore()

  const aboutMe = computed({
    get: () => curriculumVitae.aboutMe || { ...DEFAULT_ABOUT_ME },
    set: (value) => {
      updateSection('aboutMe', value)
    }
  })

  const setAboutMe = (data: IAboutMe) => {
    aboutMe.value = data
  }

  const getAboutMe = () => {
    return aboutMe.value
  }

  const setAboutMeLogo = (logo: IFileImage) => {
    if (logo.src) {
      aboutMe.value.logo = logo
    }
  }

  return {
    setAboutMe,
    getAboutMe,
    aboutMe,
    setAboutMeLogo
  }
}
