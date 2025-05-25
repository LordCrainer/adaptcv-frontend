import type { IFileImage } from '~/types/global'
import { useBuilderStore } from '~/modules/builder/store/builder.store'
import type { IUserProfile } from '@lordcrainer/adaptcv-shared-types'

const DEFAULT_USER_PROFILE: IUserProfile = {
  name: '',
  email: '',
  phone: 0,
  phoneCode: 0,
  address: '',
  image: {
    src: ''
  }
}

export const useUserProfile = () => {
  const builderStore = useBuilderStore()

  const userProfile = computed({
    get: () =>
      builderStore.builderState.userProfile || { ...DEFAULT_USER_PROFILE },
    set: (value) => {
      builderStore.updateSection('userProfile', value)
    }
  })

  const setUserProfile = (data: IUserProfile) => {
    userProfile.value = data
  }

  const getUserProfile = () => {
    return userProfile.value
  }

  const clearUserProfile = () => {
    userProfile.value = { ...DEFAULT_USER_PROFILE }
  }

  const setUserProfileImage = (image: IFileImage) => {
    if (image.src) {
      userProfile.value.image = image
    }
  }

  return {
    setUserProfile,
    getUserProfile,
    clearUserProfile,
    userProfile,
    setUserProfileImage,
    DEFAULT_USER_PROFILE
  }
}
