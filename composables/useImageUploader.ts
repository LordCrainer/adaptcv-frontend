import { ref } from 'vue'
import type { IFileImage } from '~/types/global'

export function useImageUploader() {
  const selectedImageFile = ref<IFileImage>({
    name: '',
    type: '',
    size: 0,
    src: ''
  })
  const fileInput = ref<HTMLInputElement | null>(null)

  const removeImage = () => {
    selectedImageFile.value = { name: '', type: '', size: 0, src: '' }
    if (fileInput.value) fileInput.value.value = ''
  }

  const setImageFile = (file: IFileImage) => {
    selectedImageFile.value = {
      name: file.name,
      type: file.type,
      size: file.size,
      src: file.src
    }
  }

  const saveChanges = () => {
    const file = fileInput.value?.files?.[0]
    if (file) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => {
          selectedImageFile.value = {
            name: file.name,
            type: file.type,
            size: file.size,
            src: reader.result?.toString() || ''
          }
          resolve({ ...selectedImageFile.value })
        }
        reader.readAsDataURL(file)
      })
    }
    return { ...selectedImageFile.value }
  }

  const previewImage = (source?: File | Event) => {
    if (!source) return
    const file =
      source instanceof File
        ? source
        : ((source?.target as HTMLInputElement)?.files?.[0] as File)
    selectedImageFile.value!.src = URL.createObjectURL(file)
  }

  return {
    setImageFile,
    selectedImageFile,
    fileInput,
    removeImage,
    saveChanges,
    previewImage
  }
}
