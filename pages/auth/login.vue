<template>
  <div class="flex relative">
    <div class="w-full">
      <div class="min-h-screen h-full flex items-center after:flex-1">
        <div class="w-full">
          <div class="max-w-sm mx-auto px-4 py-8 w-full">
            <h2 class="text-3xl text-gray-800 font-bold mb-6 text-center">
              Real World
            </h2>
            <ValidationObserver ref="form" v-slot="{ invalid }">
              <form @submit.prevent="onLogin">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Email"
                  rules="required|email"
                  class="block"
                >
                  <TextField
                    label="Email"
                    class="mb-5"
                    :errors="errors"
                    v-model="loginInfo.email"
                  />
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Password"
                  rules="required"
                  class="block"
                >
                  <TextField
                    label="Password"
                    class="mb-5"
                    :errors="errors"
                    v-model="loginInfo.password"
                  />
                </ValidationProvider>
                <Button
                  primary
                  type="submit"
                  :disabled="invalid"
                  :loading="loading"
                >
                  Login
                </Button>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { LoginInput } from '@/types/login.types'
import { lazyInject } from '@/services/Ioc/inversify.config'
import { SYMBOLS } from '~/services/Ioc/SYMBOLS'
import { IAuthService } from '~/services/Auth/IAuthService'
@Component({
  middleware: 'not-auth',
})
export default class LoginPage extends Vue {
  loginInfo: LoginInput = new LoginInput()
  loading: boolean = false
  async onLogin() {
    this.loading = true
    try {
      await this.$auth.loginWith('local', {
        data: {
          user: {
            ...this.loginInfo,
          },
        },
      })
      this.loading = false
      this.$router.push('/')
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
    }
  }
}
</script>