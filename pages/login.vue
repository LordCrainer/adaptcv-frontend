<template>
  <div class="own-login pa-4">
    <Login />
  </div>
</template>

<script lang="ts" setup>
import Login from '~/modules/auth/views/Login.vue'

definePageMeta({
  title: 'Login',
  layout: 'auth',
  name: 'login',
  meta: {
    title: 'Login',
    description: 'Login to your account'
  }
})
</script>

<style lang="scss" scoped>
.own-login {
  width: 100%;
  max-width: 600px;
  margin: auto;
}
</style>
