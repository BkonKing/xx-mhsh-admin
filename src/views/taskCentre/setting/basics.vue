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
                default-checked
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
                default-checked
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
            onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
          ></a-input>
          <span>天后关闭交易，不可再进行投诉、评价、任务方幸福币冻结</span>
        </div>
        <div class="mid">
          <span>群人数上限：</span>
          <a-input
            v-model="group_limit"
            step="1"
            min="0"
            onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
            style="width:87px;textAlign: center;"
          ></a-input>
          <span>人</span>
        </div>
        <div class="bottom">
          <span>任务处理客服：</span>
          <a-input
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
              v-model="item.tag1"
              placeholder="标签"
              style="width:160px"
            ></a-input>
            <a-input
              v-model="item.tag2"
              placeholder="标签"
              style="width:160px"
            ></a-input>
            <a-input
              v-model="item.sort"
              placeholder="排序"
              style="width:104px"
            ></a-input>
            <a-icon class="plus" type="plus" @click="addAppraise" />
            <a-icon
              class="close"
              type="close"
              @click="delAppraise(index)"
              v-if="arr.length > 1"
            />
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
              v-model="item.reason"
              placeholder="原因"
              style="width:302px"
            ></a-input>
            <a-input
              v-model="item.order_sort"
              placeholder="排序"
              style="width:128px"
            ></a-input>
            <a-icon class="plus" type="plus" @click="addWeedOut" />
            <a-icon
              class="close"
              type="close"
              @click="delWeedOut(index)"
              v-if="arr2.length > 1"
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
              v-model="item.reason"
              placeholder="原因"
              style="width:302px"
            ></a-input>
            <a-input
              v-model="item.order_sort"
              placeholder="排序"
              style="width:128px"
            ></a-input>
            <a-icon class="plus" type="plus" @click="addGiveUp" />
            <a-icon
              class="close"
              type="close"
              @click="delGiveUp(index)"
              v-if="arr3.length > 1"
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
  gainGetReason
} from '@/api/taskCentre'
export default {
  data () {
    return {
      disabled: true,
      task_finish: 10, // 任务完成天数
      group_limit: 500, // 群上线人数
      customer_service: '', // 客服电话
      btnBol: true,
      arr: [{ id: Math.random() * 999, tag1: '', tag2: '', sort: '' }], // 评价列表数组
      arr2: [{ id: Math.random() * 999, reason: '', order_sort: '' }], // 淘汰原因数组
      arr3: [{ id: Math.random() * 999, reason: '', order_sort: '' }], // 放弃原因数组
      card3Bol: true,
      card4Bol: true,
      card5Bol: true
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
        console.log('改变了')
      },
      deep: true
    },
    arr2: {
      handler () {
        this.card4Bol = false
        console.log('改变了')
      },
      deep: true
    },
    arr3: {
      handler () {
        this.card5Bol = false
        console.log('改变了')
      },
      deep: true
    }
  },
  methods: {
    // 放弃提交
    async giveUp () {
      const list = this.arr3.map(item => {
        return {
          reason: item.reason,
          sort: item.order_sort
        }
      })
      const res = await addSetReason({
        reason_list: list,
        type: 2
      })
      console.log('放弃提交', res)
      this.card5Bol = true
      this.$message.success('提交成功')
    },
    // 添加
    addGiveUp () {
      this.arr3.push({ id: Math.random() * 999, reason: '', order_sort: '' })
    },
    delGiveUp (index) {
      console.log(index)
      this.arr3.splice(index, 1)
    },
    // 淘汰提交
    async weedOut () {
      const list = this.arr2.map(item => {
        return {
          reason: item.reason,
          sort: item.order_sort
        }
      })
      const res = await addSetReason({
        reason_list: list,
        type: 1
      })
      console.log('淘汰提交', res)
      this.card4Bol = true
      this.$message.success('提交成功')
    },
    // 添加淘汰
    addWeedOut () {
      this.arr2.push({ id: Math.random() * 999, reason: '', order_sort: '' })
    },
    delWeedOut (index) {
      console.log(index)
      this.arr2.splice(index, 1)
    },
    // 评价提交
    async appraiseSubmit () {
      const list = this.arr.map(item => {
        return {
          tag_name: item.tag1 + '-' + item.tag2,
          sort: +item.sort
        }
      })
      const res = await addSetLabel({
        tag_list: list
      })
      console.log('评价提交', res)
      this.card3Bol = true
      this.$message.success('提交成功')
    },
    // 添加评价标签
    addAppraise () {
      this.arr.push({ id: Math.random() * 999, tag1: '', tag2: '', sort: '' })
    },
    // 删除评价标签
    delAppraise (index) {
      console.log(index)
      this.arr.splice(index, 1)
    },
    // 基础设置提交
    async basicsSubmit () {
      const res = await setSetting({
        task_finish: this.task_finish,
        group_limit: this.group_limit,
        customer_service: +this.customer_service
      })
      console.log('基础设置提交', res)
      this.btnBol = true
      this.$message.success('提交成功')
    },
    // 设置白名单开关
    async onChangeWhite (checked) {
      // console.log('onChangeWhite', checked)
      await setFunctionOpen({
        whitelistOpen: checked === true ? 1 : 0,
        type: 2
      })
      this.$message.success('设置成功')
      // console.log('设置白名单开关', res)
    },
    // 设置全部用户开关
    async onChangeAll (checked) {
      await setFunctionOpen({
        alluserOpen: checked === true ? 1 : 0,
        type: 1
      })
      this.$message.success('设置成功')
      //  console.log('设置全部用户开关', res)
      if (checked == false) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    }
  },
  async created () {
    // 获取任务基础信息
    const res = await gainGetSet()
    this.customer_service = res.data.customer_service
    this.group_limit = res.data.group_limit
    this.task_finish = res.data.task_finish
    // console.log('获取任务基础信息', res)
    // 基础-获取评价标签
    const res2 = await gainGetLabel()
    this.arr = res2.list.map(item => {
      const arr = item.tag_name.split('-')
      return {
        id: item.id,
        tag1: arr[0],
        tag2: arr[1],
        sort: item.order_sort
      }
    })
    // 获取淘汰原因列表
    const res3 = await gainGetReason({
      type: 1
    })
    this.arr2 = res3.list.length > 0 ? res3.list : this.arr2
    console.log('获取淘汰原因列表', res3)
    // 获取放弃原因列表
    const res4 = await gainGetReason({
      type: 2
    })
    this.arr3 = res4.list.length > 0 ? res4.list : this.arr3
    console.log('获取放弃原因列表', res4)
    this.$nextTick(() => {
      this.card3Bol = true
      this.btnBol = true
      this.card4Bol = true
      this.card5Bol = true
    })
    // console.log('基础-获取评价标签', res2)
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
