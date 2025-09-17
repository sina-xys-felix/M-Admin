import { defineStore } from 'pinia'
import { TableState } from './types'

const useTableStore = defineStore('table', {
  state: (): TableState => ({
    rows: 1,
    resolution: 10,
  }),
  getters: {},
  actions: {},
  persist: true,
})

export default useTableStore
