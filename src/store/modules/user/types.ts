export interface IDepartment {
  code?: string
  description?: string
  id?: string
  index?: number
  isLeaf?: boolean
  isRoot?: boolean
  isShow?: boolean
  level?: number
  lv?: number
  name?: string
  quickCode?: string
  rv?: number
  status?: number
  type?: number
}

export interface roleType {
  alias?: string
  icon?: string
  id: string
  menuIds?: string[]
  name?: string
  operationIds?: string[]
  type?: number
}
export interface UserState {
  amount?: number
  avatar?: string
  department?: IDepartment
  gender?: number
  id?: string
  idNumber?: number
  isLogin?: boolean
  isOfficial?: boolean
  level?: number
  mobile?: string
  name?: string
  nation?: string
  points?: number
  roles?: roleType
  [key: string]: unknown;
}
