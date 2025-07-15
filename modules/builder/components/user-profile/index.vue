<template>
  <div class="d-flex flex-column ga-4 justify-center align-center">
    <div class="d-flex flex-column ga-4 fill-width">
      <span class="text-body-1 font-weight-bold">
        {{ $t('profile.personalInfo.contactInfo') }}
      </span>
      <v-divider></v-divider>
      <v-card
        flat
        border
        class="d-flex justify-center pa-4 rounded-md fill-width">
        <PreviewPhoto />
      </v-card>
      <UserInformation />
    </div>

    <div class="d-flex flex-column ga-4 fill-width">
      <span class="text-body-1 font-weight-bold">
        {{ $t('profile.skills.title') }}
      </span>
      <v-divider></v-divider>
      <Skills />
    </div>

    <div class="d-flex flex-column ga-4 fill-width">
      <span class="text-body-1 font-weight-bold">
        {{ $t('profile.languages.title') }}
      </span>
      <v-divider></v-divider>
      <Languages />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserInformation from './UserInformation.vue'
import CardDefault from '~/components/card/CardDefault.vue'
const Skills = defineAsyncComponent(
  () => import('~/modules/builder/components/skills/index.vue')
)
const Languages = defineAsyncComponent(
  () => import('~/modules/builder/components/languages/index.vue')
)
import PreviewPhoto from './PreviewPhoto.vue'
</script>
