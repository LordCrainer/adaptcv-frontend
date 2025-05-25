import type { IAboutMe } from '@lordcrainer/adaptcv-shared-types'
import { useBuilderStore } from '~/modules/builder/store/builder.store'
import type { IFileImage } from '~/types/global'

const DEFAULT_ABOUT_ME: IAboutMe = {
  logo: {
    src: ''
  },
  summary: '',
  slogan: ''
}

export const useAboutMe = () => {
  const builderStore = useBuilderStore()

  const aboutMe = computed({
    get: () => builderStore.builderState.aboutMe || { ...DEFAULT_ABOUT_ME },
    set: (value) => {
      builderStore.updateSection('aboutMe', value)
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
