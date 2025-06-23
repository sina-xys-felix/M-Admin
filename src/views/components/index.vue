<template>
  <div class="example">
    <div class="example-container">
      <div class="example-container-left-side">
        <a-space direction="vertical">
          <template v-for="(item, index) in list" :key="item.key">
            <a-button :type="current === index + 1 ? 'primary' : 'dashed'" long @click="handleOps(item)">{{
              $t(`${item.title}`)
            }}</a-button>
          </template>
        </a-space>
      </div>
      <div class="example-container-right-side">
        <div class="example-container-right-side__title">
          {{ $t(`${list[current - 1].title}`) }}
        </div>
        <div class="example-container-right-side__content">
          <template v-if="current === 1">
            <a-space direction="vertical" fill :size="[16, 16]">
              <a-alert
                >系统的底部信息。点击可以跳转
                <a href="https://beian.miit.gov.cn/" target="__blank">https://beian.miit.gov.cn/</a>
              </a-alert>
              <MFooter />
            </a-space>
          </template>
          <template v-if="current === 2">
            <a-space direction="vertical" fill :size="[16, 16]">
              <a-alert>MIconFont:在这里可以使用iconfont图标(iconfont通过symbol方式引入)。 </a-alert>
              <a-space>
                <MIconFont name="vue" />
                <MIconFont name="vue" :size="24" />
                <MIconFont name="vue" :size="32" />
                <MIconFont name="vue" :size="48" />
              </a-space>
              <a-space>
                <MIconFont name="like" />
                <MIconFont name="like" :size="24" />
                <MIconFont name="like" :size="32" />
                <MIconFont name="like" :size="48" />
              </a-space>
              <a-space>
                <MIconFont name="collect" />
                <MIconFont name="collect" :size="24" />
                <MIconFont name="collect" :size="32" />
                <MIconFont name="collect" :size="48" />
              </a-space>
            </a-space>
          </template>

          <template v-if="current === 3">
            <a-space direction="vertical" fill :size="[16, 16]">
              <a-alert>MIFrame:提供带加载状态的 iframe 容器，支持错误处理和事件回调. </a-alert>
              <MIframe style="height: 64vh" src="https://arco.design/vue/docs/start"></MIframe>
            </a-space>
          </template>

          <template v-if="current === 4">
            <MTabBar />
          </template>
          <template v-if="current === 5">
            <a-space direction="vertical" fill :size="[16, 16]">
              <a-space>
                <MBtnGroup :is-permission="false" @handle-click-ops="handleClickOps" />
              </a-space>
              <a-space>
                <MBtnGroup :record="{}" :is-permission="false" @handle-click-ops="handleClickOps">
                  <template #before>
                    <a-tooltip :content="$t('common.add')">
                      <a-button @click="handleClickOps({ type: Operations.ADD, record: {} })">
                        <icon-plus size="16" />
                      </a-button>
                    </a-tooltip>
                  </template>
                  <template #after>
                    <a-tooltip :content="$t('common.add')">
                      <a-button @click="handleClickOps({ type: Operations.SEARCH, record: {} })">
                        <icon-search size="16" />
                      </a-button>
                    </a-tooltip>
                  </template>
                </MBtnGroup>
              </a-space>
            </a-space>
          </template>
          <template v-if="current === 6">
            <a-space direction="vertical" fill :size="[16, 16]">
              <a-space> 性别：<MDict v-model="dictValue" :code="DictEnum.GENDER" style="width: 160px" /></a-space>
              <a-space> 民族：<MDict v-model="dictValue1" :code="DictEnum.NATION" style="width: 160px" /></a-space>
              <a-space>
                婚姻状况： <MDict v-model="dictValue2" :code="DictEnum.PARTY" allow-clear style="width: 160px"
              /></a-space>
              <a-space>
                婚姻状况（禁用）：<MDict v-model="dictValue2" disabled :code="DictEnum.PARTY" allow-clear />
              </a-space>
            </a-space>
          </template>
          <template v-if="current === 7">
            <a-space direction="vertical" fill :size="[16, 16]">
              <MEmpty :min-height="480" style="border: 1px solid var(--color-border-2)" />
            </a-space>
          </template>
          <template v-if="current === 8">
            <a-space direction="vertical" fill :size="[16, 16]">
              <MForm
                ref="mFormRef"
                :form-data="mFormData"
                :columns="mFormSearchColumns"
                :labelColProps="{ flex: '120px' }"
                :wrapperColProps="{ flex: 1 }"
              />
              <div style="text-align: center;">
                <a-space>
                  <a-button html-type="submit">
                    <template #icon><icon-refresh /></template>
                    {{ $t('common.cancel') }}
                  </a-button>
                  <a-button type="primary" html-type="submit" @click="handleSubmit">
                    <template #icon>
                      <icon-check />
                    </template>
                    {{ $t('common.submit') }}
                  </a-button>
                  <slot name="extra"></slot>
                </a-space>
              </div>
            </a-space>
          </template>
          <template v-if="current === 9">
            <MPagination :pageable="pageable" :flag="false" />
          </template>
          <template v-if="current === 10">
            <a-space direction="vertical" fill :size="[16, 16]">
              <MSearchForm
                ref="MSearchFormRef"
                :search-columns="searchColumns"
                :search-param="formData"
                :show-expand="false"
                :search="onSearch"
                :reset="onReset"
              />
              <a-divider />
              <MSearchForm ref="MSearchFormRef1" :search-columns="mSearchColumns" :search-param="mFormData" />
            </a-space>
          </template>
          <template v-if="current === 11">
            <MSpeak :text="speakText" />
          </template>
          <template v-if="current === 12">
            <a-space direction="vertical" fill>
              <a-alert type="warning">这里将tinymce文件放在public下,避免部署到生产环境后编辑器无法加载问题。</a-alert>
              <MTinymce v-model="editor" :height="400" />
            </a-space>
          </template>
          <template v-if="current === 13">
            <a-space direction="vertical">
              <MQuarterSelect v-model="quarter" />
            </a-space>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
  import { Message, ValidatedError } from '@arco-design/web-vue'
  import { DictEnum } from '@/common/enums/dict-enum'
  import { Operations } from '@/common/enums/status-enum'
  import { FORM_CONFIG } from '@/common/constants/form-config'
  import { checkIdBT } from '@/utils/tools'
  import MFooter from '@/components/m-footer/index.vue'
  import MIconFont from '@/components/m-iconfont/index.vue'
  import MIframe from '@/components/m-iframe/index.vue'
  import MTabBar from '@/components/m-tabBar/index.vue'
  import MEmpty from '@/components/m-empty/index.vue'
  import MPagination from '@/components/m-paginantion/index.vue'
  import MSearchForm from '@/components/m-search-form/index.vue'
  import MSpeak from '@/components/m-speak/index.vue'
  import MTinymce from '@/components/m-tinymce/index.vue'
  import MQuarterSelect from '@/components/m-quarter-select/index.vue'
  import MForm from '@/components/m-form/index.vue'

  const current = ref(1)

  const list = computed(() => [
    {
      key: '1',
      title: 'components.footer',
    },
    {
      key: '2',
      title: 'components.iconfont',
    },
    {
      key: '3',
      title: 'components.iframe',
    },
    {
      key: '4',
      title: 'components.tabbar',
    },
    {
      key: '5',
      title: 'components.btn.group',
    },
    {
      key: '6',
      title: 'components.dict',
    },
    {
      key: '7',
      title: 'components.empty',
    },
    {
      key: '8',
      title: 'components.form',
    },
    {
      key: '9',
      title: 'components.pagination',
    },
    {
      key: '10',
      title: 'components.search.form',
    },
    {
      key: '11',
      title: 'components.speak',
    },
    {
      key: '12',
      title: 'components.tinymce',
    },
    {
      key: '13',
      title: 'components.quarter.select',
    },
  ])

  const dictValue = ref('10000001')
  const dictValue1 = ref('10000101')
  const dictValue2 = ref('10000201')

  const speakText = ref(
    '人生如蚕，自缚于茧中，丝缕缠绕，黑暗四面围困。初时不觉其苦，继而闷热难当，终至于呼吸维艰。然而，蚕不作茧自缚，何由成蛾？茧不作黑暗围困，何由见光明？向来所谓绝境，不过是造化设下的一道窄门罢了。过此门者，先是筋骨酸痛，继而皮开肉绽，终至于脱胎换骨。那些半途而废者，只见门前血迹斑斑，便以为此路不通；殊不知，血迹尽处，正是新肌生长之所。人常道"山重水复疑无路"，却不知自己双目为叶所障。揭去眼前一叶，便见柳暗花明。困厄之为物，不过是磨刀之石，愈磨愈利；不过是淬火之水，愈淬愈坚。当此之际，与其坐而待毙，何如起而前行？纵使荆棘满途，也要踏出血路；纵使狂风暴雨，也要昂首向前。世上从无绝望的处境，只有对处境绝望的人。蚕终于咬破茧壳时，翅膀还是湿软的。但它知道，只要向着光，终能飞向天空。'
  )

  const editor = ref(
    '<p><img src="https://img0.baidu.com/it/u=4172295007,3022602453&amp;fm=253&amp;fmt=auto&amp;app=120&amp;f=JPEG?w=500&amp;h=667" alt="" width="157" height="204">这是一张图片。</p>'
  )

  const quarter = ref('')

  const pageable = {
    // 当前页数
    current: 1,
    // 每页显示条数
    pageSize: 10,
    // 总条数
    total: 100,
  }

  const formData = reactive({
    name: '',
    gender: '',
    nation: '',
  })

  const mFormData = reactive({
    name: '',
    gender: '',
    nation: '',
    date: '',
    status: '',
    startTime: '',
    endTime: '',
    createTime: '',
    updateTime: '',
  })

  const searchColumns = computed(() => [
    { title: '姓名', dataIndex: 'name', search: { el: 'input', order: 0 } },
    {
      title: '性别',
      dataIndex: 'gender',
      search: {
        order: 1,
        render: (searchParam: { [key: string]: string }) => {
          return (
            <MDict
              v-model={searchParam.modelValue}
              code={DictEnum.GENDER}
              allowClear={true}
              placeholder={'请选择性别'}
            />
          )
        },
      },
    },
    {
      title: '民族',
      dataIndex: 'nationText',
      search: {
        key: 'nation',
        order: 2,
        render: (searchParam: { [key: string]: string }) => {
          return (
            <MDict
              v-model={searchParam.modelValue}
              code={DictEnum.NATION}
              allowClear={true}
              placeholder={'请选择民族'}
            />
          )
        },
      },
    },
  ])

  const mSearchColumns = computed(() => [
    { title: '姓名', dataIndex: 'name', search: { el: 'input', order: 0 } },
    {
      title: '性别',
      dataIndex: 'gender',
      search: {
        order: 1,
        render: (searchParam: { [key: string]: string }) => {
          return (
            <MDict
              v-model={searchParam.modelValue}
              code={DictEnum.GENDER}
              allowClear={true}
              placeholder={'请选择性别'}
            />
          )
        },
      },
    },
    {
      title: '民族',
      dataIndex: 'nationText',
      search: {
        key: 'nation',
        order: 2,
        render: (searchParam: { [key: string]: string }) => {
          return (
            <MDict
              v-model={searchParam.modelValue}
              code={DictEnum.NATION}
              allowClear={true}
              placeholder={'请选择民族'}
            />
          )
        },
      },
    },
    { title: '日期', dataIndex: 'date', search: { el: 'date-picker', order: 3, props: { readonly: true } } },
    {
      title: '状态',
      dataIndex: 'status',
      search: {
        el: 'select',
        order: 4,
        options: [
          { value: '0', label: '禁用' },
          { value: '1', label: '启用' },
        ],
      },
    },
    { title: '开始时间', dataIndex: 'startTime', search: { el: 'time-picker', order: 5 } },
    { title: '结束时间', dataIndex: 'endTime', search: { el: 'time-picker', order: 6 } },
    { title: '创建时间', dataIndex: 'createTime', search: { el: 'date-picker', order: 7 } },
    { title: '更新时间', dataIndex: 'updateTime', search: { el: 'date-picker', order: 8 } },
  ])

  const commonConfig = {
    showColon: FORM_CONFIG.showColon,
    asteriskPosition: FORM_CONFIG.asteriskPosition,
    hideAsterisk: FORM_CONFIG.hideAsterisk,
    allowClear: true,
  }

  const mFormSearchColumns = computed(() => [
    {
      label: '姓名',
      field: 'name',
      el: 'input',
      ...commonConfig,
      span: 8,
      rules: [
        {
          required: true,
          message: '请输入姓名',
        },
      ],
    },
    {
      field: 'idCard',
      el: 'input',
      label: '身份证号',
      ...commonConfig,
      span: 8,
      validateTrigger: 'change',
      rules: [
        {
          required: true,
          validator: checkIdBT,
        },
      ],
    },
    {
      label: '性别',
      field: 'gender',
      ...commonConfig,
      span: 8,
      render: (searchParam: { [key: string]: string }) => {
        return (
          <MDict v-model={searchParam.modelValue} code={DictEnum.GENDER} allowClear={true} placeholder={'请选择性别'} />
        )
      },
    },
    {
      label: '民族',
      field: 'nationText',
      ...commonConfig,
      render: (searchParam: { [key: string]: string }) => {
        return (
          <MDict v-model={searchParam.modelValue} code={DictEnum.NATION} allowClear={true} placeholder={'请选择民族'} />
        )
      },
    },
    {
      label: '日期',
      field: 'date',
      el: 'date-picker',
      ...commonConfig,
      span: 8,
    },
    {
      field: 'remark',
      el: 'textarea',
      label: '备注',
      ...commonConfig,
      span: 24,
      props: {
        maxLength: 500,
        showWordLimit: true,
        autoSize: { minRows: 3, maxRows: 5 },
      },
    },
  ])

  const MSearchFormRef = ref<InstanceType<typeof MSearchForm>>()
  const mFormRef = ref<InstanceType<typeof MForm>>()

  const handleSubmit = async (
    data: { values: Record<string, any>; errors: Record<string, ValidatedError> | undefined },
    ev: Event
  ) => {
    const errors = await mFormRef.value.onSubmit()
    if (!errors) {
      console.log('验证成功')
    }
  }

  const onSearch = () => {
    const param = MSearchFormRef.value?.searchParam
    Message.info(`查询参数：${JSON.stringify(param)}`)
  }

  const onReset = () => {
    formData.name = ''
    formData.gender = ''
    formData.nation = ''
    Message.info(`重置参数：${JSON.stringify(MSearchFormRef.value.searchParam)}`)
  }

  const handleOps = (data: { key: string; title: string }) => {
    current.value = Number(data.key)
  }

  const handleClickOps = ({ type, record }: { type: number; record: Partial<T> }) => {
    if (type === Operations.LOOK) {
      console.log(type === Operations.LOOK)
      Message.info('您点击了查看按钮')
    }
    if (type === Operations.ADD) {
      Message.info('您点击了新增按钮')
    }
    if (type === Operations.EDIT) {
      Message.info('您点击了编辑按钮')
    }
    if (type === Operations.SEARCH) {
      Message.info('您点击了查询按钮按钮')
    }
    if (type === Operations.DELETE) {
      Message.info('您点击了删除按钮')
    }
  }
</script>

<style lang="less" scoped>
  .example {
    height: 100%;
    padding: 16px;
    &-container {
      width: 100%;
      height: 100%;
      background-color: var(--color-bg-2);
      display: flex;
      &-left-side {
        padding: 16px;
        width: 160px;
        text-align: center;
        border-right: 1px solid var(--color-border-2);
      }
      &-right-side {
        flex: 1;
        display: flex;
        flex-direction: column;
        &__title {
          height: 40px;
          padding: 0 16px;
          font-size: 16px;
          font-weight: 500;
          display: flex;
          align-items: center;
          color: var(--color-text-2);
          border-bottom: 1px solid var(--color-border-2);
        }
        &__content {
          flex: 1;
          padding: 16px;
        }
      }
    }
  }

  :deep(.arco-space-item){
        color: var(--color-text-2);
  }
</style>
