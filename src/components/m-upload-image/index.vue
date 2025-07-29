<template>
  <div class="upload-image-box">
    <template v-if="disabled && fileList.length !== 0">
      <div class="image-item-box" v-for="(item, index) in fileList" :key="index">
        <a-image :src="`${item.url}`" fit="contain" :width="width" :height="height" />
      </div>
    </template>
    <template v-else>
      <!-- 显示区域 -->
      <div
        class="image-item-box"
        v-for="(item, index) in fileList"
        :key="index"
        :style="`height: ${height};width: ${width};`"
      >
        <a-image :src="`${item.url}`" fit="contain" :width="width" :height="height">
          <template #extra>
            <a-space>
              <a-tooltip content="预览">
                <icon-eye @click="previewImg(String(item.url))" :size="20" style="color: rgb(var(--primary-6));cursor: pointer" />
              </a-tooltip>
              <a-tooltip content="裁剪">
                <icon-scissor v-if="isCut" @click="handleCut(item, index)" :size="18" style="color: rgb(var(--primary-6));cursor: pointer" />
              </a-tooltip>
              <a-tooltip content="删除">
                <icon-delete @click="handleDelete(index)" :size="16" style="color: rgb(var(--primary-6));cursor: pointer" />
              </a-tooltip>
            </a-space>
          </template>
        </a-image>
      </div>
      <!-- 上传按钮 -->
      <div class="image-item-box" v-if="fileList.length < limit" :style="`height: ${height};width: ${width};`">
        <a-upload
          :limit="limit"
          :auto-upload="true"
          :custom-request="customRequest"
          accept="image/png,image/jpeg,image/jpg"
        >
          <template #upload-button>
            <div class="action" :style="{ width, height }">
              <icon-plus style="color: var(--color-text-1)"></icon-plus>
              <span style="color: var(--color-text-1)"> {{ placeholder }} </span>
            </div>
          </template>
        </a-upload>
      </div>
    </template>
    <a-image-preview :src="showUrl" v-model:visible="visible" />
    <CutterImg ref="cutterImgRef" @complete="onComplete" />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'MUploadImage',
  }
</script>

<script lang="ts" setup>
  import { Message, RequestOption } from '@arco-design/web-vue'
  import { base64ToFile,fileToBase64 } from '@/utils/tools'
  import CutterImg from './cutter-img.vue'

  const emits = defineEmits(['update:modelValue', 'change'])

  const visible = ref(false)

  interface ImageProps {
    /* 默认宽度 */
    width?: string
    /* 默认高度 */
    height?: string
    /* 绑定值 */
    modelValue: string
    /* 是否禁用 */
    disabled?: boolean
    /* 限制上传的数量 */
    limit?: number
    /* 提示信息 */
    placeholder?: string
    /* 是否可裁剪 */
    isCut?: boolean
  }

  const props = withDefaults(defineProps<ImageProps>(), {
    width: '150px',
    height: '100px',
    disabled: false,
    limit: 3,
    placeholder: '添加图片',
    isCut: true,
  })

  interface IFileItem {
    url: string
    name?: string
    size?: number
    uid?: string
    centrePath?: string
    masterPath?: string
    smallPath?: string
  }

  const cutterImgRef = ref<InstanceType<typeof CutterImg>>()

  const fileList = ref<IFileItem[]>([])
  const showUrl = ref<string>('')
  // 自定义上传请求
  const customRequest = async (option: RequestOption) => {
    const {fileItem } = option
    const param: any = new FormData()
    param.append('file', fileItem.file)
    /* 这里仅做图片展示，具体使用时可以根据需求自定义实现 */ 
    const base64String = await fileToBase64(fileItem.file)
    fileList.value.push({
      url:base64String
    })
    // await handleImage(param)
  }

  const handleImage = async (param: FormData) => {
    return await new Promise((resolve)=>{
        Message.success("图片自定义上传!")
        resolve(true)
    })
  }

  // 删除图片
  const handleDelete = (index: number) => {
    const delImg = fileList.value.splice(index, 1)
    if (fileList.value.length) {
      let arr: any = []
      fileList.value.map((ele: any) => {
        let item: IFileItem = {
          url: ele.url,
        }
        arr.push(item)
      })
      if (arr.length) emits('update:modelValue', JSON.stringify(handleFormData()))
      else emits('update:modelValue', '')
      emits('change')
    } else fileList.value = []

    if (delImg.length) {
      const path = delImg[0].url
        Message.info("删除成功")
    }
  }

  const handleCut = (data: IFileItem, index: number) => {
    cutterImgRef.value?.open(data.url, index)
  }

  const handleFormData = () => {
    const imgList = fileList.value
    return imgList.map((item) => {
      return {
        url: item.url
      }
    })
  }

  // 显示大图片
  const previewImg = (url: string) => {
    visible.value = true
    showUrl.value = url
  }

  const onComplete = (data: { imgUrl: string; imgIndex: number }) => {
    const path = fileList.value[data.imgIndex].url

    const file = base64ToFile(data.imgUrl, `${new Date().getMilliseconds()}.png`, 'image/png')
    const param: any = new FormData()
    param.append('file', file)

    fileList.value[data.imgIndex].url = data.imgUrl
    Message.success("图片自定义上传")
  }

  watch(
    () => props.modelValue,
    (newVal) => {
      if (newVal && typeof newVal === 'string') {
        const imgArr = JSON.parse(newVal) || []
        fileList.value = imgArr?.length ? imgArr : []
        if (imgArr?.length) {
          fileList.value = imgArr.map((item) => {
            return {
              url: item.url
            }
          })
        } else {
          fileList.value = []
        }
      } else fileList.value = []
    },
    { immediate: true },
  )

  onUnmounted(() => {
    fileList.value = []
  })
</script>

<style lang="less" scoped>
  .upload-image-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;

    .image-item-box {
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--color-fill-2);
      border-radius: 4px;
    }
  }

  .action {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    border: 1px dashed rgb(132, 145, 165);
    border-radius: 4px;
    background: var(--color-fill-2);
  }

  .actions {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-white);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .actions:hover {
    opacity: 1;
  }

  :deep(.arco-image-footer) {
    padding: 8px;
    display: flex;
    justify-content: center;

    &:hover {
      background: rgba(132, 145, 165, 0.85);
    }
  }

  :deep(.arco-image-footer-extra) {
    padding-left: 0;
  }

  :deep(.arco-upload-list.arco-upload-list-type-text, .arco-upload-list.arco-upload-list-type-picture) {
    display: none;
  }
</style>
