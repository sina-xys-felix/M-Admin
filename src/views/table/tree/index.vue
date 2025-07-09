<template>
  <div class="container">
    <MTable
      ref="basicTableRef"
      :title="t('menu.table.columnar')"
      :sub-title="t('menu.table.tree.area')"
      :bordered="{ cell: true }"
      :columns="columns"
      :selectId="'id'"
      :init-param="formModel"
      :request-api="getTableList"
      :data-callback="dataCallback"
      isSplit
    >
      <template #index="{ rowIndex }">
        {{ rowIndex + 1 }}
      </template>

      <template #filterType="{ record }">
        {{ t(`basicTable.form.filterType.${record.filterType}`) }}
      </template>
      <template #status="{ record }">
        <span v-if="record.status === 'offline'" class="circle"></span>
        <span v-else class="circle pass"></span>
        {{ record.status === 'offline' ? t('common.status.disabled') : t('common.status.normal') }}
      </template>
      <template #createdTime="{ record }">
        {{ record.createdTime?.slice(0, 10) }}
      </template>
      <template #operations="{ record }">
        <MBtnGroup :record="record" :is-permission="false"> </MBtnGroup>
      </template>
    </MTable>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'TreeTable',
  }
</script>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'
  import { Message } from '@arco-design/web-vue'
  import { MTableInstance, ColumnProps } from '@/components/m-table/types'
  import { DataCallBackProps } from '@/api/types'
  import { AnyObject } from '@/common/types/global'
  import { queryPolicyList } from '@/api/table'
  import { treeData } from './data'

  const { t } = useI18n()

  const generateFormModel = () => {
    return {
      number: '',
      name: '',
      contentType: '',
      filterType: '',
      createdTime: [],
      status: '',
    }
  }

  const formModel = ref(generateFormModel())

  const basicTableRef = ref<MTableInstance | null>(null)

  const cascaderOptions = computed(() => [
    {
      value: '1',
      label: '一级',
      children: [
        { value: '11', label: '一级1' },
        { value: '12', label: '一级2' },
        { value: '13', label: '一级3' },
      ],
    },
    { value: '2', label: '二级' },
    { value: '3', label: '三级' },
  ])

  const statusOptions = computed(() => [
    {
      label: t('common.status.normal'),
      value: '1',
    },
    {
      label: t('common.status.disabled'),
      value: '0',
    },
  ])

  const columns = computed<ColumnProps[]>(() => [
    {
      title: t('basicTable.columns.index'),
      dataIndex: 'index',
      slotName: 'index',
      width: 64,
      align: 'center',
      fixed: 'left',
    },
    {
      title: t('basicTable.columns.number'),
      dataIndex: 'number',
      width: 120,
      extra: {
        isShow: true,
      },
      search: {
        el: 'input',
        order: 1,
      },
    },
    {
      title: t('basicTable.columns.name'),
      dataIndex: 'name',
      width: 150,
      search: {
        el: 'cascader',
        order: 2,
        options: cascaderOptions.value,
        props: {
          defaultValue: '',
        },
      },
    },
    {
      title: t('basicTable.columns.contentType'),
      dataIndex: 'contentType',
      width: 150,
      extra: {
        isShow: false,
      },
      search: {
        treeProps: {
          treeData: treeData,
        },
      },
    },
    {
      title: t('basicTable.columns.filterType'),
      dataIndex: 'filterType',
      slotName: 'filterType',
      width: 150,
      filterable: {
        filters: [
          {
            text: t('basicTable.form.filterType.rules'),
            value: 'rules',
          },
          {
            text: t('basicTable.form.filterType.artificial'),
            value: 'artificial',
          },
        ],
        filter: (value, record) => record.filterType.includes(value),
        multiple: true,
        alignLeft: true,
      },
    },
    {
      title: t('basicTable.columns.count'),
      dataIndex: 'count',
      width: 120,
      sortable: {
        sortDirections: ['ascend'],
      },
    },
    {
      title: t('basicTable.columns.address'),
      dataIndex: 'address',
      minWidth: 160,
    },
    {
      title: t('basicTable.columns.createdTime'),
      dataIndex: 'createdTime',
      slotName: 'createdTime',
      width: 160,
    },
    {
      title: t('basicTable.columns.status'),
      dataIndex: 'status',
      slotName: 'status',
      width: 100,
      search: {
        el: 'cascader',
        order: 4,
        options: statusOptions.value,
      },
    },
    {
      title: t('basicTable.columns.operations'),
      dataIndex: 'operations',
      slotName: 'operations',
      width: 130,
      fixed: 'right',
    },
  ])

  // 表格查询api
  const getTableList = (params: AnyObject) => {
    let newParams = JSON.parse(JSON.stringify(params))
    return queryPolicyList(newParams)
  }

  // 处理数据的回调
  const dataCallback = (data: DataCallBackProps) => {
    return {
      list: data.list,
      total: data.total,
      current: data.current,
      pageSize: data.pageSize,
    }
  }

  const handleCreate = () => {
    Message.info('您点击了操作按钮！')
  }
</script>
