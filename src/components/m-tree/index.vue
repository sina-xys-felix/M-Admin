<template>
  <div class="container-page">
    <a-input class="search-tree" v-model="searchKey" placeholder="请输入搜索关键词">
      <template #prefix>
        <icon-search />
      </template>
    </a-input>
    <div class="tree-box">
      <a-spin class="tree-loading" :loading="loading" tip="加载中...">
        <!-- TODO: 滚动条边距和宽度需要调整 -->
        <a-scrollbar style="height: 100%; overflow: auto" outer-class="scrollbar">
          <a-tree
            v-bind="$attrs"
            ref="mTreeRef"
            :data="treeData"
            :default-expand-all="true"
            :show-line="true"
            :field-names="fieldNames"
            @select="onNode"
          >
            <template #title="node">
              <span class="tree-title">{{ node.title }}</span>
            </template>
            <template #icon="node">
              <MIconFont name="file-close" :size="16" v-if="!node.isLeaf && !node.expanded" />
              <MIconFont name="file-open" :size="16" v-if="!node.isLeaf && node.expanded" />
              <icon-drive-file :size="16" v-if="node.isLeaf" />
            </template>
          </a-tree>
        </a-scrollbar>
      </a-spin>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { TreeNodeData, TreeInstance } from '@arco-design/web-vue'
  import { findParentsTailRecursive } from '@/utils'
  import { TreeOptions } from './types'
  import MIconFont from '@/components/m-iconfont/index.vue'

  const props = withDefaults(defineProps<TreeOptions>(), {
    treeData: () => [],
    fieldNames: () => ({
      key: 'key',
      title: 'title',
      children: 'children',
    }),
  })

  const emit = defineEmits(['select'])

  const mTreeRef = ref<TreeInstance>()
  const loading = ref<boolean>(false)

  const onNode = (selectedKeys: Array<string>) => {
    let list = findParentsTailRecursive(treeData.value, selectedKeys[0])
    emit('select', list)
  }

  const searchKey = ref<string>('')
  const treeData = computed(() => {
    if (!searchKey.value) return props.treeData
    return searchData(searchKey.value)
  })

  // 搜索树
  const searchData = (keyword: string) => {
    const loop = (tree: TreeNodeData[]) => {
      const result: TreeNodeData[] = [] // 存储搜索结果
      tree.forEach((item: TreeNodeData) => {
        // 匹配节点
        if (item.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
          result.push({ ...item })
        } else if (item.children) {
          // 不匹配，但是有children，深层遍历
          // filterData 存储遍历结果
          const filterData = loop(item.children)
          // 如果在深层遍历中，匹配到
          if (filterData.length) {
            // 将结果存储到children中
            result.push({
              ...item,
              children: filterData,
            })
          }
        }
      })
      return result
    }
    // 开始递归
    return loop(props.treeData)
  }
</script>

<style lang="less" scoped>
  .container-page {
    box-sizing: border-box;
    height: 100%;
    .search-tree {
      height: 32px;
      margin-bottom: 16px;
    }
    .tree-box {
      height: 100%;
      .tree-loading {
        width: 100%;
        height: 100%;
      }
      .scrollbar {
        height: 100%;
        .tree-title {
          white-space: nowrap;
        }
      }
    }
  }
</style>
