<template>
  <q-card
    class="login-card"
    style="width: 100%; max-width: 550px; min-width: 450px">
    <q-toolbar class="bg-primary text-white text-center pa-sm">
      <q-toolbar-title class="text-bold text-h4">
        Iniciar Sesión
      </q-toolbar-title>
    </q-toolbar>
    <q-card flat class="pa-lg">
      <q-card-section class="column items-center justify-between">
        <div class="image-container">
          <q-img
            width="150px"
            fit="contain"
            src="https://app.lanubetv.net/images/logo01.png" />
        </div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-input
          outlined
          v-model="formData.email"
          type="email"
          label="Email"
          autocomplete="email">
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>
        <q-input
          outlined
          v-model="formData.password"
          :type="showPassword.type"
          label="Contraseña">
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-icon
              class="cursor-pointer"
              :name="showPassword.icon"
              @click="togglePasswordVisibility" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="row items-center justify-between">
        <q-checkbox
          label="Recuérdame por 30 días"
          v-model="formData.rememberMe" />
        <q-btn
          dense
          flat
          outlined
          class="text-caption"
          style="text-decoration: underline">
          Olvidé la contraseña
        </q-btn>
      </q-card-section>

      <q-card-section class="column q-gutter-y-lg">
        <q-btn
          class="full-width"
          color="primary"
          label="Ingresar"
          @click="handleLogin" />
      </q-card-section>
    </q-card>
  </q-card>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuth } from '@/domains/auth/composables/useAuth'

const { login } = useAuth()
const router = useRouter()
const formData = ref<{ email: string; password: string; rememberMe: boolean }>({
  email: '',
  password: '',
  rememberMe: false
})
const showPassword = ref<{ icon: string; type: 'password' | 'text' }>({
  icon: 'visibility_off',
  type: 'password'
})

const handleLogin = async () => {
  try {
    await login(formData.value)
    router.push('/posts')
  } catch (error) {
    console.error('Login failed:', error)
  }
}

const togglePasswordVisibility = () => {
  showPassword.value =
    showPassword.value.type === 'password'
      ? { icon: 'visibility', type: 'text' }
      : { icon: 'visibility_off', type: 'password' }
}
</script>
<style scoped>
.login-card {
  margin: 0 auto;
  margin-top: 100px;
  border-radius: 12px;
}

.login-card img {
  width: 150px;
}

.image-container {
  display: flex;
  justify-content: center;
  height: auto;
  height: 120px;
}
</style>
