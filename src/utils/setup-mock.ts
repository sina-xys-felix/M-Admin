import debug from './env'

export default ({ mock, setup }: { mock?: boolean; setup: () => void }) => {
  if (mock !== false && debug) setup()
}

export const successResponseWrap = (data: unknown) => {
  return {
    data,
    status: 200,
    msg: '请求成功',
    code: 200,
  }
}

export const failResponseWrap = (data: unknown, msg: string, code = 50000) => {
  return {
    data,
    status: 500,
    msg,
    code,
  }
}
