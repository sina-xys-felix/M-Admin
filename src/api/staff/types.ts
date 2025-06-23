export interface IBaseInfo {
  id?: string
  job?: number
  name?: string
  nickName?: string
  avatar?: string
  no?: string
  idNumber?: string
  quickCode?: string
  mobile?: number | string
  phone?: string
  email?: string
  gender?: number
  birthday?: string
  maritalStatus?: number | string
  nation?: number
  education?: number
  party?: number
  isOfficial: boolean
  face?: string
  start?: string
  end?: string
  timer?: string[]
}

export interface IOtherProps {
  countryId?: number | string
  photos?: string
  provinceId?: number
  cityId?: number
  districtId?: number
  streetId?: number
  communityId?: number
  address?: string
  zipcode?: string
  height?: number
  weight?: number
  procreation: boolean
  scholl?: string
  major?: string
  native?: string
  contact?: string
  contactMobile?: string
  groupId?: number
  companyId?: number
  storeIds?: number[]
  level?: number
  isFull: boolean
  isIntern: boolean
  entryTime?: string
  leaveTime?: string
  remark?: string
  status?: number
}

type IStaffProps = IBaseInfo & IOtherProps & { [key: string]: any }

export default IStaffProps
