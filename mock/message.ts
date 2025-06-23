import { defineMock } from './config'
import { successResponseWrap } from '../src/utils/setup-mock'

const haveReadIds: number[] = []

export const getMessageList = () => {
  return [
    {
      id: 1,
      type: 'message',
      title: '林月如',
      subTitle: '的私信',
      avatar: 'https://img1.baidu.com/it/u=1439992138,2694401344&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
      content: '后山有一处瀑布，一起去看吗',
      time: '今天 13:30:00',
    },
    {
      id: 2,
      type: 'message',
      title: '小师妹',
      subTitle: '的回复',
      avatar: 'https://img0.baidu.com/it/u=557649235,4004761037&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
      content: '哥哥，你在吗',
      time: '今天 09:30:01',
    },
    {
      id: 3,
      type: 'message',
      title: '大师姐',
      subTitle: '的回复',
      avatar: 'https://img1.baidu.com/it/u=3452262325,2491561493&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
      content: '今天功课做完了吗',
      time: '今天 10:20:01',
    },
    {
      id: 4,
      type: 'notice',
      title: '任务通知',
      subTitle: '',
      avatar: '',
      content: '您当前的任务已做完，如果更多任务请到任务大厅处认领。',
      time: '今天 12:20:01',
      messageType: 1,
    },
    {
      id: 5,
      type: 'notice',
      title: '任务完成通知',
      subTitle: '',
      avatar: '',
      content: 'XX任务已完成，耗时X天/X小时，验收通过。',
      time: '今天 12:20:01',
      messageType: 1,
    },
    {
      id: 6,
      type: 'todo',
      title: '小师妹的请假审批',
      subTitle: '',
      avatar: '',
      content: '因xxxxxx,特向师兄请假，望批准。',
      time: '今天 12:20:01',
      messageType: 0,
    },
  ].map((item) => ({
    ...item,
    status: haveReadIds.indexOf(item.id) === -1 ? 0 : 1,
  }))
}

export default defineMock([
  {
    url: '/message/list',
    method: 'get',
    timeout: 50,
    response: () => {
      return successResponseWrap(getMessageList())
    },
  },
])
