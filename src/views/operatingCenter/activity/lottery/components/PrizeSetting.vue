<template>
  <a-card title="奖品设置" style="margin-top: 24px" :bordered="false">
    <div style="margin-bottom: 24px">
      转盘按顺时针显示；奖品支持扩展名：.png .jpg；
    </div>
    <a-row type="flex" :gutter="20">
      <a-col flex="397px">
        <mobile-preview :data="previewData"></mobile-preview>
      </a-col>
      <a-col flex="1">
        <table class="ant-table w-full">
          <thead class="ant-table-thead">
            <tr>
              <th
                class="ant-table-align-center"
                style="text-align: center;width: 70px;"
              >
                排序
              </th>
              <th
                class="ant-table-align-center"
                style="text-align: center;width: 70px;"
              >
                序号
              </th>
              <th class="ant-table-row-cell-break-word">
                <span class="text-red-400">*</span>奖项
              </th>
              <th class="ant-table-row-cell-break-word">
                奖项图<a-tooltip placement="top">
                  <template slot="title">
                    <span>设置图片则显示</span>
                  </template>
                  <a-icon type="info-circle" style="margin-left: 5px;" />
                </a-tooltip>
              </th>
              <th class="ant-table-row-cell-break-word">
                兑奖方式<a-tooltip
                  overlayClassName="max-w-screen-sm"
                  placement="top"
                >
                  <template slot="title">
                    <span
                      >系统自动生成：奖项为商品/优惠券，中奖后自动生成0元商品/优惠券订单<br />联系工作人员兑奖：需线下进行兑奖，可扫码核销奖品或后台标记为“已兑奖”</span
                    >
                  </template>
                  <a-icon type="info-circle" style="margin-left: 5px;" />
                </a-tooltip>
              </th>
              <th class="ant-table-align-center" style="width: 120px;">
                <span class="text-red-400">*</span>中奖率
              </th>
              <th
                class="ant-table-align-center ant-table-row-cell-last"
                style="text-align: center;width: 70px;"
              >
                操作
              </th>
            </tr>
          </thead>
          <draggable
            v-model="tableData"
            class="ant-table-tbody"
            tag="tbody"
            handle=".drag-icon"
            draggable=".ant-table-row"
          >
            <tr
              v-for="(item, index) in tableData"
              :key="item.id"
              class="ant-table-row ant-table-row-level-0"
            >
              <td class="ant-table-row-cell-break-word text-center">
                <a-icon class="drag-icon" type="menu" />
              </td>
              <td class="ant-table-row-cell-break-word text-center">
                {{ index + 1 }}
              </td>
              <td class="ant-table-row-cell-break-word">
                <a-input-group compact>
                  <a-select
                    v-model="item.award_type"
                    :options="awardTypes"
                    style="width: 100px;"
                  >
                  </a-select>
                  <div class="input-group-item">
                    <template v-if="+item.award_type === 1">
                      <a-select v-model="item.source_id" class="w-6/12">
                        <a-select-option
                          v-for="item in couponOptions"
                          :key="item.id"
                          :value="item.id"
                          >{{ item.coupon_name }}</a-select-option
                        >
                      </a-select>
                      <a-select v-model="item.source_id" class="w-6/12">
                        <a-select-option
                          v-for="item in couponOptions"
                          :key="item.id"
                          :value="item.id"
                          >{{ item.coupon_name }}</a-select-option
                        >
                      </a-select>
                    </template>
                    <a-select
                      v-else-if="+item.award_type === 2"
                      v-model="item.source_id"
                      class="w-full"
                    >
                      <a-select-option
                        v-for="item in couponOptions"
                        :key="item.id"
                        :value="item.id"
                        >{{ item.coupon_name }}</a-select-option
                      >
                    </a-select>
                    <a-select
                      v-else-if="+item.award_type === 3"
                      v-model="item.source_id"
                      class="w-full"
                    >
                      <a-select-option
                        v-for="item in ShopCouponOptions"
                        :key="item.id"
                        :value="item.id"
                        >{{ item.coupon_name }}</a-select-option
                      >
                    </a-select>
                    <a-input v-else disabled value="--"></a-input>
                  </div>
                </a-input-group>
                <a-input-group compact class="mt-3">
                  <a-input
                    :disabled="true"
                    value="转盘文字"
                    style="width: 100px;"
                  ></a-input>
                  <a-input
                    v-model="item.award_name"
                    class="input-group-item"
                  ></a-input>
                </a-input-group>
              </td>
              <td class="ant-table-row-cell-break-word">
                <upload-image
                  v-model="item.img"
                  :maxLength="1"
                  :isOne="true"
                ></upload-image>
              </td>
              <td class="ant-table-row-cell-break-word">
                <a-radio-group v-model="item.cash_type">
                  <a-radio value="1">系统自动生成奖品</a-radio><br />
                  <a-radio value="2">联系工作人员兑奖</a-radio>
                </a-radio-group>
              </td>
              <td class="ant-table-row-cell-break-word text-center">
                <a-input
                  v-model="item.winning_rate"
                  v-number-input="{ min: 0, max: 100, decimal: 2 }"
                  suffix="%"
                />
              </td>
              <td class="ant-table-row-cell-break-word text-center">
                <a @click="remove(index)">删除</a>
              </td>
            </tr>
          </draggable>
        </table>
        <a-button
          v-if="tableData.length < 12"
          class="mt-4"
          type="dashed"
          block
          @click="add"
          >+ 新增奖项</a-button
        >
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import draggable from 'vuedraggable'
import { UploadImage } from '@/components'
import MobilePreview from './MobilePreview'
import {
  getGoodsList,
  getCouponList,
  getShopCouponList
} from '@/api/operatingCenter/lottery'
const obj = {
  award_type: '',
  source_id: '',
  award_name: '',
  img: '',
  cash_type: '',
  winning_rate: 0
}
export default {
  name: 'SpecialImages',
  components: {
    draggable,
    UploadImage,
    MobilePreview
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tableData: this.data,
      goodsOptions: [],
      specialOptions: [],
      formData: clonedeep(obj),
      awardTypes: [
        {
          label: '商品',
          value: '1'
        },
        {
          label: '平台券',
          value: '2'
        },
        {
          label: '商铺券',
          value: '3'
        },
        {
          label: '其他奖品',
          value: '4'
        },
        {
          label: '无奖品',
          value: '5'
        }
      ],
      couponOptions: [],
      ShopCouponOptions: []
    }
  },
  computed: {
    previewData () {
      return {
        title: this.title,
        list: this.tableData
      }
    }
  },
  watch: {
    data (newValue) {
      if (this.tableData != newValue) {
        this.tableData = newValue
      }
    }
  },
  created () {
    this.getCouponList()
    this.getShopCouponList()
  },
  methods: {
    getCouponList () {
      getCouponList().then(({ list }) => {
        this.couponOptions = list || []
      })
    },
    getShopCouponList () {
      getShopCouponList().then(({ list }) => {
        this.ShopCouponOptions = list || []
      })
    },
    add () {
      this.tableData.push(clonedeep(obj))
    },
    remove (index) {
      this.tableData.splice(index, 1)
    },
    validate () {
      const PrizeFormValidate = []
      this.tableData.forEach(obj => {
        PrizeFormValidate.push(this.$refs[`PrizeForm1${obj.id}`].validate())
        PrizeFormValidate.push(this.$refs[`PrizeForm2${obj.id}`].validate())
        PrizeFormValidate.push(this.$refs[`PrizeForm3${obj.id}`].validate())
      })
      return Promise.all(PrizeFormValidate)
    },
    setData (data) {
      this.tableData = data.map(obj => {
        const listData =
          obj.data && obj.data.length
            ? this.completionListRow(obj.data)
            : [
              clonedeep(this.formData),
              clonedeep(this.formData),
              clonedeep(this.formData)
            ]
        return {
          sort: obj.sort,
          data: listData,
          id: Math.random()
        }
      })
    },
    // 补全当行数据为3个对象
    completionListRow (data) {
      const rowData = []
      for (let index = 0; index < 3; index++) {
        let itemData = data[index]
        itemData = itemData
          ? {
            id: Math.random(),
            block_type: itemData.block_type,
            thematic_content_id: itemData.thematic_content_id,
            block_content: itemData.block_content,
            goods_name: itemData.goods_name,
            block_img: itemData.block_img ? [itemData.block_img] : []
          }
          : clonedeep(this.formData)
        rowData.push(itemData)
      }
      return rowData
    }
  }
}
</script>

<style lang="less" scoped>
.add-btn {
  margin-top: 12px;
  width: 100%;
  height: 32px;
  border-radius: 4px;
  border: 2px dashed #eeeeee;
  text-align: center;
  line-height: 28px;
  cursor: pointer;
}
.drag-icon {
  cursor: move;
}
/deep/ .ant-upload.ant-upload-select-picture-card,
/deep/ .ant-upload-list-picture-card-container {
  width: 80px;
  height: 80px;
}
.input-group-item {
  width: calc(100% - 100px);
}
</style>
