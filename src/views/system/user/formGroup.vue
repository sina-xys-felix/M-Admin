<template>
  <div class="container">
    <a-spin :loading="loading" ref="spinRef" class="content">
      <div class="card-title">
        <span class="title" v-if="formDisabled">{{ t('staff') }}{{ title }}</span>
        <div class="op" @click="goBack">{{ t('common.back') }}</div>
      </div>
      <div class="general" :style="{ maxHeight: bodyHeight + 'px' }">
        <a-steps v-model:current="step" style="width: 700px">
          <a-step>
            {{ $t('staff.basic.info') }}
          </a-step>
          <a-step>
            {{ $t('staff.basic.other') }}
          </a-step>
        </a-steps>
        <keep-alive>
          <BaseInfo
            :type="paramater.type"
            :data="formData"
            :maxHeight="bodyHeight"
            v-if="step === 1"
            :disabled="formDisabled"
            @change-step="changeStep"
          ></BaseInfo>
          <Other
            :type="paramater.type"
            :data="formData"
            :formatText="formatText"
            :disabled="formDisabled"
            v-else
            @change-step="changeStep"
          ></Other>
        </keep-alive>
        <!-- </div> -->
      </div>
    </a-spin>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'StaffFormGroup',
  }
</script>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'
  import useLoading from '@/hooks/loading'
  import { Operations } from '@/common/enums/status-enum'
  import { routerParams } from '@/common/types/page'
  import IStaffProps from '@/api/staff/types'
  import { updateStaff, addStaff } from '@/api/staff/index'
  import { Tips } from '@/common/enums/tips-enum'
  import { Message } from '@arco-design/web-vue'
  import BaseInfo from './components/base-info.vue'
  import Other from './components/other.vue'

  const { t } = useI18n()

  const formData = ref<IStaffProps>({
    // id: 0,
    job: undefined,
    name: '',
    nickName: '',
    avatar: '',
    no: '',
    idNumber: '',
    quickCode: '',
    mobile: undefined,
    phone: '',
    email: '',
    gender: undefined,
    birthday: '',
    maritalStatus: undefined,
    nation: undefined,
    education: undefined,
    party: undefined,
    isOfficial: false,
    face: '',
    photos: '',
    countryId: '86',
    provinceId: undefined,
    cityId: undefined,
    districtId: undefined,
    streetId: undefined,
    communityId: undefined,
    address: '',
    zipcode: '',
    start: '',
    end: '',
    height: 0,
    weight: 0,
    procreation: false,
    scholl: '',
    major: '',
    native: '',
    contact: '',
    contactMobile: '',
    groupId: undefined,
    companyId: undefined,
    storeIds: [],
    level: undefined,
    isFull: false,
    isIntern: false,
    entryTime: '',
    leaveTime: '',
    remark: '',
    status: 1,
    timer: [],
  })

  const title = ref<string>('')
  const spinRef = ref<InstanceType<typeof Document>>()
  const { loading, setLoading } = useLoading()
  const router = useRouter()
  const titleMap = computed(() => {
    return {
      1: t('common.add'),
      2: t('common.table.edit'),
      4: t('common.table.look'),
    }
  })

  const paramater = ref<routerParams>({
    id: '',
    type: Operations.ADD as number,
  })

  const formDisabled = ref(false)

  const bodyHeight = ref(600)

  const formatText = ref('')

  const step = ref(1)

  onMounted(() => {
    bodyHeight.value = document.documentElement.querySelector('.content')!.clientHeight - 52
    const infos = JSON.parse(localStorage.getItem('pStaffRecord')!)
    if (infos) {
      paramater.value.type = Number(infos.type! || Operations.LOOK)
      formData.value = infos.data
      formData.value.timer = infos.data.start ? [infos.data.start, infos.data.end] : []
      formDisabled.value = paramater.value.type === Operations.LOOK
      // if(infos.data.id)getStaffInfo(infos.data.id)
    }
    // @ts-ignore
    title.value = titleMap.value[paramater.value.type || Operations.ADD]
  })

  const submitForm = async () => {
    setLoading(true)
    try {
      await handleSubmit() // The mock api default success
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false)
    }
  }
  const changeStep = (direction: string | number, model: IStaffProps) => {
    if (typeof direction === 'number') {
      step.value = direction
      return
    }

    if (direction === 'forward' || direction === 'submit') {
      formData.value = {
        ...formData.value,
        ...model,
      }

      if (direction === 'submit') {
        submitForm()
        return
      }
      step.value += 1
    } else if (direction === 'backward') {
      step.value -= 1
    }
  }

  const handleSubmit = async () => {
    if (formData.value.timer instanceof Array && formData.value.timer.length > 0) {
      formData.value.start = formData.value.timer[0] + ' 00:00:00'
      formData.value.end = formData.value.timer[1] + ' 23:59:59'
    }
    formData.value.job = Number(formData.value.job)
    if (formData.value.maritalStatus) formData.value.maritalStatus = Number(formData.value.maritalStatus)
    if (formData.value.gender) formData.value.gender = Number(formData.value.gender)
    // education  ?  level nation party ?
    Reflect.deleteProperty(formData.value, 'countryId')
    Reflect.deleteProperty(formData.value, 'timer')
    let response = null
    if (paramater.value.type === Operations.ADD) {
      response = await addStaff(formData.value)
    }
    if (paramater.value.type === Operations.EDIT) {
      response = await updateStaff(formData.value)
    }
    if (response) {
      Message.success(Tips.SUCCESS)
      goBack()
    } else {
      Message.warning(Tips.FAIL)
    }
  }

  const goBack = () => {
    router.push({ name: 'User' })
  }
</script>

<style scoped lang="less">
  @gap-bottom: 16px;
  .container {
    padding: 20px;
    .content {
      width: 100%;
      height: 100%;
      background: var(--color-bg-2);

      .card-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background: var(--color-bg-2);
        padding: 8px 16px;
        border-bottom: 1px solid var(--color-neutral-3);
        .title {
          font-size: 16px;
          flex: 1;
          color: var(--color-text-1);
          font-weight: 500;
          line-height: 1.5715;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .op {
          color: rgb(var(--primary-6));
          cursor: pointer;
        }
      }

      .general {
        width: 100%;
        // height: calc(100% - 32px);
        overflow-y: auto;
        overflow-x: hidden;
        padding: 16px 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        :deep(.arco-form) {
          margin-top: 20px;
        }
      }
    }
  }

  .actions {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    padding: 14px 20px 14px 0;
    background: var(--color-bg-2);
    text-align: right;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    background-color: var(--color-bg-2);
    :deep(.arco-form) {
      margin-top: 20px;
    }
  }

  .steps {
    margin-bottom: 76px;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &-body {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      margin-bottom: @gap-bottom;
    }
    &-footer {
      height: 60px;
      padding: 14px 20px 14px 0;
      background: var(--color-bg-2);
      text-align: center;
    }
  }

  .card-body {
    :deep(.arco-card-body) {
      padding: 8px 16px;
    }
    margin-bottom: @gap-bottom;
  }

  :deep(.arco-card-header-title) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
