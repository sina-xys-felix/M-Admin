<template>

    <div id="dataview" class="dataview">
        <!-- 顶部区域 -->
        <Header />
        <!-- 左侧面板 -->
        <LeftPanel />
        <!-- 中间地图区域 -->
        <Map />
        <!-- 右侧区域 -->
        <RightPanel />
        <!-- 底部区域 -->
        <Footer />

    </div>

</template>

<script setup lang="ts">
import Map from './components/Map.vue'
import Header from './components/header.vue'
import Footer from './components/footer.vue'
import LeftPanel from './components/left-panel.vue'
import RightPanel from './components/right-panel.vue'


import autofit from 'autofit.js';


onMounted(() => {
    autofit.init({
        el: 'body',
        dw: 1920,
        dh: 1080,
        resize: true
    })
})

</script>

<style>
body {
    position: relative;
    height: 1080px;
    width: 1920px;
}
</style>

<style lang="less" scoped>
.dataview {
    position: relative;
    width: 100%;
    height: 100%;
    background: url('@/assets/images/dataview/bg1.jpg') no-repeat center center;
    background-size: 100% 100%;
}
</style>