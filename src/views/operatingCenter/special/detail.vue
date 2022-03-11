<template>
  <page-header-view :title="info.title">
    <template v-slot:content>
      <a-descriptions size="small" :column="2">
        <a-descriptions-item label="ID">
          {{ info.content_desc }}
        </a-descriptions-item>
        <a-descriptions-item label="关联专区">
          <a>{{ info.aaa }}</a>
        </a-descriptions-item>
        <a-descriptions-item label="所属项目">
          {{ info.content_desc }}
        </a-descriptions-item>
        <a-descriptions-item label="有效时间">
          {{ info.stime ? `${info.stime} ~ ${info.etime}` : "--" }}
        </a-descriptions-item>
        <a-descriptions-item label="内容形式">
          {{ info.content_desc }}
        </a-descriptions-item>
        <a-descriptions-item label="创建时间">
          {{ info.companyName }}
        </a-descriptions-item>
      </a-descriptions>
    </template>

    <!-- actions -->
    <template v-slot:extra>
      <a-button @click="goEdit">编辑</a-button>
      <a-tooltip
        overlayClassName="preview-tooltip"
        trigger="click"
        placement="bottom"
      >
        <template slot="title">
          <div class="preview-tooltip-text">请手机扫码预览</div>
          <img src="" alt="" />
        </template>
        <a-button type="primary">预览</a-button>
      </a-tooltip>
    </template>

    <template v-slot:extraContent>
      <div class="status-list">
        <div>
          <div class="text">状态</div>
          <div class="heading">{{ info.is_open }}</div>
        </div>
        <div>
          <div class="text">商品</div>
          <div class="heading">{{ info.goods_num }}</div>
        </div>
        <div>
          <div class="text">浏览量</div>
          <div class="heading">{{ info.visit_num }}</div>
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
                v-if="info.ddddd"
                :images="[info.ddddd]"
                class="topic-image"
              ></t-image>
              <div>封面图</div>
            </a-col>
            <a-col style="text-align: center;">
              <t-image
                v-if="info.eeeee"
                :images="[info.eeeee]"
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
          <div>{{ info.bbbbb }}</div>
          <div>{{ info.ccccc }}</div>
          <t-image
            v-if="info.fffff"
            :images="[info.fffff]"
          ></t-image>
        </a-col>
      </a-row>
    </a-card>

    <a-card title="专题图片" style="margin-top: 24px" :bordered="false">
      <a-row type="flex" :gutter="20">
        <a-col flex="397px">
          <mobile-preview :data="info"></mobile-preview>
        </a-col>
        <a-col flex="1">
          <a-table
            ref="table"
            size="default"
            rowKey="id"
            class="special-image-table"
            :columns="imgColumns"
            :dataSource="info.list"
            :pagination="false"
            :scroll="{ y: 615 }"
          >
            <template slot="column1" slot-scope="text, record">
              <image-card :data="record.list[0]"></image-card>
            </template>
            <template slot="column2" slot-scope="text, record">
              <image-card :data="record.list[1]"></image-card>
            </template>
            <template slot="column3" slot-scope="text, record">
              <image-card :data="record.list[2]"></image-card>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-card>
  </page-header-view>
</template>

<script>
import { TImage } from '@/components'
import PageHeaderView from '@/layouts/PageHeaderView'
import ImageCard from './components/ImageCard'
import MobilePreview from './components/MobilePreview'
import { getSpecialById } from '@/api/operatingCenter/special'

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
      info: {
        bbbbb: '33333333333',
        ccccc: '22222222222222',
        ddddd: 'https://img95.699pic.com/photo/40174/9787.jpg_wh300.jpg!/both/282x190',
        eeeee: 'https://img95.699pic.com/photo/40186/5971.jpg_wh300.jpg!/both/282x190',
        fffff: 'https://img95.699pic.com/photo/40186/5968.jpg_wh300.jpg!/both/282x190',
        list: [
          {
            id: '123',
            list: [
              {
                name: '是打发第三方是打发第三方是打发第三方是打发第三方是打发第三方',
                type: 1,
                url: 'https://img95.699pic.com/photo/40174/9787.jpg_wh300.jpg!/both/282x190'
              }
            ]
          },
          {
            id: '1234',
            list: [
              {
                name: '是打发第三方是打发第三方是打发第三方是打发第三方是打发第三方',
                type: 1,
                url: 'https://img95.699pic.com/photo/40174/9787.jpg_wh300.jpg!/both/282x190'
              }
            ]
          },
          {
            id: '1233',
            list: [
              {
                name: '是打发第三方是打发第三方是打发第三方是打发第三方是打发第三方',
                type: 1,
                url: 'https://img95.699pic.com/photo/40174/9787.jpg_wh300.jpg!/both/282x190'
              }
            ]
          },
          {
            id: '12334',
            list: [
              {
                name: '是打发第三方是打发第三方是打发第三方是打发第三方是打发第三方',
                type: 1,
                url: 'https://img95.699pic.com/photo/40174/9787.jpg_wh300.jpg!/both/282x190'
              }
            ]
          }
        ]
      },
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
          dataIndex: 'list_order',
          align: 'center',
          width: 100
        }
      ]
    }
  },
  created () {
    this.id = this.$route.query.id
    // this.getSpecialById()
  },
  methods: {
    getSpecialById () {
      getSpecialById({
        special_id: this.id
      }).then(({ data }) => {
        this.info = data || {}
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
    padding-left: 40px;
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
  width: 220px !important;
}
</style>
