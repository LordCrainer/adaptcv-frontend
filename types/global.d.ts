export interface IFileImage extends Partial<File> {
  src: string
}

export interface BaseEntity {
  id?: string
  createdAt?: Date
  updatedAt?: Date
}
