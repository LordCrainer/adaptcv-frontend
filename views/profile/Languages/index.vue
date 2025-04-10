<template>
  <div class="d-flex flex-column">
    <div>
      <LanguagesForm @submit="save" />
    </div>
    <div class="d-flex flex-wrap">
      <v-chip
        v-for="(item, index) in formData"
        :key="item.name"
        class="ma-2 flex-grow-0"
        closable
        @click:close="remove(index)">
        {{ item.name }} ({{ item.proficiency }})
      </v-chip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LanguagesForm from './LanguagesForm.vue'
import type { ILanguageItem } from '..'

const formData = ref<ILanguageItem[]>([])

const MAX_LANGUAGES = 5

const save = (inputData: ILanguageItem) => {
  if (formData.value.length >= MAX_LANGUAGES) {
    return
  }

  const index = formData.value.findIndex((item) => item.name === inputData.name)
  if (index !== -1) {
    formData.value.splice(index, 1, inputData)
  } else {
    formData.value.push(inputData)
  }
}

const remove = (index: number) => {
  formData.value.splice(index, 1)
}
</script>
