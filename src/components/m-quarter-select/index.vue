<template>
  <a-date-picker
    v-model="selectedQuarter"
    mode="quarter"
    format="YYYY[年]Q[季度]"
    :popup-visible="popupVisible"
    style="width: 100%"
    :allow-clear="false"
    :placeholder="placeholder"
    @popup-visible-change="handlePopupVisibleChange"
    @change="handleQuarterSelect"
  >
    <template #cell="{ date }">
      <div class="quarter-cell">
        <div class="text">{{ date.getMonth() / 3 + 1 }}季度</div>
        <div class="dot" v-if="currentQuarter === date.getMonth() / 3 + 1"></div>
      </div>
    </template>
  </a-date-picker>
</template>

<script lang="ts">
  export default {
    name: 'MQuarterSelect',
  }
</script>

<script setup lang="ts">
  import { ref } from 'vue'

  const selectedQuarter = ref('')
  const popupVisible = ref(false)
  const currentQuarter = ref(0)

  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '请选择季度',
    },
  })

  const emit = defineEmits(['update:modelValue', 'change'])

  const handlePopupVisibleChange = (visible: boolean) => {
    popupVisible.value = visible
  }

  const handleQuarterSelect = (date: string) => {
    const arr = date.split('-')
    const year = arr[0]
    const quarter = Math.floor(Number(arr[1]) / 3 + 1)
    const value = `${year}-${quarter}`
    emit('update:modelValue', value)
    emit('change', value)
    currentQuarter.value = quarter
    selectedQuarter.value = date
    popupVisible.value = false
  }

  watch(
    () => props.modelValue,
    (newVal: string) => {
      if (newVal) {
        const arr = newVal.split('-')
        const year = arr[0]
        const month = 3 * Number(arr[1]) - 2
        const value = `${year}-${month < 10 ? '0' + month : month}`
        selectedQuarter.value = value
        currentQuarter.value = Number(arr[1])
      } else {
        selectedQuarter.value = ''
        currentQuarter.value = 0
      }
    },
    { immediate: true }
  )
</script>

<style>
  .arco-picker-cell-today::after {
    display: none;
  }
</style>

<style scoped lang="less">
  .quarter-item {
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .quarter-item:hover {
    background-color: var(--color-fill-2);
  }

  .quarter-item-active {
    background-color: var(--color-primary-light-1);
    color: var(--color-primary);
  }

  .quarter-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 4px;
    .text {
      padding-bottom: 4px;
      color: var(--color-text-1);
    }
    .dot {
      width: 4px;
      height: 4px;
      background-color: rgb(var(--primary-6));
      border-radius: 50%;
      margin: 0 auto;
    }
  }
</style>
