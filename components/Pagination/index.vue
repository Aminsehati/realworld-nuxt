<template>
  <div
    v-if="tottalCount > 0"
    :class="{
      'flex flex-wrap items-center justify-between gap-y-5': hasSquare,
    }"
  >
    <paginate
      v-model.number="pagination.skip"
      :page-count="getPageCount"
      :page-range="4"
      :margin-page="4"
      :prev-text="`${
        primary ? '<- قبلی' : `<i class='fa-sharp fa-solid fa-angle-left'></i>`
      }`"
      :next-text="`${
        primary
          ? '<- بعدی'
          : `<i class='fa-sharp fa-solid fa-angle-right'></i>`
      }`"
      :container-class="`${
        hasSquare ? `pagination_squre flex items-center` : ''
      } ${hasCircle ? `pagination_circle flex items-center` : ''}  ${
        primary ? `pagination_primary flex items-center` : ''
      }`"
      :page-class="`${hasSquare ? `page_item_squre` : ''} ${
        hasCircle ? `page_item_circle` : ''
      } ${primary ? `page_item_primary` : ''}`"
    ></paginate>
  </div>
</template>

<script lang="ts">
import './style.scss'
import { Vue, Component, Prop, VModel, Watch } from 'nuxt-property-decorator'
import { Pagination } from '@/types/public/pagination.type'
@Component({})
export default class PaginateComponent extends Vue {
  @Prop({ type: Boolean, default: false }) hasSquare!: boolean
  @Prop({ type: Boolean, default: false }) hasCircle!: boolean
  @Prop({ type: Boolean, default: false }) primary!: boolean
  @Prop({ type: Number, default: 10 }) tottalCount!: number
  @Prop({ type: Number, default: 4 }) limit!: number
  @VModel() pagination!: Pagination
  get getPageCount() {
    return Math.ceil(this.tottalCount / Number(this.pagination.limit))
  }
  get startPage() {
    let start =
      (Number(this.pagination.skip) - 1) * Number(this.pagination.limit)
    if (start === 0 || Number(this.pagination.limit) > this.tottalCount) {
      start = 1
    }
    return start
  }
  get endPage() {
    let end = this.tottalCount
    if (Number(this.pagination.limit) < this.tottalCount) {
      end = Number(this.pagination.skip) * Number(this.pagination.limit)
      if (end > this.tottalCount) {
        end = this.tottalCount
      }
    }
    return end
  }
  selectItems = [
    {
      id: 1,
      name: '10',
      value: 10,
    },
    {
      id: 2,
      name: '15',
      value: 15,
    },
    {
      id: 3,
      name: '30',
      value: 30,
    },
    {
      id: 4,
      name: '50',
      value: 50,
    },
    {
      id: 5,
      name: '100',
      value: 100,
    },
  ]
  @Watch('pagination.limit', { immediate: true })
  onChangeLimit() {
    if (Number(this.pagination.limit) > this.tottalCount) {
      this.pagination.skip = 1
    }
  }
}
</script>