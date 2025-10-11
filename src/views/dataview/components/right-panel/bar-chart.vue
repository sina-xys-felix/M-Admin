<template>
    <MPanel>
        <template #header>店铺销售TOP3</template>
        <template #content>
            <div class="rank">
                <div class="rank-2">
                    <div class="value">
                        {{ '5000' }}
                        <span>万元</span>
                    </div>
                    <div class="img"></div>
                    <div class="name">
                        <div class="dot"></div>
                        NO.2 产品B
                    </div>
                </div>
                <div class="rank-1">
                    <div class="value">
                        {{ '7000' }}
                        <span>万元</span>
                    </div>
                    <div class="img1"></div>
                    <div class="name">
                        <div class="dot1"></div>
                        NO.1 产品A
                    </div>
                </div>
                <div class="rank-3">
                    <div class="value">
                        {{ '4000' }}
                        <span>万元</span>
                    </div>
                    <div class="img"></div>
                    <div class="name">
                        <div class="dot"></div>
                        NO.3 产品C
                    </div>
                </div>
            </div>
        </template>
    </MPanel>
</template>

<script setup lang="ts">
import MPanel from '@/views/dataview/common/MPanel.vue'
</script>

<style lang="less" scoped>
.flex-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.rank {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 8px;

    &-2,
    &-3 {
        flex: 3;
        .flex-center();
        padding-top: 20px;
    }

    &-1 {
        flex: 4;
        .flex-center();
        justify-content: center;
    }

    .value {
        color: #F3DB5D;
        font-size: 24px;
        font-family: 'DIN';

        span {
            color: #C5D6E6;
            font-family: PingFangSC;
            font-size: 20px;
        }
    }

    .img {
        width: 123px;
        height: 82px; // 123 82
        background: url('@/assets/images/dataview/NO.2.png') no-repeat center center;
        background-size: contain;
    }

    .img1 {
        width: 164px; // 164 102
        height: 102px;
        background: url('@/assets/images/dataview/NO.1.png') no-repeat center center;
        background-size: contain;
    }

    .name {
        font-size: 20px;
        display: flex;
        align-items: center;
        gap: 4px;

        .dot {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid #5C9DF7;
            position: relative;

            &::after {
                content: '';
                width: 10px;
                height: 10px;
                top: 4.5px;
                left: 4.3px;
                position: absolute;
                border-radius: 50%;
                background-color: #5C9DF7;
            }
        }

        .dot1 {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid #9CEBFB;
            position: relative;

            &::after {
                content: '';
                width: 10px;
                height: 10px;
                top: 4.5px;
                left: 4.3px;
                position: absolute;
                border-radius: 50%;
                background-color: #9CEBFB;
            }
        }
    }


}
</style>