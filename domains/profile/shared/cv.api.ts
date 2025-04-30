
export const useCVApi = () => {
  const getCV = async () => {
    const cvData = localStorage.getItem('cvData')
    if (cvData) {
      return JSON.parse(cvData)
    }
    return null
  }

  const saveCV = async (cv: any) => {
    localStorage.setItem('cvData', JSON.stringify(cv))
  }

  return {
    getCV,
    saveCV
  }
}
