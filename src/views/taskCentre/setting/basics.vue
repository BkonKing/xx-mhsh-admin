<template>
  <div class="basics">
    <a-card class="card">
      <div class="title">功能开关</div>
      <div class="content">
        <div class="left">任务功能：</div>
        <div class="right">
          <div class="top">
            <div class="t1">
              全部用户
              <a-switch
                style="marginLeft:10px"
                v-model="allCheck"
                @change="onChangeAll"
              />
            </div>
            <div class="t2">
              对全部用户开放任务功能，APP端显示任务模块、可发布任务、可见任务
            </div>
          </div>
          <div class="bottom">
            <div class="t1">
              白名单用户
              <a-switch
                style="marginLeft:10px"
                v-model="whiteCheck"
                :disabled="disabled"
                @change="onChangeWhite"
              />
            </div>
            <div class="t2">
              仅对白名单用户开放任务功能，APP端白名单用户显示任务模块、可发布任务、可见任务
            </div>
          </div>
        </div>
      </div>
    </a-card>
    <a-card class="card2">
      <div class="title">基础设置</div>
      <div class="content">
        <div class="top">
          <span>任务交易关闭：任务结束</span>
          <a-input
            v-model="task_finish"
            style="width:87px;textAlign: center;"
            step="1"
            min="0"
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          ></a-input>
          <span>天后关闭交易，不可再进行投诉、评价、任务方幸福币冻结</span>
        </div>
        <div class="mid">
          <span>群人数上限：</span>
          <a-input
            v-model="group_limit"
            step="1"
            min="0"
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            style="width:87px;textAlign: center;"
          ></a-input>
          <span>人</span>
        </div>
        <div class="bottom">
          <span>任务处理客服：</span>
          <a-input
          :maxLength='11'
            v-model="customer_service"
            onkeyup="value=value.replace(/[\u4E00-\u9FA5]|[A-Za-z]/g,'')"
            style="width:440px;marginLeft:10px"
          ></a-input>
        </div>
        <div class="btn">
          <a-button
type="primary"
:disabled="btnBol"
@click="basicsSubmit"
            >提交</a-button
          >
        </div>
      </div>
    </a-card>
    <a-card class="card3">
      <div class="title">
        评价标签
      </div>
      <div class="content">
        <div class="left">评价标签：</div>
        <div class="right">
          <div class="item" v-for="(item, index) in arr" :key="item.id">
            <a-input
              v-model="item.good_tag_name"
              placeholder="标签"
              style="width:160px"
              :maxLength='20'
            ></a-input>
            <a-input
            :maxLength='20'
              v-model="item.bad_tag_name"
              placeholder="标签"
              style="width:160px"
            ></a-input>
            <a-input
            :maxLength='20'
              v-model="item.order_sort"
              placeholder="排序"
              style="width:104px"
            ></a-input>
            <a-icon class="plus" type="plus" @click="addAppraise" />
            <a-icon class="close" type="close" @click="delAppraise(index)" />
          </div>
          <div class="btn">
            <a-button
              type="primary"
              :disabled="card3Bol"
              @click="appraiseSubmit"
              >提交</a-button
            >
          </div>
        </div>
      </div>
    </a-card>
    <a-card class="card4">
      <div class="title">
        淘汰原因
      </div>
      <div class="content">
        <div class="left">淘汰原因：</div>
        <div class="right">
          <div class="item" v-for="(item, index) in arr2" :key="item.id">
            <a-input
            :maxLength='30'
              v-model="item.reason"
              placeholder="原因"
              style="width:302px"
            ></a-input>
            <a-input
            :maxLength='30'
              v-model="item.order_sort"
              placeholder="排序"
              style="width:128px"
            ></a-input>
            <a-icon class="plus" type="plus" @click="addWeedOut" />
            <a-icon
              class="close"
              type="close"
              @click="delWeedOut(index)"
            />
          </div>
          <div class="btn">
            <a-button
type="primary"
:disabled="card4Bol"
@click="weedOut"
              >提交</a-button
            >
          </div>
        </div>
      </div>
    </a-card>
    <a-card class="card5">
      <div class="title">放弃原因</div>
      <div class="content">
        <div class="left">放弃原因：</div>
        <div class="right">
          <div class="item" v-for="(item, index) in arr3" :key="item.id">
            <a-input
            :maxLength='30'
              v-model="item.reason"
              placeholder="原因"
              style="width:302px"
            ></a-input>
            <a-input
            :maxLength='30'
              v-model="item.order_sort"
              placeholder="排序"
              style="width:128px"
            ></a-input>
            <a-icon class="plus" type="plus" @click="addGiveUp" />
            <a-icon
              class="close"
              type="close"
              @click="delGiveUp(index)"

            />
          </div>
          <div class="btn">
            <a-button
type="primary"
:disabled="card5Bol"
@click="giveUp"
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
  setFunctionOpen,
  setSetting,
  gainGetSet,
  addSetLabel,
  gainGetLabel,
  addSetReason,
  gainGetReason,
  gainGetBasic
} from '@/api/taskCentre'
export default {
  data () {
    return {
      disabled: true,
      task_finish: 10, // 任务完成天数
      group_limit: 500, // 群上线人数
      customer_service: '', // 客服电话
      btnBol: true,
      arr: [
        {
          id: Math.random() * 999,
          good_tag_name: '',
          bad_tag_name: '',
          order_sort: ''
        }
      ], // 评价列表数组
      arr2: [{ id: Math.random() * 999, reason: '', order_sort: '' }], // 淘汰原因数组
      arr3: [{ id: Math.random() * 999, reason: '', order_sort: '' }], // 放弃原因数组
      card3Bol: true,
      card4Bol: true,
      card5Bol: true,
      allCheck: true,
      whiteCheck: true
      // switchInfo: '' // 开关信息
    }
  },
  watch: {
    task_finish () {
      this.btnBol = false
    },
    group_limit () {
      this.btnBol = false
    },
    customer_service () {
      this.btnBol = false
    },
    arr: {
      handler () {
        this.card3Bol = false
        // console.log('改变了')
      },
      deep: true
    },
    arr2: {
      handler () {
        this.card4Bol = false
        // console.log('改变了')
      },
      deep: true
    },
    arr3: {
      handler () {
        this.card5Bol = false
        // console.log('改变了')
      },
      deep: true
    }
    // switchInfo: {
    //   handler () {
    //     this.allCheck = this.switchInfo.alluser_open === 1
    //     this.whiteCheck = this.switchInfo.whitelist_open === 1
    //   },
    //   deep: true
    // }
  },
  methods: {
    // 获取放弃原因列表
   async getGiveOutReasonList () {
    const res4 = await gainGetReason({
      type: 2
    })
    this.arr3 = res4.list.length > 0 ? res4.list : this.arr3
    this.$nextTick(() => {
      this.card5Bol = true
    })
    // console.log('获取放弃原因列表', res4)
    },
    // 获取淘汰原因列表
    async getWeekOutReasonList () {
    const res3 = await gainGetReason({
      type: 1
    })
    this.arr2 = res3.list.length > 0 ? res3.list : this.arr2
    this.$nextTick(() => {
      this.card4Bol = true
    })
    // console.log('获取淘汰原因列表', res3)
    },
    // 获取评价标签
  async GetLabelList () {
        // 基础-获取评价标签
    const res2 = await gainGetLabel()
    this.arr = res2.list
    if (res2.list.length === 0) {
      this.arr = [
        {
          id: Math.random() * 999,
          good_tag_name: '',
          bad_tag_name: '',
          order_sort: ''
        }
      ]
    }
    this.$nextTick(() => {
      this.card3Bol = true
    })
    //  console.log('基础-获取评价标签', res2)
    },
    // 放弃提交
    async giveUp () {
       const arrTest = this.arr3.map(item => {
        if (item.reason != '') {
          return {
          reason: item.reason,
          sort: item.order_sort
        }
        }
      })
      const list = arrTest.filter(item => {
        return item != undefined
      })
      // console.log('放弃', list)
       await addSetReason({
        reason_list: list,
        type: 2
      })
      // console.log('放弃提交', res)
      this.getGiveOutReasonList()
      this.card5Bol = true
      this.$message.success('提交成功')
    },
    // 添加 放弃
    addGiveUp () {
      this.arr3.push({ id: Math.random() * 999, reason: '', order_sort: '' })
    },
    // 删除 放弃
    delGiveUp (index) {
       if (this.arr3.length === 1) {
        this.arr3 = [{ id: Math.random() * 999, reason: '', order_sort: '' }]
        return
      }
      // console.log(index)
      this.arr3.splice(index, 1)
    },
    // 淘汰提交
    async weedOut () {
      const arrTest = this.arr2.map(item => {
        if (item.reason != '') {
          return {
          reason: item.reason,
          sort: item.order_sort
        }
        }
      })
      const list = arrTest.filter(item => {
         return item != undefined
      })
      // console.log('淘汰提交', list)
      await addSetReason({
        reason_list: list,
        type: 1
      })
      // console.log('淘汰提交', res)
      this.getWeekOutReasonList()
      this.card4Bol = true
      this.$message.success('提交成功')
    },
    // 添加淘汰
    addWeedOut () {
      this.arr2.push({ id: Math.random() * 999, reason: '', order_sort: '' })
    },
    // 删除淘汰
    delWeedOut (index) {
      // console.log(index)
      if (this.arr2.length === 1) {
        this.arr2 = [{ id: Math.random() * 999, reason: '', order_sort: '' }]
        return
      }
      this.arr2.splice(index, 1)
    },
    // 评价提交
    async appraiseSubmit () {
      // this.arr.map(item => {
      //   if (item.good_tag_name === '' || item.bad_tag_name === '') {
      //     this.$message.error('请填写完整一行')
      //   }
      // })
      for (let i = 0; i < this.arr.length; i++) {
        if (
           (this.arr[i].good_tag_name === '' || this.arr[i].bad_tag_name === '') && (this.arr[i].good_tag_name != '' || this.arr[i].bad_tag_name != '')
        ) {
          this.$message.error('请填写完整一行')
          return
        }
      }
      const arrTest = this.arr.map(item => {
        if (item.good_tag_name !== '' && item.bad_tag_name !== '') {
          return {
            good_tag_name: item.good_tag_name,
            bad_tag_name: item.bad_tag_name,
            sort: +item.order_sort
          }
        }
      })
      const list = arrTest.filter(item => {
        return item != undefined
      })
      // console.log('评价提交', list)
      await addSetLabel({
        tag_list: list
      })
      // console.log('评价提交', res)
      this.GetLabelList()
      this.card3Bol = true
      this.$message.success('提交成功')
    },
    // 添加评价标签
    addAppraise () {
      this.arr.push({
        id: Math.random() * 999,
        good_tag_name: '',
        bad_tag_name: '',
        order_sort: ''
      })
    },
    // 删除评价标签
    delAppraise (index) {
      // console.log(index)
      if (this.arr.length === 1) {
        this.arr = [
          {
            id: Math.random() * 999,
            good_tag_name: '',
            bad_tag_name: '',
            order_sort: ''
          }
        ]
        return
      }
      this.arr.splice(index, 1)
    },
    // 基础设置提交
    async basicsSubmit () {
      await setSetting({
        task_finish: this.task_finish,
        group_limit: this.group_limit,
        customer_service: +this.customer_service
      })
      // console.log('基础设置提交', res)
      this.btnBol = true
      this.$message.success('提交成功')
    },
    // 设置白名单开关
    async onChangeWhite (checked) {
      // console.log('onChangeWhite', checked)
      await setFunctionOpen({
        whitelist_open: checked === true ? 1 : 0,
        type: 2
      })
      this.$message.success('设置成功')
      // console.log('设置白名单开关', res)
    },
    // 设置全部用户开关
    async onChangeAll (checked) {
      console.log('checked', checked)
       if (checked === false) {
        this.disabled = false
      } else {
        this.disabled = true
      }
     const res = await setFunctionOpen({
        alluser_open: checked === true ? 1 : 0,
        type: 1
      })
      this.$message.success('设置成功')
       console.log('设置全部用户开关', res)
    }
  },
  async created () {
    // 获取任务基础信息
    const res = await gainGetSet()
    this.customer_service = res.data.customer_service
    this.group_limit = res.data.group_limit
    this.task_finish = res.data.task_finish
    // console.log('获取任务基础信息', res)
    const res2 = await gainGetBasic()
    this.allCheck = res2.data.alluser_open === 1
    this.whiteCheck = res2.data.whitelist_open === 1
    if (this.allCheck === true) {
      this.disabled = true
    } else {
      this.disabled = false
    }
    console.log('获取开关信息', res2)
    this.GetLabelList()
    this.getWeekOutReasonList()
    this.getGiveOutReasonList()
    this.$nextTick(() => {
      this.btnBol = true
    })
  }
}
</script>

<style lang="less" scoped>
.basics {
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
      padding: 30px;
      display: flex;
      .left {
        width: 70px;
      }
      .right {
        flex: 1;
        .top {
          .t2 {
            margin-top: 10px;
            font-family: MicrosoftYaHei, "Microsoft YaHei";
            font-weight: 400;
            font-style: normal;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.447);
          }
        }
        .bottom {
          margin-top: 10px;
          .t2 {
            margin-top: 10px;
            font-family: MicrosoftYaHei, "Microsoft YaHei";
            font-weight: 400;
            font-style: normal;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.447);
          }
        }
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
      padding: 30px;
      .top {
        span {
          margin: 0 10px;
        }
      }
      .mid {
        margin-top: 20px;
        margin-left: 12px;
        span {
          margin: 0 10px;
        }
      }
      .bottom {
        margin-top: 20px;
        margin-left: 8px;
      }
      .btn {
        margin-top: 20px;
        margin-left: 106px;
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
      margin-left: 36px;
      padding: 30px;
      display: flex;

      .left {
        margin-top: 5px;
        width: 70px;
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
      margin-left: 36px;
      padding: 30px;
      display: flex;

      .left {
        margin-top: 5px;
        width: 70px;
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
      margin-left: 36px;
      padding: 30px;
      display: flex;

      .left {
        margin-top: 5px;
        width: 70px;
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
