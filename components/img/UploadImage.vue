<template>
  <v-card>
    <v-card-text class="d-flex flex-column align-center justify-center">
      <v-card flat variant="outlined" class="profile-photo rounded-circle">
        <input
          type="file"
          accept="image/*"
          @change="previewImage"
          class="d-none"
          ref="fileInput" />
        <v-img
          v-if="selectedImageFile.src"
          :src="selectedImageFile.src"
          min-width="100%"
          class="profile-photo d-flex"
          aspect-ratio="1/1"
          cover>
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-card
                v-ripple
                v-bind="props"
                class="profile-photo rounded-circle bg-transparent d-flex ga-4 align-center justify-center"
                :class="{
                  'bg-blue-darken-3': isHovering,
                  'opacity-100': isHovering
                }">
                <v-btn
                  flat
                  variant="tonal"
                  icon="mdi-cloud-upload-outline"
                  :color="isHovering ? 'white' : 'transparent'"
                  @click="fileInput?.click()"></v-btn>
                <v-btn
                  flat
                  variant="tonal"
                  icon="mdi-close"
                  :color="isHovering ? 'white' : 'transparent'"
                  @click="removeImage"></v-btn>
              </v-card>
            </template>
          </v-hover>
        </v-img>
        <v-sheet
          v-else
          class="profile-photo d-flex align-center justify-center cursor-pointer flex-column"
          @click="fileInput?.click()">
          <v-icon size="75" color="grey lighten-2">
            mdi-cloud-upload-outline
          </v-icon>
          <span>{{ $t('profile.personalInfo.uploadPhoto') }}</span>
        </v-sheet>
      </v-card>
    </v-card-text>

    <v-card-actions class="d-flex justify-end">
      <v-btn variant="outlined" rounded color="primary" @click="$emit('close')">
        {{ $t('actions.cancel') }}
      </v-btn>
      <v-btn variant="flat" rounded color="primary" @click="saveChanges">
        {{ $t('actions.save') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { IFileImage } from '~/types/global'

const props = defineProps({
  image: {
    type: Object as () => IFileImage,
    default: () => ({})
  }
})

const selectedImageFile = ref<IFileImage>({ ...props.image })

const emit = defineEmits(['close', 'update:image'])

watch(
  () => props.image,
  (newValue) => {
    console.log('watch', newValue)

    selectedImageFile.value = { ...newValue }
  },
  {
    deep: true
  }
)

const fileInput = ref<HTMLInputElement | null>(null)

const removeImage = () => {
  selectedImageFile.value = {
    name: '',
    type: '',
    size: 0,
    src: ''
  }
  fileInput.value!.value = ''
}

const saveChanges = () => {
  const file = fileInput.value?.files?.[0]
  console.log('Saving changes...', selectedImageFile.value), file
  if (fileInput.value && file) {
    const reader = new FileReader()
    reader.onload = () => {
      selectedImageFile.value = {
        name: file.name,
        type: file.type,
        size: file.size,
        src: reader.result?.toString() || ''
      }

      emit('update:image', { ...selectedImageFile.value })
      emit('close')
    }
    reader.readAsDataURL(file)
  } else {
    emit('update:image', { ...selectedImageFile.value })
    emit('close')
  }
}

const previewImage = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]

  if (file) {
    selectedImageFile.value.src = URL.createObjectURL(file)
  }
}
</script>
