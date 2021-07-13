<template>
  <div class="complainCheck">
    <a-card class="card">
      <div class="title">任务</div>
      <div class="content">
        <div class="top">
          <div class="left">任务审核：</div>
          <div class="right">
            <a-switch
              style="marginLeft:10px"
              :disabled="true"
              default-checked
            />
            <div class="txt">
              开启后任务需进行人工审核，审核通过后APP才显示
            </div>
          </div>
        </div>
        <div class="mid">
          <div class="left">
            审核时间：
          </div>
          <div class="right">
            <div class="t1">
              <a-input
                style="width:87px"
                v-model="check_time"
                onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              ></a-input>
              <span style="marginLeft:6px">小时内</span>
            </div>
            <div class="t2">
              任务及提问的人工审核需在设置时间内进行审核处理，超时则预警
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            任务方处理：
          </div>
          <div class="right">
            <div class="t1">
              <a-input
                style="width:87px"
                v-model="handle_time"
                onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              ></a-input>
              <span style="marginLeft:6px">小时内</span>
            </div>
            <div class="t2">
              任务方确认任务是否完成、任务超时是否延期，需在设置时间内进行处理，超时则APP、短信提醒
            </div>
          </div>
        </div>
        <div class="btn">
          <a-button
type="primary"
:disabled="cardBol"
@click="taskSubmit"
            >提交</a-button
          >
        </div>
      </div>
    </a-card>
    <a-card class="card2">
      <div class="title">提问</div>
      <div class="content">
        <div class="top">
          <div class="left">提问审核：</div>
          <div class="right">
            <a-switch
              v-model="ask_check"
              style="marginLeft:10px"
              default-checked
            />
            <div class="txt">
              开启后提问及提问回复都需进行人工审核，审核通过后APP才显示
            </div>
          </div>
        </div>
        <div class="mid">
          <div class="left">
            审核时间：
          </div>
          <div class="right">
            <div class="t1">
              <a-input
                style="width:87px"
                v-model="check_time2"
                onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              ></a-input>
              <span style="marginLeft:6px">小时内</span>
            </div>
            <div class="t2">
              提问及提问回复的人工审核需在设置时间内进行审核处理，超出则为超时
            </div>
          </div>
        </div>
        <div class="btn">
          <a-button
type="primary"
:disabled="card2Bol"
@click="askQuestion"
            >提交</a-button
          >
        </div>
      </div>
    </a-card>
    <a-card class="card3">
      <div class="title">投诉</div>
      <div class="content">
        <div class="mid">
          <div class="left">
            处理时间：
          </div>
          <div class="right">
            <div class="t1">
              <a-input
                style="width:87px"
                v-model="complaint_time"
                onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              ></a-input>
              <span style="marginLeft:6px">小时内</span>
            </div>
            <div class="t2">
              任务、提问及提问回复的投诉，需在设置时间内进行处理回复，超时则预警
            </div>
          </div>
        </div>
        <div class="btn">
          <a-button
type="primary"
:disabled="card3Bol"
@click="complain"
            >提交</a-button
          >
        </div>
      </div>
    </a-card>
    <a-card class="card4">
      <div class="title">
        任务投诉/违规类型
      </div>
      <div class="content">
        <div class="left">投诉/违规类型：</div>
        <div class="right">
          <div class="item" v-for="(item, index) in arr" :key="item.id">
            <a-input
              :maxLength="30"
              v-model="item.complaint_type"
              placeholder="类型"
              style="width:302px"
            ></a-input>
            <a-input
              :maxLength="30"
              v-model="item.order_sort"
              placeholder="排序"
              style="width:128px"
            ></a-input>
            <a-icon class="plus" type="plus" @click="addTaskComplain" />
            <a-icon
              class="close"
              type="close"
              @click="delTaskComplain(item,index)"
            />
          </div>
          <div class="btn">
            <a-button
type="primary"
:disabled="card4Bol"
@click="taskComplain"
              >提交</a-button
            >
          </div>
        </div>
      </div>
    </a-card>
    <a-card class="card5">
      <div class="title">
        提问投诉/违规类型
      </div>
      <div class="content">
        <div class="left">投诉/违规类型：</div>
        <div class="right">
          <div class="item" v-for="(item, index) in arr2" :key="item.id">
            <a-input
              :maxLength="30"
              v-model="item.complaint_type"
              placeholder="类型"
              style="width:302px"
            ></a-input>
            <a-input
              :maxLength="30"
              v-model="item.order_sort"
              placeholder="排序"
              style="width:128px"
            ></a-input>
            <a-icon class="plus" type="plus" @click="addAskComplain" />
            <a-icon class="close" type="close" @click="delAskComplain(item,index)" />
          </div>
          <div class="btn">
            <a-button
type="primary"
:disabled="card5Bol"
@click="askComplain"
              >提交</a-button
            >
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import {
  setTaskSet,
  gainGetTaskSet,
  toSetQuestion,
  gainGetBasic,
  toSetComplaint,
  toSetComplaintType,
  gainGetComplaintType,
  toUpdateComlaintType
} from '@/api/taskCentre'
export default {
  data () {
    return {
      check_time: 24, // 审核时间
      handle_time: 24, // 任务方处理时效
      check_time2: 24, // 审核时间2
      ask_check: true, // 是否开启提问审核 0位开启 1开启
      cardBol: true,
      card2Bol: true,
      complaint_time: 24, // 投诉处理时效
      card3Bol: true,
      arr: [{ id: 0, complaint_type: '', order_sort: '' }], // 任务投诉列表
      arr2: [{ id: 0, complaint_type: '', order_sort: '' }], // 提问投诉列表
      card4Bol: true,
      card5Bol: true,
      taskComplainIds: [],
      askComplainIds: []
    }
  },
  watch: {
    check_time () {
      this.cardBol = false
    },
    handle_time () {
      this.cardBol = false
    },
    check_time2 () {
      this.card2Bol = false
    },
    ask_check () {
      this.card2Bol = false
    },
    complaint_time () {
      this.card3Bol = false
    },
    arr: {
      handler () {
        this.card4Bol = false
      },
      deep: true
    },
    arr2: {
      handler () {
        this.card5Bol = false
      },
      deep: true
    }
  },
  methods: {
    async getAskComplaintTypeList () {
      // 获取提问投诉列表
      const res4 = await gainGetComplaintType({
        type: 2
      })
      this.arr2 = res4.list
      if (res4.list.length === 0) {
        this.arr2 = [{ id: 0, complaint_type: '', order_sort: '' }]
      }
      this.$nextTick(() => {
        this.card5Bol = true
      })
    // console.log('获取任务投诉列表', res4)
    },
    // 获取任务投诉列表
    async getTaskComplaintTypeList () {
      const res3 = await gainGetComplaintType({
        type: 1
      })
      this.arr = res3.list
      if (res3.list.length === 0) {
        this.arr = [
          { id: 0, complaint_type: '', order_sort: '' }
        ]
      }
      this.$nextTick(() => {
        this.card4Bol = true
      })
      // console.log('获取任务投诉列表', res3)
    },
    // 提问投诉提交
    async askComplain () {
      if (this.askComplainIds.length > 0) {
        toUpdateComlaintType({ ids: this.askComplainIds, update_field: 'is_del', update_value: 1 })
      }
      const arrTest = this.arr2.map(item => {
        if (item.complaint_type != '') {
          return {
            id: +item.id,
            complaint_type: item.complaint_type,
            sort: +item.order_sort
          }
        }
      })
      const list = arrTest.filter(item => {
        return item != undefined
      })
      // console.log('提问投诉', list)
      await toSetComplaintType({
        type_list: list,
        type: 2
      })
      // console.log('提问投诉提交', res)
      this.getAskComplaintTypeList()
      this.card5Bol = true
      this.$message.success('提交成功')
    },
    // 添加
    addAskComplain () {
      this.arr2.push({
        id: 0,
        complaint_type: '',
        order_sort: ''
      })
    },
    // 删除提问投诉
    delAskComplain (item, index) {
      // console.log(index)
      this.askComplainIds.push(+item.id)
      if (this.arr2.length === 1) {
        this.arr2 = [
          {
            id: 0,
            complaint_type: '',
            order_sort: ''
          }
        ]
        return
      }
      this.arr2.splice(index, 1)
    },
    // 任务投诉提交
    async taskComplain () {
      if (this.taskComplainIds.length > 0) {
        toUpdateComlaintType({ ids: this.taskComplainIds, update_field: 'is_del', update_value: 1 })
      }
      const arrTest = this.arr.map(item => {
        if (item.complaint_type != '') {
          return {
            id: +item.id,
            complaint_type: item.complaint_type,
            sort: +item.order_sort
          }
        }
      })
      const list = arrTest.filter(item => {
        return item != undefined
      })
      // console.log('任务投诉提交', list)
      await toSetComplaintType({
        type_list: list,
        type: 1
      })
      // console.log('任务投诉提交', res)
      this.card4Bol = true
      this.getTaskComplaintTypeList()
      this.$message.success('提交成功')
    },
    // 添加任务投诉
    addTaskComplain () {
      this.arr.push({
        id: 0,
        complaint_type: '',
        order_sort: ''
      })
    },
    // 删除任务投诉
    delTaskComplain (item, index) {
      // console.log(index)
      this.taskComplainIds.push(+item.id)
      if (this.arr.length === 1) {
        this.arr = [
          { id: 0, complaint_type: '', order_sort: '' }
        ]
        return
      }
      this.arr.splice(index, 1)
    },
    // 投诉提交
    async complain () {
      await toSetComplaint({
        complaint_time: +this.complaint_time
      })
      // console.log('投诉提交', res)
      this.card3Bol = true
      this.$message.success('提交成功')
    },
    // 提问提交
    async askQuestion () {
      await toSetQuestion({
        ask_check: this.ask_check === true ? 1 : 0,
        check_time: +this.check_time2
      })
      // console.log('提问提交', res)
      this.card2Bol = true
      this.$message.success('提交成功')
    },
    // 任务提交
    async taskSubmit () {
      await setTaskSet({
        check_open: 1,
        check_time: +this.check_time,
        handle_time: +this.handle_time
      })
      // console.log('任务提交', res)
      this.cardBol = true
      this.$message.success('提交成功')
    }
  },
  async created () {
    // 投诉审核-获取任务设置信息
    const res = await gainGetTaskSet()
    this.check_time = res.data.check_handle
    this.handle_time = res.data.task_handle
    // console.log('获取任务设置信息', res)
    // 获取基础设置信息
    const res2 = await gainGetBasic()
    this.check_time2 = res2.data.ask_check_handle
    this.ask_check =
      res2.data.ask_check === 1 ? res2.data.ask_check === 1 : false
    this.complaint_time = res2.data.complaint_handle
    // console.log('获取基础设置信息', res2)
    this.getTaskComplaintTypeList()
    this.getAskComplaintTypeList()
    this.$nextTick(() => {
      this.cardBol = true
      this.card2Bol = true
      this.card3Bol = true
      this.card5Bol = true
    })
  }
}
</script>

<style lang="less" scoped>
.complainCheck {
  .card {
    margin-top: 20px;
    /deep/ .ant-card-body {
      padding: 0;
    }
    .title {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;
      font-family: PingFangSC-Semibold, "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847);
      border-bottom: 1px solid rgb(233, 233, 233);
    }
    .content {
      margin-left: 32px;
      padding: 30px;
      .top {
        display: flex;
        .left {
          min-width: 70px;
        }
        .right {
          flex: 1;
          .txt {
            margin-top: 10px;
            margin-left: 10px;
            font-family: "MicrosoftYaHei", "Microsoft YaHei";
            font-weight: 400;
            font-style: normal;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.447058823529412);
          }
        }
      }
      .mid {
        margin-top: 15px;
        display: flex;
        .left {
          min-width: 70px;
          line-height: 32px;
        }
        .right {
          flex: 1;
          .t2 {
            margin-top: 10px;
            font-family: "MicrosoftYaHei", "Microsoft YaHei";
            font-weight: 400;
            font-style: normal;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.447058823529412);
          }
        }
      }
      .bottom {
        margin-top: 15px;
        display: flex;
        .left {
          margin-left: -14px;
          // width: 100px;
          line-height: 32px;
        }
        .right {
          flex: 1;
          .t2 {
            margin-top: 10px;
            font-family: "MicrosoftYaHei", "Microsoft YaHei";
            font-weight: 400;
            font-style: normal;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.447058823529412);
          }
        }
      }
      .btn {
        margin-left: 70px;
        margin-top: 20px;
      }
    }
  }
  .card2 {
    margin-top: 20px;
    /deep/ .ant-card-body {
      padding: 0;
    }
    .title {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;
      font-family: PingFangSC-Semibold, "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847);
      border-bottom: 1px solid rgb(233, 233, 233);
    }
    .content {
      margin-left: 32px;
      padding: 30px;
      .top {
        display: flex;
        .left {
          min-width: 70px;
        }
        .right {
          flex: 1;
          .txt {
            margin-top: 10px;
            margin-left: 10px;
            font-family: "MicrosoftYaHei", "Microsoft YaHei";
            font-weight: 400;
            font-style: normal;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.447058823529412);
          }
        }
      }
      .mid {
        margin-top: 15px;
        display: flex;
        .left {
          min-width: 70px;
          line-height: 32px;
        }
        .right {
          flex: 1;
          .t2 {
            margin-top: 10px;
            font-family: "MicrosoftYaHei", "Microsoft YaHei";
            font-weight: 400;
            font-style: normal;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.447058823529412);
          }
        }
      }
      .btn {
        margin-left: 70px;
        margin-top: 20px;
      }
    }
  }
  .card3 {
    margin-top: 20px;
    /deep/ .ant-card-body {
      padding: 0;
    }
    .title {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;
      font-family: PingFangSC-Semibold, "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847);
      border-bottom: 1px solid rgb(233, 233, 233);
    }
    .content {
      margin-left: 32px;
      padding: 30px;
      .mid {
        margin-top: 15px;
        display: flex;
        .left {
          min-width: 70px;
          line-height: 32px;
        }
        .right {
          flex: 1;
          .t2 {
            margin-top: 10px;
            font-family: "MicrosoftYaHei", "Microsoft YaHei";
            font-weight: 400;
            font-style: normal;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.447058823529412);
          }
        }
      }
      .btn {
        margin-left: 70px;
        margin-top: 20px;
      }
    }
  }
  .card4 {
    margin-top: 20px;
    /deep/ .ant-card-body {
      padding: 0;
    }
    .title {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;
      font-family: PingFangSC-Semibold, "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847);
      border-bottom: 1px solid rgb(233, 233, 233);
    }
    .content {
      // margin-left: 36px;
      padding: 30px;
      display: flex;

      .left {
        margin-top: 5px;
        min-width: 104px;
      }
      .right {
        flex: 1;
        .item {
          margin-bottom: 10px;
          input {
            margin-right: 10px;
          }
          .plus {
            margin-right: 10px;
            color: #1890ff;
            font-size: 20px;
          }
          .close {
            font-size: 20px;
          }
        }
        .btn {
          margin-top: 20px;
        }
      }
    }
  }
  .card5 {
    margin-top: 20px;
    /deep/ .ant-card-body {
      padding: 0;
    }
    .title {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;
      font-family: PingFangSC-Semibold, "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847);
      border-bottom: 1px solid rgb(233, 233, 233);
    }
    .content {
      // margin-left: 36px;
      padding: 30px;
      display: flex;

      .left {
        margin-top: 5px;
        min-width: 104px;
      }
      .right {
        flex: 1;
        .item {
          margin-bottom: 10px;
          input {
            margin-right: 10px;
          }
          .plus {
            margin-right: 10px;
            color: #1890ff;
            font-size: 20px;
          }
          .close {
            font-size: 20px;
          }
        }
        .btn {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
