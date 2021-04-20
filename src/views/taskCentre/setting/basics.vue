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
                @change="onChange"
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
            v-model="value1"
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
            v-model="value2"
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
            v-model="value3"
            onkeyup="value=value.replace(/[\u4E00-\u9FA5]|[A-Za-z]/g,'')"
            style="width:440px"
          ></a-input>
        </div>
        <div class="btn">
          <a-button
type="primary"
:disabled="btnBol"
@click="submit"
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
              v-model="item.phone"
              placeholder="标签"
              style="width:160px"
            ></a-input>
            <a-input
              v-model="item.name"
              placeholder="标签"
              style="width:160px"
            ></a-input>
            <a-input
              v-model="item.remark"
              placeholder="排序"
              style="width:104px"
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
              v-model="item.phone"
              placeholder="原因"
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
              v-model="item.phone"
              placeholder="原因"
              style="width:302px"
            ></a-input>
            <a-input
              v-model="item.remark"
              placeholder="排序"
              style="width:128px"
            ></a-input>
            <a-icon class="plus" type="plus" @click="add3" />
            <a-icon
              class="close"
              type="close"
              @click="del3(index)"
              v-if="arr.length > 1"
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
export default {
  data () {
    return {
      disabled: true,
      value1: 10,
      value2: 500,
      value3: '',
      btnBol: true,
      arr: [{ id: Math.random() * 999, name: '', remark: '' }],
      arr2: [{ id: Math.random() * 999, name: '', remark: '' }],
      arr3: [{ id: Math.random() * 999, name: '', remark: '' }],
      card3Bol: true,
      card4Bol: true,
      card5Bol: true
    }
  },
  watch: {
    value1 () {
      this.btnBol = false
    },
    value2 () {
      this.btnBol = false
    },
    value3 () {
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
    giveUp () {
       this.card5Bol = true
      this.$message.success('提交成功')
    },
    // 添加
    add3 () {
      this.arr3.push({ id: Math.random() * 999, name: '', remark: '' })
    },
    del3 (index) {
      console.log(index)
      this.arr3.splice(index, 1)
    },
    // 淘汰提交
    weedOut () {
      this.card4Bol = true
      this.$message.success('提交成功')
    },
    // 添加
    add2 () {
      this.arr2.push({ id: Math.random() * 999, name: '', remark: '' })
    },
    del2 (index) {
      console.log(index)
      this.arr2.splice(index, 1)
    },
    // 评价提交
    appraiseSubmit () {
      this.card3Bol = true
      this.$message.success('提交成功')
    },
    // 添加
    add () {
      this.arr.push({ id: Math.random() * 999, name: '', remark: '' })
    },
    del (index) {
      console.log(index)
      this.arr.splice(index, 1)
    },
    // 提交
    submit () {
      this.btnBol = true
      this.$message.success('提交成功')
    },
    onChange (checked) {
      if (checked == false) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    }
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
