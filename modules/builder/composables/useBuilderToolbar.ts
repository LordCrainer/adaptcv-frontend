import { ref, computed } from 'vue'

export interface ToolbarAction {
  icon: string
  value: string
  tooltip: string
  action: () => void | Promise<void>
  props?: Record<string, any>
  visible?: boolean
}

type TabType = 'edit' | 'preview'

export const useBuilderToolbar = () => {
  const currentTab = ref<TabType>('edit')
  const actionHandlers = ref<Record<string, () => void | Promise<void>>>({})

  // Registrar handlers para acciones específicas
  const registerActionHandler = (
    actionName: string,
    handler: () => void | Promise<void>
  ) => {
    actionHandlers.value[actionName] = handler
  }

  // Ejecutar una acción
  const executeAction = async (actionName: string) => {
    const handler = actionHandlers.value[actionName]
    if (handler) {
      await handler()
    } else {
      console.warn(`No handler found for action: ${actionName}`)
    }
  }

  // Definir acciones base del toolbar
  const getToolbarActions = (): ToolbarAction[] => [
    {
      icon: 'mdi-file-pdf-box',
      value: 'actions.exportPdf',
      tooltip: 'Download PDF',
      action: () => executeAction('downloadPdf'),
      visible: currentTab.value === 'edit'
    },
    {
      icon: 'mdi-content-save',
      value: 'actions.save',
      tooltip: 'Save',
      action: () => executeAction('save')
    },
    {
      icon: 'mdi-publish',
      value: 'actions.publish',
      tooltip: 'Publish',
      action: () => executeAction('publish')
    },
    {
      icon: 'mdi-cog',
      value: 'actions.settings',
      tooltip: 'Settings',
      action: () => executeAction('settings')
    }
  ]

  // Acciones visibles según el contexto
  const visibleActions = computed(() => {
    return getToolbarActions().filter(
      (action) => action.visible !== false
    )
  })

  function setBuilderTab(tab: TabType | string) {
    currentTab.value = tab as TabType
  }

  return {
    currentTab,
    registerActionHandler,
    executeAction,
    setBuilderTab,
    getToolbarActions,
    visibleActions
  }
}
