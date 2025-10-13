/** 组件传输参数  */
export interface routerParams {
  id?: string
  type?: number
  init?: () => void
  getTableList?: () => Promise<any>
}
