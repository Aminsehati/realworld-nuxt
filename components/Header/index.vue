<template>
  <header class="bg-white">
    <div class="container mx-auto py-6">
      <div class="flex items-start justify-between">
        <div class="logo_area">
          <nuxt-link to="/" class="text-green-500 font-extrabold text-xl">
            conduit
          </nuxt-link>
        </div>
        <nav>
          <ul class="flex items-center space-x-4">
            <li>
              <nuxt-link
                to="/"
                class="text-sm font-medium"
                exact-active-class="font-bold"
                exact
              >
                Home
              </nuxt-link>
            </li>
            <li v-if="!$auth.loggedIn">
              <nuxt-link
                to="/auth/login"
                class="text-sm font-medium"
                exact-active-class="font-bold"
                exact
              >
                Login
              </nuxt-link>
            </li>
            <li v-if="!$auth.loggedIn">
              <nuxt-link
                to="/auth/register"
                class="text-sm font-medium"
                exact-active-class="font-bold"
                exact
              >
                Register
              </nuxt-link>
            </li>
            <li v-if="$auth.loggedIn">
              <nuxt-link
                to="/profile"
                class="text-sm font-medium"
                exact-active-class="font-bold"
                exact
              >
                Settings
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class HeaderComponent extends Vue {
}
</script>