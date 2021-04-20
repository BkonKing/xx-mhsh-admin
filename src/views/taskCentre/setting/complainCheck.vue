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
                v-model="value1"
                onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              ></a-input>
              <span>小时内</span>
            </div>
            <div class="t2">
              任务及提问的人工审核需在设置时间内进行审核处理，超时则预警
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            任务审核：
          </div>
          <div class="right">
            <div class="t1">
              <a-input
                style="width:87px"
                v-model="value2"
                onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              ></a-input>
              <span>小时内</span>
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
            <a-switch style="marginLeft:10px" default-checked />
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
                v-model="value3"
                onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              ></a-input>
              <span>小时内</span>
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
                v-model="value4"
                onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              ></a-input>
              <span>小时内</span>
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
              v-model="item.phone"
              placeholder="类型"
              style="width:302px"
            ></a-input>
            <a-input
              v-model="item.remark"
              placeholder="排序"
              style="width:128px"
            ></a-input>
            <a-icon class="plus" type="plus" @click="add" />
            <a-icon
              class="close"
              type="close"
              @click="del(index)"
              v-if="arr.length > 1"
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
              v-model="item.phone"
              placeholder="类型"
              style="width:302px"
            ></a-input>
            <a-input
              v-model="item.remark"
              placeholder="排序"
              style="width:128px"
            ></a-input>
            <a-icon class="plus" type="plus" @click="add2" />
            <a-icon
              class="close"
              type="close"
              @click="del2(index)"
              v-if="arr.length > 1"
            />
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
export default {
  data () {
    return {
      value1: 24,
      value2: 24,
      value3: 24,
      cardBol: true,
      card2Bol: true,
      value4: 24,
      card3Bol: true,
      arr: [{ id: Math.random() * 999, name: '', remark: '' }],
      arr2: [{ id: Math.random() * 999, name: '', remark: '' }],
      card4Bol: true,
      card5Bol: true
    }
  },
  watch: {
    value1 () {
      this.cardBol = false
    },
    value2 () {
      this.cardBol = false
    },
    value3 () {
      this.card2Bol = false
    },
    value4 () {
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
    // 提问投诉
    askComplain () {
       this.card5Bol = true
      this.$message.success('提交成功')
    },
      // 添加
    add2 () {
      this.arr2.push({ id: Math.random() * 999, name: '', remark: '' })
    },
    // 删除
    del2 (index) {
      console.log(index)
      this.arr2.splice(index, 1)
    },
    // 任务投诉提交
    taskComplain () {
      this.card4Bol = true
      this.$message.success('提交成功')
    },
     // 添加
    add () {
      this.arr.push({ id: Math.random() * 999, name: '', remark: '' })
    },
    // 删除
    del (index) {
      console.log(index)
      this.arr.splice(index, 1)
    },
    // 投诉提交
    complain () {
      this.card3Bol = true
      this.$message.success('提交成功')
    },
    // 提问提交
    askQuestion () {
      this.card2Bol = true
      this.$message.success('提交成功')
    },
    // 任务提交
    taskSubmit () {
      this.cardBol = true
      this.$message.success('提交成功')
    }
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
      padding: 30px;
      .top {
        display: flex;
        .left {
          width: 70px;
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
          width: 70px;
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
          width: 70px;
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
      padding: 30px;
      .top {
        display: flex;
        .left {
          width: 70px;
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
          width: 70px;
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
      padding: 30px;
      .mid {
        margin-top: 15px;
        display: flex;
        .left {
          width: 70px;
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
        width: 104px;
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
        width: 104px;
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
