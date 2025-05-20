import { useTheme } from 'vuetify'

interface IThemeMode {
  icon: string
  label: string
}

export const useThemeAcv = () => {
  const { global } = useTheme()

  const themeMode: Record<string, IThemeMode> = {
    light: {
      icon: 'mdi-moon-waxing-crescent',
      label: 'Dark Mode'
    },
    dark: {
      icon: 'mdi-white-balance-sunny',
      label: 'Light Mode'
    }
  }

  const selectedTheme = computed(() => themeMode[global.name.value])

  const toggleTheme = () => {
    global.name.value = global.name.value === 'dark' ? 'light' : 'dark'
  }

  return {
    selectedTheme,
    toggleTheme
  }
}
