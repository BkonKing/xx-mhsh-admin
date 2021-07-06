<template>
  <a-modal v-model="isShow" title="奖励" @ok="submit">
    <div class="selected" v-if="selectedRowKeys.length > 0">
      <a-icon class="icon" type="info-circle" />
      <span class="span1">已选择{{ selectedRowKeys.length }}项</span>
    </div>
    <a-form-model
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="已奖励" v-if="selectedRowKeys.length===0">
        {{taskDetailInfo.reward_happiness}}幸福币
      </a-form-model-item>
      <a-form-model-item label="奖励" prop="credits">
        <a-input v-model="form.credits" oninput="value=value.replace(/[^0-9]/g,'')" :maxLength='10' placeholder="请输入" addon-after="币" />
        <div class="txt" v-if="selectedRowKeys.length<=1 && selectedRows.length===0" style="marginTop:-10px">还可以奖励{{taskDetailInfo.every_reward-reward_happiness}}幸福币</div>
        <div class="txt" v-if="selectedRowKeys.length<=1 && selectedRows.length===1" style="marginTop:-10px">还可以奖励{{taskDetailInfo.every_reward- selectedRows[0].reward_happiness}}幸福币</div>
        <div class="txt3" v-if="selectedRowKeys.length>=2" style="marginTop:-10px">还可以奖励{{taskDetailInfo.happy_reward-taskDetailInfo.reward_happiness}}幸福币</div>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { toReward } from '@/api/taskCentre'
export default {
  props: ['id', 'selectedRowKeys', 'taskDetailInfo'],
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      isShow: false,
      form: {
        credits: ''// 幸福币
      },
      uid: '', // 用户id
      reward_happiness: '', // 已经奖励的幸福币
      rules: {
        credits: [{ required: true, message: '必填', trigger: 'change' }]
      },
      selectedRows: []
    }
  },
  watch: {
    isShow (newVal) {
      if (newVal === false) {
        this.form.credits = ''
        this.uid = ''
        this.reward_happiness = ''
      }
    }
  },
  methods: {
    // 确定
    async submit () {
      if (this.form.credits.trim() === '') {
        return
      }
      if (this.uid != '') {
        const arr = []
        arr.push(this.uid)
        const res = await toReward({
          task_id: +this.id,
          credits: +this.form.credits,
          uids: arr
        })
        if (+res.code === 201) {
          // this.$message.error(res.message)
          if (this.selectedRowKeys.length <= 1 && this.selectedRows.length === 0) {
            this.$message.warning('最多还可以奖励' + (this.taskDetailInfo.every_reward - this.reward_happiness) + '幸福币')
          } else if (this.selectedRowKeys.length <= 1 && this.selectedRows.length === 1) {
            this.$message.warning('最多还可以奖励' + (this.taskDetailInfo.every_reward - this.selectedRows[0].reward_happiness) + '幸福币')
          } else {
            this.$message.warning('最多还可以奖励' + (this.taskDetailInfo.happy_reward - this.taskDetailInfo.reward_happiness) + '幸福币')
          }
        } else if (+res.code === 200) {
          this.$parent.getTaskSpeedData()
          this.$listeners.getTaskLog()
          this.$parent.selectedRowKeys = []
          this.$message.success('处理成功')
          this.isShow = false
        }
      } else {
        // console.log('this.selectedRowKeys', this.selectedRowKeys)
        const res = await toReward({
          task_id: +this.id,
          credits: +this.form.credits,
          uids: this.selectedRowKeys
        })
        if (+res.code === 201) {
          // this.$message.error(res.message)
          if (this.selectedRowKeys.length <= 1 && this.selectedRows.length === 0) {
            this.$message.warning('最多还可以奖励' + (this.taskDetailInfo.every_reward - this.reward_happiness) + '幸福币')
          } else if (this.selectedRowKeys.length <= 1 && this.selectedRows.length === 1) {
            this.$message.warning('最多还可以奖励' + (this.taskDetailInfo.every_reward - this.selectedRows[0].reward_happiness) + '幸福币')
          } else {
            this.$message.warning('最多还可以奖励' + (this.taskDetailInfo.happy_reward - this.taskDetailInfo.reward_happiness) + '幸福币')
          }
          // this.isShow = false
        } else if (+res.code === 200) {
          this.$parent.selectedRowKeys = []
          this.$parent.getTaskSpeedData()
          this.$listeners.getTaskLog()
          this.$message.success('处理成功')
          this.isShow = false
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.txt {
  font-family: "MicrosoftYaHei", "Microsoft YaHei";
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.447058823529412);
}
/deep/ .ant-modal-body{
  padding: 16px 24px 24px 24px;
}
.selected {
  // margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  height: 40px;
  padding-left: 15px;
  line-height: 40px;
  background-color: rgba(230, 247, 255, 1);
  border-width: 1px;
  border-style: solid;
  border-color: rgba(186, 231, 255, 1);
  border-radius: 4px;
  .icon {
    color: #0e77d1;
    margin-right: 10px;
  }
  .span1 {
    color: #0e77d1;
  }
  .span2 {
    cursor: pointer;
    color: #0e77d1;
    margin-left: 10px;
  }
}
/deep/.ant-form-item{
  margin-bottom: 0;
}
// .txt3{
//   margin-top: -12px;
// }
</style>
