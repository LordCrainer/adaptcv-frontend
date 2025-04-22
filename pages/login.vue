<template>
  <div class="own-login pa-4">
    <Login />
  </div>
</template>

<script lang="ts" setup>
import Login from '~/features/auth/Login.vue'

definePageMeta({
  layout: 'auth'
})
</script>

<style lang="scss" scoped>
.own-login {
  width: 100%;
  max-width: 600px;
  margin: auto;
}
</style>
