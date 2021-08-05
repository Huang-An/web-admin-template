import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'MixinsForm'
})
export default class MixinsForm extends Vue {
  public loading: boolean = false

  public async startSubmit(): Promise<void> {
    try {
      this.loading = true
      const code: number = await (this as any).submit()
      this.loading = false
      if (code === 200) {
        this.$notify.success({ title: '成功', message: '保存成功~' })
        this.routeBack()
      }
    } catch (error) {
      this.loading = false
    }
  }
}
