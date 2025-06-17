<template>
  <Card :title="$t('dashboard.welcome.dynamicList')">
    <div class="dynamic-list" :style="{ maxHeight: height - 44 + 'px', overflowY: 'auto' }">
      <div class="row header-bg">
        <div class="col-index">序号</div>
        <div class="col-description">动态</div>
        <div class="col-time">发生时间</div>
      </div>
      <div class="row" v-for="(item, index) in dynamicList" :key="item">
        <div class="col-index">{{ index + 1 }}</div>
        <div class="col-description">{{ item.description }}</div>
        <div class="col-time">{{ item.time }}</div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import Card from '@/views/dashboard/components/card.vue'
  defineProps({
    height: {
      type: Number,
      default: 0,
    },
  })
  const dynamicList = ref<any[]>([])
  const generateRandomDescription = () => {
    const actions = ['完成了', '启动了', '优化了', '改进了', '部署了', '更新了', '修复了', '升级了', '重构了', '测试了']
    const departments = ['研发部', '产品部', '市场部', '销售部', '客服部', '运营部', '财务部', '人事部', '技术部', '设计部']
    const projects = ['新功能开发', '系统升级', '性能优化', 'bug修复', '代码重构', '项目部署', '需求分析', '用户调研', '产品迭代', '安全加固']
    
    const action = actions[Math.floor(Math.random() * actions.length)]
    const department = departments[Math.floor(Math.random() * departments.length)]
    const project = projects[Math.floor(Math.random() * projects.length)]
    
    return `${department}${action}${project}，项目进展顺利。`
  }
  onMounted(() => {
    dynamicList.value = Array.from({ length: 7 }, (_, index) => ({
      id: index + 1,
      description: generateRandomDescription(),
      time: dayjs().format('YYYY-MM-DD'),
    }))
  })
</script>

<style scoped lang="less">
  :deep(.arco-list-medium .arco-list-content-wrapper .arco-list-header) {
    padding: 0;
  }
  :deep(.arco-list-medium .arco-list-content-wrapper .arco-list-content > .arco-list-item) {
    padding: 8px 16px;
  }

  .dynamic-list {
    padding: 16px;
    .header-bg {
      color: var(--color-text-1);
      background-color: var(--color-fill-2);
    }
    .row {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 16px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--color-border-2);
      color: var(--color-text-1);
      .col-index {
        width: 60px;
      }
      .col-description {
        flex: 1;
      }
      .col-time {
        width: 100px;
      }
    }
  }
</style>
