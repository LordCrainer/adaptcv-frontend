import type {
  BaseEntity as BaseEntityGlobal,
  Pagination
} from '@lordcrainer/adaptcv-shared-types'
import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
export interface IFileImage extends Partial<File> {
  src: string
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

export type TabItem<T = string> = {
  id: T
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

  type BaseEntity = BaseEntityGlobal

  type ServiceResponse<T> = {
    data: T
    pagination?: Pagination
  }

  type ServiceResponseData<T> = Pick<ServiceResponse<T>, 'data'>
}
