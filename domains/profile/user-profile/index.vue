<template>
  <v-form>
    <v-row>
      <v-col cols="12" md="4" class="d-flex flex-1-0 justify-center">
        <v-card
          flat
          variant="outlined"
          class="profile-photo rounded-circle cursor-pointer"
          @click="open">
          <v-img v-if="fileImage?.src" :src="fileImage.src"></v-img>
          <v-sheet
            v-else
            class="profile-photo d-flex align-center justify-center flex-column">
            <v-icon size="100" color="grey lighten-2">
              mdi-account-arrow-up-outline
            </v-icon>
            <span class="text-caption text-sm-subtitle-1">
              {{ $t('profile.personalInfo.uploadPhoto') }}
            </span>
          </v-sheet>
        </v-card>
      </v-col>
      <UserInformationForm v-model="userProfile" />
    </v-row>
    <v-dialog
      v-model="state.openDialog"
      max-width="350px"
      transition="dialog-transition">
      <UserPreviewPhoto v-model:image="fileImage" @close="close" />
    </v-dialog>
  </v-form>
</template>

<script setup lang="ts">
import type { IFileImage } from '~/types/global'
import UserPreviewPhoto from './UserPreviewPhoto.vue'
import UserInformationForm from './UserProfileForm.vue'
import useUserProfile from '~/domains/profile/user-profile/useUserProfile'

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
