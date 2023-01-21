<template>
  <div>
    <label v-if="label" class="block text-sm font-medium mb-1" for="default">{{ label }}</label>
    <div class="flex items-center">
      <div class="relative grow">
        <input
          v-model="keyword"
          :class="[
          'form-input w-full',
          {
            '!pr-9': hasIcon,
            '!px-2 !py-1': small,
            '!px-4 !py-3': large,
            '!border-gray-200 !bg-gray-100 !text-gray-400 !cursor-not-allowed':
              disabled,
            '!border-red-300  !focus:border-red-300 focus:ring-inset focus:ring-0':
              errors.length,
          },
        ]"
          :type="type"
          :placeholder="placeholder"
          :name="name"
          @keypress="keypress"
          :readonly="readonly"
        />
        <slot name="icon" />
      </div>
      <slot name="btn" />
    </div>
    <div v-if="errors.length" class="text-xs mt-1 text-red-500 mb-3">{{ errors[0] }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from 'nuxt-property-decorator'
@Component({})
export default class TextFieldComponent extends Vue {
  @Prop({ type: String, default: '' }) placeholder!: string
  @Prop({ type: String, default: 'text' }) type!: string
  @Prop({ type: String, default: '' }) label!: string
  @Prop({ type: Boolean, default: false }) hasIcon!: boolean
  @Prop({ type: Boolean, default: false }) readonly!: boolean
  @Prop({ type: String }) name!: string
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Array, default: () => [] }) errors!: any[]
  @VModel()
  keyword!: string | number
  keypress(e: any) {
    if (this.type === 'number') {
      if (e.keyCode >= 48 && e.keyCode <= 57) {
      } else {
        e.preventDefault()
      }
    }
  }
}
</script>