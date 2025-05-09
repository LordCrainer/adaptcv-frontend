export const useObject = () => {
  function hasChanges<T extends any>(newData: T, oldData: T) {
    return JSON.stringify(newData) !== JSON.stringify(oldData)
  }

  return {
    hasChanges
  }
}
