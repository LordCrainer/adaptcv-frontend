<template>
  <v-app-bar density="comfortable" app color="white">
    <slot name="toolbar-left">
      <v-icon></v-icon>
    </slot>
    <v-toolbar-title class="text-h5 font-weight-bold ma-0">
      <slot name="toolbar-title">
        {{ $t('routes.builder') }}
      </slot>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <slot name="toolbar-items"></slot>
  </v-app-bar>
  <slot></slot>
</template>

<style scoped></style>
