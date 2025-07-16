<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in" appear>
      <component :is="Component" :key="route.fullPath" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useTabBarStore } from '@/store'

  const tabBarStore = useTabBarStore()

  computed(() => tabBarStore.getCacheList)
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.1s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
