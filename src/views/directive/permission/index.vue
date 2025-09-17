<template>
  <MBox :title="$t('menu.directive.permission')" :footer="false" :is-back="false">
    <a-row :gutter="[ROW_GUTTER, ROW_GUTTER]">
      <a-col :span="24">
        <a-space>
          <div class="btn-text mr10">按钮权限:</div>
          <a-button v-permission="'1701'" type="primary">新增</a-button>
          <a-button v-permission="'1702'" type="primary" status="success">编辑</a-button>
          <a-button v-permission="'1703'" type="primary" status="danger">删除</a-button>
        </a-space>
      </a-col>
      <a-col :span="24">
        <CodeView :code-json="sysBtn"></CodeView>
      </a-col>
    </a-row>
  </MBox>
</template>

<script setup lang="ts">

import { ROW_GUTTER } from '@/common/constants';
import MBox from '@/components/m-box/index.vue'
import CodeView from '@/components/m-code-view/index.vue'

defineOptions({
  name: "BtnPermission"
})

let sysBtn = `<a-space>
  <a-button v-permission="'1701'" type="primary">新增</a-button>
  <a-button v-permission="'1702'" type="primary" status="success">编辑</a-button>
  <a-button v-permission="'1703'" type="primary" status="danger">删除</a-button>
</a-space>`;

</script>

<style lang="less" scoped>
.btn-text {
  color: var(--color-text-1);
}
</style>
