<template>
  <div class="login">
    <div class="login-left">
      <div class="logo">
        <img src="@/assets/images/logo.png" />
        M-Admin
      </div>
      <div class="desc">
        <span>一款开箱即用的后台管理系统</span>
        <span>丰富的的页面模板，覆盖大多数典型业务场景</span>
      </div>
    </div>
    <div class="login-right">
      <div class="login-right-title">欢迎登录</div>
      <a-form ref="loginForm" :model="userInfo" class="login-form" layout="vertical" @submit="handleSubmit">
        <a-form-item
          field="account"
          :rules="[{ required: true, message: '用户名错误' }]"
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
          :rules="[{ required: true, message: '密码不能为空' }]"
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
    position: relative;
    height: 60vh;
    width: 50vw;
    border-radius: 16px;
    color: var(--color-text-1);
    border: 1px solid var(--color-border-2);
    box-shadow: 1px 1px 2px var(--color-gray-1);
    background-color: var(--color-bg-3);
    display: flex;
    &-btn {
      position: absolute;
      z-index: 2;
      right: 10px;
      top: 10px;
    }
    &-left {
      flex: 3;
      height: 100%;
      border-radius: 16px 0 0 16px;
      background-image: url('@/assets/images/login/decorate.png');
      background-color: var(--color-bg-lg-2);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center bottom;
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 18px;
      position: relative;
      .logo {
        font-size: 28px;
        display: flex;
        align-items: center;
        gap: 8px;
        img {
          width: 32px;
          height: 32px;
        }
      }
      .desc {
        margin-top: 0.75rem;
        display: inline-flex;
        flex-direction: column;
        animation: bounce 1s linear infinite;
        padding-bottom: 2px;
        line-height: 1.6;
      }
    }
    &-right {
      height: 100%;
      flex: 2;
      padding: 32px;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding-top: 10vh;
      gap: 24px;
      &-title {
        width: 248px;
        font-size: 32px;
      }
      .login-form {
        width: 248px;
        .login-form-submit {
          border-radius: 16px;
        }
      }
    }
  }

  @keyframes grow {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.05);
    }
  }
  @keyframes bounce {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-20%);
    }
  }
</style>
