import Mock from 'mockjs'
import dayjs from 'dayjs'
import { defineMock } from './config'
import { successResponseWrap } from '../src/utils/setup-mock'

export default defineMock([
  {
    url: '/content-publish',
    method: 'get',
    timeout: 50,
    response: () => {
      const generateLineData = (name: string) => {
        const result = {
          name,
          x: [] as string[],
          y: [] as number[],
        }
        new Array(12).fill(0).forEach((_item, index) => {
          result.x.push(`${index + 1}月`)
          result.y.push(Mock.Random.natural(1000, 6000))
        })
        return result
      }
      return successResponseWrap([generateLineData('纯文本'), generateLineData('图文类'), generateLineData('视频类')])
    },
  },
  {
    url: '/content-data',
    method: 'get',
    timeout: 50,
    response: () => {
      const presetData = [58, 81, 53, 90, 64, 88, 49, 79]
      const getLineData = () => {
        const count = 8
        return new Array(count).fill(0).map((el, idx) => ({
          x: dayjs()
            .day(idx - 2)
            .format('YYYY-MM-DD'),
          y: presetData[idx],
        }))
      }
      return successResponseWrap([...getLineData()])
    },
  },
])
