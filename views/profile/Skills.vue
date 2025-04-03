<template>
  <v-row>
    <v-col cols="12">
      <v-form @submit.prevent="submitForm">
        <v-text-field
          variant="outlined"
          v-model="formData.skill"
          :label="$t('profile.skills.skill')"
          required></v-text-field>
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
