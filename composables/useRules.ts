export const useRules = () => {
  function required(message: string = 'This field is required') {
    return (value: any) => !!value || message
  }

  function minLength(
    min: number = 8,
    message: string = 'Minimum length is {min}'
  ) {
    return (value: string) =>
      value.length >= min || message.replace('{min}', min.toString())
  }

  function maxLength(
    max: number = 20,
    message: string = 'Maximum length is {max}'
  ) {
    return (value: string) =>
      value.length <= max || message.replace('{max}', max.toString())
  }

  function email(message: string = 'Invalid email address') {
    return (value: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || message
  }

  function password(
    message: string = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  ) {
    return (value: string) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        value
      ) || message
  }

  return { required, minLength, maxLength, email, password }
}
