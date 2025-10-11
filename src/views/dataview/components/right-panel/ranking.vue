<template>
    <MPanel>
        <template #header>店铺销售排名</template>
        <template #content>
            <vue3ScrollSeamless :data-list="list" :limitScrollNum="5" :step="0.15" isWatch :hover="true" class="list">
                <div class="list-wrapper">
                    <article class="list__item" v-for="(item, index) in list" :key="index">
                        <section class="item__index">{{ 'NO.' + (index + 1) }}</section>
                        <section class="item__label">{{ item.label }}</section>
                        <div class="progress">
                            <span class="progress__conent" :style="{
                                left: getProgressValue(item.value)
                            }"></span>
                        </div>
                    </article>
                </div>
            </vue3ScrollSeamless>
        </template>
    </MPanel>
</template>

<script setup lang="ts">
import { vue3ScrollSeamless } from 'vue3-scroll-seamless'
import MPanel from '@/views/dataview/common/MPanel.vue'
const rankList = [
    { "label": "巷口小吃铺", "value": 28 },
    { "label": "邻里生鲜店", "value": 35 },
    { "label": "老街杂货铺", "value": 22 },
    { "label": "街头理发店", "value": 38 },
    { "label": "家庭洗衣店", "value": 25 },
    { "label": "社区果蔬店", "value": 42 },
    { "label": "巷尾水果店", "value": 31 },
    { "label": "老街糕点铺", "value": 29 },
    { "label": "校园文具店", "value": 23 },
    { "label": "小区五金店", "value": 45 },
    { "label": "街角宠物店", "value": 37 },
    { "label": "家常烘焙坊", "value": 26 },
    { "label": "楼下便利店", "value": 33 },
    { "label": "街边果汁店", "value": 27 },
    { "label": "巷口修补店", "value": 24 },
    { "label": "社区家政店", "value": 41 },
    { "label": "老街回收店", "value": 21 },
    { "label": "邻里早餐铺", "value": 39 },
    { "label": "校园二手店", "value": 28 },
    { "label": "小区修鞋店", "value": 36 }
]

const list = ref<{ label: string; value: number }[]>([])
let maxValue = 80
// 计算进度
const getProgressValue = (value: number) => {
    return -((maxValue - value) / maxValue) * 100 + '%'
}
onMounted(() => {
    list.value = rankList.sort((a, b) => b.value - a.value)
})
</script>

<style lang="less" scoped>
.list {
    max-height: 228px;
    outline: none;
    overflow: hidden;

    &__item {
        position: relative;
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        gap: 28px;
        padding: 0 12px 0 24px;
        box-sizing: border-box;
        font-size: 14px;

        &:nth-of-type(even) {
            background: linear-gradient(90deg, rgba(24, 39, 90, 0.8), rgba(24, 39, 90, 0.3));
            // background: linear-gradient(90deg, rgba(92, 109, 152, 0.8), rgba(92, 109, 152, 0));
        }

        .item__index {
            width: 30px;
            color: rgba(240, 195, 15, 1);
            // color: rgba(244, 168, 65, 1);
        }

        .item__label {
            width: 100px;
            height: 100%;
            line-height: 40px;
            overflow: hidden;
            color: rgba(201, 211, 234, 1);
        }

        .progress {
            position: relative;
            width: 256px;
            height: 5px;
            background: rgba(100, 110, 132, 1);
            overflow: hidden;

            .progress__conent {
                position: absolute;
                left: -100%;
                height: 100%;
                width: 100%;
                background: linear-gradient(90deg, #F0C30F, #f8c47d);
                // background: linear-gradient(90deg, #ffa832, #f8c47d);
            }
        }
    }
}
</style>