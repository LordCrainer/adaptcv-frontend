import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { useBuilderStore } from '../../store/builder.store'
import type { IBuilder } from '@lordcrainer/adaptcv-shared-types'

const mockApi = { post: vi.fn(), get: vi.fn(), delete: vi.fn(), put: vi.fn() }
vi.mock('~/composables/useApi', () => ({
  useApi: () => mockApi
}))

describe('builder.store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('addBuilder agrega un builder al array', async () => {
    const store = useBuilderStore()
    const builder: IBuilder = {
      name: 'Nuevo',
      status: 'draft',
      _id: '1'
    } as IBuilder
    await store.addBuilder(builder)
    const foundBuilder = store.builders.find((b) => b._id === builder._id)
    expect(foundBuilder).toEqual(builder)
  })

  it('updateBuilderStatus actualiza el status', async () => {
    const store = useBuilderStore()

    store.builderState = { name: 'Test', status: 'draft', _id: '1' } as IBuilder

    mockApi.put.mockResolvedValue({ data: {} })

    await store.updateBuilderStatus('published')
    expect(store.builderState.status).toBe('published')
  })

  it('updateSection actualiza la sección correspondiente', () => {
    const store = useBuilderStore()
    store.builderState = {
      name: 'Test',
      status: 'draft',
      aboutMe: { summary: 'old summary' }
    } as IBuilder

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
    mockApi.delete.mockResolvedValue({ data: {} })

    await store.deleteBuilder('1')

    expect(store.builders).toEqual([{ _id: '2', name: 'B', status: 'draft' }])
  })

  it('duplicateBuilder llama a la ruta de duplicar con solo el ID', async () => {
    const store = useBuilderStore()

    store.builders = []

    const duplicatedBuilder: IBuilder = {
      _id: '2',
      name: 'Original Builder (Copy)',
      status: 'published',
      aboutMe: { summary: 'Test summary' },
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03')
    } as IBuilder

    mockApi.post.mockResolvedValue({ data: duplicatedBuilder })

    const result = await store.duplicateBuilder('1')

    expect(mockApi.post).toHaveBeenCalledWith('/v1/builders/1/duplicate')

    expect(store.builders).toHaveLength(1)
    expect(store.builders[0]).toEqual(duplicatedBuilder)

    expect(result).toEqual(duplicatedBuilder)
  })
})
