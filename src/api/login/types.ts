// 登陆请求数据格式
export interface LoginData {
  sid: number
  tenantId?: number
  userName: string
  password: string
}

// 修改密码
export interface ChangePassword {
  oldPassword: string
  newPassword: string
}
// 更新成员
export interface IMemberProps {
  idNumber?: string
  name?: string
  gender?: number
  birthday?: string
  maritalStatus?: number
  nation?: number
  education?: number
  party?: number
  quickCode?: string
  nickName?: string
  countryCode?: number
  phone?: string
  email?: string
  avatar?: string
  country?: string
  province?: string
  city?: string
  district?: string
  street?: string
  community?: string
  areaCode?: number
  address?: string
  zipcode?: string
}
