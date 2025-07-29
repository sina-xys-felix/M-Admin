<template>
  <a-modal
    title="图片裁剪"
    width="1000px"
    title-align="start"
    :bodyStyle="{ padding: '0 20px' }"
    :visible="visible"
    @ok="onSubmit"
    @cancel="onCancel"
    @close="onCancel"
  >
    <div class="cutter-container">
      <div class="cutter-component">
        <div class="title"></div>
        <ImgCutter
          v-bind="cutterProps"
          ref="imgCutterModal"
          @cutDown="cutDownImg"
          @onPrintImg="cutterPrintImg"
          @onImageLoadComplete="handleImageLoadComplete"
          @onImageLoadError="handleImageLoadError"
          @onClearAll="handleClearAll"
          class="img-cutter"
        >
          <template #choose>
            <div></div>
          </template>
          <template #cancel>
            <div></div>
          </template>
          <template #scaleReset> 缩放： </template>
          <template #turnLeft> 向左旋转 </template>
          <template #turnRight> 向右旋转 </template>
          <template #reset>重置旋转 </template>
          <template #flipHorizontal> 水平翻转 </template>
          <template #flipVertically>垂直翻转 </template>
          <template #confirm>
            <div></div>
          </template>
        </ImgCutter>
      </div>

      <div v-if="showPreview" class="preview-container">
        <div class="title">{{ previewTitle }}</div>
        <div
          class="preview-box"
          :style="{
            width: `${cutterProps.cutWidth}px`,
            height: `${cutterProps.cutHeight}px`,
          }"
        >
          <img class="preview-img" :src="temImgPath" alt="预览图" v-if="temImgPath" />
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import ImgCutter from 'vue-img-cutter'

  defineOptions({ name: 'CutterImg' })

  interface CutterProps {
    // 基础配置
    /** 是否模态框 */
    isModal?: boolean
    /** 是否显示工具栏 */
    tool?: boolean
    /** 工具栏背景色 */
    toolBgc?: string
    /** 预览标题 */
    previewTitle?: string
    /** 是否显示预览 */
    showPreview?: boolean

    // 尺寸相关
    /** 容器宽度 */
    boxWidth?: number
    /** 容器高度 */
    boxHeight?: number
    /** 裁剪宽度 */
    cutWidth?: number
    /** 裁剪高度 */
    cutHeight?: number
    /** 是否允许大小调整 */
    sizeChange?: boolean

    // 移动和缩放
    /** 是否允许移动 */
    moveAble?: boolean
    /** 是否允许图片移动 */
    imgMove?: boolean
    /** 是否允许缩放 */
    scaleAble?: boolean

    // 图片相关
    /** 是否显示原始图片 */
    originalGraph?: boolean
    /** 是否允许跨域 */
    crossOrigin?: boolean
    /** 文件类型 */
    fileType?: 'png' | 'jpeg'
    /** 质量 */
    quality?: number

    // 水印
    /** 水印文本 */
    watermarkText?: string
    /** 水印字体大小 */
    watermarkFontSize?: number
    /** 水印颜色 */
    watermarkColor?: string

    // 其他功能
    /** 是否保存裁剪位置 */
    saveCutPosition?: boolean
    /** 是否预览模式 */
    previewMode?: boolean
  }

  interface CutterResult {
    fileName: string
    file: File
    blob: Blob
    dataURL: string
  }

  const props = withDefaults(defineProps<CutterProps>(), {
    // 基础配置默认值
    isModal: false,
    tool: true,
    toolBgc: '#fff',
    previewTitle: '实时预览',
    showPreview: true,
    lockScroll: true,

    // 尺寸相关默认值
    boxWidth: 480,
    boxHeight: 360,
    cutWidth: 360,
    cutHeight: 240,
    sizeChange: true,

    // 移动和缩放默认值
    moveAble: true,
    imgMove: true,
    scaleAble: true,

    // 图片相关默认值
    originalGraph: false, // originalGraph 等于 true 时裁剪原图，不支持图像旋转
    crossOrigin: true,
    fileType: 'png',
    quality: 0.9,

    // 水印默认值
    watermarkText: '',
    watermarkFontSize: 20,
    watermarkColor: '#ffffff',

    // 其他功能默认值
    saveCutPosition: true,
    previewMode: true,
  })

  const emit = defineEmits(['complete'])

  const visible = ref(false)

  const temImgPath = ref('')
  const imgCutterModal = ref()
  const temImgIndex = ref(-1)

  // 计算属性：整合所有ImgCutter的props
  const cutterProps = computed(() => ({
    ...props,
    WatermarkText: props.watermarkText,
    WatermarkFontSize: props.watermarkFontSize,
    WatermarkColor: props.watermarkColor,
  }))

  // 初始化裁剪器
  async function initImgCutter() {
    if (temImgPath.value) {
      try {
        // await preloadImage(temImgPath.value)
        imgCutterModal.value?.handleOpen({
          name: '封面图片',
          src: temImgPath.value,
        })
      } catch (error) {
        console.error('图片加载失败:', error)
      }
    }
  }

  // 实时预览
  function cutterPrintImg(result: { dataURL: string }) {
    temImgPath.value = result.dataURL
  }

  // 裁剪完成
  function cutDownImg(result: CutterResult) {
    temImgPath.value = result.dataURL
    // emit('update:imgUrl', result.dataURL)
  }

  // 图片加载完成
  function handleImageLoadComplete(result: any) {
    console.log('图片加载完成')
  }

  // 图片加载失败
  function handleImageLoadError(error: any) {
    console.log('图片加载失败')
  }

  // 清除所有
  function handleClearAll() {
    temImgPath.value = ''
  }

  const open = (imgUrl: string, index: number) => {
    visible.value = true
    temImgPath.value = imgUrl
    temImgIndex.value = index
    initImgCutter()
  }

  const onSubmit = () => {
    emit('complete', { imgUrl: temImgPath.value, imgIndex: temImgIndex.value })
    visible.value = false
  }

  const onCancel = () => {
    temImgPath.value = ''
    temImgIndex.value = -1
    visible.value = false
  }

  defineExpose({
    open,
  })
</script>

<style lang="less" scoped>
  :deep(.arco-modal-body) {
    padding: 0 20px;
  }
  .cutter-container {
    display: flex;
    flex-flow: row wrap;
    gap: 20px;

    .title {
      padding: 12px 0;
      font-size: 18px;
      font-weight: 500;
    }

    .cutter-component {
      border-right: 1px solid var(--color-neutral-2);
      padding-right: 20px;
    }

    .preview-container {
      .preview-box {
        background-color: #f6f6f6 !important;

        .preview-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .download-btn {
        display: block;
        margin: 20px auto;
      }
    }

    :deep(.toolBoxControl) {
      z-index: 1000;
    }

    :deep(.dockMain) {
      right: 0;
      bottom: -40px;
      left: 0;
      z-index: 1000;
      padding: 0;
      background-color: transparent;
      opacity: 1;
    }

    :deep(.copyright) {
      display: none !important;
    }

    :deep(.dockBtnScrollBar) {
      display: none;
    }

    :deep(.i-dialog-footer) {
      height: 0;
      margin-top: 16px;
    }

    :deep(.dockBtn) {
      height: 26px;
      padding: 0 10px;
      font-size: 12px;
      line-height: 26px;
      background-color: rgb(var(--primary-6));
      color: #fff;
    }

    :deep(.dockBtnScrollBar) {
      margin: 0 10px 0 6px;
      background-color: rgb(var(--primary-6));
    }

    :deep(.scrollBarControl) {
      border-color: rgb(var(--primary-6));
    }

    :deep(.closeIcon) {
      line-height: 15px;
    }
  }
</style>
