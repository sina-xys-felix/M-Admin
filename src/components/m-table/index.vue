<template>
  <a-row class="table-beta" ref="tableBetaRef">
    <a-col v-if="isSplit" :span="spanSplit" :class="{ line: splitLine }" :style="{ maxHeight: maxHeight + 'px' }">
      <!-- 左侧栏 标题 -->
      <div v-if="isUseSubTitle || subTitle" class="header-title">
        <slot v-if="isUseSubTitle" name="sub-title"></slot>
        <span v-else>{{ subTitle }}</span>
      </div>
      <!-- 左侧栏 内容 -->
      <div class="tree-content" :style="{ height: isUseSubTitle || subTitle ? 'calc(100% - 36px)' : '100%' }">
        <div v-if="isUseTree">
          <slot name="tree"></slot>
        </div>
        <div v-else>
          <Suspense>
            <!-- 具有深层异步依赖的组件 -->
            <template #default>
              <MTree
                v-if="treeColumns.length"
                ref="treeRef"
                :tree-data="treeConfig?.treeProps?.treeData"
                v-model:selected-keys="searchParam[treeConfig.key]"
                :checked-keys="searchParam[treeConfig.key]"
                v-bind="treeConfig?.treeProps"
                @select="onSelect"
                @check="onCheck"
              >
                <template #icon>
                  <i class="ri-folders-line"></i>
                </template>
              </MTree>
              <MEmpty v-else />
            </template>

            <!-- 在 #fallback 插槽中显示 -->
            <template #fallback> <MEmpty /> </template>
          </Suspense>
        </div>
      </div>
    </a-col>
    <a-col :span="isSplit ? GRID_TOTAL - spanSplit : GRID_TOTAL">
      <div class="table-container">
        <div class="table-main">
          <!-- 右侧 标题  -->
          <div v-if="isUseTitle || title" class="header-title title-flex">
            <div style="width: 100%">
              <slot v-if="isUseTitle" name="title"></slot>
              <span v-else>{{ title }}</span>
            </div>
          </div>

          <!-- 查询条件 -->
          <MSearchForm
            v-if="isShowSearchForm && isExpandSearchForm"
            :is-split="isSplit"
            :is-header="isHeader"
            :search-columns="searchColumns"
            :search-param="searchParam"
            :remember="remember"
            :search="onSearch"
            :reset="onReset"
            @change-expand="onChangeSearchFormExpand"
          >
            <template #custom-search>
              <slot name="custom-search"></slot>
            </template>
            <template #extra>
              <slot name="extra"></slot>
            </template>
          </MSearchForm>
          <!-- 自定义查询条件 -->
          <template v-else>
            <slot name="custom"></slot>
          </template>
          <!-- 表头 -->
          <MTableHeader v-if="isHeader" :isGap="isGap">
            <template #input-area>
              <div class="left-content">
                <slot
                  name="header-left"
                  :selectedList="selectedList"
                  :selectedListIds="selectedListIds"
                  :isSelected="isSelected"
                ></slot>
              </div>
            </template>
            <template #out-area>
              <slot
                name="header-right"
                :selectedList="selectedList"
                :selectedListIds="selectedListIds"
                :isSelected="isSelected"
              />
            </template>
          </MTableHeader>
          <!-- 表体 -->
          <a-table
            v-if="tableShow"
            ref="tableRef"
            id="printTable"
            v-bind="$attrs"
            :row-key="selectId"
            :loading="loading"
            :pagination="isPagiantion"
            :columns="columns"
            :data="data ?? tableData"
            :bordered="bordered"
            :stripe="stripe"
            :size="size"
            :scroll="{
              y: (isCollapseSearchForm ? tableScroll : tableScroll + (rows - 1) * 52) - 41,
              minWidth: horizontalScroll,
              x: horizontalScroll,
            }"
            :expandedKeys="activeRowkeys"
            :default-expanded-keys="expandedRowKeys"
            column-resizable
            :table-layout-fixed="true"
            :sticky-header="stickyHeader"
            @selection-change="selectionChange"
            @select-all="selectAll"
            @expanded-change="handleExpandedChange"
            @row-click="handleRowClick"
            :expandable="getExpandable()"
            :row-selection="getRowSelection()"
            :style="{
              height:
                (isCollapseSearchForm ? tableScroll : tableScroll + (rows - 1) * 52) +
                ((isShowSearchForm && isExpandSearchForm) || isUseTitle ? 0 : 16) +
                'px',
            }"
            class="m-table"
          >
            <!-- 展开行图标   -->
            <template #expand-icon="{ record, expanded }">
              <icon-caret-right v-if="isChildren" />
              <template v-else>
                <icon-caret-right v-if="record?.children?.length && !expanded" />
                <icon-caret-down v-if="record?.children?.length && expanded" />
              </template>
            </template>
            <!-- 展开行 -->
            <template #expand-row="{ record }">
              <slot name="expand-row" :record="record"></slot>
            </template>
            <template v-for="(value, name) in $slots" :key="name" #[name]="slotData">
              <slot :name="name" v-bind="slotData || {}"></slot>
            </template>
            <!-- 加载表格数据 -->
            <template #columns>
              <template v-for="item in tableColumns" :key="`${item}`">
                <a-table-column
                  v-if="!item.children"
                  v-bind="item"
                  :title="`${item.title}`"
                  :data-index="`${item.dataIndex}`"
                >
                  <!-- 自定义标题 -->
                  <template #title>
                    <slot v-if="item.titleSlotName" :name="item.titleSlotName"></slot>
                    <slot v-else>{{ `${item.title}` }}</slot>
                  </template>
                  <!-- 自定义单元格 -->
                  <template #cell="{ record, column, rowIndex }">
                    <slot
                      v-if="item.slotName"
                      :name="item.slotName"
                      :record="record"
                      :column="column"
                      :rowIndex="rowIndex"
                    >
                    </slot>
                    <template v-else>
                      <span v-if="item.enum">{{ getColumnText(item.enum, record[column.dataIndex]) }}</span>
                      <span v-else>{{ record[column.dataIndex] !== 0 ? record[column.dataIndex] || '--' : 0 }}</span>
                    </template>
                  </template>
                </a-table-column>
                <a-table-column v-else :title="`${item.title}`">
                  <template #title>
                    <slot v-if="item.titleSlotName" :name="item.titleSlotName"></slot>
                    <slot v-else>{{ `${item.title}` }}</slot>
                  </template>
                  <a-table-column
                    v-for="element in item.children"
                    :key="element.dataIndex"
                    v-bind="element"
                    :title="`${element.title}`"
                    :data-index="`${element.dataIndex}`"
                  >
                    <template #title>
                      <slot v-if="element.titleSlotName" :name="element.titleSlotName"></slot>
                      <slot v-else>{{ `${element.title}` }}</slot>
                    </template>
                    <template #cell="{ record, column, rowIndex }">
                      <slot
                        v-if="element.slotName"
                        :name="element.slotName"
                        :record="record"
                        :column="column"
                        :rowIndex="rowIndex"
                      >
                      </slot>
                      <template v-else>
                        <span v-if="element.enum">{{ getColumnText(element.enum, record[column.dataIndex]) }}</span>
                        <span v-else>{{ record[column.dataIndex] !== 0 ? record[column.dataIndex] || '--' : 0 }}</span>
                      </template>
                    </template>
                  </a-table-column>
                </a-table-column>
              </template>
            </template>

            <!-- 表格无数据时 -->
            <template #empty>
              <m-empty />
            </template>
            <!-- 表格footer, -->
            <!-- 总结行 -->
            <template #footer>
              <slot name="summary"></slot>
            </template>
          </a-table>
          <div v-else>
            <slot :expand="isCollapseSearchForm" name="table-body"></slot>
          </div>
        </div>
        <div class="table-footer mt16" v-if="pagination">
          <m-pagiantion
            :pageable="pageable"
            :handleCurrentChange="handleCurrentChange"
            :handleSizeChange="handleSizeChange"
            :flag="flag"
          >
            <template #page-total="{ total }">
              <slot name="page-total" :total="total"></slot>
            </template>
            <template #page-item-ellipsis>
              <slot name="page-item-ellipsis"></slot>
            </template>
            <template #page-item-step="{ type }">
              <slot name="page-item-step" :type="type"></slot>
            </template>
            <template #page-item="{ page }">
              <slot name="page-item" :page="page"></slot>
            </template>
          </m-pagiantion>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts">
  export default {
    name: 'MTable',
  }
</script>

<script lang="ts" setup name="MTable">
  import { PaginationProps, Table, TableExpandable, TableRowSelection } from '@arco-design/web-vue'
  import { storeToRefs } from 'pinia'
  import { useTableStore, useAppStore } from '@/store'
  import { GRID_TOTAL } from '@/common/constants/index'
  import { SizeProps } from '@/common/types/index'
  import { useTable } from '@/hooks/use-table'
  import { useSelection } from '@/hooks/use-selects'
  import { ColumnProps } from './types'
  import { findQuickCode } from '@/utils/tools'
  import config from '@/config/settings.json'
  import { findTreeNode, findSelectOption } from '@/utils/tree'
  import type { TableProps } from './types'
  import { AnyObject } from '@/common/types/global'
  import MSearchForm from '@/components/m-search-form/index.vue'
  import MTableHeader from './components/m-table-header.vue'
  import MEmpty from '@/components/m-empty/index.vue'
  import MPagiantion from '@/components/m-paginantion/index.vue'
  import MTree from '@/components/m-tree/index.vue'

  const emits = defineEmits(['expandedChange', 'search', 'reset'])

  //  设置初始值
  const props = withDefaults(defineProps<TableProps>(), {
    columns: () => [],
    requestAuto: true,
    initParam: {},
    isSplit: false,
    spanSplit: 4,
    splitLine: true,
    pagination: true,
    selectId: 'id',
    bordered: true,
    stripe: true,
    isExpand: false,
    isRowSelection: false,
    isTreeTable: false,
    xScroll: '100%',
    fillRows: false,
    isSet: false,
    isChildren: false,
    expandedRowKeys: () => [],
    remember: false,
    tableShow: true,
    showExpand: true,
  })

  // 组件异步加载
  // const MTree = defineAsyncComponent({
  //   loader: () => import('@/components/m-tree/index.vue'),
  //   loadingComponent: MEmpty,
  //   delay: 15, // 毫秒
  //   errorComponent: MEmpty,
  //   timeout: 3000, // 毫秒
  // })
  //  插槽集
  const slots = useSlots()
  //  用来记录是否使用了子标题 插槽
  const isUseSubTitle = ref<boolean>(false)
  //  用来记录是否使用了表格标题 插槽
  const isUseTitle = ref<boolean>(false)
  // 用来记录是否使用了左侧内容插槽
  const isUseTree = ref<boolean>(false)
  // 判断是否使用了插槽page-total
  const flag = ref<boolean>(false)
  // 是否显示表格边框
  const borderedLine = ref<string>(props.bordered ? '1px' : '0px')
  // 用来记录是否需要显示搜索条件
  const isShowSearchForm = ref<boolean>(true)
  //   查询条件展开符号
  const isExpandSearchForm = ref<boolean>(true)
  //   查询条件展开符号
  const isGap = ref<boolean>(false)
  // 是否显示tableheader
  const isHeader = ref<boolean>(true)
  // 是否展示表格默认分页
  const isPagiantion = ref<boolean | PaginationProps>(false)
  // 表头吸顶
  const stickyHeader = ref<boolean | number>(true)
  // 表格尺寸
  const size = ref<SizeProps>('medium')
  // 表格 DOM
  const tableRef = ref<InstanceType<typeof Table>>()
  // 计算表格滚动的高度
  const tableScroll = ref<number>(587)
  // 计算表格横向滚动的高度
  const maxWidth = ref<number>(500)
  const maxHeight = ref<number>(500)
  maxHeight.value = document.documentElement.offsetHeight - 188
  // @ts-ignore
  const horizontalScroll = ref<string | number | boolean>()
  // 根据是否填充空行来确定最小行高
  const rowMinHeight = ref<string>(props.isSet ? '41px' : 'auto')

  const treeNode = ref()

  const treeRef = ref()

  const appStore = useAppStore()

  // 展开行 默认配置
  const defaultExpandable: TableExpandable = reactive({
    title: '#',
    width: 80,
  })
  // 展开行的keys
  const activeRowkeys = ref<(string | number)[]>()

  //  从缓存里拿出rows
  const tableStore = useTableStore()
  const { rows } = storeToRefs(tableStore)

  // 列转义
  const getColumnText = (list: AnyObject[], val: string | number): string => {
    let columnText = ''
    const isTree = list.find((item) => item.children!)
    if (isTree) {
      const data = findTreeNode(list, val)
      columnText = data?.label || data?.title || data?.name
    } else {
      columnText = findSelectOption(list, val)
    }
    return columnText
  }

  // 过滤 搜索列
  const searchColumns = props.columns
    .filter(
      (item) =>
        (item.search?.el && item.search?.isShow !== false) || (item.search?.render && item.search?.isShow !== false)
    )
    .sort((a, b) => a.search!.order! - b.search!.order!)
  // 此处 是否合理
  if (!searchColumns?.length) isShowSearchForm.value = false

  //  过滤 显示列
  const colums = props.columns.filter((item) => item?.extra?.isShow !== false)
  // 接收colums 并设置为响应式
  const tableColumns = ref<ColumnProps[]>(colums)
  // 过滤需要用tree显示的列配置
  const treeColumns = props.columns.filter((item) => item?.search?.treeProps)
  const treeConfig = ref<any>()
  treeConfig.value = treeColumns && treeColumns[0]?.search

  tableScroll.value = document.documentElement.offsetHeight - 173
  const cacheName = props.remember ? `${findQuickCode(props.title)}SearchCache` : ''
  const searchCache = props.remember ? JSON.parse(localStorage.getItem(cacheName)!) || {} : {}
  const tableInitParams = props.remember ? Object.assign({}, props.initParam, searchCache) : props.initParam

  // 表格操作 Hooks
  const {
    tableData,
    pageable,
    searchParam,
    totalParam,
    loading,
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
  } = useTable(props.requestApi, tableInitParams, props.pagination, props.fillRows, props.dataCallback)

  if (props.remember) {
    setTimeout(() => {
      searchParam.value = tableInitParams
    }, 100)
  }

  // 静态数据时，查询触发
  const onSearch = () => {
    if (props.remember) localStorage.setItem(cacheName, JSON.stringify(searchParam.value))
    props.data ? emits('search') : search()
  }

  const onReset = () => {
    if (props.remember) {
      localStorage.removeItem(cacheName)
      setTimeout(() => {
        searchParam.value = {}
      }, 100)
    }
    props.data ? emits('reset') : reset(props.remember)
  }

  // 触发行选择器 hooks
  const { selectionChange, clearSelection, selectedList, selectedListIds, isSelected } = useSelection(props.selectId)

  const selectAll = (checked: boolean) => {
    if (!checked) {
      clearSelection()
    } else {
      const ids = tableData.value.map((item) => item.id)
      if (selectedListIds.value.length || ids.length) {
        isSelected.value = checked
      }
      selectedList.value.push(...tableData.value)
      selectedListIds.value.push(...ids)
    }
  }

  // 判断是否需要配置展开行信息
  const getExpandable = () => {
    if (props.isExpand) {
      if (props.isExpand instanceof Object) return props.isExpand
      return defaultExpandable
    }
    emits('expandedChange', activeRowkeys.value)
    return undefined
  }
  // 选择行 默认为多选
  const rowSelection: TableRowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
  })

  // 判断是否需要显示选择行信息
  const getRowSelection = () => {
    if (props.isRowSelection) {
      if (typeof props.isRowSelection === 'boolean') return rowSelection
      if (typeof props.isRowSelection === 'string') {
        rowSelection.type = props.isRowSelection
        return rowSelection
      }
      if (props.isRowSelection instanceof Object) return props.isRowSelection
    }
    return undefined
  }

  // 展开数据行发生变化
  const handleExpandedChange = (rowKeys: (string | number)[]) => {
    activeRowkeys.value = rowKeys
    emits('expandedChange', rowKeys)
  }
  // 点击行时触发
  const handleRowClick = (record: AnyObject) => {
    if (props.isExpand) {
      ;(activeRowkeys.value ?? []).push(record[props.selectId])
      activeRowkeys.value = Array.from(new Set(activeRowkeys.value))
    }
  }

  // 点击树节点时触发
  const onSelect = (values: (string | number)[], data: AnyObject) => {
    treeNode.value = data
    searchParam.value[treeConfig.value?.key] = values
    getTableList()
  }
  //   点击树节点复选框时触发
  const onCheck = (values: (string | number)[]) => {
    searchParam.value[treeConfig.value?.key] = values
    getTableList()
  }

  const isCollapseSearchForm = ref<boolean>(false)
  const onChangeSearchFormExpand = (expand: boolean) => {
    isCollapseSearchForm.value = expand
  }

  watch(
    () => tableData.value,
    () => {
      if (props.isTreeTable) {
        if (props.expandedRowKeys?.length) activeRowkeys.value = props.expandedRowKeys
        if (!activeRowkeys.value?.length && props.isTreeTable) {
          activeRowkeys.value = (tableData.value ?? []).length ? [tableData.value[0][props.selectId]] : []
        }
      }
    },
    { immediate: true, deep: true }
  )

  watch(
    () => props.expandedRowKeys,
    (newVal) => {
      activeRowkeys.value = newVal
    }
  )

  // 监听页面 initParam 改化，重新获取表格数据
  watch(() => props.initParam, getTableList, { deep: true })

  watch(
    () => appStore.footer,
    (value) => {
      if (value) {
        maxHeight.value = document.documentElement.offsetHeight - 164 - 1
      } else {
        maxHeight.value = document.documentElement.offsetHeight - 164 + 40 - 1
      }
    },
    { immediate: true, deep: true }
  )

  watch(
    () => appStore.menuCollapse,
    (newVal) => {
      if (newVal) {
        maxWidth.value = document.documentElement.offsetWidth - 90 - 48
      } else {
        maxWidth.value = document.documentElement.offsetWidth - 90 - config.menuWidth
      }
      horizontalScroll.value = props.xScroll === true ? maxWidth.value : props.xScroll
    },
    { immediate: true }
  )

  const onResize = () => {
    maxHeight.value = document.documentElement.offsetHeight - (appStore.footer ? 164 : 124) - 1
    tableScroll.value = document.documentElement.offsetHeight - 173 - 16
    if (appStore.menuCollapse) {
      maxWidth.value = document.documentElement.offsetWidth - 90 - 48
    } else {
      maxWidth.value = document.documentElement.offsetWidth - 48 - config.menuWidth
    }
    horizontalScroll.value = props.xScroll === true ? maxWidth.value : props.xScroll

    const dom = document.querySelector('.left-content')
    const domLength = dom?.childElementCount || 0
    // 是否需要显示
    if ((!slots['header-left'] || domLength === 0) && !slots['header-right'] && !props.toolButton) {
      isHeader.value = false
    }
    // 显示表头
    if (isHeader.value) {
      tableScroll.value -= 72
    }
    // 标题高度
    if (props.title || isUseTitle.value || isUseSubTitle.value || props.subTitle) {
      tableScroll.value -= 36
    }
    // 分页高度32 + 14(上间距)
    if (props.pagination) {
      tableScroll.value -= 46
    }
    // 查询条件 rows.value * 52
    if (isShowSearchForm.value) {
      tableScroll.value -= rows.value * 52
    }
  }

  onMounted(() => {
    if (slots['sub-title']) isUseSubTitle.value = true
    if (slots['title']) isUseTitle.value = true
    if (slots['tree']) isUseTree.value = true
    if (slots['page-total']) flag.value = true

    setTimeout(() => {
      onResize()
    }, 100)
    window.addEventListener('resize', onResize)
    isGap.value = isShowSearchForm.value && isExpandSearchForm.value
    if (props.requestAuto) getTableList()
  })

  onUnmounted(() => {
    tableStore.$reset()
    rows.value = 1
    window.removeEventListener('resize', onResize)
  })

  // 向父组件暴露的属性及方法
  defineExpose({
    searchParam,
    totalParam,
    element: tableRef,
    tableData,
    pageable,
    treeNode,
    getTableList,
    reset,
    clearSelection,
    isSelected,
    selectedList,
    tableScroll,
    selectedListIds,
    activeRowkeys,
    handleCurrentChange,
    handleSizeChange,
  })
</script>

<style lang="less" scoped>
  @import url('@/assets/style/varibles.less');
  .table-beta {
    width: 100%;
    height: 100%;
    background: var(--color-bg-2);
    .arco-col {
      padding: @gap-md;
      height: 100%;
    }
    .line {
      border-right: 1px solid var(--color-neutral-3);
    }
    .header-title {
      width: 100%;
      height: 36px;
      font-size: 16px;
      color: var(--color-text-1);
      font-weight: 500;
      line-height: 1.5;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .icon {
        cursor: pointer;
      }
    }
    .title-flex {
      display: flex;
      justify-content: space-between;
    }
    .tree-content {
      width: 100%;
      overflow-x: hidden;
      & > div {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
      }
    }
  }

  .m-table {
    :deep(.arco-table-tr-empty > .arco-table-td) {
      border: none;
    }
    :deep(.arco-table-tr) {
      height: v-bind('rowMinHeight');
    }
    :deep(.arco-spin) {
      border: v-bind('borderedLine') solid var(--color-neutral-3);
    }
  }

  :deep(.arco-table-border .arco-table-container) {
    border-top: 0 solid var(--color-neutral-3);
    border-left: 0 solid var(--color-neutral-3);
  }

  .button-text-gap {
    margin-right: 8px;
  }

  :deep(.arco-table .arco-table-expand-btn) {
    background-color: transparent;
    &:hover {
      background-color: transparent;
    }
  }

  :deep(.arco-table-th-title) {
    color: var(--color-text-2);
  }

  ::-webkit-scrollbar {
    width: 12px;
    height: 4px;
  }

  ::-webkit-scrollbar-thumb {
    border: 4px solid transparent;
    background-clip: padding-box;
    border-radius: 7px;
    background-color: var(--color-text-4);
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-text-3);
  }

  :deep(.arco-table-border .arco-table-footer) {
    border: none;
  }

  .table {
    &-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      .m-table {
        flex: 1;
      }
    }
    &-footer {
      width: 100%;
      height: 32px;
    }
  }
</style>
