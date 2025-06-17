// 组件内传输的值类型
export interface routerParams {
  id?: string
  type?: number
  init?: () => void
  getTableList?: () => Promise<any>
}
