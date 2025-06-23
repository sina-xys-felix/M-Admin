<template>
  <Card :title="$t('dashboard.welcome.messageNotification')">
    <div class="message-notification" :style="{ height: height - 44 + 'px' }">
      <vue3-seamless-scroll
        :list="notificationList"
        :step="0.35"
        :hover="true"
        class="scroll-container"
      >
        <div v-for="(item, index) in notificationList" :key="index" class="message-notification-item">
          <div class="message-notification-item-left">
            <a-avatar :size="48" :style="{ backgroundColor: item.type === 'message' ? '#165dff' : '#00b42a' }">
              <img src="@/assets/images/avatar.jpg" alt="logo" />
            </a-avatar>
          </div>
          <div class="message-notification-item-right">
            <div class="message-notification-item-title">
              <span class="message-notification-item-title-text">
                <a-tag :color="item.type === 'message' ? 'rgb(var(--primary-6))' : 'rgb(var(--success-6))'" size="small">
                  {{ item.type === 'message' ? '消息' : '通知' }}
                </a-tag>
                {{ item.title }}
              </span>
            </div>
            <div class="message-notification-item-content">
              <span class="message-notification-item-content-text">
                {{ item.content }}
              </span>
            </div>
          </div>
        </div>
      </vue3-seamless-scroll>
    </div>
  </Card>
</template>

<script setup lang="ts">
  import Card from '@/views/dashboard/components/card.vue'
  import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

  defineProps({
    height: {
      type: Number,
      default: 0,
    },
  })

  // 模拟消息通知数据
  const notificationList = ref([
    {
      type: 'message',
      title: '系统消息',
      content: '欢迎使用新版本系统，新功能已上线。',
    },
    {
      type: 'notification',
      title: '系统通知',
      content: '系统将于今晚22:00进行维护升级。',
    },
    {
      type: 'message',
      title: '任务提醒',
      content: '您有3个待处理的任务需要完成。',
    },
    {
      type: 'notification',
      title: '更新通知',
      content: '系统已更新到最新版本。',
    },
  ])
</script>

<style lang="less" scoped>
  @spacing-base: 8px;

  .message-notification {
    overflow: hidden;

    .scroll-container {
      height: 100%;
    }

    .message-notification-item {
      padding: @spacing-base;
      border-bottom: 1px solid var(--color-border-2);
      display: flex;
      gap: @spacing-base;

      &:last-child {
        border-bottom: none;
      }

      &-left {
        flex-shrink: 0;
      }

      &-right {
        flex: 1;
        min-width: 0;
      }

      &-title {
        margin-bottom: 8px;

        &-text {
          color: var(--color-text-1);
          display: flex;
          align-items: center;
          gap: 8px;
        }
      }

      &-content {
        &-text {
          color: var(--color-text-2);
          font-size: 14px;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>
