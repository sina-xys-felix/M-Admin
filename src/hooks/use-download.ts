import { h } from 'vue'
import { Message } from '@arco-design/web-vue'
import { IconDownload } from '@arco-design/web-vue/es/icon'
import { AnyObject } from '@/common/types/global'

/**
 * @description 接收数据流生成blob，创建链接，下载文件
 * @param {Function} api 导出表格的api方法(必传)
 * @param {String} tempName 导出的文件名(必传)
 * @param {Object} params 导出的参数(默认为空对象)
 * @param {Boolean} isNotify 是否有导出消息提示(默认为 true)
 * @param {String} fileType 导出的文件格式(默认为.xlsx)
 * @return void
 * */
export const useDownload = async (
  api: (param: AnyObject) => Promise<AnyObject>,
  tempName: string,
  params: AnyObject = {},
  isNotify = true,
  fileType = '.csv'
  // fileType = '.xlsx'
) => {
  if (isNotify) {
    Message.info({
      position: 'top',
      showIcon: true,
      content: '温馨提示:\n如果数据庞大会导致下载缓慢，请您耐心等待！',
      duration: 3000,
      icon: () => h(IconDownload),
    })
  }
  try {
    const res = await api(params)
    const blob = new Blob([res])
    // 兼容 edge 不支持 createObjectURL 方法
    if ('msSaveOrOpenBlob' in navigator) return window.navigator.msSaveOrOpenBlob(blob, tempName + fileType)
    const blobUrl = window.URL.createObjectURL(blob)
    const exportFile = document.createElement('a')
    exportFile.style.display = 'none'
    exportFile.download = `${tempName}${fileType}`
    exportFile.href = blobUrl
    document.body.appendChild(exportFile)
    exportFile.click()
    // 去除下载对 url 的影响
    document.body.removeChild(exportFile)
    window.URL.revokeObjectURL(blobUrl)
  } catch (error) {
    console.log(error)
  }
}
