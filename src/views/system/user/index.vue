<template>
  <div class="container">
    <MTable
      ref="staffTableRef"
      :title="'职员管理'"
      :selectId="'memberId'"
      :columns="columns"
      :bordered="{ cell: true }"
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
          添加
        </a-button>
      </template>
      <!-- 自定义单元 -->
      <template #index="{ rowIndex }">
        {{ rowIndex + 1 }}
      </template>
      <template #status="{ record }">
        <a-tag :color="record.status === 1 ? 'green' : 'red'">{{
          record.status === 1 ? '正常' : '禁用'
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

  const formModel = ref(generateFormModel())

  const statusOptions = computed<SelectOptionData[]>(() => [
    {
      label: '正常',
      value: '1',
    },
    {
      label: '禁用',
      value: '0',
    },
  ])

  const columns = computed<TableColumnData[]>(() => [
    {
      title: '序号',
      dataIndex: 'index',
      slotName: 'index',
      width: 80,
      align: 'center',
    },
    {
      title: '工号',
      dataIndex: 'no',
      width: 150,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      isShow: true,
      width: 150,
      search: {
        el: 'input',
        order: 1,
        span: 8,
      },
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      isShow: true,
      width: 120,
    },
    {
      title: '身份证',
      dataIndex: 'idNumber',
      minWidth: 180,
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      width: 150,
      search: {
        el: 'input',
        order: 2,
        span: 8,
      },
    },
    {
      title: '入职时间',
      dataIndex: 'entryTime',
      width: 120,
    },
    {
      title: '离职时间',
      dataIndex: 'leaveTime',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      slotName: 'status',
      align: 'center',
      width: 100,
      search: {
        el: 'select',
        order: 5,
        span: 8,
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
