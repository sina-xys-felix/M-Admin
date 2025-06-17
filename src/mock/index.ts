import Mock from 'mockjs'
import './user'
import './message-box'

import '@/views/system/roles/mock'
import '@/views/table/base/mock'
import '@/views/system/dictionaries/mock'
import '@/views/system/user/mock'
import '@/views/system/menu/mock'
import '@/views/dashboard/analysis/mock'
import '@/views/components/mock'

Mock.setup({
  timeout: '600-1000',
})
