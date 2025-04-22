<template>
  <v-card class="pa-4">
    <v-card-title class="text-h5 font-weight-bold">
      {{ $t('login.title') }}
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="form.email"
          :rules="[rules.required(), rules.email()]"
          label="Email"
          required></v-text-field>
        <v-text-field
          v-model="form.password"
          :rules="[rules.required(), rules.minLength()]"
          label="Password"
          type="password"
          required></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="login" :disabled="!valid" color="primary">
        {{ $t('login.button') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRules } from '~/composables/useRules'

const rules = useRules()

const form = ref({
  email: '',
  password: ''
})

const valid = ref(false)

function login() {
  if (valid.value) {
    // Perform login action
    console.log('Logging in with:', form.value)
  } else {
    console.error('Form is invalid')
  }
}
</script>
