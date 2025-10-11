<!-- 通用面板 -->
<template>
    <div class="panel">
        <div class="panel-header">
            <slot name="header">默认名称</slot>
        </div>
        <div class="panel-container">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style lang="less" scoped>
.panel {
    position: relative;
    width: 528px;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: #fff;

    &-header {
        position: relative;
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        background: url('@/assets/images/dataview/sub-title.png') no-repeat center center;
        background-size: 100% 100%;
        font-size: 24px;
        letter-spacing: 1px;
        padding-left: 48px;
    }

    &-container {
        position: relative;
        flex: 1;
        background: url('@/assets/images/dataview/panelBottomBg.png') no-repeat center bottom;
        background-size: 100% 100%;
        padding: 0 24px;
        box-sizing: border-box;
    }
}
</style>