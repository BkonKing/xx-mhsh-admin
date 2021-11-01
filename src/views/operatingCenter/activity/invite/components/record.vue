<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="邀请结果">
              <a-select v-model="queryParam.invite_type" placeholder="请选择">
                <a-select-option
                  v-for="item in resultOptions"
                  :key="item.value"
                  :value="item.value"
                  >{{ item.label }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="用户">
              <a-row type="flex">
                <a-col flex="100px">
                  <a-select v-model="queryParam.user_type" placeholder="邀请人">
                    <a-select-option value="1">邀请人</a-select-option>
                    <a-select-option value="2">被邀请人</a-select-option>
                  </a-select>
                </a-col>
                <a-col flex="1">
                  <a-input
                    v-model="queryParam.user_text"
                    placeholder="ID、昵称、项目、手机号"
                  ></a-input>
                </a-col>
              </a-row>
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
</template>

<script>
import { STable } from '@/components'
import { getLogList } from '@/api/invite'

export default {
  nmae: 'inviteUser',
  components: {
    STable
  },
  data () {
    return {
      resultOptions: [
        {
          label: '邀请中',
          value: '0'
        },
        {
          label: '邀请失败',
          value: '99'
        },
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
          title: () => {
            return <a-tooltip overlayClassName="max-tooltip">
              <template slot="title">
                <div>[邀请中] :用户活动页领取后，3天内暂未下载登录APP</div>
                <div>[邀请失败] :用户活动页领取后，3天内未完成下载登录APP</div>
                <div>[下载登录] :用户活动页领取后，3天内成功下载登录APP</div>
                <div>[房间认证] :用户成功完成房间认证任务</div>
              </template>
              邀请结果
              <a-icon type="info-circle" style="margin-left: 3px;" />
            </a-tooltip>
          },
          dataIndex: 'invite_type_name'
        },
        {
          title: '邀请人',
          dataIndex: 'invite_nickname',
          customRender: (text, record) => {
            const imgSrc = record.invite_avatar || require('../../../../../assets/imgs/avatar.png')
            return (
              <div>
                <img class="avatar" src={imgSrc} />
                <a href={`/zht/user/user/getUserList?uid=${record.invite_uid}`} target="_blank">{text}</a>
              </div>
            )
          }
        },
        {
          title: '被邀请人',
          dataIndex: 'be_invite_nickname',
          customRender: (text, record) => {
            const imgSrc = record.be_invite_avatar || require('../../../../../assets/imgs/avatar.png')
            const user = record.be_invite_uid !== '0' ? <a href={`/zht/user/user/getUserList?uid=${record.be_invite_uid}`} target="_blank">{text}</a> : <span>{text}</span>
            return (
              <div>
                <img class="avatar" src={imgSrc} />
                {user}
              </div>
            )
          }
        },
        {
          title: '手机号码',
          dataIndex: 'be_mobile'
        },
        {
          title: '领取时间',
          dataIndex: 'ctime'
        },
        {
          title: '完成时间',
          dataIndex: 'stime'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getLogList(this.queryParam)
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
