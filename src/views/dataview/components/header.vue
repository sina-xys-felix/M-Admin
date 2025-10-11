<template>
    <div class="header">
        <div class="logo">
            <img src="@/assets/logo.png" alt="">
            M-Admin
        </div>
        <div class="title">云南省某某品牌销售数据总览</div>
        <div class="time">
            {{ year + '年' + month + '月' + day + '日 星期' + week }}
        </div>
    </div>
</template>

<script setup lang="ts">

import { useTime } from '@/hooks/use-time';

const { year, month, day, week } = useTime()

</script>

<style lang="less" scoped>
.header {
    position: absolute;
    top: 2px;
    width: 100%;
    height: 88px;
    background: url('@/assets/images/dataview/title.png') no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-weight: 800;
    letter-spacing: 12px;
    color: rgba(230, 239, 253);

    .title {
        position: absolute;
        top: 12px;
        font-family: Source;
    }


    .time {
        position: absolute;
        top: 18px;
        right: 20px;
        font-size: 18px;
        letter-spacing: 2.35px;
        font-weight: 500;
    }

    .logo {
        position: absolute;
        top: 6px;
        left: 20px;
        font-size: 18px;
        letter-spacing: 2.35px;
        display: flex;
        align-items: center;
        gap: 4px;
        font-weight: 500;

        img {
            width: 32px;
            height: 32px;
        }
    }
}
</style>