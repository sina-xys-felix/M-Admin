<template>
  <span v-if="disabled" class="text-extra">{{ findTreeNode(options, modelValue, fieldNames) || '--' }}</span>
  <a-cascader
    v-else
    :options="options"
    style="width: 100%"
    :maxTagCount="maxTagCount"
    :multiple="multiple"
    :allowClear="allowClear"
    :allow-search="allowSearch"
    :field-names="fieldNames"
    :fallback="fallback"
    :check-strictly="checkStrictly"
    :model-value="selectedValue"
    :read-only="readonly"
    @change="onChange"
    @clear="onClear"
    @input-value-change="inputChange"
    :filter-option="filterOption"
  />
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { CascaderFieldNames, CascaderOption } from '@arco-design/web-vue'
  import { findTreeNode } from '@/utils/tree'
  import { getDictOptions } from '@/api/dict/index'
  import { AnyObject } from '@/common/types/global'

  interface SelectProps {
    modelValue: string | number | (string | number)[]
    code: string | number
    multiple?: boolean
    disabled?: boolean
    allowClear?: boolean
    allowSearch?: boolean
    maxTagCount?: number
    fieldNames?: CascaderFieldNames
    fallback?: boolean
    treeCheckable?: boolean
    requestParam?: AnyObject
    isRequestParam?: boolean
    checkStrictly?: boolean
    readonly?: boolean
    mode?: number
    data?: AnyObject[]
    formServe?: boolean // 过滤时选项是否需要远程请求
  }

  const props = withDefaults(defineProps<SelectProps>(), {
    treeCheckable: false,
    multiple: false,
    disabled: false,
    allowClear: true,
    allowSearch: false,
    readonly: false,
    maxTagCount: 2,
    fieldNames: () => {
      return {
        value: 'value',
        label: 'label',
        children: 'children',
      }
    },
    fallback: false,
    isRequestParam: false,
    checkStrictly: true,
    formServe: false,
    mode: 2, // 1 搜索时，模式1，每次请求数据，模式2，从缓存里取,目前仅适用于场馆选择
  })

  const options = ref([])

  // 存放所有数据
  const allCache = ref([])

  const emits = defineEmits(['update:modelValue', 'change', 'inputChange'])

  // 用户触发选择
  const onChange = (value: string | number | Record<string, any> | (string | number | Record<string, any>)[]) => {
    selectedValue.value = value
    emits('update:modelValue', value)
    emits('change', value)
  }

  const selectedValue = ref<any>(props.modelValue)

  const onClear = () => {
    selectedValue.value = props.multiple ? [] : ''
  }

  const inputChange = (value: string) => {
    if (value.length >= 2 || !value) emits('inputChange', value)
  }

  const filterOption = async (inputValue: string, option: CascaderOption) => {
    if (inputValue.length >= 2) {
      const nodes = options.value.filter((item) => item[props.fieldNames.label || 'label']?.indexOf(inputValue) > -1)
    } else {
      return (
        (option.name || '').indexOf(inputValue) > -1 ||
        (option.quickCode || '').indexOf(inputValue) > -1 ||
        (option.code || '').indexOf(inputValue) > -1
      )
    }
  }

  //   获取用户字典
  const getOptions = async () => {
    if (props.data) {
      // 静态数据
      options.value = props.data as never
    } else {
      const cache = localStorage.getItem(props.code.toString())
      if (cache && props.mode !== 3) {
        if (props.mode === 2) {
          allCache.value = JSON.parse(cache)
          options.value = JSON.parse(cache)
        } else {
          options.value = JSON.parse(cache)
        }
        return
      }
      // if (props.code) {
      //   // 特殊字典处理，TODO
      // } else {
      // 通用字典处理
      const response = await getDictOptions(Number(props.code))
      if (response) {
        let res = appendNodeInTree(response)
        options.value = res
        if (props.mode === 2) {
          allCache.value = res
          localStorage.setItem(props.code.toString(), JSON.stringify(res))
        }
      }
      // }
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
    { immediate: true }
  )

  watch(
    () => props.code,
    (newVal) => {
      if (newVal) {
        getOptions()
      }
    },
    { immediate: true }
  )

  watch(
    () => props.requestParam,
    (newVal) => {
      if (newVal) {
        getOptions()
      }
    },
    { immediate: true, deep: true }
  )
</script>
