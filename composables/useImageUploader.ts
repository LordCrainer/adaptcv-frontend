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
      const reader = new FileReader()
      return new Promise((resolve) => {
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
    } else {
      return Promise.resolve({ ...selectedImageFile.value })
    }
  }

  const previewImage = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
      selectedImageFile.value!.src = URL.createObjectURL(file)
    }
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
