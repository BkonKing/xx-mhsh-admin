<template>
  <page-header-view :title="info.thematic_name">
    <template v-slot:content>
      <a-descriptions size="small" :column="2">
        <a-descriptions-item label="ID">
          {{ info.id }}
        </a-descriptions-item>
        <a-descriptions-item v-if="+info.special_id" label="关联专区">
          <a :href="specialUrl" target="_blank">{{ info.special_name }}</a>
        </a-descriptions-item>
        <a-descriptions-item label="所属项目">
          {{ info.project_name }}
        </a-descriptions-item>
        <a-descriptions-item label="有效时间">
          {{ info.limit_time || '--' }}
        </a-descriptions-item>
        <a-descriptions-item label="内容形式">
          {{ info.content_type_name }}
        </a-descriptions-item>
        <a-descriptions-item label="创建时间">
          {{ info.ctime }}
        </a-descriptions-item>
      </a-descriptions>
    </template>

    <!-- actions -->
    <template v-slot:extra>
      <a-button v-if="info.project_id == projectId || (isParentProject && !+info.project_id)" @click="goEdit">编辑</a-button>
      <a-tooltip
        overlayClassName="preview-tooltip"
        trigger="click"
        placement="bottom"
      >
        <template slot="title">
          <div class="preview-tooltip-text">请手机扫码预览</div>
          <img :src="info.qr_code" alt="" />
        </template>
        <a-button type="primary">预览</a-button>
      </a-tooltip>
    </template>

    <template v-slot:extraContent>
      <div class="status-list">
        <div>
          <div class="text">状态</div>
          <div class="heading">{{ info.state_name }}</div>
        </div>
        <div>
          <div class="text">商品</div>
          <div class="heading">{{ info.goods_num }}</div>
        </div>
        <div>
          <div class="text">浏览量</div>
          <div class="heading">{{ info.browse_num }}</div>
        </div>
      </div>
    </template>

    <a-card
      title="基础信息"
      class="intro-card"
      style="margin-top: 24px"
      :bordered="false"
    >
      <a-row type="flex">
        <a-col flex="72px">专区图：</a-col>
        <a-col>
          <a-row type="flex">
            <a-col style="text-align: center;">
              <t-image
                v-if="info.thumb"
                :images="[info.thumb]"
                class="topic-image"
              ></t-image>
              <div>封面图</div>
            </a-col>
            <a-col style="text-align: center;">
              <t-image
                v-if="info.bj_thumb"
                :images="[info.bj_thumb]"
                class="topic-image"
              ></t-image>
              <div>背景图</div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-row type="flex">
        <a-col flex="72px">微信分享：</a-col>
        <a-col>
          <div>{{ info.wechat_title }}</div>
          <div>{{ info.wechat_content }}</div>
          <t-image
            v-if="info.wechat_img"
            :images="[info.wechat_img]"
          ></t-image>
        </a-col>
      </a-row>
    </a-card>

    <a-card title="专题图片" style="margin-top: 24px" :bordered="false">
      <a-row type="flex" :gutter="20">
        <a-col flex="397px">
          <mobile-preview :data="previewData"></mobile-preview>
        </a-col>
        <a-col flex="1">
          <a-table
            ref="table"
            size="default"
            rowKey="id"
            class="special-image-table"
            :columns="imgColumns"
            :dataSource="tableData"
            :pagination="false"
            :scroll="{ y: 615 }"
          >
            <template slot="column1" slot-scope="text, record">
              <image-card :data="record.data[0]"></image-card>
            </template>
            <template slot="column2" slot-scope="text, record">
              <image-card :data="record.data[1]"></image-card>
            </template>
            <template slot="column3" slot-scope="text, record">
              <image-card :data="record.data[2]"></image-card>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-card>
  </page-header-view>
</template>

<script>
import { mapGetters } from 'vuex'
import { TImage } from '@/components'
import PageHeaderView from '@/layouts/PageHeaderView'
import ImageCard from './components/ImageCard'
import MobilePreview from './components/MobilePreview'
import { getSpecialDetail } from '@/api/operatingCenter/special'

export default {
  name: 'SpecialDetail',
  components: {
    PageHeaderView,
    TImage,
    ImageCard,
    MobilePreview
  },
  data () {
    return {
      id: '',
      info: {},
      tableData: [],
      imgColumns: [
        {
          title: '行',
          align: 'center',
          width: 50,
          customRender (text, record, index) {
            return index + 1
          }
        },
        {
          title: '列1',
          width: '30%',
          ellipsis: true,
          scopedSlots: { customRender: 'column1' }
        },
        {
          title: '列2',
          width: '30%',
          ellipsis: true,
          scopedSlots: { customRender: 'column2' }
        },
        {
          title: '列3',
          width: '30%',
          ellipsis: true,
          scopedSlots: { customRender: 'column3' }
        },
        {
          title: '排序',
          dataIndex: 'sort',
          align: 'center',
          width: 100
        }
      ]
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
        return this.isParentProject ? `/zht/life/special/getSpecialList?special_id=${id}` : `/xmht/life/special/getSpecialList?special_id=${id}`
      }
      return ''
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getSpecialDetail()
  },
  methods: {
    getSpecialDetail () {
      getSpecialDetail({
        thematic_id: this.id
      }).then(({ data, child }) => {
        this.info = data || {}
        this.tableData = child || []
      })
    },
    goEdit () {
      this.$router.push({
        name: 'specialEdit',
        query: {
          id: this.id
        }
      })
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
.status-list {
  display: flex;
  justify-content: flex-end;
  text-align: left;
  .text,
  .heading {
    padding-left: 36px;
    text-align: right;
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
/deep/ .ant-pro-page-header-wrap-page-header-warp {
  .ant-pro-page-header-wrap-extraContent {
    position: initial;
  }
}
/deep/ .ant-pro-page-header-wrap-children-content {
  padding-bottom: 24px;
}
.topic-image /deep/ img{
  width: 355px !important;
  height: 163px !important;
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
