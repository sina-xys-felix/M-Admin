<template>
  <div class="container">
    <Particles id="particles" :options="options" />
    <loginForm />
    <Footer v-if="settings.footer" />

    <a-tooltip :content="theme === 'light' ? $t('settings.navbar.theme.toDark') : $t('settings.navbar.theme.toLight')">
      <a-button class="nav-btn" type="text" :shape="'circle'" @click="handleToggleTheme">
        <template #icon>
          <icon-moon-fill v-if="theme === 'dark'" />
          <icon-sun-fill color="#dfebfc" v-else />
        </template>
      </a-button>
    </a-tooltip>
  </div>
</template>

<script lang="ts" setup>
  import { useDark, useToggle } from '@vueuse/core'
  import { useAppStore } from '@/store'
  import settings from '@/config/settings.json'
  import loginForm from './components/login-form.vue'
  import Footer from '@/layout/components/footer/index.vue'

  const appStore = useAppStore()

  const options = {
    fpsLimit: 60,
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onClick: {
          // 开启鼠标点击的效果
          enable: true,
          mode: 'push',
        },
        onHover: {
          // 开启鼠标悬浮的效果(线条跟着鼠标移动)
          enable: true,
          mode: 'grab',
        },
        resize: true,
      },
      modes: {
        // 配置动画效果
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40,
        },
        push: {
          quantity: 4,
        },
        grab: {
          distance: 200,
          duration: 0.4,
        },
        attract: {
          // 鼠标悬浮时，集中于一点，鼠标移开时释放产生涟漪效果
          distance: 200,
          duration: 0.4,
          factor: 5,
        },
      },
    },
    particles: {
      color: {
        value: '#6EC1F9', // 粒子点的颜色
      },
      links: {
        color: '#80D8FA', // 线条颜色
        distance: 150, //线条距离
        enable: true,
        opacity: 0.4, // 不透明度
        width: 1.2, // 线条宽度
      },
      collisions: {
        enable: true,
      },
      move: {
        attract: { enable: false, rotateX: 600, rotateY: 1200 },
        bounce: false,
        direction: 'none',
        enable: true,
        out_mode: 'out',
        random: false,
        speed: 0.5, // 移动速度
        straight: false,
      },
      number: {
        density: {
          enable: true,
          value_area: 800,
        },
        value: 80, //粒子数
      },
      opacity: {
        //粒子透明度
        value: 0.7,
      },
      shape: {
        //粒子样式
        type: 'circle',
      },
      size: {
        //粒子大小
        random: true,
        value: 3,
      },
    },
    detectRetina: false,
  }

  const theme = computed(() => {
    return appStore.theme
  })

  const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'arco-theme',
    onChanged(dark: boolean) {
      appStore.toggleTheme(dark)
    },
  })
  const toggleTheme = useToggle(isDark)
  const handleToggleTheme = () => {
    toggleTheme()
  }
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: var(--color-bg-lg-1);
    position: relative;

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }
    .nav-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      color: rgb(var(--text-color-2));
      font-size: 16px;
    }
  }

  :deep(.arco-input-wrapper) {
    border-radius: 16px;
  }

  :deep(.arco-btn-icon) {
    color: var(--color-icon);
  }
</style>
