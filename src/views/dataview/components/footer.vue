<!-- 顶部标题 -->
<template>
    <!-- 文字轮播 -->
    <div class="text-carousel">
        <transition-group name="carousel" tag="div" class="carousel-container">
            <div class="text-carousel-item" :key="currentIndex" v-show="currentIndex === getCurrentItemIndex()">
                {{ getCurrentItem() }}
            </div>
        </transition-group>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 轮播数据
const carouselData = ref([
    '【销售快报】 XX品牌本日总销售额突破 350万元，完成日度目标的 125%，表现强劲！',
    '【品类亮点】 今日XX品牌旗下“智能手表”系列销售额同比增长 45%，成为增长最快品类。',
    '【区域捷报】 华东大区今日销售额领跑全国，达 98万元，超额完成区域目标 30%。',
    '【渠道分析】 线上渠道销售额占比达 68%，其中官方直播间销售额环比增长 80%，势头迅猛。',
    '【客户洞察】 本季度XX品牌新增会员 5.2万 人，会员复购率提升至 42%，客户粘性持续增强。',
    '【库存预警】 热销单品“A系列”库存周转天数已降至 15天，建议及时补货，以防缺货风险。',
    '【目标达成】 XX品牌本月累计销售额已达 5800万元，完成月度进度 85%，超前于时间表。',
    '【促销效果】 “周末大促”活动期间，品牌整体客单价提升至 450元，环比平日增长 25%。',
    '【竞品对比】 据监测，XX品牌在本品类中的市场份额本周提升 2.1%，竞争力稳步上升。',
    '【流量转化】 官网今日总访客数 12万人次，销售转化率为 3.5%，较上周优化 0.6%。',
])

// 状态管理
const currentIndex = ref(0)
const timer = ref<number | null>(null)
const isAnimating = ref(false)
const isPaused = ref(false)

// 配置参数
const CONFIG = {
    INTERVAL: 5000, // 轮播间隔时间（毫秒）
    ANIMATION_DURATION: 500, // 动画持续时间（毫秒）
    DEBOUNCE_DELAY: 100 // 防抖延迟时间（毫秒）
}

// 获取当前显示的项目
const getCurrentItem = (): string => {
    if (carouselData.value.length === 0) return ''
    return carouselData.value[currentIndex.value]
}

// 获取当前项目索引（用于动画）
const getCurrentItemIndex = (): number => {
    return currentIndex.value
}

// 切换到下一项
const nextItem = (): void => {
    if (isAnimating.value || isPaused.value) return

    try {
        isAnimating.value = true

        setTimeout(() => {
            currentIndex.value = (currentIndex.value + 1) % carouselData.value.length
            isAnimating.value = false
        }, CONFIG.ANIMATION_DURATION)
    } catch (error) {
        console.error('轮播切换出错:', error)
        isAnimating.value = false
    }
}

// 启动轮播
const startCarousel = (): void => {
    if (timer.value) clearInterval(timer.value)
    timer.value = window.setInterval(() => {
        nextItem()
    }, CONFIG.INTERVAL)
}

onMounted(() => {
    // 启动轮播
    startCarousel()
})

onBeforeUnmount(() => {
    if (timer.value) {
        clearInterval(timer.value)
        timer.value = null
    }
})
</script>

<style lang="less" scoped>
.text-carousel {
    position: absolute;
    bottom: 24px;
    left: 50%;
    width: 744px;
    height: 43px;
    transform: translateX(-50%);
    background: linear-gradient(90deg, rgba(218, 163, 88, 0), rgba(218, 163, 88, 0.6), rgba(218, 163, 88, 0));
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    overflow: hidden;
    cursor: pointer;
    pointer-events: all;

    &:hover {
        background: linear-gradient(90deg, rgba(218, 163, 88, 0.1), rgba(218, 163, 88, 0.7), rgba(218, 163, 88, 0.1));
    }
}

.carousel-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.text-carousel-item {
    position: absolute;
    width: 100%;
    text-align: center;
    padding: 0 20px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transform: translateY(0);
    opacity: 1;
}

// 轮播动画样式
.carousel-enter-active,
.carousel-leave-active {
    transition: all 0.5s ease-in-out;
}

.carousel-enter-from {
    transform: translateY(100%);
    opacity: 0;
}

.carousel-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}

.carousel-enter-to,
.carousel-leave-from {
    transform: translateY(0);
    opacity: 1;
}
</style>