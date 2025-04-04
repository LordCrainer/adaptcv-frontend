const useRules = () => {
  const rules = {
    required: (message: string) => (value: any) =>
      !!value || `${message} is required`,
    minLength: (min: number, message: string) => (value: string) =>
      value.length >= min || message,
    maxLength: (max: number, message: string) => (value: string) =>
      value.length <= max || message,
    email: (message: string) => (value: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || message
  }

  return { rules }
}
export default useRules
