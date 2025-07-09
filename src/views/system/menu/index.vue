<template>
  <div class="container">
    <MTable
      ref="xTableRef"
      :selectId="'id'"
      :title="t('mer.menu')"
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
          record.isShow === true ? t('common.show') : t('common.hidden')
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
  import { useI18n } from 'vue-i18n'
  import { MenuItem } from '@arco-design/web-vue'
  import { ColumnProps, MTableInstance } from '@/components/m-table/types'
  import { getUserMenus } from '@/api/table'

  const xTableRef = ref<MTableInstance>()

  const tableData = ref([])
  const expandedRowKeys = ref<string[]>([])

  const { t } = useI18n()
  const columns = computed<ColumnProps[]>(() => [
    {
      dataIndex: 'name',
      title: t('mer.menu.name'),
      width: 200,
    },
    {
      dataIndex: 'alias',
      title: t('mer.menu.alias'),
      width: 100,
    },
    {
      title: t('mer.menu.quickCode'),
      dataIndex: 'quickCode',
      width: 150,
    },
    {
      title: t('mer.menu.type'),
      dataIndex: 'level',
      slotName: 'type',
      width: 100,
    },
    {
      title: t('mer.menu.id'),
      dataIndex: 'id',
      width: 100,
    },
    {
      title: t('mer.menu.level'),
      dataIndex: 'level',
      width: 100,
    },
    {
      title: t('mer.menu.clientRouter'),
      dataIndex: 'clientRouter',
      ellipsis: true,
      tooltip: true,
      width: 320,
    },
    {
      title: t('mer.menu.isShow'),
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
