<template>
  <div class="delGroup">
    <a-modal v-model="isShow"  :footer="null" :closable='false'>
      <div class="t1">
        <a-icon class="icon" type="exclamation-circle" /> <span>删除任务群</span>
      </div>
      <div class="t2">
        <span >将解散群成员</span>，
        <span>你还要继续吗？</span>
      </div>
      <div class="btns">
        <a-button @click="cancel">取消</a-button>
        <a-button type="primary" @click="del">继续</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { toDelGroup } from '@/api/taskCentre'
export default {
  data () {
    return {
      isShow: false,
      id: ''
    }
  },
  methods: {
    // 删除群
    async  del () {
      const arr = []
      arr.push(this.id)
      const res = await toDelGroup({
        group_addr: arr
      })
      console.log('删除群', res)
      this.$message.success('删除成功')
      this.$parent.getData()
      this.isShow = false
    },
    cancel () {
      this.isShow = false
    }
  }
}
</script>

<style lang='less' scoped>
/deep/.ant-modal-body {
    padding: 32px 32px 24px;
}
.t1{
  display: flex;
  align-items: center;
  .icon{
  font-size: 22px;
  color: #faad14;

}
span{
  margin-left: 20px;
    font-family: 'Microsoft Tai Le Bold', 'Microsoft Tai Le Regular', 'Microsoft Tai Le';
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.647058823529412);
}
}
.t2{
  margin-left: 42px;
  margin-top: 10px;
  font-size: 14px;
  span:nth-child(1){
      color: #F04134;
  }
}
.btns{
  margin-top: 24px;
  // margin-left: 192px;
  text-align: right;
  button{
    margin-right: 10px;
    &:last-child{
      margin-right: 0;
    }
  }
}
/deep/ .ant-modal-content{
  width: 400px;
}
</style>
