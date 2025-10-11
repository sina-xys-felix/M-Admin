<template>
  <div class="welcome">
    <div class="welcome-container">
      <WelcomeHeader />
      <div class="welcome-container-content flex-1">
        <WelcomeTechnology class="flex-3"></WelcomeTechnology>
        <WelcomeIntroduction class="flex-1"></WelcomeIntroduction>
      </div>
      <div class="welcome-container-content flex-2" :style="{ height: dynamic_height + 'px' }">
        <WelcomeDynamicList class="flex-3" :height="dynamic_height"></WelcomeDynamicList>
        <WelcomeMessage class="flex-1" :height="dynamic_height"></WelcomeMessage>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/store'
import WelcomeHeader from './components/welcome-header.vue'
import WelcomeTechnology from './components/welcome-technology.vue'
import WelcomeIntroduction from './components/welcome-introduction.vue'
import WelcomeMessage from './components/welcome-message.vue'
import WelcomeDynamicList from './components/welcome-dynamicList.vue'

const appStore = useAppStore()
const dynamic_height = ref<number>(0)

const updateHeight = () => {
  dynamic_height.value = document.body.clientHeight - 498
  if (appStore.footer) {
    dynamic_height.value = dynamic_height.value - 48
  }
}

onMounted(() => {
  updateHeight()
  window.addEventListener('resize', updateHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeight)
})

watch(
  () => appStore.footer,
  (newVal) => {
    if (newVal) {
      dynamic_height.value = dynamic_height.value - 40
    } else {
      dynamic_height.value = document.body.clientHeight - 490
    }
  }
)
</script>

<style lang="less" scoped>
.welcome {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  gap: 16px;
  overflow: auto; // 防止外层容器滚动

  &-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow: auto; // 允许容器内容滚动
    min-height: 0; // 防止flex子元素溢出

    &-content {
      display: flex;
      gap: 16px;
      min-height: 0; // 防止flex子元素溢出

      .flex-1 {
        flex: 1;
        min-width: 0; // 防止flex子元素溢出
        overflow: auto; // 允许内容滚动
      }

      .flex-2 {
        flex: 2;
        min-width: 0; // 防止flex子元素溢出
        overflow: auto; // 允许内容滚动
      }

      .flex-3 {
        flex: 3;
        min-width: 0; // 防止flex子元素溢出
        overflow: auto; // 允许内容滚动
      }
    }
  }
}

// 响应式布局
@media screen and (max-width: 768px) {
  .welcome {
    &-container {
      &-content {
        flex-direction: column;

        .flex-1,
        .flex-2,
        .flex-3 {
          width: 100%;
        }
      }
    }
  }
}
</style>
