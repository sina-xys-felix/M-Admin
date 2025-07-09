import isString from 'lodash/isString'
import merge from 'lodash/merge'
import type { InternalAxiosRequestConfig,AxiosRequestConfig ,AxiosResponse,AxiosError} from 'axios'
import type { AxiosTransform, CreateAxiosOptions } from './axios-transform'
import { VAxios } from './axios-service'
import { joinTimestamp, formatRequestDate, setObjToUrlParams } from './utils'
import { TokenEnum, ResultEnum, ContentTypeEnum } from '@/common/enums/http-enum'
import { Message } from '@arco-design/web-vue'
import { getToken } from '@/utils/auth'

const env = import.meta.env.MODE || 'development'

// 如果是mock模式 或 没启用直连代理 就不配置host 会走本地Mock拦截 或 Vite 代理
const host = env === 'mock' ? '' : process.env[env]

const router = useRouter()
// 数据处理，方便区分多种处理方式
const transform: AxiosTransform = {
  // 处理请求数据。如果数据不是预期格式，可直接抛出错误
  transformRequestHook: (res, options) => {
    const { isTransformResponse, isReturnNativeResponse } = options
    // 如果204无内容,更新时无返回内容，直接返回
    if (res) {
      const method = res?.config?.method?.toLowerCase()
      if (res?.status === 204 || method === 'put' || method === 'patch') {
        return res
      }
      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      if (isReturnNativeResponse) {
        return res
      }

      // 不需要做数据处理时，直接返回
      if (!isTransformResponse) {
        return res.data
      }

      // 错误的时候返回，TODO
      const { data } = res
      if (!data) {
        throw new Error('请求接口错误')
      }

      //  这里 code为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
      const { code } = data

      // 请求成功时，直接返回内容 0是请求成功的标志
      const hasSuccess = data && code === ResultEnum.SUCCESS
      if (hasSuccess) {
        return data?.data || code
      }
    }
  },

  // 请求前处理配置，请求前根据不同的请求方法进行数据处理及配置
  beforeRequestHook: (config, options) => {
    const { apiUrl, isJoinPrefix, urlPrefix, joinParamsToUrl, formatDate, joinTime = true } = options
    // 添加接口前缀
    if (isJoinPrefix && urlPrefix && isString(urlPrefix)) {
      config.url = `${urlPrefix}${config.url}`
    }

    // 将baseUrl拼接
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }

    const params = config.params || {}
    const data = config.data || false

    if (formatDate && data && !isString(data)) {
      formatRequestDate(data)
    }
    if (config.method?.toUpperCase() === 'GET') {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      } else {
        // 兼容restful风格
        config.url = `${config.url + params}${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else if (!isString(params)) {
      if (formatDate) {
        formatRequestDate(params)
      }
      if (
        Reflect.has(config, 'data') &&
        config.data &&
        (Object.keys(config.data).length > 0 || data instanceof FormData)
      ) {
        config.data = data
        config.params = params
      } else {
        // 非GET请求如果没有提供data，则将params视为data
        config.data = params
        config.params = undefined
      }
      if (joinParamsToUrl) {
        config.url = setObjToUrlParams(config.url as string, { ...config.params, ...config.data })
      }
    } else {
      // 兼容restful风格
      config.url += params
      config.params = undefined
    }
    return config
  },

  // 请求拦截器处理，设置请求头
    requestInterceptors: (config: AxiosRequestConfig) => {
    // 请求之前处理config
    if (config?.url?.indexOf('/user/login') > -1) {
      // console.log('登录')
    } else {
      const token = getToken()
      if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
        ;(config as Recordable).headers['token'] = `${token}`
      }
    }

    return config as InternalAxiosRequestConfig
  },

  // 响应拦截器处理，根据返回的code再进行处理，用来处理业务异常
  responseInterceptors: (res: AxiosResponse) => {
    if (res?.status !== ResultEnum.SUCCESS) {
      Message.error('网络错误！')
    }
    // 请求成功
    else if (res?.data.code === ResultEnum.SUCCESS && res?.status === ResultEnum.SUCCESS) {
      return res
    }
    // 请求文件成功
    else if (String(res?.data.code) === 'undefined' && typeof res?.data && res?.status === ResultEnum.SUCCESS) {
      return res
    }
    // 请求报错
    else {
      Message.error(res?.data.message || '请求错误!')
      setTimeout(() => {
        if (router) router.push('/login')
        else window.location.href = '/login'
      }, 1000)
    }
  },

  // 响应错误处理，根据后端返回错误码进行响应,TODO
  responseInterceptorsCatch: (error: any) => {
    const { config, response } = error
    if (!config || !config.requestOptions.retry) {
      Message.error({ content: response?.message, duration: 1000 })
      return Promise.reject(error)
    }
    // 接口请求重试
    config.retryCount = config.retryCount || 1

    if (config.retryCount >= config.requestOptions.retry.count) return Promise.reject(error)

    config.retryCount += 1

    const backoff = new Promise((resolve) => {
      setTimeout(() => {
        resolve(config)
      }, config.requestOptions.retry.delay || 1)
    })
    config.headers = { ...config.headers, 'Content-Type': ContentTypeEnum.JSON }
    return backoff.then((config) => request.request(config))
  },
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    merge(
      <CreateAxiosOptions>{
        // 请求头,根据实际需求来确定是否需要请求头
        authenticationScheme: TokenEnum.PREFIX,
        // authenticationScheme: '',
        // 超时 时间，默认为10s
        timeout: ResultEnum.TIMEOUT as number,
        // 携带Cookie
        withCredentials: false,
        // 头信息
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 接口地址
          apiUrl: host,
          // 是否自动添加接口前缀
          isJoinPrefix: true,
          // 接口前缀
          urlPrefix: '/api',
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreRepeatRequest: true,
          // 是否携带token
          withToken: true,
          // 重试
          retry: {
            count: 3,
            delay: 2000,
          },
        },
      },
      opt || {}
    )
  )
}

export const request = createAxios()
