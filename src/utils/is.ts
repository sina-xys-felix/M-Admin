const opt = Object.prototype.toString

export function isArray(obj: any): obj is any[] {
  return opt.call(obj) === '[object Array]'
}

export function isObject(obj: any): obj is { [key: string]: any } {
  return opt.call(obj) === '[object Object]'
}

export function isString(obj: any): obj is string {
  return opt.call(obj) === '[object String]'
}

export function isNumber(obj: any): obj is number {
  return opt.call(obj) === '[object Number]' && obj === obj // eslint-disable-line
}

export function isRegExp(obj: any) {
  return opt.call(obj) === '[object RegExp]'
}

export function isFile(obj: any): obj is File {
  return opt.call(obj) === '[object File]'
}

export function isBlob(obj: any): obj is Blob {
  return opt.call(obj) === '[object Blob]'
}

export function isUndefined(obj: any): obj is undefined {
  return obj === undefined
}

export function isNull(obj: any): obj is null {
  return obj === null
}

export function isFunction(obj: any): obj is (...args: any[]) => any {
  return typeof obj === 'function'
}

export function isEmptyObject(obj: any): boolean {
  return isObject(obj) && Object.keys(obj).length === 0
}

export function isExist(obj: any): boolean {
  return obj || obj === 0
}

export function isWindow(el: any): el is Window {
  return el === window
}

// 是否为空
export function isEmpty(obj) {
  return Reflect.ownKeys(obj).length === 0 && obj.constructor === Object
}

// 月份差
export function monthDiff(startDate, endDate) {
  return Math.max(0, (endDate.getFullYear() - startDate.getFullYear()) * 12 - startDate.getMonth() + endDate.getMonth())
}

// 一步从时间中提取年月日时分秒
export function extract(date) {
  const d = new Date(new Date(date).getTime() + 8 * 3600 * 1000)
  return new Date(d)
    .toISOString()
    .split(/[^0-9]/)
    .slice(0, -1)
}

export function filterEmpty(value) {
  if (!value) return '--'
  return value
}
