import { request } from '@/utils/request'
import type { TableData } from '@arco-design/web-vue/es/table/interface'

export interface ContentDataRecord {
  x: string
  y: number
}

export const queryContentData = () => {
  return request.get<ContentDataRecord[]>({
    url: '/content-data',
  })
}

export const queryPopularList = () => {
  return request.get<TableData[]>({
    url: '/popular/list',
  })
}

export interface PopularRecord {
  key: number
  clickNumber: string
  title: string
  increases: number
}

export interface ContentPublishRecord {
  x: string[]
  y: number[]
  name: string
}

export function queryContentPublish() {
  return request.get<ContentPublishRecord[]>({
    url: '/content-publish',
  })
}
