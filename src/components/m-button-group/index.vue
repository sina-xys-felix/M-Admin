<template>
  <a-button-group type="text" size="mini">
    <a-space :direction="direction" :size="mode === 'text' ? 'small' : 'mini'">
      <slot name="before"></slot>
      <template v-if="isPermission">
        <a-tooltip :content="t('common.table.look')">
          <a-button
            v-if="showDetail"
            v-permission="detailCode"
            :type="mode !== 'icon' ? 'primary' : 'text'"
            status="normal"
            @click="handleClickOps(Operations.LOOK, record)"
          >
            <div class="flex-btn">
              <icon-eye v-if="mode !== 'text'" size="18" />
              <span v-if="mode !== 'icon'">{{ $t('common.table.look') }}</span>
            </div>
          </a-button>
        </a-tooltip>
        <a-tooltip :content="t('common.table.edit')">
          <a-button
            v-if="showUpdate"
            v-permission="updateCode"
            :type="mode !== 'icon' ? 'primary' : 'text'"
            :status="mode !== 'icon' ? 'success' : 'normal'"
            @click="handleClickOps(Operations.EDIT, record)"
          >
            <div class="flex-btn">
              <icon-edit v-if="mode !== 'text'" size="18" />
              <span v-if="mode !== 'icon'">{{ $t('common.table.edit') }}</span>
            </div>
          </a-button>
        </a-tooltip>
        <a-tooltip :content="t('common.delete')">
          <a-button
            v-if="showRemove"
            v-permission="removeCode"
            :type="mode !== 'icon' ? 'primary' : 'text'"
            :status="mode !== 'icon' ? 'danger' : 'normal'"
            @click="handleClickOps(Operations.DELETE, record)"
          >
            <div class="flex-btn">
              <icon-delete v-if="mode !== 'text'" size="18" />
              <span v-if="mode !== 'icon'">{{ $t('common.delete') }}</span>
            </div>
          </a-button>
        </a-tooltip>
      </template>
      <!-- 不做权限校验时 -->
      <template v-else>
        <a-tooltip :content="t('common.table.look')">
          <a-button
            v-if="showDetail"
            :type="mode !== 'icon' ? 'primary' : 'text'"
            status="normal"
            @click="handleClickOps(Operations.LOOK, record)"
          >
            <div class="flex-btn">
              <icon-eye v-if="mode !== 'text'" size="18" />
              <span v-if="mode !== 'icon'">{{ $t('common.table.look') }}</span>
            </div>
          </a-button>
        </a-tooltip>
        <a-tooltip :content="t('common.table.edit')">
          <a-button
            v-if="showUpdate"
            :type="mode !== 'icon' ? 'primary' : 'text'"
            :status="mode !== 'icon' ? 'success' : 'normal'"
            @click="handleClickOps(Operations.EDIT, record)"
          >
            <div class="flex-btn">
              <icon-edit v-if="mode !== 'text'" size="18" />
              <span v-if="mode !== 'icon'">{{ $t('common.table.edit') }}</span>
            </div>
          </a-button>
        </a-tooltip>
        <a-tooltip :content="t('common.delete')">
          <a-button
            v-if="showRemove"
            :type="mode !== 'icon' ? 'primary' : 'text'"
            :status="mode !== 'icon' ? 'danger' : 'normal'"
            @click="handleClickOps(Operations.DELETE, record)"
          >
            <div class="flex-btn">
              <icon-delete v-if="mode !== 'text'" size="18" />
              <span v-if="mode !== 'icon'">{{ $t('common.delete') }}</span>
            </div>
          </a-button>
        </a-tooltip>
      </template>
      <slot name="after"></slot>
    </a-space>
  </a-button-group>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'
  import { Operations } from '@/common/enums/status-enum'
  import { SpaceSizeProps } from '@/common/types/index'
  import { AnyObject } from '@/common/types/global'

  type DirectionProps = 'vertical' | 'horizontal'

  type ModeTypes = 'icon' | 'text' | 'mix'

  interface IBtnGroupProps {
    record: AnyObject
    updateCode?: string
    detailCode?: string
    removeCode?: string
    direction?: DirectionProps
    size?: SpaceSizeProps
    isPermission?: boolean
    showUpdate?: boolean
    showDetail?: boolean
    showRemove?: boolean
    mode?: ModeTypes
  }

  withDefaults(defineProps<IBtnGroupProps>(), {
    updateCode: '',
    detailCode: '',
    removeCode: '',
    direction: 'horizontal',
    size: 'small',
    isPermission: true,
    showUpdate: true,
    showDetail: true,
    showRemove: true,
    mode: 'icon',
  })

  const emits = defineEmits(['handleClickOps'])

  const { t } = useI18n()

  const handleClickOps = (type: number, record: Partial<T>) => {
    emits('handleClickOps', { type, record })
  }
</script>

<style lang="less" scoped>
  :deep(.arco-btn-size-mini) {
    padding: 0 6px;
  }

  .flex-btn {
    display: flex;
    align-items: center;
    gap: 4px;
  }
</style>
