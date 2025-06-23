<template>
  <div class="container">
    <div class="content">
      <a-result class="result" status="404" :subtitle="$t('exception.result.404.description')"> </a-result>
      <div class="operation-row">
        <a-button key="again" style="margin-right: 16px" @click="refresh">
          {{ $t("exception.result.404.retry") }}
        </a-button>
        <a-button key="back" type="primary" @click="back">
          {{ $t("exception.result.404.back") }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
const back = () => {
  // warning： Go to the node that has the permission
  router.push({ name: 'Welcome' });
};

const refresh = () => {
  window.location.reload();
};
</script>

<script lang="ts">
export default {
  name: "404",
};
</script>

<style scoped lang="less">
.container {
  padding: 20px;
  height: 100%;
  :deep(.content) {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    background-color: var(--color-bg-1);
    border-radius: 4px;
  }
}
</style>
