<style lang="scss" scoped>
.background-opacity {
  background-color: rgba(255, 255, 255, 0);
}
</style>
<template>
  <v-form ref="form" lazy-validation @submit.prevent="submit">
    <v-card
      flat
      border
      theme="dark"
      class="pa-4 d-flex flex-column ga-4 rounded-xl background-opacity">
      <v-card-title class="text-h5 font-weight-bold">
        {{ $t('website.welcome') }} {{ $t('website.title') }}
      </v-card-title>
      <v-card-text class="d-flex flex-column">
        <div class="d-flex flex-column ga-4">
          <v-text-field
            v-model="formData.email"
            rounded="lg"
            prepend-inner-icon="mdi-email"
            :rules="[rules.email()]"
            label="Email"
            type="email"
            :placeholder="$t('login.emailPlaceholder')"
            variant="outlined"
            aria-label="Email"
            autocomplete="email"
            aria-required="true"
            required></v-text-field>

          <v-text-field
            v-model="formData.password"
            rounded="lg"
            prepend-inner-icon="mdi-lock"
            :rules="[rules.required(), rules.minLength(), rules.password()]"
            :type="showPassword ? 'text' : 'password'"
            variant="outlined"
            label="Password"
            :placeholder="$t('login.passwordPlaceholder')"
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
            :label="$t('login.rememberMe')"
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
          rounded="lg"
          size="large"
          :loading="isLoading"
          color="primary"
          type="submit"
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
import { useAuthService } from '../composables/useAuthService'
import { useAuthStore } from '../store/auth.store'

definePageMeta({
  title: 'Login',
  layout: 'auth',
  meta: {
    title: 'Login',
    description: 'Login to your account'
  }
})

const { isLoading } = useAuthStore()
const { login } = useAuthService()
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

async function submit() {
  if (form.value?.isValid) {
    await login({
      email: formData.value.email,
      password: formData.value.password
    })
  } else {
    console.error('Form is invalid')
  }
}

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}
</script>
