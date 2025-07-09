<template>
  <div class="container">
    <MTable
      ref="basicTableRef"
      :title="t('menu.list.basicTable')"
      :columns="columns"
      :bordered="{ cell: true }"
      :selectId="'id'"
      :init-param="formModel"
      :request-api="getTableList"
      :data-callback="dataCallback"
      :isRowSelection="true"
    >
      <template #header-left="{ isSelected }">
        <a-space>
          <a-button type="primary" @click="handleCreate">
            <template #icon>
              <icon-plus theme="outline" size="16" />
            </template>
            {{ t('common.add') }}
          </a-button>
          <a-button
            type="primary"
            status="danger"
            :disabled="!isSelected"
            @click="handleClickOps({ type: Operations.DELETE, record: {} })"
          >
            <template #icon>
              <icon-delete theme="outline" size="16" />
            </template>
            {{ t('common.table.delete') }}
          </a-button>
        </a-space>
      </template>
      <template #header-right>
        <a-button type="primary" @click="handleCreate">
          <template #icon>
            <icon-export theme="outline" size="16" />
          </template>
          {{ t('common.export') }}
        </a-button>
      </template>

      <template #avatar="{ record }">
        <a-avatar
          auto-fix-font-size
          :size="30"
          :style="{
            backgroundColor: '#3370ff',
            fontSize: '18px',
          }"
        >
          {{ record.name.slice(0, 1) }}
        </a-avatar>
      </template>
      <template #filterType="{ record }">
        {{ t(`basicTable.form.filterType.${record.filterType}`) }}
      </template>
      <template #count="{ record }">
        <a-statistic :value="Number(record.count)" show-group-separator :value-style="{ fontSize: '14px' }">
          <template #prefix> ￥ </template>
        </a-statistic>
      </template>
      <template #status="{ record }">
        <a-switch
          v-model="record.status"
          checked-value="1"
          unchecked-value="0"
          checked-color="#165dff"
          unchecked-color="#ff5722"
        >
          <template #checked> {{ t('common.status.normal') }} </template>
          <template #unchecked> {{ t('common.status.disabled') }} </template>
        </a-switch>
      </template>
      <template #createdTime="{ record }">
        {{ record.createdTime?.slice(0, 10) }}
      </template>
      <template #operations="{ record }">
        <MBtnGroup :record="record" :is-permission="false" mode="mix" @handle-click-ops="handleClickOps"> </MBtnGroup>
      </template>
    </MTable>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'BasicTable',
  }
</script>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'
  import { Message } from '@arco-design/web-vue'
  import { MTableInstance, ColumnProps } from '@/components/m-table/types'
  import { DataCallBackProps } from '@/api/types'
  import { AnyObject } from '@/common/types/global'
  import { queryBasicList } from '@/api/table'
  import { Operations } from '@/common/enums/status-enum'

  const { t } = useI18n()

  const generateFormModel = () => {
    return {
      name: '',
      phone: '',
      email: '',
      status: '',
    }
  }

  const formModel = ref(generateFormModel())

  const basicTableRef = ref<MTableInstance | null>(null)

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
      title: t('basicTable.columns.avatar'),
      dataIndex: 'avatar',
      slotName: 'avatar',
      width: 72,
    },
    {
      title: t('basicTable.columns.name'),
      dataIndex: 'name',
      width: 120,
      search: {
        el: 'input',
        order: 1,
      },
    },
    {
      title: t('basicTable.columns.phone'),
      dataIndex: 'phone',
      width: 160,
      search: {
        el: 'input',
        order: 2,
      },
    },
    {
      title: t('basicTable.columns.email'),
      dataIndex: 'email',
      width: 240,
      ellipsis: true,
      tooltip: true,
      search: {
        el: 'input',
        order: 2,
      },
    },
    {
      title: t('basicTable.columns.filterType'),
      dataIndex: 'filterType',
      slotName: 'filterType',
      width: 160,
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
      slotName: 'count',
      width: 120,
      align: 'right',
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
      width: 120,
    },
    {
      title: t('basicTable.columns.status'),
      dataIndex: 'status',
      slotName: 'status',
      align: 'center',
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
      width: 220,
      fixed: 'right',
    },
  ])

  // 表格查询api
  const getTableList = (params: AnyObject) => {
    let newParams = JSON.parse(JSON.stringify(params))
    return queryBasicList(newParams)
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

  const handleClickOps = ({ type, record }: { type: number; record: AnyObject }) => {
    console.log(`type:${type},record:${JSON.stringify(record)}`)
    Message.info('您点击了按钮！')
  }

  const handleCreate = () => {
    Message.info('您点击了新增按钮！')
  }
</script>
