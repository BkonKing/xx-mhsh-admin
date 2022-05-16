<template>
  <a-card title="奖品设置" style="margin-top: 24px" :bordered="false">
    <div style="margin-bottom: 24px">
      转盘按顺时针显示；奖品支持扩展名：.png .jpg；
    </div>
    <a-row type="flex" :gutter="20">
      <a-col flex="397px">
        <mobile-preview
          :infoData="infoData"
          :listData="tableData"
        ></mobile-preview>
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
                <div class="flex items-center">
                  奖项图<a-tooltip placement="top">
                    <template slot="title">
                      <span>设置图片则显示</span>
                    </template>
                    <a-icon
                      type="info-circle"
                      style="margin-left: 5px;font-size: 14px;"
                    />
                  </a-tooltip>
                </div>
              </th>
              <th class="ant-table-row-cell-break-word">
                <div class="flex items-center">
                  兑奖方式<a-tooltip
                    overlayClassName="max-w-screen-sm"
                    placement="top"
                  >
                    <template slot="title">
                      <span
                        >系统自动生成：奖项为商品/优惠券，中奖后自动生成0元商品/优惠券订单<br />联系工作人员兑奖：需线下进行兑奖，可扫码核销奖品或后台标记为“已兑奖”</span
                      >
                    </template>
                    <a-icon
                      type="info-circle"
                      style="margin-left: 5px;font-size: 14px;"
                    />
                  </a-tooltip>
                </div>
              </th>
              <th class="ant-table-align-center" style="width: 110px;">
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
                <a-form-model
                  :ref="`awardForm${index}`"
                  :model="tableData[index]"
                  :validateOnRuleChange="true"
                >
                  <a-row type="flex">
                    <a-col flex="100px">
                      <a-form-model-item
                        class="mb-0"
                        prop="award_type"
                        :rules="{ required: true, message: '请选择' }"
                      >
                        <a-select
                          v-model="item.award_type"
                          class="w-full"
                          :options="awardTypes"
                          @change="changeAwardType(item)"
                        >
                        </a-select>
                      </a-form-model-item>
                    </a-col>
                    <a-col flex="1">
                      <template v-if="+item.award_type === 1">
                        <a-row type="flex">
                          <a-col flex="1">
                            <a-form-model-item
                              class="mb-0"
                              prop="goods_id"
                              :rules="{ required: true, message: '请选择' }"
                            >
                              <a-select
                                v-model="item.goods_id"
                                class="w-6/12"
                                show-search
                                placeholder="商品编号/名称"
                                :filter-option="false"
                                :not-found-content="fetching ? undefined : null"
                                @search="value => fetchGoods(value, item)"
                                @change="value => setSpecification(value, item)"
                              >
                                <a-spin
                                  v-if="fetching"
                                  slot="notFoundContent"
                                  size="small"
                                />
                                <a-select-option
                                  v-for="item in item.goodsOptions"
                                  :key="item.id"
                                  :value="item.id"
                                  >{{ item.goods_name }}</a-select-option
                                >
                              </a-select>
                            </a-form-model-item>
                          </a-col>
                          <a-col flex="1">
                            <a-form-model-item
                              class="mb-0"
                              prop="source_id"
                              :rules="{ required: true, message: '请选择' }"
                            >
                              <a-select v-model="item.source_id" class="w-6/12">
                                <a-select-option
                                  v-for="item in item.specOptions"
                                  :key="item.id"
                                  :value="item.id"
                                  >{{ item.specs_name }}</a-select-option
                                >
                              </a-select>
                            </a-form-model-item>
                          </a-col>
                        </a-row>
                      </template>
                      <a-form-model-item
                        v-else-if="+item.award_type === 2"
                        class="mb-0"
                        prop="source_id"
                        :rules="{ required: true, message: '请选择' }"
                      >
                        <a-select
                          v-model="item.source_id"
                          class="w-full"
                          show-search
                          placeholder="券编号/名称"
                          :filter-option="false"
                          :not-found-content="fetching ? undefined : null"
                          @search="value => fetchCoupon(value, item)"
                        >
                          <a-spin
                            v-if="fetching"
                            slot="notFoundContent"
                            size="small"
                          />
                          <a-select-option
                            v-for="item in item.couponOptions"
                            :key="item.id"
                            :value="item.id"
                            >{{ item.coupon_name }}</a-select-option
                          >
                        </a-select>
                      </a-form-model-item>
                      <a-form-model-item
                        v-else-if="+item.award_type === 3"
                        class="mb-0"
                        prop="source_id"
                        :rules="{ required: true, message: '请选择' }"
                      >
                        <a-select
                          v-model="item.source_id"
                          class="w-full"
                          show-search
                          placeholder="券编号/名称"
                          :filter-option="false"
                          :not-found-content="fetching ? undefined : null"
                          @search="value => fetchShopCoupon(value, item)"
                        >
                          <a-spin
                            v-if="fetching"
                            slot="notFoundContent"
                            size="small"
                          />
                          <a-select-option
                            v-for="item in item.ShopCouponOptions"
                            :key="item.id"
                            :value="item.id"
                            >{{ item.coupon_name }}</a-select-option
                          >
                        </a-select>
                      </a-form-model-item>
                      <a-input v-else disabled value="--"></a-input>
                    </a-col>
                  </a-row>
                  <a-row type="flex" class="mt-3">
                    <a-col flex="100px">
                      <a-input
                        :disabled="true"
                        value="转盘文字"
                        style="width: 100px;"
                      ></a-input>
                    </a-col>
                    <a-col flex="1">
                      <a-form-model-item
                        class="mb-0"
                        prop="award_name"
                        :rules="{ required: true, message: '请输入' }"
                      >
                        <a-input
                          v-model="item.award_name"
                          class="w-full"
                        ></a-input>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
                </a-form-model>
              </td>
              <td class="ant-table-row-cell-break-word">
                <upload-image
                  v-model="item.img"
                  :maxLength="1"
                  :isOne="true"
                  :no-host="true"
                ></upload-image>
              </td>
              <td class="ant-table-row-cell-break-word">
                <a-radio-group
                  v-if="[1, 2, 3, 4].includes(+item.award_type)"
                  v-model="item.cash_type"
                >
                  <template v-if="+item.award_type !== 4">
                    <a-radio value="1">系统自动生成奖品</a-radio><br />
                  </template>
                  <a-radio value="2">联系工作人员兑奖</a-radio>
                </a-radio-group>
                <template v-else>--</template>
              </td>
              <td class="ant-table-row-cell-break-word text-center">
                <a-form-model
                  :ref="`rateForm${index}`"
                  :model="tableData[index]"
                  :validateOnRuleChange="true"
                >
                  <a-form-model-item
                    class="mb-0"
                    prop="winning_rate"
                    :rules="{ required: true, message: '请输入' }"
                  >
                    <a-input
                      v-model="item.winning_rate"
                      v-number-input="{ min: 0, max: 100, decimal: 2 }"
                      suffix="%"
                    />
                  </a-form-model-item>
                </a-form-model>
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
  goods_id: '',
  source_id: '',
  award_name: '',
  img: '',
  cash_type: '',
  winning_rate: undefined
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
    },
    infoData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      tableData: [],
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
      fetching: false,
      goodsOptions: [],
      specOptions: [],
      couponOptions: [],
      ShopCouponOptions: []
    }
  },
  watch: {
    data (newValue) {
      if (this.tableData != newValue) {
        this.tableData = this.setData(newValue)
      }
    },
    tableData: {
      handler () {
        this.$emit('tableChange')
      },
      deep: true
    }
  },
  created () {},
  methods: {
    fetchGoods (value, data) {
      const isNumber = /^\d+$/.test(value) && value.length > 0
      const isChinese = /[\u4e00-\u9fa5]/gm.test(value)
      if (!isNumber && !isChinese) {
        return
      }
      this.fetching = true
      getGoodsList({
        search: value
      }).then(({ list }) => {
        data.goodsOptions = list || []
        this.fetching = false
      })
    },
    fetchCoupon (value, data) {
      const isNumber = /^\d+$/.test(value) && value.length > 0
      const isChinese = /[\u4e00-\u9fa5]/gm.test(value)
      if (!isNumber && !isChinese) {
        return
      }
      this.fetching = true
      getCouponList({
        search: value
      }).then(({ list }) => {
        data.couponOptions = list || []
        this.fetching = false
      })
    },
    fetchShopCoupon (value, data) {
      const isNumber = /^\d+$/.test(value) && value.length > 0
      const isChinese = /[\u4e00-\u9fa5]/gm.test(value)
      if (!isNumber && !isChinese) {
        return
      }
      this.fetching = true
      getShopCouponList({
        search: value
      }).then(({ list }) => {
        data.ShopCouponOptions = list || []
        this.fetching = false
      })
    },
    setSpecification (value, row) {
      row.source_id = ''
      const data = row.goodsOptions.find(obj => obj.id === value)
      row.specOptions = data.specs_list || []
    },
    changeAwardType (data) {
      const type = +data.award_type
      if (type < 4) {
        data.cash_type = '1'
      } else if (type === 4) {
        data.cash_type = '2'
      } else {
        data.cash_type = undefined
      }
      data.goods_id = undefined
      data.source_id = undefined
      data.goodsOptions = []
      data.goodsOptions = []
      data.couponOptions = []
      data.ShopCouponOptions = []
    },
    add () {
      this.tableData.push(clonedeep(obj))
    },
    remove (index) {
      this.tableData.splice(index, 1)
    },
    validate () {
      const PrizeFormValidate = []
      this.tableData.forEach((obj, index) => {
        PrizeFormValidate.push(this.$refs[`awardForm${index}`][0].validate())
        PrizeFormValidate.push(this.$refs[`rateForm${index}`][0].validate())
      })
      return Promise.all(PrizeFormValidate)
    },
    setData (data) {
      return data.map(obj => {
        const type = +obj.award_type
        let options = {}
        if (type === 1) {
          options = {
            goodsOptions: [
              {
                id: obj.goods_id,
                goods_name: obj.goods_text,
                specs_list: [
                  {
                    id: obj.source_id,
                    specs_name: obj.source_text
                  }
                ]
              }
            ],
            specOptions: [
              {
                id: obj.source_id,
                specs_name: obj.source_text
              }
            ]
          }
        } else if (type === 2) {
          options = {
            couponOptions: [
              {
                id: obj.source_id,
                coupon_name: obj.source_text
              }
            ]
          }
        } else if (type === 3) {
          options = {
            ShopCouponOptions: [
              {
                id: obj.source_id,
                coupon_name: obj.source_text
              }
            ]
          }
        }
        return {
          ...options,
          ...obj
        }
      })
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
