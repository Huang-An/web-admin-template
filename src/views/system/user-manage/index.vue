<template>
  <com-table
    :query="query"
    :column="column"
    :data="data"
    :tools="tools"
    :actions="actions"
    :page-info="pageInfo"
    :total="total"
    @on-query="onQuery"
    @on-reset="onReset"
    @size-change="sizeChange"
    @current-change="currentChange"
  />
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { dateFormat } from 'plugin/helper'
import { list } from 'api/user'

// mixins
import mixinTable from 'mixins/table'

// type
import { listSearch, listItems } from 'api/user/type'

@Component({
  name: 'userManage'
})
export default class userManage extends Mixins<mixinTable<listSearch>>(mixinTable) {
  data: Array<listItems> = []

  query: query<listSearch> = {
    id: { label: '用户编号', type: 'input' },
    userName: { label: '登录账号', type: 'input' },
    mobile: { label: '手机号码', type: 'input' }
  }

  column: column<listItems> = {
    id: {
      label: '用户编号',
      width: '220px'
    },
    userName: {
      label: '登录账号',
      overflow: true
    },
    mobile: {
      label: '手机号码',
      overflow: true
    },
    createUser: {
      label: '最近操作人',
      width: '120px',
      render: ({ createUser, updateUser }) => createUser || updateUser
    },
    createDate: {
      label: '操作时间',
      width: '160px',
      render: ({ updateDate, createDate }) => dateFormat(updateDate || createDate)
    }
  }

  tools = {
    userAdd: this.userAdd
  }

  actions = {
    userEdit: this.userEdit
  }

  async getList() {
    const { code, result } = await list(this.searchMap)

    if (code === 200) {
      this.data = result.items || []
      this.total = result.totalCount || 0
    }
  }

  userAdd() {
    this.$router.push({ path: 'user-manage/add' })
  }

  userEdit(row: listItems) {
    this.$router.push({ path: 'user-manage/edit', query: { id: row.id } })
  }
}
</script>
