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
    draggable
  >
    <template #title> {{ (title as any)[parameter.type!] }}</template>
    <a-form
      ref="formRef"
      :model="formData"
      label-align="left"
      :merge-props="false"
      :content-flex="false"
      :disabled="disabled"
      layout="vertical"
    >
      <a-row :gutter="ROW_GUTTER * 2">
        <a-col :span="12">
          <a-form-item
            field="name"
            :label="t('form.name')"
            show-colon
            :asterisk-position="FORM_CONFIG.asteriskPosition"
            :hide-asterisk="FORM_CONFIG.hideAsterisk"
            :rules="[
              {
                required: true,
                message: t('common.input') + t('form.name'),
                minLength: 0,
                maxLength: 16,
              },
            ]"
          >
            <span v-if="disabled"> {{ formData.name ?? '--' }} </span>
            <a-input
              v-else
              v-model="formData.name"
              allow-clear
              :placeholder="t('common.input') + t('form.name') + '(' + t('common.required') + ')'"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            field="value"
            :label="t('form.value')"
            show-colon
            asterisk-position="end"
            :hide-asterisk="true"
            :rules="[
              {
                required: false,
                message: t('common.input') + t('form.value'),
              },
            ]"
          >
            <span v-if="disabled"> {{ formData.value ?? '--' }} </span>
            <a-input v-else v-model="formData.value" allow-clear :placeholder="t('common.input') + t('form.value')" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            field="alias"
            :label="t('role.column.alias')"
            show-colon
            :rules="[
              {
                minLength: 0,
                maxLength: 16,
              },
            ]"
          >
            <span v-if="disabled"> {{ formData.alias ?? '--' }} </span>
            <a-input
              v-else
              v-model="formData.alias"
              :placeholder="t('common.input') + t('role.column.alias')"
              allow-clear
              @input="inputChange"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item field="eng" :label="t('sys.dict.eng')" show-colon>
            <span v-if="disabled"> {{ formData.eng ?? '--' }} </span>
            <a-input v-else v-model="formData.eng" :placeholder="t('common.input') + t('sys.dict.eng')" allow-clear />
          </a-form-item>
        </a-col>
        <!-- <a-col :span="12">
          <a-form-item field="short" :label="t('sys.dict.short')" show-colon>
            <span v-if="disabled"> {{ formData.short ?? "--" }} </span>
            <a-input
              v-else
              v-model="formData.short"
              :placeholder="t('common.input') + t('sys.dict.short')"
              allow-clear
            />
          </a-form-item>
        </a-col> -->
        <!-- <a-col :span="12">
          <a-form-item field="abbr" :label="t('sys.dict.abbr')" show-colon>
            <span v-if="disabled"> {{ formData.abbr ?? "--" }} </span>
            <a-input v-else v-model="formData.abbr" :placeholder="t('common.input') + t('sys.dict.abbr')" allow-clear />
          </a-form-item>
        </a-col> -->
        <a-col :span="12">
          <a-form-item field="quickCode" :label="t('role.column.quickCode')" show-colon>
            <span v-if="disabled"> {{ formData.quickCode ?? '--' }} </span>
            <a-input
              v-else
              v-model="formData.quickCode"
              :placeholder="t('common.input') + t('role.column.quickCode')"
              allow-clear
            />
          </a-form-item>
        </a-col>
        <a-col :span="12" v-if="!parameter.isDict">
          <a-form-item field="index" :label="t('form.sort')" show-colon>
            <span v-if="disabled"> {{ formData.index ?? 0 }} </span>
            <a-input-number
              v-else
              v-model="formData.index"
              :min="0"
              :placeholder="t('common.input') + t('form.sort')"
            />
          </a-form-item>
        </a-col>
        <!-- <a-col :span="12" v-if="!parameter.isDict">
          <a-form-item field="description" :label="t('role.column.descripton')" show-colon>
            <span v-if="disabled"> {{ formData.description ?? "--" }} </span>
            <a-input
              v-else
              v-model="formData.description"
              :placeholder="t('common.input') + t('role.column.descripton')"
            />
          </a-form-item>
        </a-col> -->
      </a-row>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { FormInstance } from "@arco-design/web-vue";
  import { ROW_GUTTER } from "@/common/constants/index";
  import { Operations } from "@/common/enums/status-enum";
  import { FORM_CONFIG } from "@/common/constants/form-config";
  import { ICommonProps } from "@/api/dict/types";
  import { updateDict, updateDictItem, addDictItem, getDictByCode } from "@/api/dict";
  import { findQuickCode } from "@/utils/tools";
  import { MixinParams } from "./index.vue";

  const { t } = useI18n();
  const visible = ref<boolean>(false);
  const isFooter = ref<boolean>(true);
  const width = ref<string>("880px");
  const disabled = ref<boolean>(false);
  const formRef = ref<FormInstance>();

  const title = computed(() => {
    return {
      1: t("common.add"),
      2: t("common.table.edit"),
      4: t("common.table.look"),
    };
  });

  const formData = ref<ICommonProps>({
    id: "",
    name: "",
    value: "",
    alias: "",
    code: "",
    index: 0,
    quickCode: "",
    description: "",
    status: 1,
    short: "", // 简称
    eng: "", // 英文名
    abbr: "", // 简写
  });

  // 接受参数
  const parameter = ref<MixinParams>({});
  const acceptParams = (params: MixinParams) => {
    visible.value = true;
    parameter.value = { ...params };
    formData.value = { ...params?.data };
    if (parameter.value.type === Operations.LOOK) {
      isFooter.value = false;
      disabled.value = true;
    }
  };

  // 根据机构名称生成速查代码
  const inputChange = (text: string) => {
    formData.value.quickCode = findQuickCode(text);
  };

  const onCanel = () => {
    formRef.value?.clearValidate();
    formRef.value?.resetFields();
    visible.value = false;
    isFooter.value = true;
    disabled.value = false;
    setTimeout(() => {
      parameter.value.init!();
    }, 10);
  };

  const onSubmit = async () => {
    const errors = await formRef.value?.validate();
    if (!errors) {
      // ...
      parameter.value?.isDict ? handleDict() : handleDictItem();
    }
  };
  // 更新字典
  const handleDict = async () => {
    const res = await updateDict(formData.value);
    if (res) onCanel();
  };

  // 更新字典项
  const handleDictItem = async () => {
    let res = null;
    // @ts-ignore
    formData.value["dictId"] = parameter.value?.dictId;
    if (parameter.value.type === Operations.EDIT) {
      res = await updateDictItem(formData.value);
    } else {
      res = await addDictItem(formData.value);
    }
    if (res) onCanel();
  };

  defineExpose({
    visible,
    acceptParams,
  });
</script>

<style lang="less" scoped>
  @import '@/assets/style/varibles.less';
</style>
