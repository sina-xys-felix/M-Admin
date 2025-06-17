<template>
  <MBox :title="$t('menu.form.config')" :loading="loading" :is-back="false" @submit="handleSubmit" @cancel="onCancel">
    <template #default="{ scroll }">
      <MForm
        ref="daynamicRef"
        :form-data="formData"
        :columns="columns"
        :style="{ height: `${scroll - (appStore.footer ? 16 : 0)}px`, overflow: 'auto' }"
      >
        <template #label-name>
          <div style="color: red">姓名</div>
        </template>
      </MForm>
    </template>
  </MBox>
</template>

<script lang="tsx" setup>
  import { useI18n } from 'vue-i18n'
  import { useAppStore } from '@/store'
  import useLoading from '@/hooks/loading'
  import MForm from '@/components/m-form/index.vue'
  import MBox from '@/components/m-box/index.vue'

  const daynamicRef = ref()
  const appStore = useAppStore()
  const { loading, setLoading } = useLoading()

  const { t } = useI18n()
  const formData = ref({
    name: '',
    alias: '',
    count: 0,
    gender: '',
    quickCode: '',
    description: '',
    orgId: '',
    time: '',
    status: false,
    editor: '',
    remark: '',
  })

  const requestParam = ref({
    text: '',
  })

  const height = ref(document.body.offsetHeight - 176)

  onMounted(() => {
    height.value = document.body.offsetHeight - 176
  })

  const cascaderOptions = computed(() => [
    {
      value: '1',
      label: '一级',
      children: [
        { value: '11', label: '一级1' },
        { value: '12', label: '一级2' },
        { value: '13', label: '一级3' },
      ],
    },
    { value: '2', label: '二级' },
    { value: '3', label: '三级' },
  ])

  const columns = ref([
    {
      field: 'name',
      label: '姓名',
      el: 'input',
      attrs: {
        'label-col-props': { flex: '100px' },
        'wrapper-col-props': { flex: 1 },
      },
      rules: {
        required: true,
        message: '请输入姓名',
      },
    },
    {
      field: 'alias',
      label: '别名',
      el: 'input',
      attrs: {
        'label-col-props': { flex: '100px' },
        'wrapper-col-props': { flex: 1 },
      },
      rules: {
        required: true,
        message: '请输入别名',
      },
    },
    {
      field: 'count',
      label: '统计',
      el: 'input-number',
      attrs: {
        'label-col-props': { flex: '100px' },
        'wrapper-col-props': { flex: 1 },
      },
    },
    {
      field: 'gender',
      label: '性别',
      el: 'select',
      options: [
        { value: '1', label: '男' },
        { value: '2', label: '女' },
        { value: '3', label: '未知' },
      ],
      attrs: {
        'label-col-props': { flex: '100px' },
        'wrapper-col-props': { flex: 1 },
      },
    },
    {
      field: 'quickCode',
      label: '编码',
      el: 'input',
      attrs: {
        'label-col-props': { flex: '100px' },
        'wrapper-col-props': { flex: 1 },
      },
    },
    {
      field: 'orgId',
      label: '机构',
      render: () => {
        return (
          <MDict
            v-model={formData.value.orgId}
            code={''}
            data={cascaderOptions.value}
            requestParam={requestParam.value}
            fieldNames={{ value: 'value', label: 'label' }}
            placeholder={t('common.select') + t('basicTable.actions.one')}
            mode={1}
            allowSearch
          />
        )
      },
      attrs: {
        'label-col-props': { flex: '100px' },
        'wrapper-col-props': { flex: 1 },
      },
    },
    {
      field: 'time',
      label: '时间',
      el: 'date-picker',
      attrs: {
        'label-col-props': { flex: '100px' },
        'wrapper-col-props': { flex: 1 },
      },
    },
    {
      field: 'status',
      label: '状态',
      el: 'switch',
      attrs: {
        'label-col-props': { flex: '100px' },
        'wrapper-col-props': { flex: 1 },
      },
    },
    {
      field: 'editor',
      label: '内容',
      el: 'editor',
      span: 24,
      attrs: {
        'label-col-props': { flex: '100px' },
        'wrapper-col-props': { flex: 1 },
      },
      props: {
        style: { width: '100%' },
        height: '300px',
      },
    },
    {
      field: 'description',
      label: '描述',
      el: 'textarea',
      span: 24,
      attrs: {
        'label-col-props': { flex: '100px' },
        'wrapper-col-props': { flex: 1 },
      },
      props: {
        'max-length': 300,
        'auto-size': { minRows: 5, maxRows: 8 },
      },
    },
  ])

  const handleSubmit = async () => {
    const errors = await daynamicRef.value?.element.validate()
    if (!errors) {
      setLoading(true)
    }
  }

  const onCancel = async ()=>{
    await daynamicRef.value?.element.clearValidate()
  }
</script>
