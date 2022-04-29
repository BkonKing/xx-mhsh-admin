<template>
  <page-header-view
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="handleTabChange"
  >
    <!-- actions -->
    <template v-slot:extra>
      <a-tooltip
        overlayClassName="preview-tooltip"
        trigger="click"
        placement="bottom"
      >
        <template slot="title">
          <div class="preview-tooltip-text">请手机扫码预览</div>
          <img :src="infoData.qr_code" alt="" />
        </template>
        <a-button type="primary">预览</a-button>
      </a-tooltip>
    </template>

    <template v-slot:extraContent>
      <div class="status-list">
        <div>
          <div class="text">状态</div>
          <div class="heading">{{ infoData.state_name }}</div>
        </div>
        <div>
          <div class="text">奖品</div>
          <div class="heading">{{ infoData.goods_num }}</div>
        </div>
        <div>
          <div class="text">二维码</div>
          <div class="heading">{{ infoData.browse_num }}</div>
        </div>
      </div>
    </template>
    <setting-tab v-if="tabActiveKey === '0'"></setting-tab>
    <record-tab v-if="tabActiveKey === '1'" type="1" key="1"></record-tab>
    <record-tab v-if="tabActiveKey === '2'" type="2" key="2"></record-tab>
  </page-header-view>
</template>

<script>
// /operatingCenter/lottery/index
import { mapGetters } from 'vuex'
import PageHeaderView from '@/layouts/PageHeaderView'
import SettingTab from './components/SettingTab'
import RecordTab from './components/RecordTab'
import { getLotteryTabData } from '@/api/operatingCenter/lottery'

export default {
  name: 'SpecialDetail',
  components: {
    PageHeaderView,
    SettingTab,
    RecordTab
  },
  data () {
    return {
      infoData: {},
      tabList: [
        { key: '0', tab: '活动设置' },
        { key: '1', tab: '抽奖记录' },
        { key: '2', tab: '中奖兑换' }
      ],
      tabActiveKey: '0'
    }
  },
  computed: {
    ...mapGetters(['projectId', 'isParentProject']),
    previewData () {
      return {
        list: this.tableData,
        title: this.info.thematic_name
      }
    },
    specialUrl () {
      const id = this.info.special_id
      if (id) {
        return this.isParentProject
          ? `/zht/life/special/getSpecialList?special_id=${id}`
          : `/xmht/life/special/getSpecialList?special_id=${id}`
      }
      return ''
    }
  },
  created () {
    this.getLotteryTabData()
  },
  methods: {
    async getLotteryTabData () {
      const { data, tab_data: tabData } = await getLotteryTabData()
    },
    handleTabChange (key) {
      this.tabActiveKey = key
    }
  }
}
</script>

<style lang="less" scoped>
.special-image-table {
  td {
    vertical-align: top;
  }
}
.heading {
  font-size: 20px;
  color: #000000d9;
}
.intro-card {
  .ant-row-flex + .ant-row-flex {
    margin-top: 20px;
  }
}
/deep/ .ant-pro-page-header-wrap-main .ant-pro-page-header-wrap-row {
  justify-content: flex-end;
}
/deep/ .ant-pro-page-header-wrap-children-content {
  padding-bottom: 24px;
}
</style>

<style lang="less">
.preview-tooltip {
  .preview-tooltip-text {
    color: @error-color;
  }
  .ant-tooltip-arrow::before {
    background-color: #fff;
  }
  .ant-tooltip-inner {
    padding: 8px 12px;
    background: #fff;
  }
  img {
    width: 100px;
    height: 100px;
    margin-top: 10px;
  }
}
</style>
