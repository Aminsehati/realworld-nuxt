<template>
  <div class="container mx-auto mt-7 mb-10">
    <div v-for="(article, index) in articles" :key="index" class="mb-5">
      <Article :articleInfo="article" />
    </div>
    <Pagination v-model="pagintion" :tottalCount="tottalCount" hasSquare />
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { IArticleService } from '~/services/Article/IArticleService'
import { container, lazyInject } from '~/services/Ioc/inversify.config'
import { SYMBOLS } from '~/services/Ioc/SYMBOLS'
import { Pagination } from '@/types/public/pagination.type'
@Component({
  async asyncData(ctx: Context) {
    try {
      const articleService = container.get<IArticleService>(
        SYMBOLS.IArticleService
      )
      const getArticles = await articleService.getArticles({
        limit: 30,
        offset: Number(ctx?.query?.skip) || 1,
      })
      console.log(getArticles.articles)
      return {
        articles: getArticles.articles,
        tottalCount: getArticles.articlesCount,
      }
    } catch (error) {}
  },
})
export default class HomePage extends Vue {
  articles: any[] = []
  tottalCount: number = 0
  @lazyInject(SYMBOLS.IArticleService) _IArticleService!: IArticleService
  pagintion: Pagination = {
    limit: 30,
    skip: Number(this.$route?.query?.skip) || 1,
  }
  @Watch('pagintion.skip', { immediate: false })
  async onChnageSkip(skip: number) {
    this.$router.push({
      query: {
        ...this.$route.query,
        skip: skip.toString(),
      },
    })
    await this.getArticles()
  }
  async getArticles() {
    try {
      const httpResponse = await this._IArticleService.getArticles({
        limit: this.pagintion.limit,
        offset: this.pagintion.skip,
      })
      console.log(httpResponse)
      //@ts-ignore
      this.tottalCount = httpResponse?.articlesCount || 0
      //@ts-ignore
      this.articles = httpResponse.articles
    } catch (error) {}
  }
}
</script>
