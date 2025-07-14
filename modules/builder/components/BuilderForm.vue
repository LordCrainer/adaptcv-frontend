<template>
  <CardDefault :title="$t('profile.title')" style="min-width: 300px">
    <v-form ref="form">
      <v-text-field
        density="comfortable"
        prepend-inner-icon="mdi-account"
        icon-color="primary"
        v-model="localCurriculumVitae.name"
        :label="$t('profile.name')"
        :placeholder="$t('profile.namePlaceholder')"
        active
        variant="outlined"
        :rules="[required($t('profile.name'))]"
        :aria-label="$t('profile.name')"
        required></v-text-field>

      <v-card-actions class="d-flex justify-end">
        <v-btn
          variant="outlined"
          color="primary"
          aria-label="Cancel"
          @click="emit('close')">
          {{ $t('actions.cancel') }}
        </v-btn>
        <v-btn
          :loading="state.loading"
          variant="flat"
          color="primary"
          aria-label="Save"
          @click="handleSaveChanges">
          {{ $t('actions.save') }}
          <template v-slot:loader v-if="state.loading">
            <v-progress-circular
              indeterminate
              color="white"
              size="20"
              width="2"></v-progress-circular>
          </template>
        </v-btn>
      </v-card-actions>
    </v-form>
  </CardDefault>
</template>
<script lang="ts" setup>
import type { IBuilder } from '@lordcrainer/adaptcv-shared-types'
import { useBuilder } from '~/modules/builder/composables/useBuilder'
import CardDefault from '~/components/card/CardDefault.vue'

const emit = defineEmits(['close', 'submit'])
const { hasChanges } = useObject()
const { required } = useRules()

const { builderState } = useBuilder()

const state = reactive({
  loading: false
})

const form = ref()
const localCurriculumVitae = ref<Partial<IBuilder>>({
  name: ''
})

async function handleSaveChanges() {
  if (!form.value) return
  const { valid } = await form.value.validate()
  if (
    valid &&
    hasChanges(localCurriculumVitae.value.name, builderState.value.name)
  ) {
    emit('submit', localCurriculumVitae.value)
  }
}
</script>
