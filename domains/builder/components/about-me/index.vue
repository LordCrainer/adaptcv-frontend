<template>
  <CardDefault title="profile.aboutMe.title">
    <v-form>
      <v-row>
        <v-col cols="12" md="4" class="d-flex flex-1-0 justify-center">
          <v-card
            flat
            border
            class="d-flex justify-center pa-4 rounded-md"
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
                  {{ $t('profile.aboutMe.uploadLogo') }}
                </span>
              </v-sheet>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="8" class="d-flex flex-column ga-2">
          <AboutMeForm v-model="aboutMe" />
        </v-col>
      </v-row>

      <v-dialog
        v-model="state.openDialog"
        max-width="350px"
        transition="dialog-transition">
        <UserPreviewPhoto v-model:image="fileImage" @close="close" />
      </v-dialog>
    </v-form>
  </CardDefault>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { IFileImage } from '~/types/global'
import { useAboutMe } from '~/domains/builder/components/about-me/useAboutMe'
import UserPreviewPhoto from '~/domains/builder/components/user-profile/UserPreviewPhotoForm.vue'
import AboutMeForm from './AboutMeForm.vue'
import CardDefault from '~/components/card/CardDefault.vue'

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
