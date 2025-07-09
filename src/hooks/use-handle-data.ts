import { Message, Modal } from '@arco-design/web-vue'

/**
 * @description 操作单条数据信息(二次确认【删除、禁用、启用、重置密码】)
 * @param {Function} api 操作数据接口的api方法(必传)
 * @param {Object} params 携带的操作数据参数 {id,params}(必传)
 * @param {String} message 提示信息(必传)
 * @return Promise 返回操作结果
 */
export const useHandleData = <P = any, R = any>(
  api: (params: P) => Promise<void | R>,
  params: Parameters<typeof api>[0],  
  message: string
) => {
  return new Promise((resolve, reject) => {
    Modal.warning({
      title: '温馨提示',
      content: `是否${message}?`,
      okText: '确定',
      cancelText: '取消',
      draggable: true, // 拖拽
      simple: true, // 简单模式
      hideCancel: false, // 是否隐藏取消按钮
      alignCenter: true, // 居中显示
      onOk: async () => {
        const res = await api(params)
        if (res !== 200) return reject(false)
        Message.success(`${message}成功`)
        return resolve(true)
      },
      onCancel: () => {
        return resolve(false)
      },
    })
  })
}
