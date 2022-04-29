<template>
  <div>
    <a-card :bordered="false">
      <a-row v-if="isPrize">
        <a-col span="8">
          <detail-info title="中奖" :value="lotteryNum" :bordered="true">
          </detail-info>
        </a-col>
        <a-col span="8">
          <detail-info
            title="已兑奖品"
            :value="lotteryNum1"
            :bordered="true"
          ></detail-info>
        </a-col>
        <a-col span="8">
          <detail-info title="未兑奖品" :value="lotteryNum2"></detail-info>
        </a-col>
      </a-row>
      <a-row v-else>
        <a-col span="8">
          <detail-info title="参与抽奖" :value="lotteryNum" :bordered="true">
          </detail-info>
        </a-col>
        <a-col span="8">
          <detail-info
            title="已中奖"
            :value="lotteryNum1"
            :bordered="true"
          ></detail-info>
        </a-col>
        <a-col span="8">
          <detail-info title="未中奖" :value="lotteryNum2"></detail-info>
        </a-col>
      </a-row>
    </a-card>
    <a-card class="mt-6" :title="cardTitle" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="用户">
                <a-input
                  v-model="queryParam.user_text"
                  placeholder="ID、昵称、姓名、手机号"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col v-if="!isPrize" :md="8" :sm="24">
              <a-form-item label="是否中奖">
                <a-select v-model="queryParam.is_select" placeholder="请选择">
                  <a-select-option value="1">
                    中奖
                  </a-select-option>
                  <a-select-option value="0">
                    未中奖
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="奖品名称">
                <a-input
                  v-model="queryParam.award_name"
                  placeholder="请输入"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="兑奖方式">
                <a-select v-model="queryParam.cash_type" placeholder="请选择">
                  <a-select-option value="1">
                    系统自动生成
                  </a-select-option>
                  <a-select-option value="2">
                    联系工作人员
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="兑换状态">
                <a-select v-model="queryParam.is_convert" placeholder="请选择">
                  <a-select-option value="1">
                    已兑换
                  </a-select-option>
                  <a-select-option value="0">
                    未兑换
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item :label="isPrize ? '兑奖时间' : '抽奖时间'">
                <a-range-picker
                  v-model="queryParam.time"
                  valueFormat="YYYY-MM-DD HH:mm:ss"
                  :show-time="{ defaultValue: [defaultTime, defaultEndTime] }"
                  :placeholder="['开始时间', '结束时间']"
                  style="width: 100%;"
                />
              </a-form-item>
            </a-col>
            <advanced-form
              :md="isPrize ? 8 : 24"
              :isAdvanced="false"
              @reset="reset"
              @search="refresh"
            ></advanced-form>
          </a-row>
        </a-form>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :sortKey="{ ascend: 'asc', descend: 'desc' }"
        :data="loadData"
        :showPagination="true"
      >
        <span class="table-action" slot="action" slot-scope="text, record">
          <a v-if="+record.cash_type === 2" @click="openEdit(record)">编辑</a>
        </span>
      </s-table>
    </a-card>
    <a-modal
      v-model="editConvertVisible"
      title="编辑"
      :width="400"
      :destroyOnClose="true"
      @ok="setEditConvert"
    >
      <a-form-model
        ref="validTimeForm"
        :model="editConvertForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item class="mb-0" prop="is_convert" label="兑奖状态">
          <a-radio-group v-model="editConvertForm.is_convert">
            <a-radio value="0">未兑奖</a-radio>
            <a-radio value="1">已兑奖</a-radio>
          </a-radio-group>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import cloneDeep from 'lodash.clonedeep'
import { mapGetters } from 'vuex'
import { DetailInfo, STable, AdvancedForm } from '@/components'
import { getLotteryTabData, getLotteryLogList, editLotteryStatus } from '@/api/operatingCenter/lottery'

export default {
  name: 'recordTab',
  components: {
    DetailInfo,
    STable,
    AdvancedForm
  },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['userUrl', 'isParentProject']),
    baseUrl () {
      return this.isParentProject ? '/zht' : '/xmht'
    },
    isPrize () {
      return this.type === '2'
    },
    cardTitle () {
      return this.isPrize ? '兑奖记录' : ''
    },
    lotteryNum () {
      const num = this.infoData.inviter_num
      const num1 = this.infoData.share_num
      // eslint-disable-next-line no-irregular-whitespace
      return `${num || 0}人　${num1 || 0}次`
    },
    lotteryNum1 () {
      const num = this.infoData.inviter_num
      const num1 = this.infoData.share_num
      // eslint-disable-next-line no-irregular-whitespace
      return `${num || 0}人　${num1 || 0}次`
    },
    lotteryNum2 () {
      const num = this.infoData.inviter_num
      const num1 = this.infoData.share_num
      // eslint-disable-next-line no-irregular-whitespace
      return `${num || 0}人　${num1 || 0}次`
    }
  },
  data () {
    return {
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      defaultEndTime: moment('23:59:59', 'HH:mm:ss'),
      labelCol: { lg: { span: 6 }, sm: { span: 6 } },
      wrapperCol: { lg: { span: 18 }, sm: { span: 18 } },
      infoData: {},
      queryParam: {},
      columns: [
        {
          title: '抽奖时间',
          dataIndex: 'ctime'
        },
        {
          title: '用户昵称',
          dataIndex: 'nickname',
          customRender: text => {
            return <div class="two-Multi">{text}</div>
          }
        },
        {
          title: '姓名/手机号',
          dataIndex: 'realname',
          customRender: (text, row) => {
            return (
              <a href={`${this.userUrl}?uid=uid`} target="_blank">
                <div>{text}</div>
                <div>{row.mobile}</div>
              </a>
            )
          }
        },
        {
          title: '兑奖方式',
          dataIndex: 'cash_type_name'
        },
        {
          title: '奖品',
          dataIndex: 'award_type',
          customRender: (text, row) => {
            const {
              award_name: awardName,
              source_text: sourceText,
              source_id: sourceId
            } = row
            if ([1, 2, 3].includes(+text)) {
              const source = sourceId ? <a>{sourceText}</a> : ''
              return (
                <div>
                  <div>{awardName}</div>
                  {source}
                </div>
              )
            } else {
              return '--'
            }
          }
        },
        {
          title: '兑奖状态',
          dataIndex: 'is_convert_name',
          customRender: (text, row) => {
            const {
              is_convert: isConvert,
              cash_type: cashType,
              order_project_id: orderId,
              examine_type: examineType,
              prize_text: prizeText,
              examine_admin_id: examineUid
            } = row
            let info = ''
            if (+isConvert) {
              if (+cashType === 1) {
                const href = `${this.baseUrl}/life/orderProject/getOrderProjectList?project_id=${orderId}`
                info = (
                  <a href={href} target="_blank">
                    {prizeText}
                  </a>
                )
              } else if (+cashType === 2) {
                if (+examineType === 1) {
                  info = (
                    <div>
                      APP扫码核销
                      <a href={`${this.userUrl}?uid=${examineUid}`}>
                        {prizeText}
                      </a>
                    </div>
                  )
                } else {
                  info = <div>{prizeText}</div>
                }
              }
            }

            return (
              <div>
                <div>{text}</div>
                {info}
              </div>
            )
          }
        }
      ],
      lotteryColumns: [
        {
          title: '抽奖消耗',
          dataIndex: 'consume'
        },
        {
          title: '是否中奖',
          dataIndex: 'is_select_name'
        }
      ],
      prizeColumns: [
        {
          title: '兑奖时间',
          dataIndex: 'etime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const params = cloneDeep(this.queryParam)
        const time = params.time
        if (time && time.length) {
          params.s_ctime = time[0]
          params.e_ctime = time[1]
        }
        return getLotteryLogList({
          ...parameter,
          ...params,
          page_type: this.isPrize ? 1 : 0
        })
      },
      editConvertVisible: false,
      editConvertForm: {
        award_log_id: '',
        is_convert: ''
      }
    }
  },
  created () {
    this.isPrize
      ? this.columns.splice(6, 0, ...this.prizeColumns)
      : this.columns.splice(3, 0, ...this.lotteryColumns)
  },
  methods: {
    async getLotteryTabData () {
      const { tab_data: data } = await getLotteryTabData()
      this.infoData = data
    },
    reset () {},
    refresh () {},
    search () {},
    openEdit ({ award_log_id, is_convert }) {
      this.editConvertForm = {
        award_log_id,
        is_convert: is_convert || '1'
      }
      this.editConvertVisible = true
    },
    async setEditConvert () {
      const { success } = await editLotteryStatus(this.editConvertForm)
      if (success) {
        this.$message.success('提交成功')
        this.editConvertVisible = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.table-page-search-wrapper
  /deep/
  .ant-form-inline
  .ant-form-item
  > .ant-form-item-label {
  min-width: 80px;
  flex-shrink: 0;
}
</style>
