<template>
  <div class="container">
    <MTable
      ref="roleTableRef"
      :title="t('role.title')"
      :selectId="'id'"
      :stripe="true"
      :columns="columns"
      :bordered="{ cell: true }"
      :init-param="formModel"
      :request-api="getTableList"
      :data-callback="dataCallback"
      :xScroll="true"
    >
      <!-- 自定义表头 -->
      <template #header-left>
        <a-button type="primary" @click="openModal">
          <template #icon>
            <icon-plus size="16" theme="outline" />
          </template>
          {{ t('common.add') }}
        </a-button>
      </template>
      <!-- 自定义单元 -->
      <template #index="{ record, rowIndex }">
        <span v-if="record.name">{{ rowIndex + 1 }}</span>
        <span v-else>&nbsp;</span>
      </template>
      <template #status="{ record }">
        <!--  0 禁用 1启用 -->
        <a-switch v-model="record.status" :checked-value="1" :unchecked-value="0" @change="change(record)">
          <template #checked> {{ t('common.status.normal') }} </template>
          <template #unchecked> {{ t('common.status.disabled') }} </template>
        </a-switch>
      </template>
      <template #operations="{ record }">
        <MBtnGroup v-if="record.name" :record="record" @handle-click-ops="handleClickOps"> </MBtnGroup>
      </template>
    </MTable>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'RoleTable',
  }
</script>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { getRoleList } from '@/api/role'
  import { ColumnProps, MTableInstance } from '@/components/m-table/types'
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface'
  import { Message } from '@arco-design/web-vue'
  import { DataCallBackProps } from '@/api/types'
  import { AnyObject } from '@/common/types/global'

  const generateFormModel = () => {
    return {
      sort: 'createTime',
      name: null,
      ascending: true,
    }
  }

  // roleTableRef DOM
  const roleTableRef = ref<MTableInstance>()

  const { t } = useI18n()
  const formModel = ref(generateFormModel())

  type Columns = TableColumnData & ColumnProps

  // 表格配置列
  const columns = computed<Columns[]>(() => [
    {
      title: t('table.column.index'),
      dataIndex: 'index',
      slotName: 'index',
      width: 80,
      align: 'center',
      // fixed: 'left',
    },
    {
      title: t('role.column.name'),
      dataIndex: 'name',
      width: 120,
      search: {
        el: 'input',
        order: 1,
        span: 8,
      },
      // fixed: 'left',
    },
    {
      title: t('role.column.alias'),
      dataIndex: 'alias',
      width: 100,
    },
    {
      title: t('role.column.code'),
      dataIndex: 'code',
      width: 130,
    },
    {
      title: t('role.column.quickCode'),
      dataIndex: 'quickCode',
      width: 130,
    },
    {
      title: t('role.column.descripton'),
      dataIndex: 'descripton',
      ellipsis: true,
      tooltip: true,
      minWidth: 240,
    },
    {
      title: t('role.column.start'),
      dataIndex: 'start',
      width: 180,
    },
    {
      title: t('role.column.end'),
      dataIndex: 'end',
      width: 180,
    },
    {
      title: t('role.column.status'),
      dataIndex: 'status',
      slotName: 'status',
      width: 100,
      fixed: 'right',
      align: 'center',
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
    let newParams = JSON.parse(JSON.stringify(params))
    return getRoleList(newParams)
  }

  // 处理数据的回调
  const dataCallback = (data: DataCallBackProps) => {
    return {
      list: data?.list,
      total: data?.total,
      current: data?.current || 1,
      pageSize: data?.pageSize || 15,
    }
  }

  // 新增/编辑  角色
  const openModal = () => {
    Message.info('新增')
  }

  // 操作按钮
  const handleClickOps = async ({ type, record }: { type: number; record: AnyObject }): Promise<void> => {
    Message.info('您点击了按钮')
  }

  // 设置状态
  const change = async (record: AnyObject) => {
    Message.info('您点击了切换按钮')
  }
</script>

<style scoped lang="less">
  @import '@/assets/style/varibles.less';

  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: @font-size-md;
      }
    }
  }
</style>
