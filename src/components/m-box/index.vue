<template>
  <div class="container">
    <div class="box" :class="{ border: bordered }">
      <div class="box-header" :class="{ 'border-bottom': borderedBottom }">
        <slot name="title" v-if="isTitle"></slot>
        <template v-else>
          <a-tooltip placement="top" :content="$t('exception.result.403.back')">
            <div v-if="isBack" class="back" @click="goBack">
              <icon-arrow-fall class="icon" />
            </div>
          </a-tooltip>
          <span class="title"> {{ title }}</span>
        </template>
      </div>
      <div class="box-content" :style="{ height: `${footer ? _box_height : _box_height + 40}px`, overflow: overflow }">
        <slot :scroll="_box_height" />
      </div>
      <div v-if="footer" class="box-footer" :class="{ 'border-top': borderedTop }">
        <slot name="footer">
          <a-space>
            <a-button :loading="loading" html-type="submit" @click="onSubmit('cancel')">
              <template #icon><icon-refresh /></template>
              {{ $t('common.cancel') }}
            </a-button>
            <a-button type="primary" :loading="loading" html-type="submit" @click="onSubmit('submit')">
              <template #icon>
                <icon-check />
              </template>
              {{ $t('common.submit') }}
            </a-button>
            <slot name="extra"></slot>
          </a-space>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'MBox',
  }
</script>

<script setup lang="ts">
  // 盒子 interface
  interface IBoxProps {
    title?: string
    footer?: boolean
    bordered?: boolean
    borderedBottom?: boolean
    borderedTop?: boolean
    isBack?: boolean
    overflow?: string
    loading?: boolean
  }

  withDefaults(defineProps<IBoxProps>(), {
    title: '盒子标题',
    footer: true,
    bordered: false,
    borderedBottom: true,
    borderedTop: true,
    isBack: true,
    overflow: 'auto',
    loading: false,
  })

  const _box_height = ref(0)
  const emits = defineEmits(['back', 'submit', 'cancel'])
  const slots = useSlots()
  const isTitle = ref(false)

  onMounted(() => {
    _box_height.value = document.body.clientHeight - 256 - 20
    if (slots['title']) isTitle.value = true

    window.addEventListener('resize', () => {
      _box_height.value = document.body.clientHeight - 256 - 20
    })
  })

  const onSubmit = (type?: string) => {
    if (type === 'submit') emits('submit')
    if (type === 'cancel') emits('cancel')
  }

  const goBack = () => {
    emits('back')
  }
</script>

<style lang="less" scoped>
  .box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: var(--color-bg-1);
    &-header {
      height: 48px;
      padding: 8px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        font-size: 16px;
        flex: 1;
        color: var(--color-text-1);
        font-weight: 500;
        line-height: 1.5715;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .back {
        background: rgb(var(--primary-6));
        border-radius: 4px;
        width: 16px;
        text-align: center;
        margin-right: 8px;
        margin-top: 2px;
        cursor: pointer;
        .icon {
          color: #fff;
          font-weight: 600;
          transform: rotate(90deg);
        }
      }
    }
    &-content {
      flex: 1;
      padding: 16px;
      div {
        height: 100%;
      }
    }
    &-footer {
      height: 48px;
      padding: 8px 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .border {
    border: 1px solid var(--color-neutral-3);
  }
  .border-bottom {
    border-bottom: 1px solid var(--color-neutral-3);
  }
  .border-top {
    border-top: 1px solid var(--color-neutral-3);
  }
</style>
