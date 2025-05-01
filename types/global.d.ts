import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export interface IFileImage extends Partial<File> {
  src: string
}

export interface BaseEntity {
  id?: string
  createdAt?: Date
  updatedAt?: Date
}

interface Props {
  title: string
  path: string
  icon: string
}

type RouteChildren = RouteRecordRaw['children'][0] & {
  props: Partial<Props>
  children?: RouteChildren[]
}

export type TabItem = {
  translationKey: string
  title?: string
  component: Component
  props?: Record<string, any>
}

declare global {
  type RouteExtended = Omit<RouteRecordRaw, 'children'> & {
    props?: Partial<Props>
    children?: RouteExtended[]
  }
}
