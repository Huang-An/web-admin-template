const btnList: Array<button> = [
  // 用户管理
  {
    ascription: '/system/user-manage',
    permission: '/system/user-manage/add',
    title: '新增用户',
    icon: 'fa fa-plus',
    methods: 'userAdd',
    type: 'table-tool'
  },
  {
    ascription: '/system/user-manage',
    permission: '/system/user-manage/edit',
    title: '编辑',
    icon: '',
    methods: 'userEdit',
    type: 'table-action'
  }
]

export { btnList }
