<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="邀请身份">
              <a-select v-model="queryParam.status" placeholder="请选择">
                <a-select-option value="1">邀请人</a-select-option>
                <a-select-option value="2">被邀请人</a-select-option>
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
          <a-col v-if="advanced" :md="8" :sm="24">
            <a-form-item label="奖励类别">
              <a-select v-model="queryParam.i_type" placeholder="请选择">
                <a-select-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :value="item.value"
                  >{{ item.label }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <advanced-form
            v-model="advanced"
            :md="24"
            @reset="reset"
            @search="search"
          ></advanced-form>
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
import { STable, AdvancedForm } from '@/components'
import { getRewardList } from '@/api/invite'

export default {
  nmae: 'award',
  components: {
    STable,
    AdvancedForm
  },
  data () {
    return {
      advanced: false,
      typeOptions: [
        {
          label: '下载登录',
          value: '1'
        },
        {
          label: '房间认证',
          value: '2'
        }
      ],
      // 查询参数
      queryParam: {},
      columns: [
        {
          title: '记录ID',
          dataIndex: 'id'
        },
        {
          title: '邀请身份',
          dataIndex: 'status_name'
        },
        {
          title: '用户昵称',
          dataIndex: 'nickname',
          customRender: (text, record) => {
            const imgSrc = record.avatar || require('../../../../../assets/imgs/avatar.png')
            const uid = record.status === '1' ? record.invite_uid : record.be_invite_uid
            return (
              <div>
                <img class="avatar" src={imgSrc} />
                <a href={`/zht/user/user/getUserList?uid=${uid}`} target="_blank">{text}</a>
              </div>
            )
          }
        },
        {
          title: '手机号码',
          dataIndex: 'mobile'
        },
        {
          title: '奖励类别',
          dataIndex: 'i_type_name'
        },
        {
          title: '奖励幸福币',
          dataIndex: 'credits'
        },
        {
          title: '奖励时间',
          dataIndex: 'ctime'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getRewardList(this.queryParam)
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
