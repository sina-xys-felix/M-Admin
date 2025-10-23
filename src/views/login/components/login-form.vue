<template>
  <div class="login">
    <div class="login-header">
      <div><img src="@/assets/images/logo.png" /> M-Admin</div>
    </div>

    <a-form ref="loginForm" :model="userInfo" class="login-form" layout="vertical" @submit="handleSubmit">
      <a-form-item
        field="account"
        :rules="[{ required: true, message: '请输入账号' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input v-model="userInfo.account" allow-clear placeholder="admin/user">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: '请输入密码' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          placeholder="admin/user"
          v-model:visibility="visibility"
          :defaultVisibility="false"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        field="code"
        :rules="[{ required: true, message: '验证码错误' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input size="large" v-model="userInfo.code" placeholder="验证码" allow-clear> </a-input>
        <VueVerifyCode
          ref="verifyCodeRef"
          :width="74"
          :height="34"
          :code-length="4"
          style="margin-left: 8px; border: 1px solid var(--color-border-2); padding: 0 2px"
          @get-code="getCode"
        />
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions">
          <a-checkbox
            checked="rememberPassword"
            :model-value="loginConfig.rememberPassword"
            @change="setRememberPassword"
          >
            忘记密码
          </a-checkbox>
        </div>
        <a-button
          class="login-form-submit"
          :style="{ backgroundColor: loading ? '#678cf4' : '' }"
          type="primary"
          html-type="submit"
          long
          :loading="loading"
        >
          登录
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'LoginForm',
  }
</script>

<script lang="ts" setup>
  import { ValidatedError, Message } from '@arco-design/web-vue'
  import { useStorage } from '@vueuse/core'
  import { useUserStore } from '@/store'
  import useLoading from '@/hooks/loading'
  import VueVerifyCode from './verify-code.vue'

  const router = useRouter()
  const errorMessage = ref('')
  const visibility = ref(true)
  const { loading, setLoading } = useLoading()
  const userStore = useUserStore()

  const verifyCodeRef = ref()

  const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    account: '',
    password: '',
    code: '',
  })

  const userInfo = reactive({
    account: loginConfig.value.account,
    password: loginConfig.value.password,
    code: loginConfig.value.code,
    codeKey: '',
  })

  const verifyCode = ref('')

  const getCode = (code: string) => {
    verifyCode.value = code
  }

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined
    values: Record<string, any>
  }) => {
    if (loading.value) return
    if (!errors) {
      setLoading(true)
      // 仅做示例
      if (userInfo.code.toLocaleLowerCase() !== verifyCode.value.toLocaleLowerCase()) {
        Message.error('验证码错误!')
        verifyCodeRef.value.refresh()
        setLoading(false)
        return
      }
      try {
        let formData = {
          account: values.account,
          code: values.code,
          password: values.password,
        }
        const res = await userStore.login(formData)
        if (res) {
          router.push({
            name: 'Analysis',
          })
          Message.success('登录成功!')
        } else {
          Message.success('登录失败!')
        }
        const { rememberPassword } = loginConfig.value
        const { account, password } = values
        // 实际生产环境需要进行加密存储。
        loginConfig.value.account = rememberPassword ? account : ''
        loginConfig.value.password = rememberPassword ? password : ''
      } catch (err) {
        errorMessage.value = (err as Error).message
      } finally {
        setLoading(false)
      }
    }
  }

  const setRememberPassword = (value: boolean): void => {
    loginConfig.value.rememberPassword = value
  }
</script>

<style lang="less" scoped>
  .login {
    position: absolute;
    right: 10vw;
    height: 60vh;
    width: 28vw;
    border-radius: 16px;
    color: var(--color-text-1);
    box-shadow: 1px 1px 2px var(--color-gray-1);
    background-color: var(--color-bg-3);
    display: flex;
    flex-direction: column;
    align-items: center;
    &-header {
      width: 72%;
      font-size: 28px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      margin-bottom: 2vw;
      padding: 2vw;
      border-bottom: 1px solid var(--color-border-2);
      img {
        width: 2vw;
        height: 2vw;
      }
    }
    &-tip {
      font-size: 18px;
      color: var(--color-text-1);
      margin-top: 0.5vw;
    }
    &-form {
      width: 80%;
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-top: 0.83vw;

      &-password-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1vw;
      }

      &-submit {
        border-radius: 16px;
        height: 40px;
      }
    }
  }

  :deep(.arco-input-wrapper) {
    height: 40px;
  }

  :deep(.arco-input-wrapper .arco-input-prefix > svg) {
    font-size: 16px;
  }

  :deep(.arco-input-wrapper .arco-input.arco-input-size-medium) {
    font-size: 16px;
  }

  :deep(.arco-icon) {
    font-size: 16px;
  }
  :deep(.arco-form-item) {
    margin-bottom: 28px;
  }
</style>
