<template>
  <div class="delGroup">
    <a-modal v-model="isShow"  :footer="null" :closable='false'>
      <div class="t1">
        <a-icon class="icon" type="exclamation-circle" /> <span>删除任务群</span>
      </div>
      <div class="t2">
        <span >将解散群成员</span>,
        <span>你还要继续吗？</span>
      </div>
      <div class="btns">
        <a-button @click="cancel">取消</a-button>
        <a-button type="primary">继续</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    cancel () {
      this.isShow = false
    }
  }
}
</script>

<style lang='less' scoped>
.t1{
  display: flex;
  align-items: center;
  .icon{
  font-size: 24px;
  color: #faad14;

}
span{
  margin-left: 20px;
    font-family: 'Microsoft Tai Le Bold', 'Microsoft Tai Le Regular', 'Microsoft Tai Le';
    font-weight: 700;
    font-style: normal;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.647058823529412);
}
}
.t2{
  margin-left: 42px;
  margin-top: 10px;
  font-size: 18px;
  span:nth-child(1){
      color: #F04134;
  }
}
.btns{
  margin-top: 10px;
  margin-left: 192px;
  button{
    margin-right: 10px;
  }
}
/deep/ .ant-modal-content{
  width: 400px;
}
</style>
