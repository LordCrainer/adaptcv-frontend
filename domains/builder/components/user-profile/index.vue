<template>
  <CardDefault title="profile.personalInfo.title" style="min-width: 350px">
    <v-form>
      <div class="d-flex flex-column ga-4 justify-center align-center">
        <v-card
          flat
          variant="outlined"
          class="rounded-circle cursor-pointer"
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
        <div class="d-flex flex-column ga-4" style="width: 100%">
          <span class="text-body-1 font-weight-bold">
            Information de Contacto
          </span>
          <v-divider></v-divider>
          <UserInformationForm v-model="userProfile" />
        </div>

        <div class="d-flex flex-column ga-4" style="width: 100%">
          <span class="text-body-1 font-weight-bold">Habilidades</span>
          <v-divider></v-divider>
          <Skills />
        </div>

        <div class="d-flex flex-column ga-4" style="width: 100%">
          <span class="text-body-1 font-weight-bold">Habilidades</span>
          <v-divider></v-divider>
          <Languages />
        </div>
      </div>
      <v-dialog
        v-model="state.openDialog"
        max-width="350px"
        transition="dialog-transition">
        <UserPreviewPhoto v-model:image="fileImage" @close="close" />
      </v-dialog>
    </v-form>
  </CardDefault>
</template>

<script setup lang="ts">
import type { IFileImage } from '~/types/global'
import UserPreviewPhoto from './UserPreviewPhoto.vue'
import UserInformationForm from './UserProfileForm.vue'
import useUserProfile from '~/domains/builder/components/user-profile/useUserProfile'
import CardDefault from '~/components/card/CardDefault.vue'
import Skills from '~/domains/builder/components/skills/index.vue'
import Languages from '~/domains/builder/components/languages/index.vue'

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
