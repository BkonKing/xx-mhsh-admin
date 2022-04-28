<template>
  <div>
    <page-header :routes="routes"></page-header>
    <div style="padding: 24px;">
      <a-card :bordered="false">
        <a-row type="flex">
          <a-col span="10">
            <a-row>
              <a-col span="8">
                <detail-info title="邀请分享" :value="`${statisticsInfo.inviter_num || 0}人　${statisticsInfo.share_num || 0}次`">
                  <template v-slot:tooltip>
                    <div>邀请人数:活动页输入手机号领取成功的人数</div>
                    <div>分享次数:面对面二维码邀请页面的浏览次数</div>
                  </template>
                </detail-info>
              </a-col>
              <a-col span="8">
                <detail-info title="下载登录" :value="`${statisticsInfo.download_num || 0}人`"></detail-info>
              </a-col>
              <a-col span="8">
                <detail-info
                  title="房间认证"
                  :value="`${statisticsInfo.attestation_num || 0}人`"
                  :bordered="true"
                >
                </detail-info>
              </a-col>
            </a-row>
          </a-col>
          <a-col span="7">
            <a-row>
              <a-col span="12">
                <detail-info title="邀请人获得" :value="`${statisticsInfo.inviter_credits || 0}币`">
                </detail-info>
              </a-col>
              <a-col span="12">
                <detail-info
                  title="被邀请人获得"
                  :value="`${statisticsInfo.be_inviter_credits || 0}币`"
                  :bordered="true"
                ></detail-info>
              </a-col>
            </a-row>
          </a-col>
          <a-col span="7">
            <a-row>
              <a-col span="8">
                <detail-info title="下载率" :value="`${statisticsInfo.download_rate || 0}%`">
                  <template v-slot:tooltip>
                    <div>下载率=下载登录人数/邀请人数</div>
                  </template>
                </detail-info>
              </a-col>
              <a-col span="8">
                <detail-info title="认证率" :value="`${statisticsInfo.attestation_rate || 0}%`">
                  <template v-slot:tooltip>
                    <div>认证率=房间认证人数/下载登录人数</div>
                  </template>
                </detail-info>
              </a-col>
              <a-col span="8">
                <detail-info title="裂变层级" :value="`${statisticsInfo.fission_level || 0}`">
                  <template v-slot:tooltip>
                    <div>最高裂变层级</div>
                  </template>
                </detail-info>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-card>
      <a-card class="table-card" style="margin-top: 24px;" :bordered="false">
        <a-tabs>
          <a-tab-pane key="1" tab="邀请人">
            <invite-user></invite-user>
          </a-tab-pane>
          <a-tab-pane key="2" tab="邀请记录" force-render>
            <record></record>
          </a-tab-pane>
          <a-tab-pane key="3" tab="奖励记录">
            <award></award>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </div>
  </div>
</template>

<script>
// /operatingCenter/activity/invite/setting
import { PageHeader, DetailInfo } from '@/components'
import inviteUser from './components/inviteUser'
import record from './components/record'
import award from './components/award'
import { getInviteStatistics } from '@/api/invite'

export default {
  name: 'inviteActivity',
  components: {
    DetailInfo,
    PageHeader,
    inviteUser,
    record,
    award
  },
  data () {
    return {
      routes: [
        {
          path: '',
          breadcrumbName: '运营中心'
        },
        {
          path: '',
          breadcrumbName: '活动管理'
        },
        {
          path: '/operatingCenter/activity/invite/index',
          breadcrumbName: '美好红包'
        },
        {
          breadcrumbName: '邀请情况'
        }
      ],
      info: {},
      statisticsInfo: {}
    }
  },
  created () {
    this.getInviteStatistics()
  },
  methods: {
    // 获取统计信息
    getInviteStatistics () {
      getInviteStatistics().then(({ tab_data: data }) => {
        this.statisticsInfo = data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.table-action a + a {
  margin-left: 10px;
}
.table-card {
  /deep/ .ant-tabs-bar {
    margin-bottom: 0;
  }
  /deep/ .ant-card-body {
    padding: 0;
  }
  /deep/ .ant-tabs-nav-wrap {
    padding-left: 24px;
  }
  /deep/ .ant-tabs-tabpane {
    padding: 24px;
  }
}
</style>
