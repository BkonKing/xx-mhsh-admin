<template>
  <a-modal v-model="isShow"  :closable='false' :footer="null">
    <div class="top">
      <div class="left">
        <a-icon class="icon" type="exclamation-circle" />
      </div>
      <div class="right">
        <div class="t1">淘汰</div>
        <div class="t2"><span style="color:#F04134;">淘汰{{selectedRowKeys.length}}位接单方</span>,你确定吗？</div>
      </div>
    </div>
    <div class="bottom">
      <a-button @click="isShow=false">取消</a-button>
      <a-button type="primary" @click="submit">确定</a-button>
    </div>
    </a-modal>
</template>

<script>
import { toEliminate } from '@/api/taskCentre'
export default {
  props: ['selectedRowKeys', 'id'],
  data () {
    return {
      isShow: false

    }
  },
  methods: {
    async submit () {
      await toEliminate({
        ids: this.selectedRowKeys,
        task_id: +this.id
      })
      this.$message.success('处理成功')
      this.$parent.getTaskSpeedData()
      this.$parent.getTaskLog()
      this.$parent.selectedRowKeys = []
      this.isShow = false
    }
  }
}
</script>

<style lang='less' scoped>
/deep/ .ant-modal .ant-modal-body{
  padding: 22px !important;
}
/deep/ .ant-modal-content{
  width: 400px;
}
.icon{
  font-size: 20px;
  color: #faad14;
}
.top{
  display: flex;
  .left{
    text-align: center;
    width: 30px;
  }
  .right{
    padding-left: 10px;
    .t1{
      font-family: "Microsoft Tai Le Bold", "Microsoft Tai Le Regular", "Microsoft Tai Le";
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.647);
    line-height: 22px;
    }
    .t2{
font-family: MicrosoftYaHei, "Microsoft YaHei";
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    line-height: 22px;
    color:#999999;
    }
  }
}
.bottom{
  margin-top: 20px;
  text-align: right;
  button{
    margin-right: 10px;
  }
}
</style>
