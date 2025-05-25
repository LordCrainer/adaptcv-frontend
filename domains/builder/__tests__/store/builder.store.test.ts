import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { useBuilderStore } from '../../store/builder.store'
import { builderServiceMock } from '../mock/builderService.mock'
import type { IBuilder } from '@lordcrainer/adaptcv-shared-types'

describe('builder.store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('addBuilder agrega un builder al array', async () => {
    const store = useBuilderStore()
    const builder: IBuilder = { name: 'Nuevo', status: 'draft' } as IBuilder
    await store.addBuilder(builder)
    expect(store.builders[0]).toEqual(builder)
  })

  it('updateBuilderStatus actualiza el status', () => {
    const store = useBuilderStore()
    store.builderState = { name: 'Test', status: 'draft' } as IBuilder
    store.updateBuilderStatus('published' as any)
    expect(store.builderState.status).toBe('published')
  })

  it('updateSection actualiza la sección correspondiente', () => {
    const store = useBuilderStore()
    store.builderState = {
      name: 'Test',
      status: 'draft',
      aboutMe: { summary: 'old summary' }
    } as any
    const aboutMe = { summary: 'new summary' }
    store.updateSection('aboutMe' as any, aboutMe)
    expect(store.builderState.aboutMe).toStrictEqual(aboutMe)
  })

  it('deleteBuilder elimina el builder por id', async () => {
    const store = useBuilderStore()
    store.builders = [
      { _id: '1', name: 'A', status: 'draft' } as any,
      { _id: '2', name: 'B', status: 'draft' } as any
    ]
    await store.deleteBuilder('1')
    expect(store.builders).toEqual([{ _id: '2', name: 'B', status: 'draft' }])
  })
})
