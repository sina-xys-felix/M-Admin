// 登陆请求数据格式
export interface LoginData {
  password: string
  account: string
  [key:string]:unknown
}
