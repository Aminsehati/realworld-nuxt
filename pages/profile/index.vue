<template>
  <div class="profile-page">
    <div class="container mx-auto mt-5">
      <div class="max-w-xl mx-auto">
        <div class="bg-white shadow-sm px-4 py-8">
          <ValidationObserver ref="form" v-slot="{ invalid }">
            <form @submit.prevent="updateUser">
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
                  v-model="userProfile.email"
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="Bio"
                rules="required"
                class="block"
              >
                <TextField
                  label="Bio"
                  class="mb-5"
                  :errors="errors"
                  v-model="userProfile.bio"
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="Image"
                rules="required"
                class="block"
              >
                <TextField
                  label="Image"
                  class="mb-5"
                  :errors="errors"
                  v-model="userProfile.image"
                />
              </ValidationProvider>
              <Button type="submit" primary :disabled="invalid">
                Submit
              </Button>
            </form>
          </ValidationObserver>
        </div>
      </div>
      <Button @onClick="logout" class="mt-9" primary> Log out </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { IAuthService } from '~/services/Auth/IAuthService'
import { lazyInject } from '~/services/Ioc/inversify.config'
import { SYMBOLS } from '~/services/Ioc/SYMBOLS'
import { UserProfile } from '@/types/userProfile'
import { Context } from '@nuxt/types'
@Component({
  middleware: 'auth',
  async asyncData(ctx: Context) {
    try {
      console.log(ctx)
    } catch (error) {
      console.log('error', error)
    }
  },
})
export default class profilePage extends Vue {
  @lazyInject(SYMBOLS.IAuthService) _IAuthService!: IAuthService
  userProfile: UserProfile = new UserProfile()
  userProfileBackup: UserProfile = new UserProfile()
  mounted() {
    ///@ts-ignore
    this.userProfile = {
      ...this.$auth.user,
    }
    this.userProfileBackup = this.$utils.$_.cloneDeep(this.userProfile)
  }
  async updateUser() {
    try {
      const diffs = this.$utils.differences(
        this.userProfile,
        this.userProfileBackup
      )
      if (!this.$utils.isObjectFilled(diffs)) {
        return
      }
      const httpResponse = await this._IAuthService.updateUser(diffs)
      await this.$auth.fetchUser('local')
    } catch (error) {}
  }
  logout() {
    this.$auth.logout()
  }
}
</script>