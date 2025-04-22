<template>
  <v-form ref="form" lazy-validation>
    <v-card class="pa-4 d-flex flex-column ga-4">
      <v-card-title class="text-h5 font-weight-bold">
        {{ $t('login.title') }}
      </v-card-title>
      <v-card-text class="d-flex flex-column">
        <div class="d-flex flex-column ga-2">
          <v-text-field
            v-model="formData.email"
            prepend-inner-icon="mdi-email"
            :rules="[rules.email()]"
            label="Email"
            type="email"
            variant="outlined"
            aria-label="Email"
            autocomplete="email"
            aria-required="true"
            required></v-text-field>
          <v-text-field
            v-model="formData.password"
            prepend-inner-icon="mdi-lock"
            :rules="[rules.required(), rules.minLength()]"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            variant="outlined"
            aria-label="Password"
            aria-required="true"
            required
            autocomplete="current-password">
            <template #append-inner>
              <v-icon
                slot="append"
                @click="togglePasswordVisibility"
                class="cursor-pointer">
                {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
              </v-icon>
            </template>
          </v-text-field>
        </div>
        <div class="d-flex justify-space-between align-center">
          <v-checkbox
            v-model="formData.remember"
            label="Remember Me"
            hide-details="auto"
            color="primary"></v-checkbox>
          <v-btn
            variant="plain"
            @click="forgotPassword"
            class="text-secondary text-body-1 text-decoration-none">
            {{ $t('actions.forgotPassword') }}
          </v-btn>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex flex-column ga-4">
        <v-btn
          @click="login"
          color="primary"
          variant="flat"
          style="width: 100%">
          {{ $t('actions.signIn') }}
        </v-btn>
        <div>
          {{ $t('login.dontHaveAccount') }}
          <v-btn
            variant="text"
            @click="$router.push({ name: 'register' })"
            class="text-secondary text-body-1 text-decoration-none">
            {{ $t('actions.signUp') }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRules } from '~/composables/useRules'

const rules = useRules()

const form = ref()

const formData = ref({
  email: '',
  password: '',
  remember: false
})

const showPassword = ref(false)

function forgotPassword() {
  // Handle forgot password action
  console.log('Forgot password clicked')
}

function login() {
  console.log('Logging in with:', form.value)
  // if (form.) {
  //   // Perform login action
  // } else {
  //   console.error('Form is invalid')
  // }
}

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}
</script>
