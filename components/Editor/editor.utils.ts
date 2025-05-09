import { Editor } from '@tiptap/vue-3'
interface MenuOption {
  name: string
  action: () => void
  value: string
  icon: string
}

export const useEditorUitls = () => {
  const getMenuOptions = (editor?: Editor): MenuOption[] => [
    {
      name: 'Bold',
      action: () => editor?.chain().focus().toggleBold().run(),
      value: 'bold',
      icon: 'mdi-format-bold'
    },
    {
      name: 'Italic',
      action: () => editor?.chain().focus().toggleItalic().run(),
      value: 'italic',
      icon: 'mdi-format-italic'
    },
    // {
    //   name: 'Underline',
    //   action: () => editor?.chain().focus().toggleUnderline().run(),
    //   value: 'underline',
    //   icon: 'mdi-format-underline'
    // },
    {
      name: 'Bullet List',
      action: () => editor?.chain().focus().toggleBulletList().run(),
      value: 'bullet-list',
      icon: 'mdi-format-list-bulleted'
    },
    {
      name: 'Ordered List',
      action: () => editor?.chain().focus().toggleOrderedList().run(),
      value: 'ordered-list',
      icon: 'mdi-format-list-numbered'
    }
  ]

  return {
    getMenuOptions
  }
}
