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
              <form @submit.prevent="onRegister">
                {{ registerInfo }}
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Username"
                  rules="required"
                  class="block"
                >
                  <TextField
                    label="Username"
                    class="mb-5"
                    :errors="errors"
                    v-model="registerInfo.username"
                  />
                </ValidationProvider>
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
                    v-model="registerInfo.email"
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
                    v-model="registerInfo.password"
                  />
                </ValidationProvider>
                <Button
                  primary
                  type="submit"
                  :disabled="invalid"
                  :loading="loading"
                >
                  Register
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
import { RegisterInput } from '@/types/register.types'
import { lazyInject } from '@/services/Ioc/inversify.config'
import { SYMBOLS } from '~/services/Ioc/SYMBOLS'
import { IAuthService } from '~/services/Auth/IAuthService'
@Component({})
export default class RegisterPage extends Vue {
  @lazyInject(SYMBOLS.IAuthService) _IAuthService!: IAuthService
  registerInfo: RegisterInput = new RegisterInput()
  loading: boolean = false
  async onRegister() {
    this.loading = true
    try {
      const authService = await this._IAuthService.registerUser({
        ...this.registerInfo,
      })
      const token = authService?.user?.token || ''
      if (token) {
        this.$auth.setUserToken(token)
      }
      this.loading = false
      this.$router.push('/')
    } catch (error) {

    }finally{
      this.loading = false
    }
  }
}
</script>