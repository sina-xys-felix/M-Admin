<!-- 搜索框子项  -->
<template>
  <component
    v-if="column.search?.el || column.search?.render"
    :is="column.search?.render ?? `a-${column.search?.el}`"
    v-bind="handleSearchProps(column.search?.props)"
    v-model="searchParam[column.search?.key ?? handleProp(column.dataIndex)]"
    :options="['cascader', 'select', 'radio-group'].includes(column.search?.el) ? column.search?.options : []"
    separator="至"
    :mode="column.search.el === 'range-picker' ? column.search?.mode : ''"
    :shortcuts="['date-picker', 'range-picker'].includes(column.search.el) ? (column.search.shortcuts ?? []) : []"
    :expand-trigger="column.search.el === 'cascader' ? 'hover' : ''"
    :check-strictly="column.search.el === 'cascader' ? true : false"
    :placeholder="column.search.el === 'range-picker' ? ['开始时间', '结束时间'] : `${placeholder}${`${column.title}`}`"
    :allow-clear="allowClear"
    :style="{ width: column.search?.el === 'switch' ? '' : '100%' }"
    @change="handleSearchProps(column.search?.props)?.change"
    @search="handleSearchProps(column.search?.props)?.search"
    :filter-option="filterOption"
  >
    <slot />
    <template v-for="(value, name) in $slots" :key="name" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </component>
</template>

<script lang="ts">
  export default {
    name: 'MSearchFormItem',
  }
</script>

<script lang="ts" setup>
  import { handleProp } from '@/utils/tools'
  import { ColumnProps } from '@/components/m-table/types'
  import { AnyObject } from '@/common/types/global'
  import { CascaderOption } from '@arco-design/web-vue'

  interface SearchItemProps {
    column: ColumnProps
    searchParam: AnyObject
  }

  const props = defineProps<SearchItemProps>()

  /** 处理透传的 search.Props */
  const handleSearchProps = (searchProps: AnyObject) => {
    return searchProps ?? searchProps
  }

  /** 判断placeholder */
  const placeholder = computed(() => {
    const search = props.column.search
    return search?.props?.placeholder ?? (['input', 'textarea'].includes(search?.el) ? '请输入' : '请选择')
  })

  const filterOption = (inputValue: string, option: CascaderOption) => {
    return (
      (option.name || '').indexOf(inputValue) > -1 ||
      (option.quickCode || '').indexOf(inputValue) > -1 ||
      (option.code || '').indexOf(inputValue) > -1
    )
  }

  /** 判断 是否有清除按钮 (当搜素框有值时，不显示清除按钮) */
  const allowClear = computed(() => {
    const search = props.column.search
    return (
      search?.el !== 'input-number' ??
      search?.props?.clearable ??
      (search?.defaultValue == null || search?.defaultValue == undefined)
    )
  })
</script>
