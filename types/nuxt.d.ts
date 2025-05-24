import type { AxiosInstance } from 'axios'
import type { useAuth } from '~/domains/auth/composables/useAuth'

declare module '#app' {
  interface NuxtApp {
    $api: AxiosInstance
    $useAuth: ReturnType<typeof useAuth>
  }
}