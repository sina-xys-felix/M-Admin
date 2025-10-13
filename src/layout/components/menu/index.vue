<script lang="tsx">
  import { defineComponent, ref, h, compile, computed } from 'vue'
  import { useRoute, useRouter, RouteRecordRaw } from 'vue-router'
  import type { RouteMeta } from 'vue-router'
  import { useAppStore } from '@/store'
  import { listenerRouteChange } from '@/utils/route-listener'
  import { openWindow, regexUrl } from '@/utils'
  import useMenuTree from './use-menu-tree'

  export default defineComponent({
    emit: ['collapse'],
    setup() {
      const appStore = useAppStore()
      const router = useRouter()
      const route = useRoute()
      const { menuTree } = useMenuTree()
      const collapsed = computed({
        get() {
          if (appStore.device === 'desktop') return appStore.menuCollapse
          return false
        },
        set(value: boolean) {
          appStore.updateSettings({ menuCollapse: value })
        },
      })

      const openKeys = ref<string[]>([])
      const selectedKey = ref<string[]>([])

      const goto = (item: RouteRecordRaw) => {
        // Eliminate external link side effects
        const { hideInMenu, activeMenu, type } = item.meta as RouteMeta
        if (route.name === item.name && !hideInMenu && !activeMenu) {
          selectedKey.value = [item.name as string]
          return
        }
        // Open external link
        if (regexUrl.test(item.path) || type === 'screen') {
          openWindow(item.path)
          selectedKey.value = [item.name as string]
          return
        }
        // Trigger router change
        if (type !== 'screen')
          router.push({
            name: item.name,
          })
      }

      const findMenuOpenKeys = (target: string) => {
        const result: string[] = []
        let isFind = false
        const backtrack = (item: RouteRecordRaw, keys: string[]) => {
          if (item.name === target) {
            isFind = true
            result.push(...keys)
            return
          }
          if (item.children?.length) {
            item.children.forEach((el) => {
              backtrack(el, [...keys, el.name as string])
            })
          }
        }
        menuTree.value.forEach((el: RouteRecordRaw) => {
          if (isFind) return // Performance optimization
          backtrack(el, [el.name as string])
        })
        return result
      }

      listenerRouteChange((newRoute) => {
        const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta
        if (requiresAuth && (!hideInMenu || activeMenu)) {
          const menuOpenKeys = findMenuOpenKeys((activeMenu || newRoute.name) as string)

          const keySet = new Set([...menuOpenKeys, ...openKeys.value])
          openKeys.value = [...keySet]

          selectedKey.value = [activeMenu || menuOpenKeys[menuOpenKeys.length - 1]]
        }
      }, true)

      const setCollapse = (val: boolean) => {
        if (appStore.device === 'desktop') appStore.updateSettings({ menuCollapse: val })
      }

      const renderSubMenu = () => {
        function travel(_route: RouteRecordRaw[], nodes = []) {
          if (_route) {
            _route.forEach((element, index) => {
              const childrenLen = element.children?.length ?? 0

              const icon = element?.meta?.icon
                ? () =>
                    h(
                      compile(
                        `<icon-${element?.meta?.icon} style="font-size:${
                          childrenLen || !element.component ? '20px' : '18px'
                        };color: var(--color-white);background-color: ${
                          index % 2 === 0 ? 'rgb(22,93,255)' : 'rgb(35,195,67)'
                        };padding: 2px;border-radius: 4px;font-weight:500" />
                        `,
                      ),
                    )
                : null
              const node =
                element?.children && element?.children.length !== 0 ? (
                  <a-sub-menu
                    key={element?.name}
                    v-slots={{
                      icon,
                      title: () =>
                        h(
                          compile(
                            `<span style="color:${appStore.darkMenu ? '#ffffff' : 'var(--color-text-1)'}">${
                              element?.meta?.locale || ''
                            }</span>`,
                          ),
                        ),
                    }}
                  >
                    {travel(element?.children)}
                  </a-sub-menu>
                ) : (
                  <a-menu-item key={element?.name} v-slots={{ icon }} onClick={() => goto(element)}>
                    <span style={{ color: appStore.darkMenu ? '#ffffff' : 'var(--color-text-1)' }}>
                      {element?.meta?.locale || ''}
                    </span>
                  </a-menu-item>
                )
              nodes.push(node as never)
            })
          }
          return nodes
        }
        return travel(menuTree.value)
      }

      return () => (
        <a-menu
          mode={appStore.topMenu ? 'horizontal' : 'vertical'}
          v-model:collapsed={collapsed.value}
          theme={appStore.darkMenu ? 'dark' : 'light'}
          v-model:open-keys={openKeys.value}
          show-collapse-button={appStore.device !== 'mobile'}
          auto-open={false}
          selected-keys={selectedKey.value}
          auto-open-selected={true}
          level-indent={34}
          style="height: 100%;width:100%;"
          onCollapse={setCollapse}
        >
          {renderSubMenu()}
        </a-menu>
      )
    },
  })
</script>

<style lang="less" scoped>
  :deep(.arco-menu-inner) {
    .arco-menu-inline-header {
      display: flex;
      align-items: center;
    }
    .arco-icon {
      &:not(.arco-icon-down) {
        font-size: 18px;
      }
    }
    .arco-menu-title {
      color: var(--color-text-1);
      font-weight: 400;
    }
  }
</style>
