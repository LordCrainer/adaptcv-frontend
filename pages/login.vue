<template>
  <div class="own-login">
    <Login />
  </div>
</template>

<script lang="ts" setup>
import Login from '~/features/auth/Login.vue'
</script>

<style lang="scss" scoped>
.own-login {
  width: 100%;
  max-width: 600px;
  margin: auto;
}

</style>
