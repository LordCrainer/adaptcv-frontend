<template>
  <v-app :style="`--angle: ${gradientAngle}deg`" class="adaptcv-bg">
    <div class="cursor__ball"></div>
    <slot />
  </v-app>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const gradientAngle = ref('-150')

function moveMouse(event: MouseEvent) {
  const { clientX, clientY } = event
  const { innerWidth: width, innerHeight: height } = window
  const angle =
    Math.atan2(clientY - height, clientX - width) * (180 / Math.PI) || 0
  gradientAngle.value = angle.toFixed(2)
}

onMounted(() => {
  window.addEventListener('mousemove', moveMouse)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', moveMouse)
})
</script>

<style lang="scss" scoped>
.adaptcv-bg {
  background: linear-gradient(
    var(--angle),
    rgba(8, 54, 91, 0.98) 50%,
    rgb(8, 54, 91) 50%
  );
  transition: rgb(8, 54, 91) 1s ease;
}

.cursor {
  pointer-events: none;
  &__ball {
    position: fixed;
    top: 0;
    left: 0;
    mix-blend-mode: difference;
    z-index: 1000;

    circle {
      fill: #f7f8fa;
    }
  }
}
</style>
