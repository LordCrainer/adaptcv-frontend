import { ref } from 'vue'
import type { IFileImage } from '~/types/global'
import { useBuilderStore } from '~/domains/builder/store/builder.store'
import type { IUserProfile } from '@lordcrainer/adaptcv-shared-types'

const DEFAULT_USER_PROFILE: IUserProfile = {
  name: '',
  email: '',
  phone: '',
  address: ''
}

export const useUserProfile = () => {
  const { updateSection, builderState } = useBuilderStore()

  const userProfile = computed({
    get: () => builderState.userProfile || { ...DEFAULT_USER_PROFILE },
    set: (value) => {
      updateSection('userProfile', value)
    }
  })

  onMounted(() => {
    if (builderState.userProfile) {
      setUserProfile(builderState.userProfile)
    }
  })

  const setUserProfile = (data: IUserProfile) => {
    userProfile.value = data
  }

  const getUserProfile = () => {
    return userProfile.value
  }

  const clearUserProfile = () => {
    userProfile.value = {
      image: {
        src: ''
      },
      name: '',
      profession: '',
      areaProfession: undefined,
      email: '',
      phone: '',
      address: ''
    }
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
