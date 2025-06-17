<template>
  <a-tree
    v-bind="$attrs"
    :checked-keys="checkedKeys"
    :selected-keys="selectedKeys"
    :checkable="checkable"
    :check-strictly="checkStrictly"
    :multiple="multiple"
    :data="treeData"
    @select="onSelect"
    @check="onCheck"
    :field-names="fieldNames"
  >
    <template v-for="(value, name) in $slots" :key="name" #[name]="slotData">
      <slot v-if="name !== 'title'" :name="name" v-bind="slotData"></slot>
    </template>
    <template #switcher-icon="{ isLeaf }">
      <icon-down v-if="!isLeaf" />
      <icon-star v-if="isLeaf" />
    </template>
  </a-tree>
</template>

<script lang="ts" setup>
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

  interface selectedOptions {
    selected?: boolean
    selectedNodes?: TreeNodeData[]
    node?: TreeNodeData
    e?: Event
  }

  interface checkedOptions {
    checked?: boolean
    checkedNodes?: TreeNodeData[]
    node?: TreeNodeData
    e?: Event
    halfCheckedKeys?: (string | number)[]
    halfCheckedNodes?: TreeNodeData[]
  }

  withDefaults(defineProps<TreeOptions>(), {
    checkable: false,
    checkStrictly: false,
    multiple: false,
    fieldNames: () => ({
      key: 'key',
      title: 'title',
      children: 'children',
    }),
  })

  const emits = defineEmits(['select', 'check'])

  //   点击数节点时触发
  const onSelect = (selectedKeys: (string | number)[], data: selectedOptions): any => {
    emits('select', selectedKeys, data)
  }

  //   点击树节点复选框时触发
  const onCheck = (checkedKeys: (string | number)[], data: checkedOptions) => {
    emits('check', checkedKeys, data)
  }
</script>

<style lang="less" scoped></style>
