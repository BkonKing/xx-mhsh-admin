<template>
  <page-header-wrapper>
    <template v-slot:extraContent>
      <div v-if="dataObj" class="extra-content">
        <div v-if="payStatu[0]" class="stat-item">
          <a-statistic :title="'水费余额('+dataObj.w_count+'户)'" :value="'￥' + dataObj.w_money | NumberFormat" />
        </div>
        <div v-if="payStatu[1]" class="stat-item">
          <a-statistic :title="'电费余额('+dataObj.e_count+'户)'" :value="'￥' + dataObj.e_money | NumberFormat" />
        </div>
        <div v-if="payStatu[2]" class="stat-item">
          <a-statistic :title="'燃气费('+dataObj.g_count+'户)'" :value="'￥' + dataObj.g_money | NumberFormat" />
        </div>
        <div v-if="payStatu[3]" class="stat-item">
          <a-statistic :title="'其他费用余额('+dataObj.o_count+'户)'" :value="'￥' + dataObj.o_money | NumberFormat" />
        </div>
      </div>
    </template>
    <div>
      <a-card class="search-card" :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-model-item label="区域">
                  <div style="display: flex;">
                    <a-select v-model="queryParam.building_id" placeholder="楼栋" default-value="0" @change="selectHouse" style="margin-right: 15px">
                      <a-select-option v-for="item in houseList" :key="item.id" :value="item.id">
                        {{ item.building_name }}
                      </a-select-option>
                    </a-select>
                    <a-select v-model="queryParam.unit_id" placeholder="单元" default-value="0">
                      <a-select-option v-for="item in unitList" :key="item.id" :value="item.id">
                        {{ item.unit_name }}
                      </a-select-option>
                    </a-select>
                  </div>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="搜索">
                  <a-input v-model="queryParam.search" placeholder="业主姓名/电话" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <template v-if="advanced">
                <!-- <a-col :md="8" :sm="24">
                  <a-form-model-item label="余额">
                    <div style="display: flex;">
                      <a-input v-model="queryParam.search" placeholder="最低金额" style="width: 100%" />
                      <div style="padding: 0 8px;">—</div>
                      <a-input v-model="queryParam.search" placeholder="最高金额" style="width: 100%" />
                    </div>
                  </a-form-model-item>
                </a-col> -->
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="是否欠费">
                    <div>
                      <a-select v-model="queryParam.qf_type" placeholder="请选择" default-value="0">
                        <a-select-option value="1">欠费</a-select-option>
                        <a-select-option value="2">无</a-select-option>
                      </a-select>
                    </div>
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="上次充缴" prop="releaseDate">
                    <a-range-picker
                      showTime
                      class="piker-time"
                      :value="publishDate"
                      :placeholder="['开始时间', '结束时间']"
                      format="YYYY-MM-DD"
                      @change="getTime"
                    />
                  </a-form-model-item>
                </a-col>
              </template>
              <a-col :md="!advanced && 8 || 16" :sm="24">
                <span class="table-page-search-submitButtons" style="float: right; overflow: hidden">
                  <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                  <a-button style="margin-left: 8px" @click="reSet">重置</a-button>
                  <a @click="toggleAdvanced" style="margin-left: 8px">
                    {{ advanced ? '收起' : '展开' }}
                    <a-icon :type="advanced ? 'up' : 'down'"/>
                  </a>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-card>
      <a-card>
        <div class="table-operator">
          <a-button type="default" @click="importShow"><a-icon type="import" />导入文件</a-button>
        </div>
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          class="table-box"
          :columns="columns"
          :data="loadTableData"
        >
          <template slot="tablekey" slot-scope="text, record, index">{{ indexSize + (index + 1) }}</template>
          <span slot="house" slot-scope="text, record">
            {{ text + '-' + record.unit_name + '-' + record.house_name }}
          </span>
          <span slot="watertit">水费余额
            <a-popover overlayClassName="popover-toast">
              <template slot="content">
                余额（-欠费金额）
              </template>
              <a-icon type="exclamation-circle" />
            </a-popover>
          </span>
          <span slot="water" slot-scope="text, record">
            <span :class="[record.w_money < 0 ? 'color-red' : '']">{{ record.w_money }}</span>
            <template v-if="record.w_qf_money > 0">（<span class="color-red">-{{ record.w_qf_money }}</span>）</template>
          </span>
          <span slot="electricity" slot-scope="text, record">
            <span :class="[record.e_money < 0 ? 'color-red' : '']">{{ record.e_money }}</span>
            <template v-if="record.e_qf_money > 0">（<span class="color-red">-{{ record.e_qf_money }}</span>）</template>
          </span>
          <span slot="gas" slot-scope="text, record">
            <span :class="[record.g_money < 0 ? 'color-red' : '']">{{ record.g_money }}</span>
            <template v-if="record.g_qf_money > 0">（<span class="color-red">-{{ record.g_qf_money }}</span>）</template>
          </span>
          <span slot="other" slot-scope="text, record">
            <span :class="[record.o_money < 0 ? 'color-red' : '']">{{ record.o_money }}</span>
            <template v-if="record.q_qf_money > 0">（<span class="color-red">-{{ record.q_qf_money }}</span>）</template>
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="goDetail(record.id)">查看</a>
              <a-divider type="vertical" />
              <a @click="investModal(record)">充值</a>
            </template>
          </span>
          <template slot="user" slot-scope="text, record">
            {{ record.realname }}<br />{{ record.mobile }}
          </template>
        </s-table>
      </a-card>
      <recharge-money ref="recharge" :modalShow.sync="modalShow" :params="params" @rechargeCall="rechargeCall"></recharge-money>
      <a-modal
        title="导入文件"
        :visible="importModal"
        okText="保存"
        @ok="importFile"
        @cancel="importModal=false"
        :destroyOnClose='true'
      >
        <a-form
          class="form-file"
          :labelCol="{lg: {span: 5}, sm: {span: 5}}"
          :wrapperCol="{lg: {span: 18}, sm: {span: 18} }"
          >
          <a-form-model-item label="选择文件" :required="true" :help="helpMessage" :validateStatus="validateStatus">
            <a-input id="upload" type="file" @change="uploadFile" style="width: 100%" />
            <label for="upload" class="file-box">
              <div class="file-name">{{ fileUrl.name }}</div>
              <div class="file-size"><span>{{ fileSize }}</span>/10MB</div>
              <div class="file-icon"><a-icon type="file" /></div>
            </label>
          </a-form-model-item>
          <a-form-model-item :wrapperCol="{lg: {push: 5,span: 18}, sm: {push: 5,span: 18} }">
            <a-button @click="downFile" type="default"><a-icon type="download" />下载模板</a-button>
            <!-- <a href="http://develop.mhshjy.com/library/mb/mb_billEntry.xlsx" type="default"><a-icon type="download" />下载模板</a> -->
          </a-form-model-item>
        </a-form>
      </a-modal>
    </div>
  </page-header-wrapper>
</template>

<script>
// import moment from 'moment'
import { STable } from '@/components'
import { getBuildList, getUnitList, getBalanceList, importData, getPayType } from '@/api/property'
import rechargeMoney from './components/rechargeMoney'
const columns = [
  {
    title: '序号',
    scopedSlots: { customRender: 'tablekey' }
  },
  {
    title: '房产',
    dataIndex: 'building_name',
    scopedSlots: { customRender: 'house' }
  },
  {
    slots: { title: 'watertit' },
    scopedSlots: { customRender: 'water' },
    dataIndex: 'w_money',
    sorter: true
  },
  {
    title: '电费余额',
    scopedSlots: { customRender: 'electricity' },
    dataIndex: 'e_money',
    sorter: true
  },
  {
    title: '燃气费余额',
    scopedSlots: { customRender: 'gas' },
    dataIndex: 'g_money',
    sorter: true
  },
  {
    title: '其他费用余额',
    scopedSlots: { customRender: 'other' },
    dataIndex: 'o_money',
    sorter: true
  },
  {
    title: '业主',
    dataIndex: 'realname',
    scopedSlots: { customRender: 'user' }
  },
  {
    title: '上次充缴',
    dataIndex: 'pay_time',
    sorter: true
  },
  {
    title: '充缴次数',
    dataIndex: 'cj_count',
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'balanceManage',
  components: {
    STable,
    rechargeMoney
  },
  data () {
    // this.columns = columns
    return {
      payStatu: '',
      columns: columns,
      tabList: [
        { key: '0', tab: '全部' },
        { key: '1', tab: '已成功' },
        { key: '2', tab: '已取消' }
      ],
      productList: [
        { id: 0, name: '请选择' },
        { id: 1, name: '全部' },
        { id: 2, name: '已成功' }
      ],
      statusList: [
        { id: 0, name: '请选择' },
        { id: 1, name: '全部' },
        { id: 2, name: '取消付款' }
      ],
      publishDate: [],
      importModal: false, // 导入弹窗
      fileUrl: '',
      fileSize: 0,
      modalShow: false, // 充值余额弹窗
      advanced: false, // 高级搜索 展开/关闭
      queryParam: {}, // 查询参数
      params: {}, // 充值弹窗参数
      dataObj: {},
      houseList: [], // 楼栋
      unitList: [], // 单元
      helpMessage: '',
      indexSize: 0,
      validateStatus: 'validating' // 导入文件验证
    }
  },
  mounted () {
    this.getBuildList()
    this.getUnitList()
    this.getPayType()
  },
  methods: {
    // 楼栋
    getBuildList () {
      getBuildList().then(res => {
        this.houseList = res.data.list
      })
    },
    // 单元
    getUnitList () {
      getUnitList({ building_id: this.queryParam.building_id }).then(res => {
        this.unitList = res.data.list
      })
    },
    // 缴费状态
    getPayType () {
      getPayType().then(res => {
        const arr = []
        for (const key in res.data) {
          arr.push(res.data[key])
        }
        this.payStatu = arr
        this.$refs.table.refresh(true)
      })
    },
    // 选择楼栋
    selectHouse () {
      delete this.queryParam.unit_id
      this.getUnitList()
    },
    getTime (dates, dateStrings) {
      this.publishDate = dates
      this.queryParam.start_time = dateStrings[0]
      this.queryParam.end_time = dateStrings[1] + ' 23:59:59'
    },
    // 上传文件
    uploadFile (e) {
      const _this = e.target.files[0]
      this.fileSize = (_this.size / 1024 / 1024).toFixed(3)
      this.fileUrl = _this
      this.helpMessage = ''
      this.validateStatus = 'validating'
    },
    // 下载模板
    downFile () {
      location.href = 'https://test.tosolomo.com/library/mb/mb_balance.xlsx'
    },
    // 显示导入弹窗
    importShow () {
      this.fileUrl = ''
      this.fileSize = 0
      this.importModal = true
    },
    // 导入提交
    importFile () {
      console.log(this.fileUrl)
      if (!this.fileUrl) {
        this.helpMessage = '请选择文件'
        this.validateStatus = 'error'
        return
      }
      const data = new FormData()
      data.append('housefile', this.fileUrl)
      importData(data).then(res => {
        this.importModal = false
        this.$refs.table.refresh(true)
        this.$success({
          okText: '确定',
          title: res.message,
          content: res.txt
        })
      })
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 重置
    reSet () {
      this.queryParam = {}
      this.publishDate = []
    },
    // 刷新表格数据
    loadTableData (page) {
      console.log('page', page)
      this.indexSize = (page.pageindex - 1) * page.pagesize
      if (page.sortOrder) {
        page.sortOrder = page.sortOrder == 'ascend' ? 'asc' : 'desc'
      }
      if (!this.payStatu) {
        return []
      }
      // console.log(this.queryParam, page)
      const requestParameters = Object.assign(this.queryParam, page)
      console.log('loadData request parameters:', requestParameters)
      return getBalanceList(requestParameters)
        .then(res => {
          if (columns.length == 10) {
            this.columns = columns
            if (!this.payStatu[3]) {
              this.columns.splice(5, 1)
            }
            if (!this.payStatu[2]) {
              this.columns.splice(4, 1)
            }
            if (!this.payStatu[1]) {
              this.columns.splice(3, 1)
            }
            if (!this.payStatu[0]) {
              this.columns.splice(2, 1)
            }
          }
          // this.columns.splice(1, 1) // 隐藏第二列
          this.dataObj = res.tab_data
          return res
        })
    },
    // 充值
    investModal (item) {
      this.params = {
        expenses_house_id: item.id
      }
      this.$nextTick(() => {
        this.$refs.recharge.getData()
      })
      this.modalShow = true
    },
    // 充值成功回调
    rechargeCall () {
      this.$refs.table.refresh(true)
      this.modalShow = false
    },
    goDetail (id) {
      this.$router.push({
        path: '/property/lifePay/balanceDetail',
        query: {
          houseId: id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../styles/Workplace.less";
.table-page-search-wrapper {
  /deep/ .ant-form-item-label {
    min-width: 88px;
  }
  .piker-time {
    width: 100% !important;
  }
}
.ant-card {
  margin-bottom: 24px;
}

.form-file {
  /deep/ .ant-form-item-children {
    display: block;
  }
  #upload {
    opacity: 0;
  }
}
.file-box {
  position: absolute;
  display: flex;
  top: 1px;
  left: 1px;
  bottom: 1px;
  right: 1px;
  border-radius: 5px;
  z-index: 5;
  background-color: #fff;
  margin-bottom: 0;
  border: 1px solid #d9d9d9;
  border-radius: 0;
  .file-name {
    width: 65%;color: #ccc;flex-grow: 1;display: flex;align-items: center;padding-left: 10px;
  }
  .file-size,.file-icon,.flex-shrink {
    flex-shrink: 0;
  }
  .file-size {
    width: 70px;color: #e4e4e4;display: flex;align-items: center;justify-content: flex-end;
  }
  .file-icon {
    width: 25px;display: flex;align-items: center;justify-content: center;font-size: 14px;color: #e4e4e4;
  }
  .file-box div {
    height: 100%;font-weight: normal;
  }
}
</style>
