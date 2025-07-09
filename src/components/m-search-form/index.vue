<!-- 查询条件-->
<template>
  <a-row justify="center" :class="{ 'search-form': true }">
    <a-col :flex="1">
      <a-form :model="searchParam" label-align="left" :auto-label-width="true">
        <a-row :gutter="ROW_GUTTER">
          <a-col
            v-for="(item, index) in expand
              ? searchColumns
              : searchColumns.slice(
                  0,
                  isSplit ? GRID_TOTAL / DEFAULT_GRID_NUMS_EXTEND : GRID_TOTAL / DEFAULT_GRID_NUMS
                )"
            :key="item.dataIndex + '' + index"
            :span="item?.search?.span ?? (isSplit ? DEFAULT_GRID_NUMS_EXTEND : DEFAULT_GRID_NUMS)"
            :offset="item?.search?.offset ?? 0"
          >
            <a-form-item
              :label-col-props="{ span: item.search?.custom ? 0 : 6 }"
              :wrapper-col-props="{ span: item.search?.custom ? 24 : 18 }"
              :field="`${item.dataIndex}`"
              :label="`${item.search?.custom ? '' : `${item.title}`}`"
            >
              <MSearchFormItem :column="item" :search-param="searchParam" />
            </a-form-item>
          </a-col>
          <slot name="custom-search"></slot>
        </a-row>
      </a-form>
    </a-col>
    <!--      -->
    <a-divider
      :style="{
        height: `${rows > 1 ? (expand ? rowHeight : 32) : rowHeight}px`,
        opacity: rows <= 1 && !showLine ? '0' : '1',
      }"
      direction="vertical"
    />
    <a-col :flex="'86px'" style="text-align: right">
      <a-space :direction="rows > 1 && expand ? 'vertical' : 'horizontal'" fill>
        <a-button type="primary" @click="search">
          <template #icon>
            <icon-search size="16" />
          </template>
          搜索
        </a-button>
        <a-button @click="reset">
          <template #icon>
            <icon-refresh size="16" />
          </template>
          清空
        </a-button>
        <a-button v-if="rows > 2 && showExpand" type="primary" @click="onExpand">
          <template #icon>
            <icon-double-right v-if="expand" size="16" />
            <icon-double-down v-else size="16" />
          </template>
          {{ expand ? '收起' : '展开' }}
        </a-button>
        <slot name="extra"></slot>
      </a-space>
    </a-col>
  </a-row>
</template>

<script lang="ts">
  export default {
    name: 'MSearchForm',
  }
</script>

<script lang="ts" setup name="MSearchForm">
  import { storeToRefs } from 'pinia'
  import { useTableStore } from '@/store'
  import { IconRefresh } from '@arco-design/web-vue/es/icon'
  import type { ColumnProps } from '@/components/m-table/types'
  import { AnyObject } from '@/common/types/global'
  import {
    ROW_GUTTER,
    MAX_SEARCH_ITEM_NUMBER,
    GRID_TOTAL,
    DEFAULT_GRID_NUMS,
    DEFAULT_GRID_NUMS_EXTEND,
    MAX_SEARCH_ITEM_NUMBER_SPLIT,
  } from '@/common/constants/index'
  import MSearchFormItem from './components/index.vue'

  // 从父组件传过来的参数属性
  interface ProTableProps {
    isSplit?: boolean
    isHeader?: boolean
    showExpand?: boolean
    searchColumns?: ColumnProps[] // 搜索列，用来加载搜索列的内容
    searchParam?: AnyObject // 搜索配置项,即 搜索列的各个属性初始值
    search: (param: AnyObject) => void // 搜索方法
    reset: (param: AnyObject) => void // 重置方法
  }

  const props = withDefaults(defineProps<ProTableProps>(), {
    showExpand: true,
    searchColumns: () => [],
    searchParam: () => ({}),
  })

  const tableStore = useTableStore()
  const { rows } = storeToRefs(tableStore)

  const expand = ref(false) // 是否展开

  const rowHeight = ref(32)

  const maxArr = props.searchColumns.map(
    (item) => item.search?.span ?? (props.isSplit ? DEFAULT_GRID_NUMS_EXTEND : DEFAULT_GRID_NUMS)
  )

  const maxSpan = Math.max(...maxArr)

  const showColumns = ref<ColumnProps[]>([])

  const showLine = ref(true)

  const emits = defineEmits(['changeExpand'])
  const onExpand = () => {
    expand.value = !expand.value
    emits('changeExpand', expand.value)
  }

  nextTick(() => {
    rows.value =
      Math.ceil(props.searchColumns.length / Math.ceil(GRID_TOTAL / maxSpan)) ||
      Math.ceil(props.searchColumns.length / (props.isSplit ? MAX_SEARCH_ITEM_NUMBER_SPLIT : MAX_SEARCH_ITEM_NUMBER))
    rowHeight.value = rows.value > 1 ? rows.value * 41 : 32
    showColumns.value = props.searchColumns
    expand.value = props.showExpand
    const sumSpan = maxArr.reduce((acc, curr) => acc + curr, 0)
    showLine.value = sumSpan >= GRID_TOTAL
  })

  defineExpose({
    rows: rows.value,
    searchParam: props.searchParam,
  })
</script>

<style lang="less" scoped>
  .search-form {
    border-bottom: 1px solid var(--color-neutral-3);
  }
  :deep(.arco-divider-vertical) {
    margin: 0 17px 0 20px;
  }
  :deep(.arco-form-item) {
    margin-bottom: 16px;
  }
</style>
