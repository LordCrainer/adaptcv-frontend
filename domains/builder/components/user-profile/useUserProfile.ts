import { ref } from 'vue'
import type { IFileImage } from '~/types/global'
import { useCVStore } from '~/domains/builder/store/cv.store'
import type { IUserProfile } from '@lordcrainer/adaptcv-shared-types'

const useUserProfile = () => {
  const { updateSection, curriculumVitae } = useCVStore()

  const DEFAULT_USER_PROFILE = {
    image: {
      src: ''
    },
    name: '',
    email: '',
    phone: '',
    address: ''
  }

  const userProfile = computed({
    get: () => curriculumVitae.userProfile || { ...DEFAULT_USER_PROFILE },
    set: (value) => {
      updateSection('userProfile', value)
    }
  })

  onMounted(() => {
    if (curriculumVitae.userProfile) {
      setUserProfile(curriculumVitae.userProfile)
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
    setUserProfileImage
  }
}

export default useUserProfile
