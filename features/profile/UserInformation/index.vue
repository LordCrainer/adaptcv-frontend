<style>
.profile-photo {
  width: 175px;
  height: 175px;
}
</style>
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
            <v-icon size="75" color="grey lighten-2">
              mdi-cloud-upload-outline
            </v-icon>
            <span>Upload Photo</span>
          </v-sheet>
        </v-card>
      </v-col>
      <UserInformationForm @update:output-data="" />
    </v-row>
    <v-dialog
      v-model="state.openDialog"
      max-width="350px"
      transition="dialog-transition">
      <UploadImage v-model:image="fileImage" @close="close" />
    </v-dialog>
  </v-form>
</template>

<script setup lang="ts">
import type { IFileImage } from '~/types/global'

import UploadImage from '../../../components/img/UploadImage.vue'
import UserInformationForm from './UserInformationForm.vue'

const fileImage = ref<IFileImage>({
  name: '',
  type: '',
  size: 0,
  src: ''
})

const state = reactive({
  openDialog: false
})

function close() {
  state.openDialog = false
}

function open() {
  state.openDialog = true
}
</script>
