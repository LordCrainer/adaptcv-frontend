<template>
  <CardDefault title="profile.personalInfo.title" style="min-width: 300px">
    <v-form>
      <div class="d-flex flex-column ga-4 justify-center align-center">
        <v-card
          flat
          border
          class="d-flex justify-center pa-4 rounded-md"
          style="width: 100%">
          <PreviewPhoto />
        </v-card>
        <div class="d-flex flex-column ga-4" style="width: 100%">
          <span class="text-body-1 font-weight-bold">
            Information de Contacto
          </span>
          <v-divider></v-divider>
          <UserInformation />
        </div>

        <div class="d-flex flex-column ga-4" style="width: 100%">
          <span class="text-body-1 font-weight-bold">
            {{ $t('profile.skills.title') }}
          </span>
          <v-divider></v-divider>
          <Skills />
        </div>

        <div class="d-flex flex-column ga-4" style="width: 100%">
          <span class="text-body-1 font-weight-bold">
            {{ $t('profile.languages.title') }}
          </span>
          <v-divider></v-divider>
          <Languages />
        </div>
      </div>
    </v-form>
  </CardDefault>
</template>

<script setup lang="ts">
import UserInformation from './UserInformation.vue'
import CardDefault from '~/components/card/CardDefault.vue'
import Skills from '~/domains/builder/components/skills/index.vue'
import Languages from '~/domains/builder/components/languages/index.vue'
import PreviewPhoto from './PreviewPhoto.vue'
</script>
