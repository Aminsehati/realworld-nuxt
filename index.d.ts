// index.d.ts
import { Auth as NuxtAuth } from '@nuxtjs/auth-next'
import { UtilsPlugin } from './plugins/utils';
declare module '@nuxt/types' {
  interface Context {
    $utils: UtilsPlugin
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    $utils: UtilsPlugin,
  }
}