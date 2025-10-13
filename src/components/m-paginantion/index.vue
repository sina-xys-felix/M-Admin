<template>
  <!-- 重写表格分页布局 -->
  <div class="m-paginantion">
    <div class="m-paginantion-left">
      <span v-if="!flag">共{{ pageable.total || 0 }}条</span>
      <slot v-else name="page-total" :total="pageable.total"></slot>
    </div>
    <div class="m-paginantion-right">
      <a-select
        v-model="pageable.pageSize"
        :style="{ width: '120px' }"
        :options="pageSelect"
        placeholder="请选择"
        @change="handleSizeChange"
      >
      </a-select>
      <a-pagination
        :current="pageable.current"
        :page-size="pageable.pageSize"
        :total="pageable.total || 0"
        show-jumper
        @change="handleCurrentChange"
      >
        <!-- 保留原有的插槽-->
        <template #page-item-ellipsis>
          <slot name="page-item-ellipsis"></slot>
        </template>
        <template #page-item-step="{ type }">
          <slot name="page-item-step" :type="type"></slot>
        </template>
        <template #page-item="{ page }">
          <slot name="page-item" :page="page"></slot>
        </template>
      </a-pagination>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'MPagination',
  }
</script>

<script setup lang="ts" name="MPagination">

  import { Pagination } from '@/common/types/global'
  import { PAGINATION_OPTIONS_1, PAGINATION_OPTIONS_2, PAGINATION_OPTIONS_4 } from '@/common/constants'
  import { useScreenInfo } from '@/hooks/use-screen-info'

  interface PaginationProps {
    pageable: Pagination
    handleCurrentChange: (current: number) => void
    handleSizeChange: (size: number) => void
    flag: boolean
  }

  interface PaginationOption {
    /** 根据实际业务调整类型 */
    value: string | number
    /** 翻译前的标签 key */
    label: string
  }

  withDefaults(defineProps<PaginationProps>(), {
    flag: true,
  })



  const { resolutionLevel } = useScreenInfo()

  /** 定义分辨率等级到选项的映射 */
  const RESOLUTION_TO_OPTIONS: Record<number, PaginationOption[]> = {
    10: PAGINATION_OPTIONS_1, // 1K
    15: PAGINATION_OPTIONS_2, // 2K
    30: PAGINATION_OPTIONS_4, // 4K
  }

  console.log('resolutionLevel:' + resolutionLevel.value)

  /** 在计算属性中直接使用中文文本 */
  const pageSelect = computed<PaginationOption[]>(() => {
    const sourceOptions = RESOLUTION_TO_OPTIONS[resolutionLevel.value] || PAGINATION_OPTIONS_1
    // 直接使用中文文本，不再需要翻译
    return sourceOptions.map((item) => ({ 
      ...item, 
      label: item.label === 'pagination.pageSize.10' ? '10条/页' : 
             item.label === 'pagination.pageSize.20' ? '20条/页' : 
             item.label === 'pagination.pageSize.50' ? '50条/页' : 
             item.label === 'pagination.pageSize.100' ? '100条/页' : 
             item.label 
    }))
  })
</script>

<style lang="less" scoped>
  @import '@/assets/style/global.less';

  .m {
    &-paginantion {
      width: 100%;
      .flex-layout();

      &-left {
        color: var(--color-text-2);
      }

      &-right {
        .flex-layout();
      }
    }
  }
</style>
