<template>
  <v-row>
    <v-col cols="12">
      <h1>{{ $t('cv.skills') }}</h1>
    </v-col>
    <v-col cols="12">
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="formData.skill"
          :label="$t('cv.skill')"
          required></v-text-field>

        <v-btn type="submit" color="success">
          {{ $t('actions.save') }}
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  skill: ''
})

const submitForm = () => {
  console.log('Skill submitted:', formData.value)
}
</script>
