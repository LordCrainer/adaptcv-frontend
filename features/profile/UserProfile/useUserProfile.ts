import { ref } from 'vue'
import type { IUserProfile } from '..'
import type { IFileImage } from '~/types/global'

const useUserProfile = () => {
  const userProfile = ref<IUserProfile>({
    image: {
      src: ''
    },
    name: '',
    profession: '',
    areaProfession: undefined,
    email: '',
    phone: '',
    address: ''
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
