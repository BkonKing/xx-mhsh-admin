<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="邀请身份">
              <a-select
                v-model="queryParam.status"
                :getPopupContainer="triggerNode => triggerNode.parentNode"
                placeholder="请选择"
              >
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
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="奖励类别">
                <a-select
                  v-model="queryParam.i_type"
                  :getPopupContainer="triggerNode => triggerNode.parentNode"
                  placeholder="请选择"
                >
                  <a-select-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :value="item.value"
                    >{{ item.label }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="结算项目">
                <a-select v-model="queryParam.project_id" placeholder="请选择">
                  <a-select-option
                    v-for="item in projectOptions"
                    :key="item.id"
                    :value="item.id"
                    >{{ item.project_name }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="奖励时间">
                <a-range-picker
                  v-model="queryParam.time"
                  valueFormat="YYYY-MM-DD HH:mm:ss"
                  :show-time="{ defaultValue: [defaultTime, defaultEndTime] }"
                  :ranges="{
                    本周: [moment().startOf('week'), moment().endOf('week')],
                    本月: [moment().startOf('month'), moment().endOf('month')]
                  }"
                  :placeholder="['开始时间', '结束时间']"
                  style="width: 100%;"
                />
              </a-form-item>
            </a-col>
          </template>
          <advanced-form
            v-model="advanced"
            :md="8"
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
import moment from 'moment'
import cloneDeep from 'lodash.clonedeep'
import { STable, AdvancedForm } from '@/components'
import { getRewardList } from '@/api/invite'
import { getProjectList } from '@/api/financeCenter'

export default {
  nmae: 'award',
  components: {
    STable,
    AdvancedForm
  },
  data () {
    return {
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      defaultEndTime: moment('23:59:59', 'HH:mm:ss'),
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
      projectOptions: [],
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
            const imgSrc =
              record.avatar || require('../../../../../assets/imgs/avatar.png')
            const uid =
              record.status === '1' ? record.invite_uid : record.be_invite_uid
            return (
              <div>
                <img class="avatar" src={imgSrc} />
                <a
                  href={`/zht/user/user/getUserList?uid=${uid}`}
                  target="_blank"
                >
                  {text}
                </a>
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
          title: '结算项目',
          dataIndex: 'project_name'
        },
        {
          title: '奖励时间',
          dataIndex: 'ctime'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const params = cloneDeep(this.queryParam)
        const time = params.time
        if (time && time.length) {
          params.stime = time[0]
          params.etime = time[1]
        }
        return getRewardList({ ...params, ...parameter }).then((res) => {
          this.projectOptions = res.project_data || []
          return res
        })
      }
    }
  },
  methods: {
    moment,
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
.table-page-search-wrapper {
  /deep/ .ant-form-inline .ant-form-item > .ant-form-item-label {
    min-width: 80px;
    flex-shrink: 0;
  }
}
.table-page-search-submitButtons {
  text-align: right;
}
.avatar {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}
</style>
