<template>
  <v-form>
    <v-row>
      <v-col cols="12" md="4" class="d-flex flex-1-0 justify-center">
        <v-card
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
              {{ $t('profile.aboutMe.uploadLogo') }}
            </span>
          </v-sheet>
        </v-card>
      </v-col>
      <AboutMeForm v-model="aboutMe" />
    </v-row>

    <v-dialog
      v-model="state.openDialog"
      max-width="350px"
      transition="dialog-transition">
      <UserPreviewPhoto v-model:image="fileImage" @close="close" />
    </v-dialog>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { IFileImage } from '~/types/global'
import { useAboutMe } from '~/domains/profile/about-me/useAboutMe'
import UserPreviewPhoto from '~/domains/profile/user-profile/UserPreviewPhoto.vue'
import AboutMeForm from './AboutMeForm.vue'

const { aboutMe, setAboutMeLogo } = useAboutMe()

const fileImage = ref<IFileImage>(aboutMe.value?.logo as IFileImage)

watch(
  () => fileImage,
  (newFileImage) => {
    if (newFileImage.value?.src) {
      setAboutMeLogo({ ...fileImage.value })
    }
  },
  { deep: true }
)

const state = ref({
  openDialog: false
})

const open = () => {
  state.value.openDialog = true
}

const close = () => {
  state.value.openDialog = false
}
</script>
