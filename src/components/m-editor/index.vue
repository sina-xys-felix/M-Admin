<template>
  <div class="editor-wrapper">
    <Toolbar v-if="!disabled" class="editor-toolbar" :editor="editorRef" :mode="mode" :defaultConfig="toolbarConfig" />
    <Editor
      :style="{ height: height, overflowY: 'hidden' }"
      v-model="valueHtml"
      class="w-content"
      :mode="mode"
      :defaultConfig="editorConfig"
      @onCreated="onCreateEditor"
      @onChange="onChange"
    />
  </div>
</template>

<script setup lang="ts">
  import '@wangeditor/editor/dist/css/style.css'
  import { onBeforeUnmount, shallowRef, computed } from 'vue'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import { IDomEditor, IToolbarConfig, IEditorConfig } from '@wangeditor/editor'
  import { Message } from '@arco-design/web-vue'

  defineOptions({ name: 'MEditor' })

  // Props 定义
  interface Props {
    // 绑定值
    modelValue: string
    /** 编辑器高度 */
    height?: string
    /** 自定义工具栏配置 */
    toolbarKeys?: string[]
    /** 插入新工具到指定位置 */
    insertKeys?: { index: number; keys: string[] }
    /** 排除的工具栏项 */
    excludeKeys?: string[]
    /** 编辑器模式 */
    mode?: 'default' | 'simple'
    /** 占位符文本 */
    placeholder?: string
    /** 上传配置 */
    uploadConfig?: {
      maxFileSize?: number
      maxNumberOfFiles?: number
      server?: string
    }
    /** 是否禁用 编辑器 */
    disabled: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    height: '500px',
    mode: 'default',
    placeholder: '请输入内容...',
    disabled: false,
    excludeKeys: () => ['fontFamily', 'group-video', 'codeBlock'], //  insertImage 网络图片
  })

  const emit = defineEmits(['update:modelValue', 'change'])

  /** 编辑器实例 */
  const editorRef = shallowRef<IDomEditor>()

  const valueHtml = computed({
    get() {
      return props.modelValue
    },
    set(val: string) {
      if (props.disabled) {
        editorRef.value?.disable()
      } else {
        editorRef.value?.enable()
      }
      // 防止富文本内容为空时，校验失败
      if (!editorRef.value) val = ''
      emit('update:modelValue', val)
      emit('change', val)
    },
  })

  /** 常用配置 */
  const DEFAULT_UPLOAD_CONFIG = {
    maxFileSize: 3 * 1024 * 1024, // 3MB
    maxNumberOfFiles: 10,
    fieldName: 'file',
    allowedFileTypes: ['image/*'],
  } as const

  /** 合并上传配置 */
  const mergedUploadConfig = computed(() => ({
    ...DEFAULT_UPLOAD_CONFIG,
    ...props.uploadConfig,
  }))

  /** 上传服务器地址,这里暂且仅做示例，实际使用中替换为自己的API地址 */
  const uploadServer = computed(() => props.uploadConfig?.server || `${import.meta.env.VITE_API_BASE_URL}/api/upload`)

  /**  工具栏配置 */
  const toolbarConfig = computed((): Partial<IToolbarConfig> => {
    const config: Partial<IToolbarConfig> = {}

    // 完全自定义工具栏
    if (props.toolbarKeys && props.toolbarKeys.length > 0) {
      config.toolbarKeys = props.toolbarKeys
    }

    // 插入新工具
    if (props.insertKeys) {
      config.insertKeys = props.insertKeys
    }

    // 排除工具
    if (props.excludeKeys && props.excludeKeys.length > 0) {
      config.excludeKeys = props.excludeKeys
    }
    return config
  })

  /** 编辑器配置 */
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: props.placeholder,
    MENU_CONF: {
      uploadImage: {
        fieldName: mergedUploadConfig.value.fieldName,
        maxFileSize: mergedUploadConfig.value.maxFileSize,
        maxNumberOfFiles: mergedUploadConfig.value.maxNumberOfFiles,
        allowedFileTypes: mergedUploadConfig.value.allowedFileTypes,
        timeout: 30 * 1000,
        server: uploadServer.value,
        onSuccess() {
          Message.success(`图片上传成功`)
        },
        onError(file: File, err: any, res: any) {
          console.error('图片上传失败:', err, res)
          Message.error('图片上传失败')
        },
      },
    },
  }

  /** 编辑器创建回调 */
  const onCreateEditor = (editor: IDomEditor) => {
    editorRef.value = editor
  }

  /** 编辑器内容改变时触发 */
  const onChange = (editor: IDomEditor) => {
    editorRef.value = editor
    const currentEditor = editorRef.value.getHtml()
    emit('update:modelValue', currentEditor)
    emit('change', currentEditor)
  }

  onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor) {
      editor.destroy()
    }
  })

  defineExpose({
    /** 获取编辑器实例 */
    getEditor: () => editorRef.value,
    /** 设置编辑器内容 */
    setHtml: (html: string) => editorRef.value?.setHtml(html),
    /** 获取编辑器内容 */
    getHtml: () => editorRef.value?.getHtml(),
    /** 清空编辑器 */
    clear: () => editorRef.value?.clear(),
    /** 聚焦编辑器 */
    focus: () => editorRef.value?.focus(),
  })
</script>

<style lang="less">
  @import url('./index.less');
</style>
