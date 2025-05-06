<template>
  <v-card
    flat
    border
    class="d-flex justify-center pa-4 rounded-lg"
    style="width: 100%">
    <div
      class="rounded-circle cursor-pointer pa-4"
      style="border: 1px solid grey"
      @click="open">
      <v-img
        class="rounded-circle"
        v-if="fileImage?.src"
        :src="fileImage.src"></v-img>
      <v-sheet
        v-else
        class="profile-photo rounded-circle d-flex align-center justify-center flex-column">
        <v-icon size="100" color="grey lighten-2">
          mdi-account-arrow-up-outline
        </v-icon>
        <span class="text-caption text-sm-subtitle-1">
          {{ $t('profile.personalInfo.uploadPhoto') }}
        </span>
      </v-sheet>
    </div>
  </v-card>
  <v-dialog
    v-model="state.openDialog"
    max-width="350px"
    transition="dialog-transition">
    <UserPreviewPhotoForm v-model:image="fileImage" @close="close" />
  </v-dialog>
</template>

<script lang="ts" setup>
import type { IFileImage } from '~/types/global'
import useUserProfile from './useUserProfile'
import UserPreviewPhotoForm from './UserPreviewPhotoForm.vue'

const { setUserProfileImage, userProfile } = useUserProfile()

const fileImage = computed({
  get() {
    return userProfile.value.image as IFileImage
  },
  set(img: IFileImage) {
    setUserProfileImage(img)
  }
})

const state = reactive({
  openDialog: false,
  isEditing: false
})

function close() {
  state.openDialog = false
}

function open() {
  state.openDialog = true
}
</script>
