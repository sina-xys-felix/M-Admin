<template>
  <MBox :title="$t('menu.form.basic')" :isBack="false" :loading="loading" @submit="onSubmitClick">
    <template #default="{ scroll }">
      <div class="form" :style="{ maxHeight: `${scroll}px` }">
        <a-form ref="formRef" layout="vertical" :model="formData">
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item :label="$t('groupForm.form.label.video.mode')" field="video.mode">
                <a-select :placeholder="$t('groupForm.placeholder.video.mode')">
                  <a-option value="custom">自定义</a-option>
                  <a-option value="mode1">模式1</a-option>
                  <a-option value="mode2">模式2</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                :label="$t('groupForm.form.label.video.acquisition.resolution')"
                field="video.acquisition.resolution"
              >
                <a-select :placeholder="$t('groupForm.placeholder.video.acquisition.resolution')">
                  <a-option value="resolution1">分辨率1</a-option>
                  <a-option value="resolution2">分辨率2</a-option>
                  <a-option value="resolution3">分辨率3</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                :label="$t('groupForm.form.label.video.acquisition.frameRate')"
                field="video.acquisition.frameRate"
              >
                <a-input :placeholder="$t('groupForm.placeholder.video.acquisition.frameRate')">
                  <template #append> fps </template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                :label="$t('groupForm.form.label.video.encoding.resolution')"
                field="video.encoding.resolution"
              >
                <a-select :placeholder="$t('groupForm.placeholder.video.encoding.resolution')">
                  <a-option value="resolution1">分辨率1</a-option>
                  <a-option value="resolution2">分辨率2</a-option>
                  <a-option value="resolution3">分辨率3</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item :label="$t('groupForm.form.label.video.encoding.rate.min')" field="video.encoding.rate.min">
                <a-input :placeholder="$t('groupForm.placeholder.video.encoding.rate.min')" add-after="bps">
                  <template #append> bps </template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item :label="$t('groupForm.form.label.video.encoding.rate.max')" field="video.encoding.rate.max">
                <a-input :placeholder="$t('groupForm.placeholder.video.encoding.rate.max')">
                  <template #append> bps </template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                :label="$t('groupForm.form.label.video.encoding.rate.default')"
                field="video.encoding.rate.default"
              >
                <a-input :placeholder="$t('groupForm.placeholder.video.encoding.rate.default')">
                  <template #append> bps </template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                :label="$t('groupForm.form.label.video.encoding.frameRate')"
                field="video.encoding.frameRate"
              >
                <a-input :placeholder="$t('groupForm.placeholder.video.encoding.frameRate')">
                  <template #append> fps </template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item :label="$t('groupForm.form.label.video.encoding.profile')" field="video.encoding.profile">
                <a-input :placeholder="$t('groupForm.placeholder.video.encoding.profile')">
                  <template #append> bps </template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item :label="$t('groupForm.form.label.audio.mode')" field="audio.mode">
                <a-select :placeholder="$t('groupForm.placeholder.audio.mode')">
                  <a-option value="custom">自定义</a-option>
                  <a-option value="mode1">模式1</a-option>
                  <a-option value="mode2">模式2</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                :label="$t('groupForm.form.label.audio.acquisition.channels')"
                field="audio.acquisition.channels"
              >
                <a-select :placeholder="$t('groupForm.placeholder.audio.acquisition.channels')">
                  <a-option value="1">1</a-option>
                  <a-option value="2">2</a-option>
                  <a-option value="3">3</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item :label="$t('groupForm.form.label.audio.encoding.channels')" field="audio.encoding.channels">
                <a-input :placeholder="$t('groupForm.placeholder.audio.encoding.channels')">
                  <template #append> bps </template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item :label="$t('groupForm.form.label.audio.encoding.rate')" field="audio.encoding.rate">
                <a-input :placeholder="$t('groupForm.placeholder.audio.encoding.rate')">
                  <template #append> bps </template>
                </a-input>
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item :label="$t('groupForm.form.label.audio.encoding.profile')" field="audio.encoding.profile">
                <a-input :placeholder="$t('groupForm.placeholder.audio.encoding.profile')">
                  <template #append> fps </template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </template>
  </MBox>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { FormInstance } from '@arco-design/web-vue'
  import useLoading from '@/hooks/loading'
  import MBox from '@/components/m-box/index.vue'

  const formData = ref({})
  const formRef = ref<FormInstance>()
  const { loading, setLoading } = useLoading()
  const onSubmitClick = async () => {
    const res = await formRef.value?.validate()
    if (!res) {
      setLoading(true)
    }
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
</script>

<script lang="ts">
  export default {
    name: 'Group',
  }
</script>
