<template>
  <div class="d-flex flex-column ga-4">
    <UserInformationForm v-model="userProfile" />
  </div>
</template>

<script setup lang="ts">
import UserInformationForm from './UserInformationForm.vue'
import { useUserProfile } from '~/domains/builder/components/user-profile/useUserProfile'

const { userProfile } = useUserProfile()
</script>
