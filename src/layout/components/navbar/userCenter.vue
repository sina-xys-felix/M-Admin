<template>
  <a-modal
    :visible="visible"
    :width="width"
    :footer="isFooter"
    :mask-closable="false"
    title-align="start"
    @cancel="onCancel"
    @ok="onSubmit"
    modalClass="custom-modal"
  >
    <template #title> {{ t('common.center') }}</template>
    <a-form
      ref="formRef"
      :model="formData"
      :label-align="(FORM_CONFIG.labelAlign as any)"
      :merge-props="false"
      :content-flex="FORM_CONFIG.contentFlex"
      :disabled="disabled"
      :layout="(FORM_CONFIG.layout as any)"
    >
      <a-row :gutter="ROW_GUTTER * 2">
        <a-col :span="12">
          <a-form-item
            field="name"
            :label="t('staff.column.name')"
            show-colon
            :asterisk-position="FORM_CONFIG.asteriskPosition"
            :hide-asterisk="true"
          >
            <span> {{ formData.name ?? '--' }} </span>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            field="userName"
            :label="t('staff.column.account')"
            show-colon
            :asterisk-position="FORM_CONFIG.asteriskPosition"
            :hide-asterisk="true"
            :validate-trigger="['change', 'blur']"
          >
            <span> {{ formData.userName ?? '--' }} </span>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            field="mobile"
            :label="t('staff.column.mobile')"
            show-colon
            :asterisk-position="FORM_CONFIG.asteriskPosition"
            :validate-trigger="['change', 'blur']"
            :hide-asterisk="true"
          >
            <span> {{ formData.mobile ?? '--' }} </span>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            field="role"
            :label="t('user.column.role')"
            show-colon
            :asterisk-position="FORM_CONFIG.asteriskPosition"
            :hide-asterisk="FORM_CONFIG.hideAsterisk"
          >
            <span> {{ formData?.role }} </span>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            field="start"
            :label="t('staff.column.vaild.start')"
            show-colon
            :asterisk-position="FORM_CONFIG.asteriskPosition"
            :validate-trigger="['change', 'blur']"
            :hide-asterisk="true"
          >
            <span> {{ formData.tenant.start ? formData.tenant.start + '~' + formData.tenant.end : '--' }} </span>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            field="joinTime"
            :label="t('staff.column.entryTime')"
            show-colon
            :asterisk-position="FORM_CONFIG.asteriskPosition"
            :hide-asterisk="FORM_CONFIG.hideAsterisk"
            :validate-trigger="['change', 'blur']"
            :rules="[
              {
                required: formData.isLawExecutor,
                message: t('common.select') + t('staff.column.entryTime'),
              },
            ]"
          >
            <span>{{ formData.joinTime }}</span>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item
            field="tenant"
            :label="t('staff.column.nickName')"
            show-colon
            :asterisk-position="FORM_CONFIG.asteriskPosition"
            :hide-asterisk="FORM_CONFIG.hideAsterisk"
            :validate-trigger="['change', 'blur']"
          >
            <span>{{ formData.tenant.name }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            field="organ"
            :label="t('staff.column.email')"
            show-colon
            :asterisk-position="FORM_CONFIG.asteriskPosition"
            :hide-asterisk="FORM_CONFIG.hideAsterisk"
          >
            <span> {{ formData.email ?? '--' }} </span>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
  export default {
    name: 'UserCenter',
  }
</script>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'
  import { FormInstance } from '@arco-design/web-vue'
  import { ROW_GUTTER } from '@/common/constants/index'
  import { FORM_CONFIG } from '@/common/constants/form-config'
  import { AnyObject } from '@/common/types/global'

  const { t } = useI18n()
  const visible = ref<boolean>(false)
  const isFooter = ref<boolean>(true)
  const width = ref<string>('880px')
  const disabled = ref<boolean>(true)
  const formRef = ref<FormInstance>()

  const formData = ref<AnyObject>({
    name: '',
    userName: '',
    mobile: '',
    start: '', // 启用日期
    end: '', //启用结束日期
    joinTime: '', // 入系统日期
    role: '', //角色
    tenant: '', // 租户名称
    organ: '', // 所属机构
    email: '', //邮箱
    avatar: '', // 头像
  })

  const open = () => {
    visible.value = true
    const data = JSON.parse(localStorage.getItem('userInfo')!)
    formData.value = data
    formData.value.role = data.roles.length ? data.roles[0].name : '--'
    formData.value.start = formData.value.tenant.start ?? '--'
    formData.value.end = formData.value.tenant.end ?? '--'
  }

  const onCancel = () => {
    formRef.value?.clearValidate()
    formRef.value?.resetFields()
    formData.value = {
      name: '',
      userName: '',
      mobile: '',
      start: '', // 启用日期
      end: '', //启用结束日期
      joinTime: '', // 入系统日期
      role: '', //角色
      tenant: '', // 租户名称
      organ: '', // 所属机构
      email: '', //邮箱
      avatar: '', // 头像
    }
    visible.value = false
    isFooter.value = true
    disabled.value = false
  }

  const onSubmit = async () => {
    onCancel()
  }

  defineExpose({
    visible,
    open,
  })
</script>

<style lang="less" scoped>
  @import '@/assets/style/varibles.less';
</style>
