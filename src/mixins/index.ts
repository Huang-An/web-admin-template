import { store } from '@/store'
import { isEmpty } from '@const-an/helper-core'

// type
import { VueConstructor } from 'vue/types/umd'

export const setupRegisterGlobMixin = (Vue: VueConstructor<Vue>) => {
  Vue.mixin({
    methods: {
      /**
       * 触发某个组件的注册事件
       * @param componentEventPath：路径 如：组件名称/事件
       * @param params: 回调所需参数
       * @param options：优化项
       */
      dispatch(componentEventPath: string, params: Array<any>, options?: dispatchOptions) {
        const componentEventPathTokens = componentEventPath.split('/')
        // 解析组件名称
        const componentName = componentEventPathTokens[0] ? componentEventPathTokens[0] : ''
        // 解析事件名称
        const event = componentEventPathTokens[1] ? componentEventPathTokens[1] : ''

        if (!componentName) {
          throw new Error('组件名不能为空')
        }

        if (!event) {
          throw new Error('事件名不能为空')
        }

        const defaultOptions = {
          root: this.$root,
          level: Infinity,
          ...options
        }

        const { root, level } = defaultOptions

        const vnode = this.findComponentByName(componentName, root, level, 'single')[0]

        if (vnode) {
          vnode.$emit.apply(vnode, [event, ...params])
        }
      },

      /**
       * 递归查找相应组件
       * @param componentName
       * @param root
       * @param level
       */
      findComponentByName(componentName: string, root?: Vue, level?: number, type?: 'single' | 'multiple'): Array<Vue> {
        const vnodeList: Array<Vue> = []
        const _root = root || this.$root
        const _type = type || 'multiple'
        let _level = level || Infinity

        const recursion = (vnodes: Array<Vue>, componentName: string) => {
          let childrenList: Array<Vue> = []
          _level--

          for (let i = 0, l = vnodes.length; i < l; i++) {
            if (vnodes[i].componentName && vnodes[i].componentName === componentName) {
              vnodeList.push(vnodes[i])
            }

            if (vnodes[i].$children && vnodes[i].$children.length > 0) {
              childrenList = childrenList.concat(vnodes[i].$children)
            }
          }

          // 当 type为single时 查询到一个就不继续执行遍历了
          if (!(_type === 'single' && vnodeList.length > 0) && childrenList.length > 0 && _level > 0) {
            recursion(childrenList, componentName)
          }
        }

        recursion(_root.$children, componentName)

        return vnodeList
      },

      /**
       * 系统权限
       * @param permission 权限访问路径
       */
      sysPermit(permission: string) {
        const buttonMap: { [k: string]: button } = store.getters['user/buttonMap']
        const hasPermitList = buttonMap[permission]
        return !isEmpty(hasPermitList)
      },

      /**
       * 返回
       */
      routeBack() {
        this.$store.dispatch('view/routeBack', this.$route)
      }
    }
  })
}
