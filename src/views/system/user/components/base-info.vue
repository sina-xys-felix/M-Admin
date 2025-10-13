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
          :label="'姓名'"
          show-colon
          :asterisk-position="FORM_CONFIG.asteriskPosition"
          :hide-asterisk="FORM_CONFIG.hideAsterisk"
          :rules="[
            {
              required: true,
              message: '请输入姓名',
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
            :placeholder="'请输入姓名(必填)'"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          :label="'速查码'"
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
            :placeholder="'请输入速查码'"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          :label="'昵称'"
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
            :placeholder="'请输入昵称'"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          :label="'工号'"
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
          <a-input v-else v-model="formData.no" allow-clear :placeholder="'请输入工号'" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          :label="'成员类型'"
          field="job"
          show-colon
          :asterisk-position="FORM_CONFIG.asteriskPosition"
          :hide-asterisk="FORM_CONFIG.hideAsterisk"
          :rules="[
            {
              required: true,
              message: '请选择成员类型',
            },
          ]"
        >
          <MDict
            v-model="formData.job"
            :disabled="disabled"
            :code="DictEnum.USERTYPE"
            :placeholder="'请选择成员类型(必填)'"
          ></MDict>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          field="idNumber"
          :label="'身份证'"
          show-colon
          :rules="[
            {
              required: false,
              message: '请输入身份证',
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
            :placeholder="'请输入身份证'"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="'性别'" field="gender" show-colon>
          <MDict
            v-model="formData.gender"
            :code="DictEnum.GENDER"
            :disabled="disabled"
            :placeholder="'请选择性别'"
          ></MDict>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          field="mobile"
          :label="'手机号'"
          show-colon
          :rules="[
            {
              required: false,
              message: '请输入手机号',
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
            :placeholder="'请输入手机号'"
          />
        </a-form-item>
      </a-col>

      <a-col :span="8">
        <a-form-item field="phone" :label="'电话号码'" show-colon>
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.phone) }}</span>
          <a-input
            v-else
            v-model="formData.phone"
            allow-clear
            :placeholder="'请输入电话号码'"
          />
        </a-form-item>
      </a-col>

      <a-col :span="8">
        <a-form-item
          field="email"
          :label="'邮箱'"
          show-colon
          :rules="[
            {
              required: false,
              message: '请输入邮箱',
              type: 'email',
            },
          ]"
        >
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.email) }}</span>
          <a-input
            v-else
            v-model="formData.email"
            allow-clear
            :placeholder="'请输入邮箱'"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="'出生日期'" field="birthday" show-colon>
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
          :label="'婚烟状况'"
          field="maritalStatus"
          show-colon
          :asterisk-position="FORM_CONFIG.asteriskPosition"
          :hide-asterisk="FORM_CONFIG.hideAsterisk"
          :rules="[
            {
              required: false,
              message: '请选择婚烟状况',
            },
          ]"
        >
          <MDict
            v-model="formData.maritalStatus"
            :code="DictEnum.MARITAL_STATUS"
            :disabled="disabled"
            :placeholder="'请选择婚烟状况'"
          ></MDict>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="'民族'" field="nation" show-colon>
          <MDict
            v-model="formData.nation"
            :code="DictEnum.NATION"
            :disabled="disabled"
            :placeholder="'请选择民族'"
          ></MDict>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="'教育程度'" field="education" show-colon>
          <MDict
            v-model="formData.education"
            :code="DictEnum.EDU"
            :disabled="disabled"
            :placeholder="'请选择教育程度'"
          ></MDict>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="'政治面貌'" field="party" show-colon>
          <MDict
            v-model="formData.party"
            :code="DictEnum.PARTY"
            :disabled="disabled"
            :placeholder="'请选择政治面貌'"
          ></MDict>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="'有效时间'" field="timer" show-colon>
          <span v-if="disabled" class="text-extra">{{
            formData.start ? formData.start + '~' + formData.end : '--'
          }}</span>
          <a-range-picker v-else v-model="formData.timer" allow-clear style="width: 100%" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="'是否正式'" field="isOfficial" show-colon>
          <span v-if="disabled" class="text-extra">
            <a-tag :color="formData.isOfficial === true ? 'green' : 'red'">{{
              formData.isOfficial === true ? '是' : '否'
            }}</a-tag>
          </span>
          <a-switch v-else v-model="formData.isOfficial" :checked-value="true" :unchecked-value="false">
            <template #checked> 是 </template>
            <template #unchecked> 否 </template>
          </a-switch>
        </a-form-item>
      </a-col>
    </a-row>
    <div class="actions" :style="{ left: config.menuWidth + 20 + 'px' }">
      <a-space :style="{ 'padding-left': config.menuWidth + 'px' }">
        <a-button @click="resetForm" v-if="type !== Operations.LOOK">
          重置
        </a-button>
        <a-button type="primary" @click="onSubmitClick">
          下一步
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
