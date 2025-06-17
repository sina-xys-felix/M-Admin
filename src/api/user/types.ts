import { StatusNumProps } from '@/common/types/index'
export interface UserRecord {
  name?: string // 姓名
  mobile?: string // 手机号
  account?: string // 登录名/用户名
  status?: StatusNumProps
}

// 查询参数
export interface UserParams extends Partial<UserRecord> {
  index: number
  size: number
  sort?: string
  ascending?: boolean
}

// props
export interface UserProps extends Partial<UserRecord> {
  id?: string
  gender?: number | string // 0 未知 1 男 2 女
  birthday?: string // 生日
  maritalStatus?: number | string | undefined // 婚姻状况 0 未婚 1已婚 2离异 3 丧偶
  nation?: number | string // 民族(默认0:未知)
  education?: number | string // 教育程度(默认0:未知)
  party?: number | string // 政党(默认0:未知)
  idNumber?: string // 身份证号
  quickCode?: string // 速查码
  nickName?: string // 昵称
  countryCode?: number | string // 国家代码(默认中国:86)
  countryId?: number | string // 国家代码(默认中国:86)
  countryName?: string // 国家代码(默认中国:86)
  phone?: string // 电话号码
  email?: string // 电子邮箱
  avatar?: string // 头像
  country?: string // 国家
  province?: string // 省
  provinceId?: string // 省
  provinceName?: string // 省
  cityName?: string // 城市
  cityId?: string // 城市
  districtName?: string // 区/县
  districtId?: string // 区/县
  streetName?: string // 街道/乡镇
  streetId?: string // 街道/乡镇
  communityName?: string // 社区/村
  communityId?: string // 社区/村
  areaCode?: number | string // 区域代码from国家统计局
  address?: string // 地址
  zipcode?: string // 邮编
  start?: string // 启用时间
  end?: string // 停用时间
  roleIds?: (string | number)[]
  organIds?: (string | number)[]
}
