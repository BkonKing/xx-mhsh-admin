<template>
  <a-modal v-model="isShow" :footer="null" title="查看" >
    <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="任务标题">
        <div class="title" @click="openTaskDetail">
          {{ info.task_title }}
        </div>
      </a-form-model-item>
      <a-form-model-item label="评价用户">
        <span style="color:#1890FF;cursor: pointer;" @click="openUserDetail">
          {{ info.owner_name }}
          </span
        >
        {{ info.project_name }}
      </a-form-model-item>
      <a-form-model-item label="评价时间">
        {{ info.ctime }}
        </a-form-model-item>
      <a-form-model-item label="评星">
        {{
        stars[info.evaluate_stars]
      }}
      </a-form-model-item>
      <a-form-model-item label="标签">
        {{
        info.evaluate_tags
      }}
      </a-form-model-item>
      <a-form-model-item label="补充内容" class="subbleContent">
        {{
        info.evaluate_supplement?info.evaluate_supplement:'--'
      }}
      </a-form-model-item>
    </a-form-model>
    <div class="btn" v-if="!bol && info.is_valid_desc !=='无效评价'">
      <a-button @click="mark">标记为无效评价</a-button>
    </div>
    <div class="bottom" v-if="bol && !showInfo && info.is_valid_desc !=='无效评价'">
      <div class="left">标记说明：</div>
      <div class="right">
        <a-textarea
          style="width:300px"
          v-model="label_desc"
          placeholder="请输入"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </div>
    </div>
    <div class="btn2" v-if="bol && !showInfo  && info.is_valid_desc !=='无效评价'">
      <a-button type="primary" @click="submit">确定</a-button>
    </div>
    <div class="info" v-if="showInfo || info.is_valid_desc==='无效评价'">
      <div class="item">
        <div class="t1">标记评价：</div>
        <div class="t2" style="color: #F5222D">
          无效
        </div>
      </div>
      <div class="item">
        <div class="t1 markMan">标记人：</div>
        <div class="t2">{{info.sing_user}}</div>
      </div>
      <div class="item">
        <div class="t1">标记时间：</div>
        <div class="t2">{{info.sign_time}}</div>
      </div>
      <div class="item">
        <div class="t1">标记说明：</div>
        <div class="t2">{{info.sign_desc?info.sign_desc:'--'}}</div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { toOptEvaluate, toViewEvaluate } from '@/api/taskCentre'
export default {
  data () {
    return {
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      bol: false,
      showInfo: false,
      label_desc: '', // 标记说明
      id: '', // 评价id
      stars: {
        1: '一星',
        2: '二星',
        3: '三星',
        4: '四星',
        5: '五星'
      },
      info: {} // 评价信息
    }
  },
  watch: {
    isShow (newVal) {
      if (newVal === false) {
        this.bol = false
        this.showInfo = false
        this.info = {}
        this.id = ''
        this.label_desc = ''
      }
    },
    id () {
      // console.log('idid', this.id)
      if (this.id != '') {
        this.getEvaluate()
      }
    }
  },
  methods: {
    // 打开用户详情
    openUserDetail () {
      window.open(`/zht/user/user/getUserList?uid=${this.info.uid}`, '_blank')
    },
    // 打开任务详情
    openTaskDetail () {
      // const { href } = this.$router.resolve({
      //   name: 'complete',
      //   query: { id: this.info.task_id }
      // })
      // window.open(href, '_blank')
      window.open(`/zht/task/task/getTaskInfo?url=%2Ffilm%2Findex.html%23%2FtaskCentre%2Fcomplete?id=${this.info.task_id}`, '_blank')
    },
    getEvaluate () {
      toViewEvaluate({ id: this.id }).then(res => {
        this.info = res.data
        console.log('查看评价', res)
      })
    },
    // 确定
    async submit () {
      this.showInfo = true
      await toOptEvaluate({
        id: this.id,
        is_valid: 0,
        label_desc: this.label_desc
      })
      this.getEvaluate()
      this.$message.success('处理成功')
    },
    // 标记
    mark () {
      this.bol = true
    }
  }

}
</script>

<style lang="less" scoped>
/deep/ .ant-modal-body{
  padding: 18px 24px 24px 24px;
}
.subbleContent{
  padding-bottom: 33px;
}
.title {
  color: #1890ff;
  cursor: pointer;
}
.btn {
  margin-top: 16px;
  margin-left: 74px;
}
.bottom {
  display: flex;
  margin-top: -2px;
  margin-left: 10px;
  border-top: 2px dashed #999;
  padding-top: 26px;
  .left {
    width: 70px;
  }
  .right {
    flex: 1;
  }
}
/deep/ .ant-form-item {
  height: 20px;
  line-height: 20px;
}
/deep/ .ant-form-item-label{
  height: 20px;
  line-height: 40px;
  overflow: initial;
}
/deep/ .ant-form-item-control-wrapper{
  height: 20px;
  line-height: 40px;
}
.btn2 {
  margin-left: 80px;
  margin-top: 24px;
}
.info {
  border-top: 2px dashed #eaeaea;
  padding-top: 16px;
  .item {
    display: flex;
    margin: 10px 8px;
    .markMan {
      margin-left: 12px;
    }
    .t1 {
      font-weight: 600;
    }
  }
}
</style>
