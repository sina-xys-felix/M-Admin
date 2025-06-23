<!-- 搜索框子项  -->
<template>
  <component
    v-if="column.search?.el || column.search?.render"
    :is="column.search?.render ?? `a-${column.search?.el}`"
    v-bind="handleSearchProps(column.search?.props)"
    v-model="searchParam[column.search?.key ?? handleProp(column.dataIndex)]"
    :options="['cascader', 'select', 'radio-group'].includes(column.search?.el) ? column.search?.options : []"
    :separator="t('common.date.separator')"
    :mode="column.search.el === 'range-picker' ? column.search?.mode : ''"
    :shortcuts="['date-picker', 'range-picker'].includes(column.search.el) ? column.search.shortcuts ?? [] : []"
    :expand-trigger="column.search.el === 'cascader' ? 'hover' : ''"
    :check-strictly="column.search.el === 'cascader' ? true : false"
    :placeholder="
      column.search.el === 'range-picker'
        ? [t('common.date.start-placeholder'), t('common.date.end-placeholder')]
        : `${placeholder}${t(`${column.title}`)}`
    "
    :allow-clear="allowClear"
    :style="{ width: column.search?.el === 'switch' ? '' : '100%' }"
    @change="handleSearchProps(column.search?.props)?.change"
    @search="handleSearchProps(column.search?.props)?.search"
    :filter-option="filterOption"
  >
    <!-- 如果有特殊处理，不满足上述格式的可以在这里处理或者自定义样式-->
    <slot />
    <template v-for="(value, name) in $slots" :key="name" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </component>
</template>

<script lang="ts">
  export default {
    name: 'MSearchFormItem',
  }
</script>

<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { handleProp } from "@/utils/tools";
import { ColumnProps } from "@/components/m-table/types";

interface SearchItemProps {
  column: ColumnProps;
  searchParam: { [key: string]: any };
}

const props = defineProps<SearchItemProps>();

const { t } = useI18n();

// 处理透传的 search.Props
const handleSearchProps = (searchProps: any) => {
  return searchProps ?? searchProps;
};

// 判断placeholder
const placeholder = computed(() => {
  const search = props.column.search;
  return (
    search?.props?.placeholder ?? (["input", "textarea"].includes(search?.el) ? t("common.input") : t("common.select"))
  );
});

const filterOption = (inputValue: string, option: any) => {
  return (
    (option.name || "").indexOf(inputValue) > -1 ||
    (option.quickCode || "").indexOf(inputValue) > -1 ||
    (option.code || "").indexOf(inputValue) > -1
  );
};

// 判断 是否有清除按钮 (当搜素框有值时，不显示清除按钮)
const allowClear = computed(() => {
  const search = props.column.search;
  return (
    search?.el !== "input-number" ??
    search?.props?.clearable ??
    (search?.defaultValue == null || search?.defaultValue == undefined)
  );
});
</script>
