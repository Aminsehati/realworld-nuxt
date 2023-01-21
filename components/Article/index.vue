<template>
  <div>
    <div class="flex items-center mb-4">
      <img :src="articleInfo.author.image" class="rounded-full w-8 h-8" />
      <div class="info ml-3">
        <nuxt-link
          :to="`${articleInfo.author.username}`"
          class="text-green-500 block text-sm"
        >
          {{ articleInfo.author.username }}
        </nuxt-link>
        <span class="text-xs font-medium">
          {{ $utils.convertDateToMiladi(articleInfo.createdAt) }}
        </span>
      </div>
    </div>
    <nuxt-link class="mb-2 block" :to="`/article/${articleInfo.slug}`">
      <h5 class="mb-3 text-gray-800 font-bold text-xl">
        {{ articleInfo.title }}
      </h5>
      <p class="text-sm font-medium">
        {{ articleInfo.description }}
      </p>
    </nuxt-link>
    <nuxt-link :to="`/article/${articleInfo.slug}`">
      <span class="text-sm font-medium"> Read More </span>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component, VModel, Prop } from 'nuxt-property-decorator'
import { Article } from '~/types/article.types'
@Component({})
export default class ArticleCompoent extends Vue {
  @Prop({}) articleInfo!: Article
}
</script>