import type { Component } from "vue"

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

export type TabItem = {
  label?: string
  title: string
  component: Component
  props?: Record<string, any>
}