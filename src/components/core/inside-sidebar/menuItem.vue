<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue'

@Component({
  name: 'menuItem'
})
export default class menuItem extends Vue {
  /**
   * 菜单项图标
   */
  @Prop({ type: String, default: '' }) icon!: string
  /**
   * 菜单项标题
   */
  @Prop({ type: String, default: '' }) title!: string

  render(createElement: CreateElement): VNode {
    const child: Array<VNode> = []

    if (this.icon) {
      child.push(createElement('i', { class: `sidebar-menu__icon ${this.icon}` }))
    }

    if (this.title) {
      child.push(createElement('span', [this.title]))
    }

    return createElement('div', { class: 'sidebar-menu__wrapper' }, child)
  }
}
</script>
