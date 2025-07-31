<template>
  <div
    class="navbar"
    :style="{
      backgroundColor: appStore.darkMenu ? 'var(--color-menu-dark-bg)' : 'var(--color-bg-2)',
      borderColor: appStore.darkMenu ? '#373739' : '',
    }"
  >
    <div class="left-side">
      <a-space>
        <img alt="logo" width="40" height="40" src="@/assets/images/logo.png" />
        <a-typography-title
          type="danger"
          :style="{
            margin: 0,
            fontSize: '24px',
            color: appStore.darkMenu ? 'var(--color-white)' : 'var(--color-text-1)',
          }"
          :heading="1"
        >
          M-Admin
        </a-typography-title>
        <icon-menu-fold
          v-if="!topMenu && appStore.device === 'mobile'"
          style="font-size: 22px; cursor: pointer"
          @click="toggleDrawerMenu"
        />
      </a-space>
    </div>
    <div class="center-side">
      <Menu style="width: 100%" v-if="appStore.topMenu" />
    </div>
    <ul class="right-side">
      <li>
        <a-tooltip :content="$t('settings.language')">
          <a-button
            class="nav-btn"
            type="text"
            :shape="'circle'"
            @click="setDropDownVisible"
          >
            <template #icon>
              <icon-language  />
            </template>
          </a-button>
        </a-tooltip>
        <a-dropdown trigger="click" @select="changeLocale">
          <div ref="triggerBtn" class="trigger-btn"></div>
          <template #content>
            <a-doption v-for="item in locales" :key="item.value" :value="item.value">
              <template #icon>
                <icon-check v-show="item.value === currentLocale" />
              </template>
              {{ item.label }}
            </a-doption>
          </template>
        </a-dropdown>
      </li>
      <li>
        <a-tooltip
          :content="theme === 'light' ? $t('settings.navbar.theme.toDark') : $t('settings.navbar.theme.toLight')"
        >
          <a-button
            class="nav-btn"
            type="text"
            :shape="'circle'"
            @click="handleToggleTheme"
          >
            <template #icon>
              <icon-moon-fill v-if="theme === 'dark'" />
              <icon-sun-fill v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip :content="$t('settings.navbar.alerts')">
          <div class="message-box-trigger">
            <a-badge :count="9" dot>
              <a-button
                class="nav-btn"
                type="text"
                :shape="'circle'"
                @click="setPopoverVisible"
              >
                <icon-notification />
              </a-button>
            </a-badge>
          </div>
        </a-tooltip>
        <a-popover
          trigger="click"
          :arrow-style="{ display: 'none' }"
          :content-style="{ padding: 0, width: '400px' }"
          content-class="message-popover"
        >
          <div ref="refBtn" class="ref-btn"></div>
          <template #content>
            <message-box />
          </template>
        </a-popover>
      </li>
      <li>
        <a-tooltip :content="isFullscreen ? $t('settings.navbar.screen.toExit') : $t('settings.navbar.screen.toFull')">
          <a-button
            class="nav-btn"
            type="text"
            :shape="'circle'"
            @click="toggleFullScreen"
          >
            <template #icon>
              <icon-fullscreen-exit v-if="isFullscreen" />
              <icon-fullscreen v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip :content="$t('settings.title')">
          <a-button
            class="nav-btn"
            type="text"
            :shape="'circle'"
            @click="setVisible"
          >
            <template #icon>
              <icon-settings />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-dropdown trigger="click">
          <a-avatar shape="circle" :size="32">
            <img alt="avatar" src="@/assets/images/avatar.jpg" />
          </a-avatar>
          <template #content>
            <a-doption>
              <a-space @click="handleClick('1')">
                <icon-tag class="icon-normal" />
                <span>
                  {{ $t('navbar.action.document') }}
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleClick('2')">
                <icon-google-circle-fill class="icon-success" />
                <span>
                  {{ $t('navbar.action.gitee') }}
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleClick('3')">
                <icon-github class="icon-normal" />
                <span>
                  {{ $t('navbar.action.github') }}
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export class="icon-success" />
                <span>
                  {{ $t('messageBox.logout') }}
                </span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, inject } from 'vue'
  import { useDark, useToggle, useFullscreen } from '@vueuse/core'
  import { useAppStore } from '@/store'
  import { LOCALE_OPTIONS } from '@/locale'
  import useLocale from '@/hooks/locale'
  import useUser from '@/hooks/user'
  import Menu from '@/layout/components/menu/index.vue'
  import MessageBox from '@/components/message-box/index.vue'

  const appStore = useAppStore()
  const { logout } = useUser()
  const { changeLocale, currentLocale } = useLocale()
  const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()
  const locales = [...LOCALE_OPTIONS]
  const theme = computed(() => {
    return appStore.theme
  })
  const topMenu = computed(() => appStore.topMenu && !appStore.menu)
  const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'arco-theme',
    onChanged(dark: boolean) {
      // overridden default behavior
      appStore.toggleTheme(dark)
    },
  })
  const toggleTheme = useToggle(isDark)
  const handleToggleTheme = () => {
    toggleTheme()
  }
  const setVisible = () => {
    appStore.updateSettings({ globalSettings: true })
  }
  const refBtn = ref()
  const triggerBtn = ref()
  const setPopoverVisible = () => {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    refBtn.value.dispatchEvent(event)
  }
  const handleLogout = () => {
    logout()
  }
  const setDropDownVisible = () => {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    triggerBtn.value.dispatchEvent(event)
  }
  const handleClick = async (type: string) => {
    if (type === '1') {
      window.open('http://doc.m-admin.cn', '_blank')
    }
    if (type === '2') {
      window.open('https://gitee.com/sina_xys/M-Admin', '_blank')
    }
    if (type === '3') {
      window.open('https://github.com/sina-xys-felix/M-Admin', '_blank')
    }
  }
  const toggleDrawerMenu = inject('toggleDrawerMenu') as () => void
</script>

<style scoped lang="less">
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
  }

  .icon-normal {
    background-color: rgb(var(--primary-6));
    padding: 2px;
    border-radius: 4px;
    color: var(--color-white);
    font-size: 16px;
  }

  .icon-success {
    background-color: rgb(var(--success-5));
    padding: 2px;
    border-radius: 4px;
    color: var(--color-white);
    font-size: 16px;
  }

  .left-side {
    display: flex;
    align-items: center;
    padding-left: 16px;
  }

  .center-side {
    flex: 1;
  }

  .right-side {
    display: flex;
    padding-right: 16px;
    list-style: none;
    :deep(.locale-select) {
      border-radius: 20px;
    }
    li {
      display: flex;
      align-items: center;
      padding: 0 6px;
    }

    a {
      color: var(--color-text-1);
      text-decoration: none;
    }
    .nav-btn {
      // border-color: rgb(var(--gray-2));
      color: rgb(var(--gray-8));
      font-size: 18px;
    }
    .trigger-btn,
    .ref-btn {
      position: absolute;
      bottom: 14px;
    }
    .trigger-btn {
      margin-left: 14px;
    }
  }

  :deep(.arco-menu-collapsed .arco-menu-has-icon > *:not(.arco-menu-icon)) {
    opacity: 1;
  }
  :deep(.arco-menu) {
    width: 100%;
  }
  :deep(.arco-icon) {
    stroke-width: 4px;
    font-size: 1.125em;
  }
</style>

<style lang="less">
  .message-popover {
    .arco-popover-content {
      margin-top: 0;
    }
  }
</style>
