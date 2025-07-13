import { computed } from 'vue'
import type { IFileImage } from '~/types/global'
import type { IUserProfile } from '@lordcrainer/adaptcv-shared-types'
import { useBuilder } from '~/modules/builder/composables/useBuilder'

const DEFAULT_USER_PROFILE: IUserProfile = {
  name: '',
  email: '',
  phone: 0,
  phoneCode: 0,
  address: '',
  image: { src: '' }
}

export function useUserProfile() {
  const { builderState, updateSection } = useBuilder()
  const userProfile = computed(
    () => builderState.value.userProfile || { ...DEFAULT_USER_PROFILE }
  )

  function setUserProfile(data: IUserProfile) {
    updateSection('userProfile', data)
  }

  function clearUserProfile() {
    updateSection('userProfile', { ...DEFAULT_USER_PROFILE })
  }

  function getUserProfile() {
    return userProfile.value
  }

  function setUserProfileImage(image: IFileImage) {
    if (image.src) {
      updateSection('userProfile', { ...userProfile.value, image })
    }
  }

  return {
    userProfile,
    setUserProfile,
    clearUserProfile,
    getUserProfile,
    setUserProfileImage,
    DEFAULT_USER_PROFILE
  }
}
