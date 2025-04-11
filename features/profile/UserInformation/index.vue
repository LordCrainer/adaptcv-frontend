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
        <v-card class="profile-photo rounded-circle">
          <v-img
            class="profile-photo"
            aspect-ratio="1/1"
            cover
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
          <input
            type="file"
            accept="image/*"
            @change="onFileChange"
            class="d-none"
            ref="fileInput" />
        </v-card>
      </v-col>
      <UserInformationForm />
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import UserInformationForm from './UserInformationForm.vue'

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      // Handle the file data here
      console.log(e.target?.result)
    }
    reader.readAsDataURL(file)
  }
}
</script>
