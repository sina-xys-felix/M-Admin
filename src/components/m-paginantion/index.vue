<template>
  <!-- 重写表格分页布局 -->
  <div class="m-paginantion">
    <div class="m-paginantion-left">
      <span v-if="!flag">{{ $t('paniation.total') }}{{ pageable.total || 0 }}{{ $t('paniation.line') }}</span>
      <slot v-else name="page-total" :total="pageable.total"></slot>
    </div>
    <div class="m-paginantion-right">
      <a-select
        v-model="pageable.pageSize"
        :style="{ width: '120px' }"
        :options="pageSelect"
        :placeholder="$t('common.select')"
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
    name: 'XPagination',
  }
</script>

<script setup lang="ts" name="XPagination">
  import { useI18n } from 'vue-i18n'
  import { Pagination } from '@/common/types/global'
  import { PAGINATION_OPTIONS } from '@/common/constants'

  interface PaginationProps {
    pageable: Pagination
    handleCurrentChange: (current: number) => void
    handleSizeChange: (size: number) => void
    flag: boolean
  }

  withDefaults(defineProps<PaginationProps>(), {
    flag: true,
  })

  const { t } = useI18n()

  const pageSelect = computed(() => {
    return PAGINATION_OPTIONS.map((item: any) => {
      return {
        value: item.value,
        label: t(`${item.label}`),
      }
    })
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
