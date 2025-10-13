<template>
  <div class="container">
    <MTable
      ref="xTableRef"
      :title="'字典管理'"
      :selected="'id'"
      :columns="columns"
      :bordered="{ cell: true }"
      :request-api="getDictItemPage"
      :dataCallback="dataCallback"
      :isShowSearchForm="false"
      :tool-button="false"
      :is-split="true"
      :stripe="true"
      :x-scroll="true"
      :request-auto="false"
    >
      <template #tree>
        <div>
          <a-input-search
            style="margin-bottom: 8px; width: 100%"
            :placeholder="'速查代码/名称'"
            v-model="searchKey"
          />
          <a-tree
            :data="treeData"
            :selected-keys="currentDictKey"
            :fieldNames="{
              key: 'id',
              title: 'name',
              children: '',
              icon: 'customIcon',
            }"
          >
            <template #extra="nodeData">
              <a-tooltip :content="'编辑'">
                <IconEdit
                  v-if="nodeData.editable"
                  style="position: absolute; right: 10px; font-size: 14px; top: 10px; color: #3370ff"
                  @click="onClickNode('1', nodeData)"
                />
              </a-tooltip>
            </template>
            <template #title="nodeData">
              <div @click="onClickNode('2', nodeData)">
                <template v-if="((index = getMatchIndex(nodeData?.name)), index < 0)">{{ nodeData?.name }}</template>
                <span v-else>
                  {{ nodeData?.name?.substr(0, index) }}
                  <span style="color: var(--color-primary-light-4)">
                    {{ nodeData?.name?.substr(index, searchKey.length) }} </span
                  >{{ nodeData?.name?.substr(index + searchKey.length) }}
                </span>
              </div>
            </template>
          </a-tree>
        </div>
      </template>
      <template #header-left>
        <a-button type="primary" @click="handleClickOps({ type: Operations.ADD, record: {} })">
          <template #icon>
            <icon-plus size="16" theme="outline" />
          </template>
          添加
        </a-button>
      </template>
      <template #index="{ record, rowIndex }">
        <span v-if="record.name">{{ rowIndex + 1 }}</span>
        <span v-else>&nbsp;</span>
      </template>
      <template #status="{ record }">
        <!--  0 禁用 1启用 -->
        <a-switch v-model="record.status" :checked-value="1" :unchecked-value="0" @change="change(record)">
          <template #checked> 正常 </template>
          <template #unchecked> 禁用 </template>
        </a-switch>
      </template>
      <template #operations="{ record }">
        <MBtnGroup v-if="record.name" :record="record" :is-permission="false" @handle-click-ops="handleClickOps" />
      </template>
    </MTable>
  </div>
</template>

<script lang="ts" setup>

  import { ColumnProps, MTableInstance } from '@/components/m-table/types'
  import { getDictList, getDictItemList } from '@/api/dict'
  import { Message, TreeNodeData } from '@arco-design/web-vue'
  import { routerParams } from '@/common/types/page'
  import { Operations } from '@/common/enums/status-enum'
  import { IDictProps } from '@/api/dict/types'
  import { AnyObject } from '@/common/types/global'
  import { DataCallBackProps } from '@/api/types'

  export interface MixinParams extends Partial<routerParams> {
    isDict?: boolean
    data?: AnyObject | null
    dictId?: string
  }

  const searchKey = ref<string>('')
  const currentDictKey = ref<string[]>([])
  const originTreeData = ref<TreeNodeData[]>()
  const treeData = ref<TreeNodeData[]>()
  const xTableRef = ref<MTableInstance>()
  const modalParams = ref<MixinParams>({
    id: '',
    type: Operations.ADD,
    isDict: true,
    data: null,
  })

  const columns = computed<ColumnProps[]>(() => [
    {
      title: '序号',
      dataIndex: 'index',
      slotName: 'index',
      width: 80,
      align: 'center',
    },
    {
      dataIndex: 'name',
      title: '名称',
      // fixed: 'left',
      width: 120,
    },
    {
      dataIndex: 'code',
      title: '字典值',
      width: 80,
    },
    {
      dataIndex: 'alias',
      title: '别名',
      width: 80,
    },
    {
      dataIndex: 'code',
      title: '编码',
      width: 120,
    },
    {
      title: '速查代码',
      dataIndex: 'quickCode',
      width: 100,
    },
    {
      title: '序号',
      dataIndex: 'index',
      width: 100,
    },
    {
      title: '描述',
      dataIndex: 'description',
      width: 320,
      ellipsis: true,
      tooltip: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      slotName: 'status',
      align: 'center',
      width: 100,
      fixed: 'right',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
      width: 110,
      fixed: 'right',
    },
  ])

  onMounted(() => {
    getDictPage()
  })

  const getDictPage = async () => {
    const res = await getDictList()
    if (res) {
      originTreeData.value = res.list
      treeData.value = res.list
      if (!currentDictKey.value?.length) {
        currentDictKey.value = res.list.length > 0 ? [res.list[0].id] : []
      }
      xTableRef.value?.getTableList()
    }
  }

  const getDictItemPage = () => {
    if (currentDictKey.value.length > 0)
      return getDictItemList({
        current: 1,
        pageSize: 10,
        key: currentDictKey.value[0],
      })
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

  // 节点操作
  const onClickNode = (type: string, node: AnyObject) => {
    currentDictKey.value = [node?.id]
    if (type === '1') {
      modalParams.value.id = node.id
      modalParams.value.type = Operations.EDIT
      modalParams.value.data = node
      modalParams.value.init = reset
      // dictDetailsRef.value?.acceptParams(modalParams.value);
      // 编辑
    } else {
      // 查询
      xTableRef.value?.getTableList()
    }
  }
  // 字典项操作
  const handleClickOps = async ({ type, record }: { type: number; record: IDictProps }) => {
    Message.info('您点击了按钮!')
  }

  const reset = () => {
    modalParams.value.id = ''
    modalParams.value.type = Operations.ADD
    modalParams.value.data = {}
    modalParams.value.isDict = true
    getDictPage()
  }

  function searchData(keyword: string): TreeNodeData[] {
    const loop = (data: TreeNodeData[]) => {
      const result: TreeNodeData[] = []
      data.forEach((item: TreeNodeData) => {
        if (
          item.quickCode.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
          item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1
        ) {
          result.push({ ...item })
        } else if (item.children) {
          const filterData = loop(item.children)
          if (filterData.length) {
            result.push({
              ...item,
              children: filterData,
            })
          }
        }
      })
      return result
    }

    return loop(originTreeData.value)
  }

  const getMatchIndex = (title: string): number => {
    if (!searchKey.value) return -1
    return title.toLowerCase().indexOf(searchKey.value.toLowerCase())
  }
  // 切换状态
  const change = async (record: AnyObject) => {
    Message.info('您点击了切换按钮!')
  }

  watch(
    () => searchKey.value,
    (newValue) => {
      if (!searchKey.value) treeData.value = originTreeData.value
      else treeData.value = searchData(newValue)
    },
    { immediate: true, deep: true }
  )
</script>

<style lang="less" scoped>
  @import '@/assets/style/varibles.less';
  .full-height {
    height: 100%;
  }
  .content-box {
    width: auto;
    height: 100%;
    padding: @gap-md;
    & > .row {
      .full-height();
      & > .col {
        .full-height();
      }
    }
  }
</style>
