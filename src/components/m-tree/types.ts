import { TreeNodeData } from '@arco-design/web-vue'
export interface TreeOptions {
  selectedKeys?: (string | number)[] // 选中的树节点
  checkedKeys?: (string | number)[] // 选择复选框的值
  checkable?: boolean // 是否在节点前添加复选框
  treeData: TreeNodeData[] | undefined // tree 绑定的数据
  checkStrictly?: boolean // 是否取消父子节点关联
  multiple?: boolean // 是否多选
  fieldNames?: {
    key: string
    title: string
    children: string
  }
}

export interface selectedOptions {
  selected?: boolean
  selectedNodes?: TreeNodeData[]
  node?: TreeNodeData
  e?: Event
}

export interface checkedOptions {
  checked?: boolean
  checkedNodes?: TreeNodeData[]
  node?: TreeNodeData
  e?: Event
  halfCheckedKeys?: (string | number)[]
  halfCheckedNodes?: TreeNodeData[]
}
