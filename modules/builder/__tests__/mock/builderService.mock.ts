import { vi } from 'vitest'

export const builderServiceMock = {
  create: vi.fn().mockResolvedValue({ data: {} }),
  getAll: vi.fn().mockResolvedValue({ data: [], pagination: {} }),
  getById: vi.fn().mockResolvedValue({ data: {} }),
  update: vi.fn().mockResolvedValue({ data: {} }),
  delete: vi.fn().mockResolvedValue({ data: {} })
}
