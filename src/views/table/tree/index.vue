<template>
  <div class="container">
    <MTable
      ref="basicTableRef"
      :title="'表格展示'"
      :sub-title="'区域树'"
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
        {{
          {
            rules: '规则筛选',
            artificial: '人工筛选',
          }[record.filterType] || record.filterType
        }}
      </template>
      <template #status="{ record }">
        <span v-if="record.status === 'offline'" class="circle"></span>
        <span v-else class="circle pass"></span>
        {{ record.status === 'offline' ? '禁用' : '正常' }}
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
  import { Message } from '@arco-design/web-vue'
  import { MTableInstance, ColumnProps } from '@/components/m-table/types'
  import { DataCallBackProps } from '@/api/types'
  import { AnyObject } from '@/common/types/global'
  import { queryPolicyList } from '@/api/table'
  import { treeData } from './data'

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
      label: '正常',
      value: '1',
    },
    {
      label: '禁用',
      value: '0',
    },
  ])

  const columns = computed<ColumnProps[]>(() => [
    {
      title: '序号',
      dataIndex: 'index',
      slotName: 'index',
      width: 64,
      align: 'center',
      fixed: 'left',
    },
    {
      title: '集合编号',
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
      title: '名称',
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
      title: '内容体裁',
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
      title: '数据来源',
      dataIndex: 'filterType',
      slotName: 'filterType',
      width: 150,
      filterable: {
        filters: [
          {
            text: '规则筛选',
            value: 'rules',
          },
          {
            text: '人工筛选',
            value: 'artificial',
          },
        ],
        filter: (value, record) => record.filterType.includes(value),
        multiple: true,
        alignLeft: true,
      },
    },
    {
      title: '支付金额',
      dataIndex: 'count',
      width: 120,
      sortable: {
        sortDirections: ['ascend'],
      },
    },
    {
      title: '详细地址',
      dataIndex: 'address',
      minWidth: 160,
      ellipsis: true,
      tooltip: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      slotName: 'createdTime',
      width: 160,
    },
    {
      title: '状态',
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
      title: '操作',
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
