<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="用户类型">
              <a-select v-model="queryParam.user_type" :getPopupContainer="triggerNode => triggerNode.parentNode" placeholder="请选择">
                <a-select-option
                  v-for="item in userTypeOptions"
                  :key="item.value"
                  :value="item.value"
                  >{{ item.label }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="用户">
              <a-input
                v-model="queryParam.user_text"
                placeholder="ID、昵称、项目、手机号"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="search">查询</a-button>
              <a-button style="margin-left: 8px" @click="reset">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div>
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :showPagination="true"
      >
      </s-table>
    </div>
  </div>
</template>

<script>
import { STable } from '@/components'
import { getInviteList } from '@/api/invite'

export default {
  nmae: 'inviteUser',
  components: {
    STable
  },
  data () {
    return {
      // 邀请人选项
      userTypeOptions: [
        {
          label: '业主',
          value: '1'
        },
        {
          label: '业主成员',
          value: '2'
        },
        {
          label: '租户',
          value: '3'
        },
        {
          label: '租户成员',
          value: '4'
        },
        {
          label: '游客',
          value: '0'
        }
      ],
      // 查询参数
      queryParam: {},
      columns: [
        {
          title: '邀请人',
          dataIndex: 'nickname',
          customRender: (text, record) => {
            const imgSrc = record.avatar || require('../../../../../assets/imgs/avatar.png')
            return (
              <div>
                <img class="avatar" src={imgSrc} />
                <a href={`/zht/user/user/getUserList?uid=${record.uid}`} target="_blank">{text}</a>
              </div>
            )
          }
        },
        {
          title: '手机号码',
          dataIndex: 'mobile'
        },
        {
          title: '用户类型',
          dataIndex: 'user_type_name'
        },
        {
          title: '成功邀请（人）',
          dataIndex: 'invite_num',
          sorter: true
        },
        {
          title: '获得幸福币',
          dataIndex: 'credits',
          sorter: true
        },
        {
          title: '最后邀请时间',
          dataIndex: 'stime',
          customRender: text => {
            return text || '--'
          }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getInviteList(this.queryParam)
      }
    }
  },
  methods: {
    search () {
      this.$refs.table.refresh(true)
    },
    reset () {
      this.queryParam = {}
      this.$refs.table.refresh(true)
    }
  }
}
</script>

<style lang="less" scoped>
.table-page-search-submitButtons {
  text-align: right;
}
.avatar {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}
</style>
