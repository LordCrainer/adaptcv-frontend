<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-wrap">
      <v-chip
        v-for="(item, index) in formData"
        :key="item.language"
        class="ma-2 flex-grow-0"
        closable
        @click:close="remove(index)">
        {{ item.language }} ({{ item.proficiency }})
      </v-chip>
    </div>
    <div>
      <LanguagesForm @submit="save" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LanguagesForm from './LanguagesForm.vue'

interface ILanguage {
  language: string
  proficiency: string
}

const formData = ref<ILanguage[]>([])

const save = (inputData: ILanguage) => {
  const index = formData.value.findIndex(
    (item) => item.language === inputData.language
  )
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
