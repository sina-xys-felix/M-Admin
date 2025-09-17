<template>
    <code-mirror v-model="codeValue" :extensions="extensions" :basic="config.basic" :tab-size="config.tabSize"
        :dark="config.dark" :readonly="config.readonly" />
</template>

<script setup lang="ts">
import CodeMirror from "vue-codemirror6";
import { oneDark } from "@codemirror/theme-one-dark";
import { vue } from "@codemirror/lang-vue";
import { json } from "@codemirror/lang-json";
import { javascript } from "@codemirror/lang-javascript";
// Props接口类型
interface CodeProps {
    type?: "vue" | "javascript" | "json";
    codeJson: string;
}

const props = withDefaults(defineProps<CodeProps>(), {
    type: "vue",
    codeJson: ""
});

// 通过计算属性实现数据实时更新
// 将序列化的字符串美观输出，\t 换行
const codeValue = computed(() => props.codeJson);

// 基础配置
const config = ref({
    tabSize: 2,
    basic: true,
    dark: true,
    readonly: true
});

// 扩展
// 基础扩展：黑暗模式
const extensions = computed(() => {
    const arr = [oneDark];
    if (props.type === "javascript") {
        arr.push(javascript());
    }
    if (props.type === "vue") {
        arr.push(vue());
    }
    if (props.type === "json") {
        arr.push(json());
    }
    return arr;
});
</script>

<style lang="less" scoped>
// 修改code中的字体样式
:deep(.ͼ1 .cm-scroller) {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
}
</style>