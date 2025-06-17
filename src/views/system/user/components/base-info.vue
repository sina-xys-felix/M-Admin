<template>
  <a-form
    ref="formRef"
    layout="vertical"
    auto-label-width
    :label-align="(FORM_CONFIG.labelAlign as any)"
    :content-flex="FORM_CONFIG.contentFlex"
    :model="formData"
    :disabled="type === Operations.LOOK"
  >
    <a-row :gutter="80">
      <a-col :span="8">
        <a-form-item
          field="name"
          :label="t('staff.column.name')"
          show-colon
          :asterisk-position="FORM_CONFIG.asteriskPosition"
          :hide-asterisk="FORM_CONFIG.hideAsterisk"
          :rules="[
            {
              required: true,
              message: t('common.input') + t('staff.column.name'),
              minLength: 1,
              maxLength: 50,
            },
          ]"
        >
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.name) }}</span>
          <a-input
            v-else
            v-model="formData.name"
            allow-clear
            @input="inputChange"
            :placeholder="t('common.input') + t('staff.column.name') + '(' + t('common.required') + ')'"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          :label="t('staff.column.quickCode')"
          field="quickCode"
          show-colon
          :rules="[
            {
              required: false,
              minLength: 0,
              maxLength: 50,
            },
          ]"
        >
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.quickCode) }}</span>
          <a-input
            v-else
            v-model="formData.quickCode"
            allow-clear
            :placeholder="t('common.input') + t('staff.column.quickCode')"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          :label="t('staff.column.nickName')"
          field="nickName"
          show-colon
          :rules="[
            {
              required: false,
              minLength: 0,
              maxLength: 50,
            },
          ]"
        >
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.nickName) }}</span>
          <a-input
            v-else
            v-model="formData.nickName"
            allow-clear
            :placeholder="t('common.input') + t('staff.column.nickName')"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          :label="t('staff.column.no')"
          field="no"
          show-colon
          :rules="[
            {
              required: false,
              minLength: 0,
              maxLength: 50,
            },
          ]"
        >
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.no) }}</span>
          <a-input v-else v-model="formData.no" allow-clear :placeholder="t('common.input') + t('staff.column.no')" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          :label="t('staff.column.job')"
          field="job"
          show-colon
          :asterisk-position="FORM_CONFIG.asteriskPosition"
          :hide-asterisk="FORM_CONFIG.hideAsterisk"
          :rules="[
            {
              required: true,
              message: t('common.input') + t('staff.column.job'),
            },
          ]"
        >
          <MDict
            v-model="formData.job"
            :disabled="disabled"
            :code="DictEnum.USERTYPE"
            :placeholder="t('common.select') + t('staff.column.job') + '(' + t('common.required') + ')'"
          ></MDict>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          field="idNumber"
          :label="t('staff.column.idNumber')"
          show-colon
          :rules="[
            {
              required: false,
              message: t('common.input') + t('staff.column.idNumber'),
              validator: !disabled ? checkId : '',
            },
          ]"
        >
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.idNumber) }}</span>
          <a-input
            v-else
            v-model="formData.idNumber"
            allow-clear
            @blur="onNumberBlur"
            :placeholder="t('common.input') + t('staff.column.idNumber')"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="t('staff.column.gender')" field="gender" show-colon>
          <MDict
            v-model="formData.gender"
            :code="DictEnum.GENDER"
            :disabled="disabled"
            :placeholder="t('common.select') + t('staff.column.gender')"
          ></MDict>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          field="mobile"
          :label="t('staff.column.mobile')"
          show-colon
          :rules="[
            {
              required: false,
              message: t('common.input') + t('staff.column.mobile'),
              validator: !disabled ? checkPhone : '',
              length: 11,
            },
          ]"
        >
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.mobile) }}</span>
          <a-input
            v-else
            v-model="formData.mobile"
            allow-clear
            :placeholder="t('common.input') + t('staff.column.mobile')"
          />
        </a-form-item>
      </a-col>

      <a-col :span="8">
        <a-form-item field="phone" :label="t('staff.column.phone')" show-colon>
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.phone) }}</span>
          <a-input
            v-else
            v-model="formData.phone"
            allow-clear
            :placeholder="t('common.input') + t('staff.column.phone')"
          />
        </a-form-item>
      </a-col>

      <a-col :span="8">
        <a-form-item
          field="email"
          :label="t('staff.column.email')"
          show-colon
          :rules="[
            {
              required: false,
              message: t('common.input') + t('staff.column.email'),
              type: 'email',
            },
          ]"
        >
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.email) }}</span>
          <a-input
            v-else
            v-model="formData.email"
            allow-clear
            :placeholder="t('common.input') + t('staff.column.email')"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="t('staff.column.birthday')" field="birthday" show-colon>
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.birthday) }}</span>
          <a-date-picker
            v-else
            v-model="formData.birthday"
            value-format="YYYY-MM-DD"
            :disabledDate="(current) => dayjs(current).isAfter(dayjs())"
            allow-clear
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          :label="t('staff.column.maritalStatus')"
          field="maritalStatus"
          show-colon
          :asterisk-position="FORM_CONFIG.asteriskPosition"
          :hide-asterisk="FORM_CONFIG.hideAsterisk"
          :rules="[
            {
              required: false,
              message: t('common.input') + t('staff.column.maritalStatus'),
            },
          ]"
        >
          <MDict
            v-model="formData.maritalStatus"
            :code="DictEnum.MARITAL_STATUS"
            :disabled="disabled"
            :placeholder="t('common.select') + t('staff.column.maritalStatus')"
          ></MDict>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="t('staff.column.nation')" field="nation" show-colon>
          <MDict
            v-model="formData.nation"
            :code="DictEnum.NATION"
            :disabled="disabled"
            :placeholder="t('common.select') + t('staff.column.nation')"
          ></MDict>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="t('staff.column.education')" field="education" show-colon>
          <MDict
            v-model="formData.education"
            :code="DictEnum.EDU"
            :disabled="disabled"
            :placeholder="t('common.select') + t('staff.column.education')"
          ></MDict>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="t('staff.column.party')" field="party" show-colon>
          <MDict
            v-model="formData.party"
            :code="DictEnum.PARTY"
            :disabled="disabled"
            :placeholder="t('common.select') + t('staff.column.party')"
          ></MDict>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="t('staff.column.vaild.start')" field="timer" show-colon>
          <span v-if="disabled" class="text-extra">{{
            formData.start ? formData.start + '~' + formData.end : '--'
          }}</span>
          <a-range-picker v-else v-model="formData.timer" allow-clear style="width: 100%" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="t('staff.column.isOfficial')" field="isOfficial" show-colon>
          <span v-if="disabled" class="text-extra">
            <a-tag :color="formData.isOfficial === true ? 'green' : 'red'">{{
              formData.isOfficial === true ? t('common.flag.true') : t('common.flag.false')
            }}</a-tag>
          </span>
          <a-switch v-else v-model="formData.isOfficial" :checked-value="true" :unchecked-value="false">
            <template #checked> {{ t('common.flag.true') }} </template>
            <template #unchecked> {{ t('common.flag.false') }} </template>
          </a-switch>
        </a-form-item>
      </a-col>
    </a-row>
    <div class="actions" :style="{ left: config.menuWidth + 20 + 'px' }">
      <a-space :style="{ 'padding-left': config.menuWidth + 'px' }">
        <a-button @click="resetForm" v-if="type !== Operations.LOOK">
          {{ $t('common.reset') }}
        </a-button>
        <a-button type="primary" @click="onSubmitClick">
          {{ $t('common.next') }}
        </a-button>
      </a-space>
    </div>
  </a-form>
</template>

<script lang="ts">
  export default {
    name: 'BaseInfo',
  }
</script>

<script lang="ts" setup>
  import { FormInstance } from '@arco-design/web-vue'
  import { useI18n } from 'vue-i18n'
  import { IBaseInfo } from '@/api/staff/types'
  import { DictEnum } from '@/common/enums/dict-enum'
  import { Operations } from '@/common/enums/status-enum'
  import { checkPhone, checkId, findQuickCode, analyzeIDCard } from '@/utils/tools'
  import { filterEmpty } from '@/utils/is'
  import { FORM_CONFIG } from '@/common/constants/form-config'
  import dayjs from 'dayjs'
  import config from '@/config/settings.json'

  const props = defineProps({
    type: Number,
    data: Object,
    disabled: Boolean,
  })

  const formData = ref<IBaseInfo>({} as IBaseInfo)

  nextTick(() => {
    formData.value = props.data as IBaseInfo
  })

  const formRef = ref<FormInstance>()

  const { t } = useI18n()

  const inputChange = (text: string) => {
    formData.value.quickCode = findQuickCode(text)
  }

  // 身份证变化时计算其他属性
  const onNumberBlur = () => {
    if (
      /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
        formData.value.idNumber!
      )
    ) {
      const idCardInfo = analyzeIDCard(formData.value.idNumber!)
      formData.value.birthday = idCardInfo?.birthDay ?? ''
      formData.value.gender = Number(idCardInfo?.sexCode) ?? 0
    }
  }

  const resetForm = async () => {
    await formRef.value?.resetFields()
    await formData.value?.clearValidate()
  }

  const emits = defineEmits(['changeStep'])

  const onSubmitClick = async () => {
    const res = await formRef.value?.validate()
    if (!res) {
      emits('changeStep', 'forward', { ...formData.value })
    }
  }
</script>

<style lang="less" scoped>
  .actions {
    position: fixed;
    left: 0;
    right: 20px;
    bottom: 0;
    height: 60px;
    padding: 14px 20px 14px 0;
    background: var(--color-bg-2);
    text-align: right;
    border-top: 1px solid var(--color-neutral-3);
  }
</style>
