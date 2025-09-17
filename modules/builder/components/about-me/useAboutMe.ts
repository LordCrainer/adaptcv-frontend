import type { IAboutMe } from '@lordcrainer/adaptcv-shared-types'
import { useBuilder } from '~/modules/builder/composables/useBuilder'
import { computed } from 'vue'
import type { IFileImage } from '~/types/global'

const DEFAULT_ABOUT_ME: IAboutMe = {
  logo: {
    src: ''
  },
  summary: '',
  slogan: ''
}

export const useAboutMe = () => {
  const { builderState, updateSection } = useBuilder()

  const aboutMe = computed({
    get: () => builderState.value.aboutMe || { ...DEFAULT_ABOUT_ME },
    set: (value) => updateSection('aboutMe', value)
  })

  const setAboutMe = (data: IAboutMe) => { aboutMe.value = data }

  const getAboutMe = () => aboutMe.value

  const setAboutMeLogo = (logo: IFileImage) => {
    if (logo.src) aboutMe.value.logo = logo
  }

  return {
    setAboutMe,
    getAboutMe,
    aboutMe,
    setAboutMeLogo
  }
}
