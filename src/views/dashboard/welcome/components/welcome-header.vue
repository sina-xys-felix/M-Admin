<template>
  <div class="welcome-header">
    <a-avatar shape="circle" :size="48">
      <img alt="avatar" src="@/assets/images/avatar.jpg" />
    </a-avatar>
    <div class="welcome-header-preface">
      <div class="welcome-header-preface__title">
        {{ $t(getTimePeriod()) }}, {{ userName }} ，{{ $t('dashboard.welcome.title') }}。</div
      >
      <div class="welcome-header-preface__time">
        <a-tag size="small" color="arcoblue">{{ $t('dashboard.welcome.tip') }}</a-tag>
        <span style="margin-left: 4px;">{{ dayjs().format('YYYY-MM-DD') }}，{{ $t('dashboard.welcome.speech') }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs'
  import { getTimePeriod } from '@/views/dashboard/utils'
  const userName = ref('')

  onMounted(() => {
    const loginConfig = JSON.parse(localStorage.getItem('login-config') || '{}')
    if (loginConfig.account) {
      userName.value = loginConfig.account
    }
  })
</script>

<style lang="less" scoped>
  .welcome-header {
    display: flex;
    align-items: center;
    gap: 16px;
    height: 72px;
    padding: 0 16px;
    background-color: var(--color-bg-2);
    border-radius: 4px;
    box-shadow: 2px 2px 4px var(--color-neutral-3);
    &-preface {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 8px;
      &__title {
        font-size: 16px;
        font-weight: 500;
        color: var(--color-text-1);
      }
      &__time {
        font-size: 14px;
        color: var(--color-text-2);
      }
    }
  }
</style>
