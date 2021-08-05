<script lang="tsx">
import { Vue, Component } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue'
import { cloneDeep } from 'lodash'

@Component({
  name: 'Redirect'
})
export default class Redirect extends Vue {
  created() {
    const query = cloneDeep(this.$route.query)
    const { fullPath } = query

    delete query.fullPath

    this.$router.replace({ path: fullPath as string, query })
  }

  render(createElement: CreateElement): VNode {
    return createElement('div')
  }
}
</script>
