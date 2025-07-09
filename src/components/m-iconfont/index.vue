<template>
  <IconFont v-bind="$attrs" :type="`icon-${name}`" :size="size" />
</template>

<script lang="ts">
  export default {
    name: 'MIconFont'
  }
</script>

<script lang="ts" setup>
  import { Icon } from '@arco-design/web-vue'

  defineProps({
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 16,
    },
  })

  function getIconfontSymbol(): string {
    return 'https://at.alicdn.com/t/c/font_4927225_xnxm81zchj.js'
  }

  const IconFont = Icon.addFromIconFontCn({ src: getIconfontSymbol() })
</script>
