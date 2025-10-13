<template>
  <div class="container">
    <MTable
      ref="xTableRef"
      :selectId="'id'"
      :title="'系统菜单'"
      :columns="columns"
      :bordered="{ cell: true }"
      :data="tableData"
      isTreeTable
      :expandedRowKeys="expandedRowKeys"
      :pagination="false"
      :xScroll="true"
    >
      <template #isShow="{ record }">
        <a-tag :color="record.isShow === true ? 'green' : 'red'">{{
          record.isShow === true ? '显示' : '隐藏'
        }}</a-tag>
      </template>
      <template #type="{ record }">
        <span>{{ record.level ? '菜单' : '按钮' }}</span>
      </template>
    </MTable>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'

  import { MenuItem } from '@arco-design/web-vue'
  import { ColumnProps, MTableInstance } from '@/components/m-table/types'
  import { getUserMenus } from '@/api/table'

  const xTableRef = ref<MTableInstance>()

  const tableData = ref([])
  const expandedRowKeys = ref<string[]>([])

  const columns = computed<ColumnProps[]>(() => [
    {
      dataIndex: 'name',
      title: '名称',
      width: 200,
    },
    {
      dataIndex: 'alias',
      title: '简称',
      width: 100,
    },
    {
      title: '速查码',
      dataIndex: 'quickCode',
      width: 150,
    },
    {
      title: '类型',
      dataIndex: 'level',
      slotName: 'type',
      width: 100,
    },
    {
      title: '标识',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: '层级',
      dataIndex: 'level',
      width: 100,
    },
    {
      title: '路径',
      dataIndex: 'clientRouter',
      ellipsis: true,
      tooltip: true,
      width: 320,
    },
    {
      title: '显示',
      dataIndex: 'isShow',
      slotName: 'isShow',
      width: 80,
      align: 'center',
    },
  ])

  const getSystemMenu = async () => {
    const res = await getUserMenus()
    if (res) {
      tableData.value = loadChildren(res.data.children) as never[]
    }
  }

  onMounted(() => {
    getSystemMenu()
  })

  // 组装tree
  const loadChildren = (list: MenuItem[]) => {
    return list.map((item) => {
      if (item.children && item.children.length > 0) {
        loadChildren(item.children)
      } else {
        item.children = item.operations || []
      }
      return item
    })
  }
</script>
