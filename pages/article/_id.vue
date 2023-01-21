<template>
  <div>
    <div class="bg-zinc-900 py-8">
      <div class="container mx-auto">
        <h3 class="text-white text-2xl font-bold mb-6">
          {{ articleInfo.title }}
        </h3>
        <div class="flex items-center mb-4">
          <img :src="articleInfo.author.image" class="rounded-full w-8 h-8" />
          <div class="info ml-3">
            <nuxt-link to="/" class="text-white block text-sm">
              {{ articleInfo.author.username }}
            </nuxt-link>
            <span class="text-xs font-medium text-gray-300">
              {{ $utils.convertDateToMiladi(articleInfo.createdAt) }}
            </span>
          </div>
          <Button primary class="ml-4" @onClick="goFavorite">
            {{ articleInfo.favorited ? 'Favorite' : 'UnFavorite' }}
            Article ({{ articleInfo.favoritesCount }})
          </Button>
        </div>
      </div>
    </div>
    <div class="container mx-auto mt-6">
      <p class="font-medium text-sm leading-7">
        {{ articleInfo.body }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component } from 'nuxt-property-decorator'
import { IArticleService } from '~/services/Article/IArticleService'
import { container, lazyInject } from '~/services/Ioc/inversify.config'
import { SYMBOLS } from '~/services/Ioc/SYMBOLS'
import { Article } from '@/types/article.types'
@Component({
  async asyncData(ctx: Context) {
    try {
      const { id } = ctx.params
      const articleService = container.get<IArticleService>(
        SYMBOLS.IArticleService
      )
      const getArticle = await articleService.getArticle(id)
      return {
        articleInfo: getArticle,
      }
    } catch (error) {}
  },
})
export default class ArticleSinglePage extends Vue {
  @lazyInject(SYMBOLS.IArticleService) _IArticleService!: IArticleService
  articleInfo: Article = new Article()
  async getArticleInfo() {
    try {
      const { id } = this.$route.params
      const httpResponse = await this._IArticleService.getArticle(id)
      this.articleInfo = httpResponse
    } catch (error) {}
  }
  async favoriteArticle() {
    try {
      const { id } = this.$route.params
      await this._IArticleService.favoriteArticle(id)
      await this.getArticleInfo()
    } catch (error) {}
  }
  async unFavoriteArticle() {
    try {
      const { id } = this.$route.params
      await this._IArticleService.unFavoriteArticle(id)
      await this.getArticleInfo()
    } catch (error) {}
  }
  async goFavorite() {
    if (this.articleInfo.favorited) {
      await this.unFavoriteArticle()
    } else {
      await this.favoriteArticle()
    }
  }
}
</script>