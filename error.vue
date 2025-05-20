<template>
  <v-app>
    <div
      class="d-flex flex-column justify-center align-center text-center ga-4 fill-height">
      <h1 class="text-h3 font-black">Error {{ error.statusCode }}</h1>
      <p class="mt-4 text-h6 text-grey">
        {{ error.statusMessage || 'Page not found' }}
      </p>
      <div>
        <v-btn color="primary" to="/" size="x-large">GO BACK HOME</v-btn>
      </div>
    </div>
  </v-app>
</template>

<script setup>
defineProps({
  error: Object
})
</script>
