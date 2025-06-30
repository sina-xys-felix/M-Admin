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
    <a-row :gutter="80" style="border-bottom: 1px solid var(--color-neutral-3); margin-top: 16px">
      <a-col :span="24" style="margin-bottom: 16px">
        <span style="font-size: 16px; color: var(--color-text-2)">{{ t('staff.basic.work') }}</span>
      </a-col>
      <a-col :span="8">
        <a-form-item field="storeIds" :label="t('staff.column.storeId')" show-colon> </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="t('staff.column.isFull')" field="isFull" show-colon>
          <span v-if="disabled" class="text-extra">
            <a-tag :color="formData.isFull === true ? 'green' : 'red'">{{
              formData.isFull === true ? t('common.flag.true') : t('common.flag.false')
            }}</a-tag>
          </span>
          <a-switch v-else v-model="formData.isFull" :checked-value="true" :unchecked-value="false">
            <template #checked> {{ t('common.flag.true') }} </template>
            <template #unchecked> {{ t('common.flag.false') }} </template>
          </a-switch>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="t('staff.column.isIntern')" field="isIntern" show-colon>
          <span v-if="disabled" class="text-extra">
            <a-tag :color="formData.isIntern === true ? 'green' : 'red'">{{
              formData.isIntern === true ? t('common.flag.true') : t('common.flag.false')
            }}</a-tag>
          </span>
          <a-switch v-else v-model="formData.isIntern" :checked-value="true" :unchecked-value="false">
            <template #checked> {{ t('common.flag.true') }} </template>
            <template #unchecked> {{ t('common.flag.false') }} </template>
          </a-switch>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="t('staff.column.entryTime')" field="entryTime" show-colon>
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.entryTime) }}</span>
          <a-date-picker
            v-else
            v-model="formData.entryTime"
            value-format="YYYY-MM-DD"
            :disabledDate="(current) => dayjs(current).isAfter(dayjs())"
            allow-clear
            style="width: 100%"
          />
        </a-form-item>
      </a-col>

      <a-col :span="8">
        <a-form-item :label="t('staff.column.leaveTime')" field="leaveTime" show-colon>
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.leaveTime) }}</span>
          <a-date-picker
            v-else
            v-model="formData.leaveTime"
            value-format="YYYY-MM-DD HH:mm:ss"
            :disabledDate="(current) => dayjs(current).isAfter(dayjs())"
            allow-clear
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="80" style="border-bottom: 1px solid var(--color-neutral-3); margin-top: 16px">
      <a-col :span="24" style="margin-bottom: 16px">
        <span style="font-size: 16px; color: var(--color-text-2)">{{ t('staff.basic.contact') }}</span>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="t('staff.column.contact')" field="contact" show-colon>
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.contact) }}</span>
          <a-input
            v-else
            v-model="formData.contact"
            :placeholder="t('common.input') + t('staff.column.contact')"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          field="mobile"
          :label="t('staff.column.contactMobile')"
          show-colon
          asterisk-position="end"
          :hide-asterisk="true"
          :rules="[
            {
              required: false,
              message: t('common.input') + t('staff.column.contactMobile'),
              validator: checkPhone,
            },
          ]"
        >
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.contactMobile) }}</span>
          <a-input
            v-else
            v-model="formData.contactMobile"
            allow-clear
            :placeholder="t('common.input') + t('staff.column.contactMobile')"
          />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="80" style="margin-top: 16px">
      <a-col :span="24" style="margin-bottom: 16px">
        <span style="font-size: 16px; color: var(--color-text-2)">{{ t('staff.basic.detail') }}</span>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="t('staff.column.countryId')" field="countryId" show-colon> </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="t('staff.column.address')" field="address" show-colon>
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.address) }}</span>
          <a-input
            v-else
            v-model="formData.address"
            :placeholder="t('common.input') + t('staff.column.address')"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="t('staff.column.zipcode')" field="zipcode" show-colon>
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.zipcode) }}</span>
          <a-input
            v-else
            v-model="formData.zipcode"
            :placeholder="t('common.input') + t('staff.column.zipcode')"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item field="height" :label="t('staff.column.height')" show-colon>
          <span v-if="disabled" class="text-extra">{{ formData.height || 0 + ' CM' }}</span>
          <a-input-number
            v-else
            v-model="formData.height"
            :min="0"
            :placeholder="t('common.input') + t('staff.column.height')"
            hide-button
          >
            <template #suffix>CM</template>
          </a-input-number>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item field="weight" :label="t('staff.column.weight')" show-colon>
          <span v-if="disabled" class="text-extra">{{ formData.weight || 0 + ' KG' }}</span>
          <a-input-number
            v-else
            v-model="formData.weight"
            :min="0"
            :placeholder="t('common.input') + t('staff.column.weight')"
            hide-button
          >
            <template #suffix>KG</template>
          </a-input-number>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="t('staff.column.procreation')" field="procreation" show-colon>
          <span v-if="disabled" class="text-extra">
            <a-tag :color="formData.procreation === true ? 'green' : 'red'">{{
              formData.procreation === true ? t('common.flag.true') : t('common.flag.false')
            }}</a-tag>
          </span>
          <a-switch v-else v-model="formData.procreation" :checked-value="true" :unchecked-value="false">
            <template #checked> {{ t('common.flag.true') }} </template>
            <template #unchecked> {{ t('common.flag.false') }} </template>
          </a-switch>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item field="scholl" :label="t('staff.column.scholl')" show-colon>
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.scholl) }}</span>
          <a-input
            v-else
            v-model="formData.scholl"
            :placeholder="t('common.input') + t('staff.column.scholl')"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item field="major" :label="t('staff.column.major')" show-colon>
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.major) }}</span>
          <a-input v-else v-model="formData.major" :placeholder="t('common.input') + t('staff.column.major')"></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item field="native" :label="t('staff.column.native')" show-colon>
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.native) }}</span>
          <a-input v-else :placeholder="t('common.input') + t('staff.column.native')"></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          field="remark"
          :label="t('form.remark')"
          show-colon
          :rules="[
            {
              required: false,
              minLength: 0,
              maxLength: 255,
            },
          ]"
        >
          <span v-if="disabled" class="text-extra">{{ filterEmpty(formData.remark) }}</span>
          <a-textarea
            v-else
            :max-length="255"
            v-model="formData.remark"
            :auto-size="{ minRows: 3 }"
            :placeholder="t('common.input') + t('form.remark')"
            show-word-limit
          ></a-textarea>
        </a-form-item>
      </a-col>
    </a-row>
    <div class="actions" :style="{ left: config.menuWidth + 20 + 'px' }">
      <a-space :style="{ 'padding-left': config.menuWidth + 'px' }">
        <a-button @click="resetForm" v-if="type !== Operations.LOOK">
          {{ $t('common.reset') }}
        </a-button>
        <a-button type="primary" @click="goPrev">
          {{ $t('common.prev') }}
        </a-button>
        <a-button type="primary" @click="onSubmitClick" v-if="type !== Operations.LOOK">
          {{ $t('common.submit') }}
        </a-button>
      </a-space>
    </div>
  </a-form>
</template>

<script lang="ts">
  export default {
    name: 'Other',
  }
</script>

<script lang="ts" setup>
  import { FormInstance } from '@arco-design/web-vue'
  import { useI18n } from 'vue-i18n'
  import { type IOtherProps } from '@/api/staff/types'
  import { Operations } from '@/common/enums/status-enum'
  import { DictEnum } from '@/common/enums/dict-enum'
  import { checkPhone } from '@/utils/tools'
  import { FORM_CONFIG } from '@/common/constants/form-config'
  import config from '@/config/settings.json'
  import dayjs from 'dayjs'
  import { filterEmpty } from '@/utils/is'

  const props = defineProps({
    type: Number,
    data: Object,
    formatText: String,
    disabled: Boolean,
  })

  const formData = ref<IOtherProps>({} as IOtherProps)

  nextTick(() => {
    formData.value = props.data as IOtherProps
  })

  const formRef = ref<FormInstance>()

  const { t } = useI18n()

  const resetForm = async () => {
    await formRef.value?.resetFields()
    await formData.value?.clearValidate()
  }

  const emits = defineEmits(['changeStep'])

  const goPrev = () => {
    emits('changeStep', 'backward')
  }

  const onSubmitClick = async () => {
    const res = await formRef.value?.validate()
    if (!res) {
      emits('changeStep', 'submit', { ...formData.value })
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
