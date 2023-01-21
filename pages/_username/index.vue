<template>
  <div class="mb-9">
    <div class="bg-gray-200">
      <div class="container mx-auto py-9">
        <div class="image mb-4">
          <img class="rounded-full w-24 h-24 mx-auto" :src="profile.image" />
        </div>
        <nuxt-link
          class="text-center text-xl font-bold block"
          :to="`/${profile.username}`"
        >
          {{ profile.username }}
        </nuxt-link>
        <Button primary @onClick="onFollow">
          {{ profile.following ? 'Follow' : 'UnFollow' }}
          {{ profile.username }}
        </Button>
      </div>
    </div>
    <div class="container mx-auto mt-5">
      <div v-for="(article, index) in articles" :key="index" class="mb-5">
        <Article :articleInfo="article" />
      </div>
      <Pagination v-model="pagintion" :tottalCount="tottalCount" hasSquare />
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component } from 'nuxt-property-decorator'
import { IArticleService } from '~/services/Article/IArticleService'
import { IAuthService } from '~/services/Auth/IAuthService'
import { container, lazyInject } from '~/services/Ioc/inversify.config'
import { SYMBOLS } from '~/services/Ioc/SYMBOLS'
import { Pagination } from '~/types/public/pagination.type'
@Component({
  async asyncData(ctx: Context) {
    try {
      const { username } = ctx.params
      const authService = container.get<IAuthService>(SYMBOLS.IAuthService)
      const getProfileUser = await authService.getProfileUser(username)
      const articleService = container.get<IArticleService>(
        SYMBOLS.IArticleService
      )
      const getArticles = await articleService.getArticles({
        limit: 40,
        offset: 1,
        author: ctx.params.username,
      })
      console.log(getProfileUser, 'getProfileUser')
      return {
        profile: getProfileUser,
        articles: getArticles.articles,
        tottalCount: getArticles.articlesCount,
      }
    } catch (error) {
      console.log(error)
    }
  },
})
export default class UsernamePage extends Vue {
  @lazyInject(SYMBOLS.IAuthService) _IAuthService!: IAuthService
  @lazyInject(SYMBOLS.IArticleService) _IArticleService!: IArticleService
  profile: any = {}
  articles: any[] = []
  tottalCount: number = 0
  pagintion: Pagination = {
    limit: 30,
    skip: Number(this.$route?.query?.skip) || 1,
  }
  async FollowUser() {
    try {
      const { username } = this.$route.params
      await this._IAuthService.followUser(username)
      await this.getProfile()
    } catch (error) {}
  }
  async unFollowUser() {
    try {
      const { username } = this.$route.params
      await this._IAuthService.unFollowUser(username)
      await this.getProfile()
    } catch (error) {}
  }
  async onFollow() {
    if (this.profile.following) {
      await this.unFollowUser()
    } else {
      await this.FollowUser()
    }
  }
  async getProfile() {
    try {
      const { username } = this.$route.params
      const httpResponse = await this._IAuthService.getProfileUser(username)
      this.profile = httpResponse
    } catch (error) {}
  }
}
</script>