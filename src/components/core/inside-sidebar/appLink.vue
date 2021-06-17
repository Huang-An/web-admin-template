<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { external } from '@const-an/regexp'

@Component({
  name: 'appLink'
})
export default class appLink extends Vue {
  @Prop({ type: String, required: true }) to!: string

  linkProps(url: string) {
    if (external.test(url)) {
      return {
        is: 'a',
        href: url,
        target: '_blank',
        rel: 'noopener'
      }
    }
    return {
      is: 'router-link',
      to: url
    }
  }
}
</script>
