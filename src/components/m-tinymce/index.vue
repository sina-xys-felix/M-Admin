<template>
  <div class="editor">
    <vue3Tinymce
      ref="editorRef"
      v-model="valueHtml"
      :setting="setting"
      :disabled="disabled"
      script-src="/tinymce/tinymce.min.js"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'MTinymce',
  }
</script>

<script lang="ts" setup>
  import { reactive, computed, shallowRef } from 'vue'
  import vue3Tinymce from '@jsdawn/vue3-tinymce'

  interface TinymceProps {
    height?: number // 编辑器默认初始高度
    modelValue: string // 绑定值
    menubar?: boolean // 是否需要菜单栏
    disabled?: boolean // 是否禁用编辑器输入操作
    imagesUploadApi?: string // 图片上传url
    customImagesUploadHeader?: { [key: string]: unknown } // api 请求头
    customImagesUploadParams?: { [key: string]: unknown } // api 额外参数
  }

  const props = withDefaults(defineProps<TinymceProps>(), {
    height: 400,
    disabled: false,
    menubar: false,
    imagesUploadApi: import.meta.env.VITE_API_BASE_URL + '/localFile/upload',
    customImagesUploadHeader: () => ({
      // 在这里设置请求头
    }),
  })

  const fullHeight = ref(600)

  onMounted(() => {
    setTimeout(() => {
      if (props.height) {
        fullHeight.value = props.height
      } else {
        const dom = document.querySelector('.editor')
        fullHeight.value = dom?.offsetHeight
        setting.height = fullHeight.value
      }
    }, 100)

    window.addEventListener('resize', () => {
      if (props.height) {
        fullHeight.value = props.height
      } else {
        const dom = document.querySelector('.editor')
        fullHeight.value = dom?.offsetHeight
        setting.height = fullHeight.value
      }
    })
  })

  const editorRef = shallowRef()
  const emit = defineEmits(['update:modelValue', 'change'])
  const valueHtml = computed({
    get() {
      return props.modelValue
    },
    set(val: string) {
      // 防止富文本内容为空时，校验失败
      if (!editorRef.value) val = ''
      emit('update:modelValue', val)
      emit('change', val)
    },
  })

  const imagesCallback = (response: any) => {
    return response
  }

  const fonts = () => {
    let arr = []
    for (let i = 10; i <= 100; i++) {
      arr.push(`${i}px`)
    }
    return arr.join(' ')
  }

  const setting = reactive({
    menubar: props.menubar,
    height: fullHeight.value,
    convert_urls: false,
    toolbar:
      'undo redo fullscreen blocks fontfamily fontsize alignleft aligncenter alignright outdent indent indent2em lineheight letterspacing forecolor backcolor bold italic underline hr bullist numlist table searchreplace subscript superscript strikethrough link image preview',
    toolbar_mode: 'sliding', // media
    quickbars_selection_toolbar: 'removeformat | bold italic underline strikethrough | forecolor backcolor',
    plugins:
      'autolink hr autosave code paste pagebreak codesample preview searchreplace autolink directionality visualblocks visualchars fullscreen image align link table charmap pagebreak nonbreaking advlist lists wordcount autosave emoticons letterspacing indent2em',
    font_family_formats:
      '宋体=simsun,serif;仿宋体=FangSong,serif;微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;黑体=SimHei,sans-serif;楷体=楷体,Helvetica,Arial,sans-serif;华文新魏=华文新魏,Helvetica,Arial,sans-serif;隶书=隶书,Helvetica,Arial,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
    font_size_formats: fonts(),
    letterspacing: '1px 2px 4px 6px 8px 12px',
    link_default_target: '_blank',
    link_title: false,
    nonbreaking_force_tab: false,
    line_height_formats: '1 1.2 1.5 2 2.5 3 4', //行高
    // 以中文简体为例
    language: 'zh-Hans',
    language_url: '/tinymce/langs/zh-Hans.js',
    content_style: 'body{font-size: 14px}',
    formats: {
      alignjustify: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'align-justify' },
    },
    paste_enable_default_filters: true,
    // 该设置在自word粘贴时，允许指定元素和属性保存在过滤结果中。
    paste_word_valid_elements:
      'table[width],tr,td[colspan|rowspan|width],th[colspan|rowspan|width],thead,tfoot,tbody,h1,h2,h3,h4,h5,img,p',
    autosave_interval: '10s',
    images_file_types: 'jpeg,jpg,png,gif',
    // 开启组件拓展的 上传图片功能，工具栏 图片按钮 弹框中出现 `upload` 选项
    custom_images_upload: false,
    // 复用 图片上传 api 地址
    // images_upload_url: props.imagesUploadApi,
    // 上传成功回调函数，return 图片地址。默认 response.location
    // custom_images_upload_callback: imagesCallback,
    // // 上传 api 请求头
    // custom_images_upload_header: props.customImagesUploadHeader,
    // // 上传 api 额外的参数。图片默认 file
    // custom_images_upload_param: props.customImagesUploadParams,
    // images_upload_handler: (blobInfo: any) =>
    //   new Promise((resolve, reject) => {
    //     resolve('上传成功!')
    //   }),
  })

  const onChange = (content: string) => {
    emit('update:modelValue', content)
  }

  defineExpose({
    imagesCallback,
  })
</script>

<style lang="less" scoped>
  .editor {
    width: 100%;
    :deep(.tox-statusbar) {
      display: none;
    }
    :deep(.tox-edit-area) {
      justify-content: center;
      background: #f8f8fa;
      // padding: 20px;
    }

    :deep(.tox-edit-area__iframe) {
      width: 840px;
      padding: 0 20px;
    }
  }

  .align-justify {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
