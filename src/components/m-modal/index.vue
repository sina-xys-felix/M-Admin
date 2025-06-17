<template>
  <a-modal
    v-bind="$attrs"
    :visible="visible"
    :width="width"
    :footer="footer"
    :title-align="titleAlign"
    @ok="submit"
    @cancel="cancel"
  >
    <template #title>
      <slot name="title"></slot>
    </template>
    <div class="modal-body" :style="{ height: fixedHeight + 'px' }">
      <slot></slot>
    </div>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </a-modal>
</template>

<script lang="ts">
  export default {
    name: 'XModal',
  }
</script>

<script setup lang="ts">
  type AlignProps = 'start' | 'center'

  interface IModalProps {
    visible: boolean
    width?: string | number
    titleAlign?: AlignProps
    footer?: boolean
    height?: number // 0~1之间,高度占屏幕的比例
    cancel?: () => void
    submit?: () => void
  }

  const props = withDefaults(defineProps<IModalProps>(), {
    visible: false,
    footer: true,
    titleAlign: 'start',
    width: '880px',
    height: 0.7,
  })

  const fixedHeight = document.documentElement.offsetHeight * props.height - 112
</script>

<style lang="less" scoped>
  .modal-body {
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
