// 登陆请求数据格式
export interface LoginData {
  password: string
  account: string
}

// 修改密码
export interface ChangePassword {
  oldPassword: string
  newPassword: string
}
