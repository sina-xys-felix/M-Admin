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
  import { TreeOptions, selectedOptions, checkedOptions } from './types'

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
  const onSelect = (selectedKeys: (string | number)[], data: selectedOptions) => {
    emits('select', selectedKeys, data)
  }

  //   点击树节点复选框时触发
  const onCheck = (checkedKeys: (string | number)[], data: checkedOptions) => {
    emits('check', checkedKeys, data)
  }
</script>

<style lang="less" scoped></style>
