<!-- eslint-disable no-dupe-keys -->
<template>
  <button :class="classesButton" :type="type" @click="$emit('onClick')">
    <div v-if="loading" class="flex justify-center">
      <svg class="animate-spin w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
        <path
          d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"
        />
      </svg>
    </div>
    <slot v-if="!loading" />
  </button>
</template>

<script lang="ts">
import { Prop, Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class ButtonComponent extends Vue {
  @Prop({ type: Boolean, default: false }) primary!: boolean
  @Prop({ type: Boolean, default: false }) lg!: boolean
  @Prop({ type: Boolean, default: false }) sm!: boolean
  @Prop({ type: Boolean, default: false }) xs!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Boolean, default: false }) loading!: boolean
  @Prop({ type: String, default: 'button' }) type!: string
  public get classesButton() {
    return [
      'btn',
      {
        'bg-indigo-500 hover:bg-indigo-600 text-white': this.primary,
        'btn-lg': this.lg,
        'btn-sm': this.sm,
        'btn-xs': this.xs,
        'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed shadow-none':
          this.disabled,
      },
    ]
  }
}
</script>