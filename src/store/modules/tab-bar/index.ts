import type { RouteLocationNormalized } from 'vue-router'
import { defineStore } from 'pinia'
import { DEFAULT_ROUTE, DEFAULT_ROUTE_NAME, REDIRECT_ROUTE_NAME } from '@/router/constants'
import { isString } from '@/utils/is'
import { TabBarState, TagProps } from './types'

const formatTag = (route: RouteLocationNormalized): TagProps => {
  const { name, meta, fullPath, query } = route
  if (route.tabar !== false) {
    return {
      title: meta.locale || '',
      name: String(name),
      fullPath,
      query,
      ignoreCache: meta.ignoreCache,
    }
  }
}

const BAN_LIST = [REDIRECT_ROUTE_NAME]
const defaultTagList = DEFAULT_ROUTE
const defaultName = DEFAULT_ROUTE_NAME
const useTabBar = defineStore('tabBar', {
  state: (): TabBarState => ({
    cacheTabList: new Set([defaultName]),
    tagList: [defaultTagList],
  }),

  getters: {
    getTabList(): TagProps[] {
      return this.tagList
    },
    getCacheList(): string[] {
      return Array.from(this.cacheTabList)
    },
  },

  actions: {
    updateTabList(route: RouteLocationNormalized) {
      if (BAN_LIST.includes(route.name as string)) return
      if (route.meta.tabar !== false) this.tagList.push(formatTag(route))
      if (!route.meta.ignoreCache) {
        this.cacheTabList.add(route.name as string)
      }
    },
    deleteTag(idx: number, tag: TagProps) {
      this.tagList.splice(idx, 1)
      this.cacheTabList.delete(tag.name)
    },
    addCache(name: string) {
      if (isString(name) && name !== '') this.cacheTabList.add(name)
    },
    deleteCache(tag: TagProps) {
      this.cacheTabList.delete(tag.name)
    },
    freshTabList(tags: TagProps[]) {
      this.tagList = tags
      this.cacheTabList.clear()
      // 要先判断ignoreCache
      this.tagList
        .filter((el) => !el.ignoreCache)
        .map((el) => el.name)
        .forEach((x) => this.cacheTabList.add(x))
    },
    resetTabList() {
      this.tagList = [defaultTagList]
      this.cacheTabList.clear()
      this.cacheTabList.add(defaultName)
    },
  },
})

export default useTabBar
