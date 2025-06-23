<template>
  <Card :title="$t('dashboard.welcome.introduction')">
    <div class="introduction">
      <div class="introduction-header">
        感谢您选择M-Admin作为您的项目开发脚手架。
        M-Admin是一款基于Vue3的轻量级后台管理框架，旨在为开发者提供一个快速、简洁、易用的后台管理系统。
      </div>
      <div class="introduction-content">
        <p
          >文档地址：<a href="http://doc.m-admin.cn/" target="_blank"
            >http://doc.m-admin.cn/</a
          ></p
        >
        <p>
          Github源码：<a href="https://github.com/sina-xys-felix/M-Admin" target="_blank"
            >https://github.com/sina-xys-felix/M-Admin</a
          >
        </p>
        <p>
          Gitee源码：<a href="https://github.com/sina-xys-felix/M-Admin" target="_blank"
            >https://gitee.com/sina_xys/M-Admin</a
          >
        </p>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
  import Card from '@/views/dashboard/components/card.vue'
</script>

<style scoped lang="less">
  .introduction {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    &-header {
      font-weight: 500;
      line-height: 24px;
      color: var(--color-text-1);
    }
    &-content {
      color: var(--color-text-2);
      a {
        color: rgb(var(--primary-6));
      }
    }
  }
</style>
