<template>
  <v-card>
    <template v-slot:title>
      {{ $t('profile.personalInfo.uploadPhoto') }}
    </template>
    <v-card-text class="d-flex flex-column align-center justify-center">
      <v-card flat variant="outlined" link class="profile-photo rounded-circle">
        <input
          type="file"
          accept="image/*"
          @change="previewImage"
          class="d-none"
          aria-label="File Input"
          ref="fileInput" />
        <v-img
          v-if="selectedImageFile?.src"
          :src="selectedImageFile.src"
          min-width="100%"
          class="profile-photo d-flex"
          aspect-ratio="1/1"
          alt="Profile Photo"
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
          <span>{{ $t('actions.uploadImage') }}</span>
        </v-sheet>
      </v-card>
    </v-card-text>

    <v-card-actions class="d-flex justify-end">
      <v-btn variant="outlined" rounded color="primary" @click="$emit('close')">
        {{ $t('actions.cancel') }}
      </v-btn>
      <v-btn
        :loading="state.loading"
        variant="flat"
        rounded
        color="primary"
        @click="handleSaveChanges">
        {{ $t('actions.saveImage') }}
        <template v-slot:loader v-if="state.loading">
          <v-progress-circular
            indeterminate
            color="white"
            size="20"
            width="2"></v-progress-circular>
        </template>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import type { IFileImage } from '~/types/global'
import { useImageUploader } from '~/composables/useImageUploader'

const {
  selectedImageFile,
  fileInput,
  removeImage,
  saveChanges,
  previewImage,
  setImageFile
} = useImageUploader()

const props = defineProps({
  image: {
    type: Object as () => IFileImage,
    required: true
  }
})

const state = reactive({
  loading: false
})

const emit = defineEmits(['close', 'update:image'])

watch(
  () => props.image,
  (newValue) => {
    if (newValue) {
      setImageFile(newValue)
    }
  },
  {
    deep: true,
    immediate: true
  }
)

const handleSaveChanges = async () => {
  state.loading = true
  try {
    const selected = await saveChanges()
    emit('update:image', selected)
    emit('close')
  } catch (error) {
    console.error('Error saving image:', error)
  } finally {
    state.loading = false
  }
}
</script>
