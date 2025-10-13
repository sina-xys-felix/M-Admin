<template>
  <span v-if="disabled" class="text-extra">{{ findTreeNode(options, modelValue, fieldNames) || '--' }}</span>
  <a-cascader
    v-else
    v-bind="$attrs"
    :options="options"
    :model-value="selectedValue"
    :maxTagCount="maxTagCount"
    :multiple="multiple"
    :allowClear="allowClear"
    :allow-search="allowSearch"
    :field-names="fieldNames"
    :check-strictly="checkStrictly"
    @change="onChange"
    @clear="onClear"
    style="width: 100%"
  />
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { CascaderFieldNames, CascaderOption } from '@arco-design/web-vue'
  import { findTreeNode } from '@/utils/tree'
  import { getDictOptions } from '@/api/dict/index'
  import { AnyObject } from '@/common/types/global'

  interface SelectProps {
    /** 绑定值 */
    modelValue: string | number | (string | number)[]
    /** 字典值 */
    code: string | number
    /** 是否支持多选，默认为false */
    multiple?: boolean
    /** 是否禁用 */
    disabled?: boolean
    /** 是否允许清除 */
    allowClear?: boolean
    /** 是否允许搜索 */
    allowSearch?: boolean
    /** 	多选模式下，最多显示的标签数量。0 表示不限制 */
    maxTagCount?: number
    /** 自定义 CascaderOption 中的字段 */
    fieldNames?: CascaderFieldNames
    /** 是否开启严格选择模式  */
    checkStrictly?: boolean
    /** 静态数据 */
    data?: AnyObject[]
  }

  const props = withDefaults(defineProps<SelectProps>(), {
    multiple: false,
    disabled: false,
    allowClear: true,
    allowSearch: false,
    maxTagCount: 2,
    fieldNames: () => {
      return {
        value: 'value',
        label: 'label',
        children: 'children',
      }
    },
    fallback: false,
    checkStrictly: true,
  })

  /** 选中值 */
  const selectedValue = ref<string | number | (string | number)[]>(props.modelValue)
  /** 存放字典数据 */
  const options = ref<AnyObject[]>([])

  const emits = defineEmits(['update:modelValue', 'change'])

  /**
   *  @description 用户触发选择
   *  */
  const onChange = (value: string | number | (string | number)[]) => {
    selectedValue.value = value
    emits('update:modelValue', value)
    emits('change', value)
  }

  /**
   *  @description 	点击清除按钮时触发
   *  */
  const onClear = () => {
    selectedValue.value = props.multiple ? [] : ''
  }

  /**
   *  @description 获取用户字典
   *  */
  const getOptions = async () => {
    if (props.data) {
      // 静态数据
      options.value = props.data as never
    } else {
      const response = await getDictOptions(Number(props.code))
      if (response) {
        let res = appendNodeInTree(response)
        options.value = res as AnyObject[]
      }
    }
  }

  const appendNodeInTree = (tree: CascaderOption[]) => {
    tree.forEach((ele: CascaderOption) => {
      if (ele.children && ele.children.length !== 0) {
        appendNodeInTree(ele.children)
      } else {
        delete ele.children
      }
    })
    return tree
  }

  watch(
    () => props.modelValue,
    (newVal) => {
      selectedValue.value = newVal
    },
    { immediate: true },
  )

  watch(
    () => props.code,
    (newVal) => {
      if (newVal) {
        getOptions()
      }
    },
    { immediate: true },
  )
</script>
