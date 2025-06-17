<template>
  <a-modal
    :visible="visible"
    :width="width"
    :footer="isFooter"
    :mask-closable="false"
    title-align="start"
    @cancel="onCanel"
    @ok="onSubmit"
    modalClass="custom-modal"
  >
    <template #title> {{ t('common.changepwd') }}</template>
    <a-form
      ref="formRef"
      :model="formData"
      :label-align="(FORM_CONFIG.labelAlign as any)"
      :merge-props="false"
      :content-flex="FORM_CONFIG.contentFlex"
      :disabled="disabled"
      :layout="(FORM_CONFIG.layout as any)"
    >
      <a-row>
        <a-col :span="24">
          <a-form-item
            field="oldPassword"
            :label="t('sys.userMenage.oldPassword')"
            show-colon
            :asterisk-position="FORM_CONFIG.asteriskPosition"
            :hide-asterisk="FORM_CONFIG.hideAsterisk"
            :validate-trigger="['change', 'blur']"
            :rules="[
              {
                required: true,
                message: t('common.select') + t('sys.userMenage.oldPassword'),
                minLength: 1,
              },
            ]"
          >
            <a-input-password
              v-model="formData.oldPassword"
              allow-clear
              :placeholder="t('common.input') + t('sys.userMenage.oldPassword') + '(' + t('common.required') + ')'"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            field="newPassword"
            :label="t('sys.userMenage.newPassword')"
            show-colon
            :asterisk-position="FORM_CONFIG.asteriskPosition"
            :hide-asterisk="FORM_CONFIG.hideAsterisk"
            :validate-trigger="['change', 'blur']"
            :rules="[
              {
                required: true,
                message: t('common.select') + t('sys.userMenage.newPassword'),
                minLength: 16,
                validator: changPassword,
              },
            ]"
          >
            <a-input-password
              v-model="formData.newPassword"
              allow-clear
              :placeholder="t('common.input') + t('sys.userMenage.newPassword') + '(' + t('common.required') + ')'"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            field="password2"
            :label="t('sys.userMenage.password2')"
            show-colon
            :asterisk-position="FORM_CONFIG.asteriskPosition"
            :hide-asterisk="FORM_CONFIG.hideAsterisk"
            :validate-trigger="['change', 'blur']"
            :rules="[
              {
                validator: confirmPassword,
                required: true,
                minLength: 1,
              },
            ]"
          >
            <a-input-password
              v-model="formData.password2"
              allow-clear
              :placeholder="t('common.input') + t('sys.userMenage.password2') + '(' + t('common.required') + ')'"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
  export default {
    name: 'ChangePassword',
  }
</script>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'
  import { FormInstance, Message } from '@arco-design/web-vue'
  import { FORM_CONFIG } from '@/common/constants/form-config'
  import { changPassword } from '@/api/login'
  import useUser from '@/hooks/user'
  import { Tips } from '@/common/enums/tips-enum'

  const { logout } = useUser()
  const { t } = useI18n()
  const visible = ref<boolean>(false)
  const isFooter = ref<boolean>(true)
  const width = ref<string>('480px')
  const disabled = ref<boolean>(false)
  const formRef = ref<FormInstance>()

  const formData = ref<any>({
    oldPassword: '',
    password2: '',
    newPassword: '',
  })

  // 接受参数
  const open = () => {
    visible.value = true
    formData.value = {
      oldPassword: '',
      password2: '',
      newPassword: '',
    }
  }

  const onCanel = () => {
    formRef.value?.clearValidate()
    formRef.value?.resetFields()
    visible.value = false
    isFooter.value = true
    disabled.value = false
  }

  const onSubmit = async () => {
    const errors = await formRef.value?.validate()
    if (!errors) {
      Reflect.deleteProperty(formData.value, 'password2')
      changPassword(formData.value).then((res) => {
        Message.success(Tips.SUCCESS)
        setTimeout(() => {
          logout()
        }, 500)
      })
    }
  }

  // 确认密码
  const confirmPassword = (value?: any, callback?: any) => {
    if (value) {
      if (value !== formData.value.newPassword) {
        const str = t('sys.userMenage.passwordErr')
        callback(str)
      }
    } else {
      const str = t('common.input') + t('sys.userMenage.password2')
      callback(str)
    }
  }

  defineExpose({
    visible,
    open,
  })
</script>

<style lang="less" scoped>
  @import '@/assets/style/varibles.less';
</style>
