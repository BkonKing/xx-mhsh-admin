<template>
  <page-header-wrapper>
    <div>
      <a-card :bordered="false" title="活动设置">
        <a-row>
          <a-col :sm="12" :xs="24">
            <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" @submit="handleSubmit">
              <a-form-item label="是否开启" help="开启并且处于活动时间内，活动才能生效">
                <a-switch @change="openChange" v-decorator="['is_open', { initialValue: activityInfo.is_open,valuePropName: 'checked' }]" />
              </a-form-item>
              <a-form-item label="活动时间">
                <a-range-picker
                  style="width: 100%"
                  @change="timeChage"
                  v-decorator="['activity_time', rangeConfig]"
                  show-time
                  format="YYYY-MM-DD HH:mm"
                />
                <!-- <a-input
                  v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                /> -->
              </a-form-item>
              <a-form-item label="活动标题">
                <div slot="extra" class="activity-tit">
                  <div>显示在活动入口、活动页面</div>
                  <div>{{ wordNum + '/15' }}</div>
                  <!-- <div>{{ wordNum }}</div> -->
                </div>
                <a-input
                  style="width: 100%"
                  :maxLength="15"
                  @change="handleNameChange"
                  v-decorator="[
                    'activity_title',
                    {initialValue: activityInfo.activity_name,rules: [{ required: true, message: '请输入活动标题' }]}
                  ]"
                  name="name"
                  placeholder="请输入" />
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
                <a-button :disabled="isUnable" type="primary" @click="handleSubmit">
                  提交
                </a-button>
              </a-form-item>
            </a-form>
          </a-col>
          <a-col v-if="activityInfo.img_url" :sm="12" :xs="24" style="text-align: right">
            <img @click="imgShow=true" width="232" height="232" :src="activityInfo.img_url" />
          </a-col>
        </a-row>
      </a-card>
      <a-card :bordered="false">
        <a-row>
          <a-col :sm="6" :xs="24">
            <info title="已发放" :value="numData.grant_total" :bordered="true" />
          </a-col>
          <a-col :sm="6" :xs="24">
            <info title="已核销" :value="numData.write_total" :bordered="true" />
          </a-col>
          <a-col :sm="6" :xs="24">
            <info title="已失效" :value="numData.invalid_total" :bordered="true" />
          </a-col>
          <a-col :sm="6" :xs="24">
            <info title="参与人数" :value="numData.user_total" />
          </a-col>
        </a-row>
      </a-card>
      <a-card class="search-card" :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-model-item label="活动场次">
                  <a-select v-model="queryParam.activity_id" placeholder="请选择">
                    <a-select-option v-for="item in sessionList" :key="item.id" :value="item.id">
                      {{ item.time }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="处理类型">
                  <a-select v-model="queryParam.handle_type" placeholder="请选择">
                    <a-select-option value="0">全部</a-select-option>
                    <a-select-option value="1">发放</a-select-option>
                    <a-select-option value="2">核销</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col> 
              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="处理时间">
                    <a-range-picker
                      showTime
                      class="piker-time"
                      :value="publicTime"
                      :placeholder="['开始时间', '结束时间']"
                      format="YYYY-MM-DD"
                      @change="getTime"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="所属项目">
                    <a-select v-model="queryParam.project_id" placeholder="请选择">
                      <a-select-option v-for="item in productList" :key="item.id" :value="item.id">
                        {{ item.project_name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="参与用户">
                    <a-input v-model="queryParam.join_user" placeholder="手机号、昵称、姓名、ID" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="处理人员">
                    <a-input v-model="queryParam.handle_user" placeholder="手机号、昵称、姓名、ID" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="积分状态">
                    <a-select v-model="queryParam.point_status" placeholder="请选择">
                      <a-select-option value="0">全部</a-select-option>
                      <a-select-option value="1">未核销--已核销=0</a-select-option>
                      <a-select-option value="2">已核销--已核销>0</a-select-option>
                      <a-select-option value="3">已失效--已失效>0</a-select-option>
                    </a-select>
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
        <s-table
          ref="table"
          size="default"
          rowKey="index"
          :columns="columns"
          :data="loadTableData"
        >
          <template slot="sessions" slot-scope="text, record">
            {{ record.activity_sessions_start }} <br /> {{ record.activity_sessions_end }}
          </template>
          <template slot="username" slot-scope="text, record">
            {{ record.join_nickname | getname(record.join_mobile) }}{{ record.join_realname&&record.join_realname!=null ? '('+ record.join_realname + ')' : '' }}<br /><span class="color-00025">{{ record.join_mobile }}</span>
          </template>
          <template slot="integral" slot-scope="text, record">
            {{ record.balance }}<br /><span class="color-00025">已发放{{ record.z_grant }} 已核销{{ record.z_write }} 已失效{{ record.z_invalid }}</span>
          </template>
          <template slot="handlusername" slot-scope="text, record">
            {{ record.handle_nickename | getname(record.handle_mobile) }}{{ record.handle_realname&&record.handle_realname!=null ? '('+ record.handle_realname + ')' : '' }}<br /><span class="color-00025">{{ record.handle_mobile }}</span>
          </template>
        </s-table>
      </a-card>
    </div>
    <a-modal
      width="460px"
      :visible="imgShow"
      class="cztx-modal"
      :footer="null"
      @cancel="imgShow = false"
    >
      <div><img width="400px" height="400px" :src="activityInfo.img_url" /></div>
    </a-modal>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import Info from './../components/Info'
import { getActivity, creatActivity, editActivity, getSessionList, getProductList, getActivityFlowList } from '@/api/operatingCenter'
const columns = [
  {
    title: '处理时间',
    dataIndex: 'ctime'
  },
  {
    title: '活动场次',
    dataIndex: 'activity_sessions_start',
    scopedSlots: { customRender: 'sessions' }
  },
  {
    title: '处理类型',
    dataIndex: 'handle_type'
  },
  {
    title: '积分',
    dataIndex: 'points'
  },
  {
    title: '参与用户',
    dataIndex: 'join_nickname',
    scopedSlots: { customRender: 'username' }
  },
  {
    title: '项目',
    dataIndex: 'project_name'
  },
  {
    title: '剩余积分',
    dataIndex: 'balance',
    sorter: true,
    scopedSlots: { customRender: 'integral' }
  },
  {
    title: '处理人员',
    dataIndex: 'handle_realname',
    scopedSlots: { customRender: 'handlusername' }
  }
]
export default {
  name: 'integralActivity',
  components: {
    STable,
    Info
  },
  data () {
    this.columns = columns
    return {
      form: this.$form.createForm(this,{onFieldsChange: (_, changedFields) => {
        this.formChage()
      }}),
      rangeConfig: {
        initialValue: ['', ''],
        rules: [{ type: 'array', required: true, message: '请选择活动时间' }],
      },
      initTime: [],
      activityId: '', // 活动id
      numData: '',
      activityInfo: {activity_name: ''}, // 活动详情
      initInfo: '', // 初始数据
      wordNum: 0,
      imgShow: false, // 二维码大图是否显示
      advanced: true, // 高级搜索 展开/关闭
      queryParam: { activity_id: undefined }, // 查询参数
      sessionList: [], // 活动场次
      productList: [], // 项目
      startTime: '',
      endTime: '', // 结束时间
      initOpen: 0, // 初始状态
      publicTime: ['', ''],
      isUnable: false
    }
  },
  computed: {
  },
  mounted () {
    this.getSessionList()
    this.getProductList()
    this.getActivity()
  },
  created () {
  },
  methods: {
    moment,
    formChage () {
      const nowV = this.form.getFieldsValue()
      const oldV = this.initInfo
      if (nowV.activity_title != oldV.activity_name || nowV.is_open != oldV.is_open || nowV.activity_time[0].format('YYYY-MM-DD HH:mm') != oldV.s_time || nowV.activity_time[1].format('YYYY-MM-DD HH:mm') != oldV.e_time) {
        console.log('!=')
        this.isUnable = false
      } else {
        console.log('==')
        this.isUnable = true
      }
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (err) {
          return
        }
        const rangeTimeValue = values['activity_time']
        console.log('00000')
        let flag = true
        flag = this.timeRules(rangeTimeValue[0].format('YYYY-MM-DD HH:mm'),this.endTime)
        if (!flag) return
        values.activity_time = rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss') + '~' + rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss')
        values.is_open = values.is_open && 1 || 0
        console.log(values)
        if (this.activityId) { // 编辑
          values.is_over = 0
          if (this.initOpen && !values.is_open) { //初始开启，点击了关闭
            const nowTime = moment().format("YYYY-MM-DD HH:mm:ss")
            values.is_over = 1
            if (this.activityInfo.status != 3) {
              values.activity_time = rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss') + '~' + nowTime
            }
          }
          editActivity(Object.assign({ activity_id: this.activityId }, values)).then(res => {
            this.activityCall(res.message, res.activity_id)
          }).catch(res => {
            console.log(res)
          })
        } else { // 添加
          creatActivity(Object.assign({}, values)).then(res => {
            this.activityCall(res.message, res.activity_id)
          }).catch(res => {
            console.log(res)
          })
        }
        
        console.log('Received values of form: ', values)
      })
    },
    activityCall (message, id) {
      this.getSessionList()
      this.$message.success(message)
      // this.activityId = id
      this.getActivity()
    },
    // 开启关闭状态改变
    openChange () {
      const that = this
      this.$nextTick(()=>{
        const openVal = this.form.getFieldValue('is_open')
        console.log('变化', openVal)
        if (!openVal && this.activityId && this.activityInfo.status == 1) {
          this.$confirm({
            title: '活动还在进行中',
            content: '关闭将会结束本次活动',
            cancelText: '取消',
            okText: '确定关闭',
            onOk() {
              console.log('OK');
            },
            onCancel() {
              that.activityInfo.is_open = true
              that.form.setFieldsValue({ is_open: true })
              console.log(that.activityInfo)
            }
          })
        }
      })
    },
    // 活动名称改变
    handleNameChange () {
      this.$nextTick(()=>{
        this.wordNum = this.form.getFieldValue('activity_title').length
      })
    },
    // 活动时间变动
    timeChage (dates, dateStrings) {
      console.log(dates, dateStrings)
      if (!dates.length) return
      // const nowTime = moment(new Date()).valueOf()
      const endTime = moment(dates[1]._d).valueOf()
      const startTime = dateStrings[0]
      this.endTime = endTime
      this.timeRules(dateStrings[0], endTime)
    },
    // 活动时间限制判断
    timeRules (startTime,endTime) {
      const nowTime = moment(new Date()).valueOf()
      if (endTime < nowTime) {
        this.$message.error('活动结束时间不能小于当前时间',1)
        setTimeout(() => {
          this.endTime = moment(this.initTime[1]._d).valueOf()
          this.form.setFieldsValue({ activity_time: this.initTime })
        })
        return false
      }
      console.log(this.startTime, startTime)
      if (this.initOpen && this.form.getFieldValue('is_open') && this.startTime != startTime) {
        setTimeout(() => {
          this.form.setFieldsValue({ activity_time: this.initTime })
        })
        this.$message.error('活动进行中,开始时间不能修改',1)
        return false
      } else {
        return true
      }
    },
    // 活动详情
    getActivity () {
      getActivity({ activity_id: this.activityId }).then(res => {
        if (res.data && res.data.length) {
          const infoData = res.data[0]
          this.isUnable = true
          this.activityInfo = infoData
          this.initInfo = infoData
          this.activityId = infoData.id
          this.initOpen = infoData.is_open
          this.queryParam.activity_id = infoData.id
          this.haveSession()
          this.activityInfo.activity_name = infoData.activity_name
          this.activityInfo.is_open = infoData.is_open && true || false
          this.rangeConfig.initialValue = [moment(new Date(infoData.s_time)),moment(new Date(infoData.e_time))]
          this.initTime = [moment(new Date(infoData.s_time)),moment(new Date(infoData.e_time))]
          this.startTime = infoData.s_time
          this.endTime = moment(new Date(infoData.e_time)).valueOf()
          this.$refs.table.refresh(true)
        } else {
          this.activityInfo.activity_name = '参与活动领积分'
        }
        this.handleNameChange()
      })
    },
    // 活动场次
    getSessionList () {
      getSessionList().then(res => {
        if (res.data.list.length) {
          let flag = 0
          res.data.list.map((item)=>{
            console.log(item)
            if(item.id == this.activityId) {
              flag = 1
            }
          })
          if(!flag) {
            this.queryParam.activity_id = undefined
          }
        }
        this.sessionList = res.data.list
      })
    },
    haveSession () {
      const list = this.sessionList
      if (list.length) {
        let flag = 0
        for (let i = 0; i < list.length; i++) {
          if (list[i].id == this.activityId) {
            flag = 1
            break
          }
        }
        if (!flag) {
          this.queryParam.activity_id = undefined
        }
      } else {
        this.queryParam.activity_id = undefined
      }
    },
    // 项目
    getProductList () {
      getProductList().then(res => {
        this.productList = res.data
      })
    },
    // 时间
    getTime (dates, dateStrings) {
      console.log(dates, dateStrings)
      this.publicTime = dates
      this.queryParam.handle_time = dateStrings[0] + '~' + dateStrings[1]
    },
    // 搜索收起/展开
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 重置
    reSet () {
      this.queryParam = {}
      this.publicTime = []
    },
    // 刷新表格数据
    loadAllData () {
      this.$refs.table.refresh(true)
    },
    // 刷新表格数据
    loadTableData (page) {
      console.log(this.queryParam, page)
      // if (!this.activityId) {
      //   return
      // }
      if (page.sortField) {
        this.queryParam.sort_field = page.sortField
        this.queryParam.sort_type = page.sortOrder == 'ascend' ? 'asc' : 'desc'
      } else {
        this.queryParam.sort_field = ''
        this.queryParam.sort_type = ''
      }
      const requestParameters = Object.assign({ activity_id: this.activityId }, this.queryParam, page)
      console.log('loadData request parameters:', requestParameters)
      return getActivityFlowList(requestParameters)
        .then(res => {
          this.numData = {
            grant_total: res.data.grant_total,
            write_total: res.data.write_total,
            invalid_total: res.data.invalid_total,
            user_total: res.data.user_total
          }
          return res
        })
    }
  },
  filters: {
    getname: function (val, mobile) {
      return val ? val : (mobile.substr(0,3) + '****' + mobile.substr(7))
    }
  }
}
</script>

<style scoped lang="less">
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
.activity-tit {
  display: flex;
  justify-content: space-between;
}
</style>
