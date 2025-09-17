<template>
    <div ref="typedItRef">
        <slot>
            <span class="type-it"></span>
        </slot>
    </div>
</template>

<script setup lang="ts">
import TypeIt, { type Options as TypeItOptions, type Element as TypeItElement } from 'typeit'
import { ref, onMounted, withDefaults } from 'vue'

interface Props {
    options?: TypeItOptions
}

const props = withDefaults(defineProps<Props>(), {
    options: () => ({}) as TypeItOptions
})


const typedItRef = ref<HTMLElement | null>(null)

/**
 * 输出错误信息
 * @param message 错误信息
 */
function throwError(message: string) {
    throw new TypeError(message)
}

/**
 * 获取浏览器默认语言
 */
function getBrowserLanguage() {
    return navigator.language
}

onMounted(() => {
    if (!typedItRef.value) return

    const $typed = typedItRef.value.querySelector('.type-it') as TypeItElement

    if (!$typed) {
        const errorMsg =
            getBrowserLanguage() === 'zh-CN'
                ? "请确保有且只有一个具有class属性为 'type-it' 的元素"
                : "Please make sure that there is only one element with a Class attribute with 'type-it'"
        throwError(errorMsg)
        return
    }
    new TypeIt($typed, props.options).go();
})

</script>