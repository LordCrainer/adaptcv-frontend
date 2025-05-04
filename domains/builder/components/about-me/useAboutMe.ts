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
  const aboutMe = ref<IAboutMe>(DEFAULT_ABOUT_ME)

  const setAboutMe = (data: IAboutMe) => {
    aboutMe.value = data
  }

  const getAboutMe = () => {
    return aboutMe.value
  }

  const clearAboutMe = () => {
    aboutMe.value = DEFAULT_ABOUT_ME
  }

  const setAboutMeLogo = (logo: IFileImage) => {
    if (logo.src) {
      aboutMe.value.logo = logo
    }
  }

  return {
    setAboutMe,
    getAboutMe,
    clearAboutMe,
    aboutMe,
    setAboutMeLogo
  }
}
