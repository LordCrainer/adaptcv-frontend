export interface IFileImage extends Partial<File> {
  src: string
}

export interface BaseEntity {
  id?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IRoutes {
  path: string
  title: string
  icon?: string
  id?: string
}
