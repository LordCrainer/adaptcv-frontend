import type { RequestUserData } from '@/domains/auth/interfaces/auth.interface'

enum AuthStorageType {
  LOCAL_STORAGE = 'localStorage',
  COOKIE = 'cookie',
  SESSION = 'session'
}

type StaticCacheType = 'userData' | 'authToken'
type CacheType = StaticCacheType
interface BaseAuthStorage {
  set(key: CacheType, data: string): void
  get(key: CacheType): string
  remove(key: CacheType): void
}

class LocalStorage implements BaseAuthStorage {
  set(key: CacheType, data: string) {
    localStorage.set(key, data)
  }

  get(key: CacheType): string {
    return localStorage.getItem(key) || ''
  }

  remove(key: CacheType): void {
    localStorage.remove(key)
  }
}

const AuthStorageStrategy = (typeStore: AuthStorageType): BaseAuthStorage => {
  if (typeStore === AuthStorageType.LOCAL_STORAGE) {
    return new LocalStorage()
  } else if (typeStore === AuthStorageType.COOKIE) {
    return new LocalStorage()
  } else if (typeStore === AuthStorageType.SESSION) {
    return new LocalStorage()
  }
  throw new Error('Invalid storage type')
}

export const useAuthStore = () => {
  const authStorageStrategy = AuthStorageStrategy(AuthStorageType.LOCAL_STORAGE)

  const getToken = () => {
    return authStorageStrategy.get('authToken')
  }

  const getUserData = (): RequestUserData | null => {
    const userDataString = authStorageStrategy.get('userData')
    return userDataString ? JSON.parse(userDataString) : null
  }

  const setUserData = (data: RequestUserData) => {
    authStorageStrategy.set('userData', JSON.stringify(data))
  }

  const setToken = (newToken: string) => {
    authStorageStrategy.set('authToken', newToken)
  }

  const removeToken = () => {
    authStorageStrategy.remove('authToken')
  }

  const removeUserData = () => {
    authStorageStrategy.remove('userData')
  }

  const clearAllAuthData = () => {
    removeUserData()
    removeToken()
  }

  return {
    getToken,
    getUserData,
    setUserData,
    setToken,
    removeToken,
    removeUserData,
    clearAllAuthData
  }
}
