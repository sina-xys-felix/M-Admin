<template>
  <a-button-group type="text" size="mini">
    <a-space :direction="direction" :size="[0, 0]">
      <slot name="before"></slot>
      <template v-if="isPermission">
        <a-tooltip :content="t('common.table.look')">
          <a-button v-if="showDetail" v-permission="detailCode" @click="handleClickOps(Operations.LOOK, record)">
            <icon-eye size="18" />
          </a-button>
        </a-tooltip>
        <a-tooltip :content="t('common.table.edit')">
          <a-button v-if="showUpdate" v-permission="updateCode" @click="handleClickOps(Operations.EDIT, record)">
            <icon-edit size="18" />
          </a-button>
        </a-tooltip>
        <a-tooltip :content="t('common.table.delete')">
          <a-button v-if="showRemove" v-permission="removeCode" @click="handleClickOps(Operations.DELETE, record)">
            <icon-delete size="16" />
          </a-button>
        </a-tooltip>
      </template>
      <!-- 不做权限校验时 -->
      <template v-else>
        <a-tooltip :content="t('common.table.look')">
          <a-button v-if="showDetail" @click="handleClickOps(Operations.LOOK, record)">
            <icon-eye size="18" />
          </a-button>
        </a-tooltip>
        <a-tooltip :content="t('common.table.edit')">
          <a-button v-if="showUpdate" @click="handleClickOps(Operations.EDIT, record)">
            <icon-edit size="18" />
          </a-button>
        </a-tooltip>
        <a-tooltip :content="t('common.table.delete')">
          <a-button v-if="showRemove" @click="handleClickOps(Operations.DELETE, record)">
            <icon-delete size="16" />
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
  // 思考？不参与权限校验，只显示部分,实现方式
  type DirectionProps = 'vertical' | 'horizontal'

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
</style>
