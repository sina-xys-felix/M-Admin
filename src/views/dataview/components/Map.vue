<!--  中间地图部分 -->
<template>
    <div class="map" id="map">
        <div class="map-content">
            <MEcharts :option="mapOption" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { getMapOption } from '../config/echartsMap'
import MEcharts from '../common/MEcharts.vue'
const mapOption = ref(getMapOption())
</script>

<style lang="less" scoped>
.map {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &-content {
        position: relative;
        width: 1920px;
        height: 1080px;
    }
}
</style>