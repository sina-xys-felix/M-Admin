<template>
  <div class="container">
    <MTable
      ref="staffTableRef"
      :title="t('staff.title')"
      :selectId="'memberId'"
      :columns="columns"
      :init-param="formModel"
      :request-api="getTableList"
      :data-callback="dataCallback"
      :xScroll="true"
    >
      <!-- 自定义表头 -->
      <template #header-left>
        <a-button type="primary" @click="handleClickOps({ type: Operations.ADD, record: {} })">
          <template #icon>
            <icon-plus theme="outline" size="16" />
          </template>
          {{ t('common.add') }}
        </a-button>
      </template>
      <!-- 自定义单元 -->
      <template #index="{ rowIndex }">
        {{ rowIndex + 1 }}
      </template>
      <template #status="{ record }">
        <a-tag :color="record.status === 1 ? 'green' : 'red'">{{
          record.status === 1 ? t('common.status.normal') : t('common.status.disabled')
        }}</a-tag>
      </template>
      <template #operations="{ record }">
        <MBtnGroup v-if="record.name" :record="record" @handle-click-ops="handleClickOps"> </MBtnGroup>
      </template>
    </MTable>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { Operations } from '@/common/enums/status-enum'
  import { geStaffList } from '@/api/staff/index'
  import { Message, SelectOptionData, TableColumnData } from '@arco-design/web-vue'
  import { MTableInstance } from '@/components/m-table/types'
  import { DataCallBackProps } from '@/api/types'
  import { AnyObject } from '@/common/types/global'

  const generateFormModel = () => {
    return {
      name: '',
      mobile: '',
      status: null,
    }
  }

  const staffTableRef = ref<MTableInstance>()

  const { t } = useI18n()

  const formModel = ref(generateFormModel())

  const statusOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('common.status.normal'),
      value: '1',
    },
    {
      label: t('common.status.disabled'),
      value: '0',
    },
  ])

  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('table.column.index'),
      dataIndex: 'index',
      slotName: 'index',
      width: 80,
      align: 'center',
    },
    {
      title: t('staff.column.no'),
      dataIndex: 'no',
      width: 150,
    },
    {
      title: t('staff.column.name'),
      dataIndex: 'name',
      isShow: true,
      width: 150,
      search: {
        el: 'input',
        order: 1,
      },
    },
    {
      title: t('staff.column.nickName'),
      dataIndex: 'nickName',
      isShow: true,
      width: 120,
    },
    {
      title: t('staff.column.idNumber'),
      dataIndex: 'idNumber',
      minWidth: 180,
    },
    {
      title: t('staff.column.mobile'),
      dataIndex: 'mobile',
      width: 150,
      search: {
        el: 'input',
        order: 2,
      },
    },
    {
      title: t('staff.column.entryTime'),
      dataIndex: 'entryTime',
      width: 120,
    },
    {
      title: t('staff.column.leaveTime'),
      dataIndex: 'leaveTime',
      width: 120,
    },
    {
      title: t('staff.column.status'),
      dataIndex: 'status',
      slotName: 'status',
      align: 'center',
      width: 100,
      search: {
        el: 'select',
        order: 5,
        options: statusOptions.value,
      },
    },
    {
      title: t('table.column.operation'),
      dataIndex: 'operations',
      slotName: 'operations',
      width: 130,
      fixed: 'right',
    },
  ])

  // 表格查询api
  const getTableList = (params: AnyObject) => {
    if (params.status) params.status = Number(params.status)
    else params.status = null
    let newParams = JSON.parse(JSON.stringify(params))
    return geStaffList(newParams)
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

  const handleClickOps = async ({ type, record }: { type: number; record: AnyObject }) => {
    Message.info('您点击了按钮')
  }
</script>

<style scoped lang="less">
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>
