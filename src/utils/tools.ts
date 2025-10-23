import { pinyin } from 'pinyin-pro'
import { isArray } from './is'
import { AnyFn } from '@vueuse/core'

/**
 * @description 处理 prop，当 prop 为多级嵌套时 ==> 返回最后一级 prop
 * @param {String} prop 当前 prop
 * @return
 * */
export const handleProp = (prop: string) => {
  const propArr = prop && prop.split('.')
  if (propArr.length === 1) return prop
  return propArr[propArr.length - 1]
}

/**
 * @description 处理无数据情况
 * @param {String} callValue 需要处理的值
 * @return
 * */
export function formatValue(callValue: AnyFn) {
  // 如果当前值为数组,使用 / 拼接（根据需求自定义）
  if (isArray(callValue)) return callValue.length ? callValue.join(' / ') : '--'
  return callValue ?? '--'
}

//身份证验证
export function checkId(value: string, callback: AnyFn) {
  if (value) {
    if (/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
      // callback({ result: true })
    } else {
      callback('请输入正确的身份证号码')
    }
  } else {
    // callback('请输入正确的身份证号码')
  }
}
// 必填
export function checkIdBT(value: string, callback: AnyFn) {
  if (value) {
    if (/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
      // callback({ result: true })
    } else {
      callback('请输入正确的身份证号码')
    }
  } else {
    callback('请输入身份证号码')
  }
}

//电话号码验证
export function checkPhone(value: number | undefined, callback: AnyFn) {
  if (value) {
    // 将 number 转换为 string
    const strValue = value.toString()

    if (/^1/.test(strValue)) {
      if (/^1\d{10}$/.test(strValue)) {
        // callback({ result: true })
      } else {
        callback('请输入11位的手机号')
      }
    } else if (/^0/.test(strValue)) {
      if (/^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/.test(strValue)) {
        // callback({ result: true })
      } else {
        callback('请用0xxx-xxxxxxx格式')
      }
    } else {
      callback('请输入11位手机号或0xxx-xxxxxxx格式座机号')
    }
  }
}

// 速查码
export const findQuickCode = (text: string) => {
  if (!text) return ''
  const first = pinyin(text, { pattern: 'first', toneType: 'none' })
  return first.toString().trim().replace(/\s+/g, '')
}

export function analyzeIDCard(IDCard: string) {
  const getDataByIdCard = {
    sexCode: '',
    birthDay: '',
    age: 0,
  }
  //获取用户身份证号码
  //获取性别
  if (parseInt(IDCard.substr(16, 1)) % 2 == 1) {
    getDataByIdCard.sexCode = '1' //男
  } else {
    getDataByIdCard.sexCode = '2' //女
  }
  //获取出生年月日
  const yearBirth = IDCard.substring(6, 10)
  const monthBirth = IDCard.substring(10, 12)
  const dayBirth = IDCard.substring(12, 14)
  const birthDate = yearBirth + '-' + monthBirth + '-' + dayBirth
  //获取当前年月日并计算年龄
  const myDate = new Date()
  const monthNow = myDate.getMonth() + 1
  const dayNow = myDate.getDay()
  let age = myDate.getFullYear() - yearBirth
  if (monthNow < monthBirth || (monthNow == monthBirth && dayNow < dayBirth)) {
    age--
  }
  //得到年龄
  getDataByIdCard.birthDay = birthDate
  getDataByIdCard.age = age
  //返回性别和年龄
  return getDataByIdCard
}

/**
 * 屏幕缩放
 * width: 1920px;
 * height: 1080px;
 * transform-origin: 0 0;
 * position: absolute;
 * left: 50%;
 * top: 50%;
 * transform: translate(-50%, -50%) scale(1);
 */
export function resizeScreen(width = 1920, height = 1080) {
  const scaleX = window.innerWidth / width
  const scaleY = window.innerHeight / height
  const scale = Math.min(scaleX, scaleY)
  document.getElementById('app').style.transform = `scale(${scale})`
}

export function base64ToFile(base64String: string, filename: string, mimeType: string) {
  // 移除Base64前缀（如果有）
  const base64WithoutPrefix = base64String.split(',')[1] || base64String

  // 将Base64字符串转换为字节数组
  const byteCharacters = atob(base64WithoutPrefix)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512)
    const byteNumbers = new Array(slice.length)

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  // 创建Blob对象并转换为File
  const blob = new Blob(byteArrays, { type: mimeType })
  return new File([blob], filename, { type: mimeType })
}

export function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
