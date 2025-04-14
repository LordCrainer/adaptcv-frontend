import type { IUserProfile } from '..'

const useUserProfile = () => {
  const userProfile = ref<IUserProfile>()

  const setUserProfile = (data: IUserProfile) => {
    userProfile.value = data
  }

  const getUserProfile = () => {
    return userProfile.value
  }

  const clearUserProfile = () => {
    userProfile.value = undefined
  }

  return {
    setUserProfile,
    getUserProfile,
    clearUserProfile,
    userProfile
  }
}
