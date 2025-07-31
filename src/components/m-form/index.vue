<template>
  <!-- 动态表单 -->
  <a-form
    ref="mFormRef"
    :model="formData"
    :layout="layout"
    :size="size"
    :label-col-props="labelColProps"
    :wrapper-col-props="wrapperColProps"
    :label-align="labelAlign"
    :disabled="disabled"
    :rules="rules"
    :auto-label-width="autoLabelWidth"
    :id="id"
    :scroll-to-first-error="scrollToFirstError"
    :style="style"
    :class="className"
    @submit="onSubmit"
  >
    <!-- 头部插槽 -->
    <slot name="header"></slot>

    <!-- 表单项 -->
    <a-row
      :gutter="rowConfig.gutter"
      :align="rowConfig.align"
      :justify="rowConfig.justify"
      :div="rowConfig.div"
      :wrap="rowConfig.wrap"
      v-bind="rowConfig.props"
      class="form-row"
    >
      <template v-for="(item, index) in formItems">
        <a-col
          v-if="item.show !== false"
          :key="item.field + index"
          :span="item?.span ?? DEFAULT_GRID_NUMS_EXTEND"
          :offset="item?.offset ?? 0"
          v-bind="item?.colProps"
        >
          <a-form-item
            :field="item.field"
            :label="item.label ?? ''"
            :show-colon="item?.showColon ?? true"
            :disabled="item?.disabled"
            :required="item?.required"
            :rules="item?.rules"
            :asterisk-position="item?.asteriskPosition"
            :hide-asterisk="item?.hideAsterisk"
            v-bind="item?.attrs"
          >
            <template #label>
              <slot :name="`label-${item.field}`"></slot>
            </template>
            <template #help>
              <slot :name="`help-${item.field}`"></slot>
            </template>
            <template #extra>
              <slot :name="`extra-${item.field}`"></slot>
            </template>
            <MSearchFormItem
              v-if="item?.el !== 'editor'"
              :column="handleColumns(item.field)"
              :search-param="formData"
            />
            <MEditor v-else v-model="formData[item.field]" :disabled="item.disabled" v-bind="item.props" />
          </a-form-item>
        </a-col>
      </template>
    </a-row>

    <!-- 底部插槽 -->
    <slot name="footer"></slot>
  </a-form>
</template>

<script lang="ts">
  export default {
    name: 'MForm',
  }
</script>

<script lang="ts" setup>
  import { CSSProperties } from 'vue'
  import { FieldRule, ValidatedError, ColProps, FormInstance } from '@arco-design/web-vue'
  import { Layout, Size, Align, RowConfigProps, MFormItemProps } from './types'
  import { ROW_GUTTER, DEFAULT_GRID_NUMS_EXTEND } from '@/common/constants'
  import { AnyObject } from '@/common/types/global'
  import MSearchFormItem from '../m-search-form/components/index.vue'
  import MEditor from '@/components/m-editor/index.vue'

  // 表单属性
  interface MFormProps {
    columns: MFormItemProps[] // 表单项配置
    formData: AnyObject // 表单绑定的值,默认为{}
    layout?: Layout // 表单的布局方式，包括水平、垂直、多列,默认为 horizontal
    size?: Size //表单控件的尺寸,默认为medium
    labelColProps?: ColProps //标签元素布局选项。参数同 <col> 组件一致,默认为 { span: 5, offset: 0 }
    wrapperColProps?: ColProps //表单控件布局选项。参数同 <col> 组件一致,默认为{ span: 19, offset: 0 }
    labelAlign?: Align //标签的对齐方向,默认为 right
    disabled?: boolean //是否禁用表单,默认为 false
    rules?: Record<string, FieldRule | FieldRule[]> //表单项校验规则,默认为 {}
    autoLabelWidth?: boolean //是否开启自动标签宽度，仅在 layout="horizontal" 下生效。,默认为 false
    id?: string //表单控件 id 的前缀,默认为 空
    scrollToFirstError?: boolean //验证失败后滚动到第一个错误字段,默认为 false
    style?: CSSProperties
    className?: string
    rowConfig?: RowConfigProps
  }

  // 设置默认值
  const props = withDefaults(defineProps<MFormProps>(), {
    formData: () => {
      return {}
    },
    layout: 'horizontal',
    size: 'medium',
    labelColProps: () => {
      return { span: 5, offset: 0 }
    },
    wrapperColProps: () => {
      return { span: 19, offset: 0 }
    },
    labelAlign: 'right',
    disabled: false,
    rules: () => {
      return {}
    },
    id: '',
    scrollToFirstError: false,
    className: '',
    rowConfig: () => {
      return {
        gutter: ROW_GUTTER,
        justify: 'start',
        align: 'start',
        div: false,
        wrap: true,
      }
    },
  })

  const emits = defineEmits(['onSubmit'])

  // Form DOM
  const mFormRef = ref<FormInstance>()

  // 初始化表单项的列
  const formItems = ref<MFormItemProps[]>([])

  const onSubmit = async (
    data: { values: Record<string, any>; errors: Record<string, ValidatedError> | undefined },
    ev: Event
  ) => {
    const res = await mFormRef.value?.validate()
    if (!res) {
      emits('onSubmit', { data, ev })
    }
  }

  const handleColumns = (dataIndex: string) => {
    const data = props.columns.find((item) => item.field === dataIndex)
    return {
      dataIndex: dataIndex,
      extra: { isShow: true },
      search: {
        el: data?.el,
        order: data?.order,
        render: data?.render,
        props: data?.props,
        ...data,
      },
      title: data?.label ?? '',
    }
  }

  watch(
    () => props.columns,
    (newList: MFormItemProps[]) => {
      if (newList.length) formItems.value = newList.sort((a, b) => a!.order! - b!.order!)
      else formItems.value = []
    },
    { immediate: true, deep: true }
  )

  defineExpose({
    onSubmit,
    element: mFormRef,
  })
</script>

<style lang="less" scoped>
  @import '@/assets/style/varibles.less';
  .form-row {
    padding: @gap-md;
  }
  :deep(.arco-form-item-label) {
    display: flex;
  }
</style>
