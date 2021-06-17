<template>
  <div class="reply-wrapper" @click="routeBack">
    <i class="fa fa-reply"></i>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'reply'
})
export default class reply extends Vue {}
</script>
