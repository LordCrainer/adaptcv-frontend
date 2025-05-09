<template>
  <v-card :border="!hideMenu" flat class="d-flex flex-column">
    <div v-if="!hideMenu" class="d-flex flex-column">
      <div class="d-flex align-center">
        <v-btn
          rounded
          class="rounded-0"
          flat
          v-for="button in buttonOptions"
          :key="button.value"
          :icon="button.icon"
          :value="button.value"
          @click="button.action"></v-btn>
      </div>
      <v-divider></v-divider>
    </div>
    <editor-content
      :editor="editor"
      style="overflow-y: auto"
      class="d-flex flex-grow-1 pa-2" />
  </v-card>
</template>

<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { useEditor, Editor, EditorContent } from '@tiptap/vue-3'
import { watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Object],
    default: ''
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  hideMenu: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: '',
  extensions: [StarterKit, Underline]
})

const toggleBold = () => {
  editor.value?.chain().focus().toggleBold().run()
}

const toggleItalic = () => {
  editor.value?.chain().focus().toggleItalic().run()
}

const toggleUnderline = () => {
  editor.value?.chain().focus().toggleUnderline().run()
}

const toggleBulletList = () => {
  editor.value?.chain().focus().toggleBulletList().run()
}

const toggleOrderedList = () => {
  editor.value?.chain().focus().toggleOrderedList().run()
}

const buttonOptions = [
  { name: 'Bold', action: toggleBold, value: 'bold', icon: 'mdi-format-bold' },
  {
    name: 'Italic',
    action: toggleItalic,
    value: 'italic',
    icon: 'mdi-format-italic'
  },
  {
    name: 'Underline',
    action: toggleUnderline,
    value: 'underline',
    icon: 'mdi-format-underline'
  },
  {
    name: 'Bullet List',
    action: toggleBulletList,
    value: 'bullet-list',
    icon: 'mdi-format-list-bulleted'
  },
  {
    name: 'Ordered List',
    action: toggleOrderedList,
    value: 'ordered-list',
    icon: 'mdi-format-list-numbered'
  }
]

watch(
  () => props.modelValue,
  (value) => {
    if (editor.value) {
      const isSame = editor.value.getHTML() === value
      if (!isSame) {
        editor.value.commands.setContent(value, false)
      }
    }
  }
)

onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit],
    content: props.modelValue,
    editable: !props.readOnly,
    onUpdate: () => {
      if (editor.value && !props.readOnly) {
        emit('update:modelValue', editor.value.getHTML())
      }
    }
  })
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>

<style lang="scss">
/* Basic editor styles */

.tiptap {
  height: 100%;
  :first-child {
    margin-top: 0;
  }
  p {
    padding-left: 0.1em;
  }
  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 0.25rem 1rem 0.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }
}
</style>
