<template>
  <CardDefault title="profile.languages.title">
    <div class="d-flex flex-column">
      <div>
        <LanguagesForm @submit="upsertLanguage" />
      </div>
      <div class="d-flex flex-wrap">
        <v-chip
          v-for="(item, index) in languages"
          :key="item.name"
          class="ma-2 flex-grow-0"
          closable
          @click:close="removeLanguage(index)">
          {{ item.name }} ({{ item.proficiency }})
        </v-chip>
      </div>
    </div>
  </CardDefault>
</template>

<script setup lang="ts">
import LanguagesForm from './LanguagesForm.vue'
import { useLanguages } from '~/domains/profile/components/languages/useLanguages'
import CardDefault from '~/components/card/CardDefault.vue'

const { languages, upsertLanguage, removeLanguage } = useLanguages()
</script>
