<template>
  <a-modal v-model="isShow" title="进度" :footer='null'>
    <a-steps progress-dot :current="userprocessList.length-1" direction="vertical">
      <a-step
      v-for="(item, index) in userprocessList"
        :key="index"
        :title="item.ctime"

      >
      <template #description>
        <div class="description">
          <div class="t1" style="color:rgba(0, 0, 0, 0.647058823529412);">{{item.progress_title}}</div>
          <div class="t2" style="color:rgba(0, 0, 0, 0.647058823529412);">{{item.content}}</div>
          <div class="t3" style="color:#1890FF;cursor: pointer;" v-if="item.image_count>0" @click="openImg(item.image_arr)">
              图片 <span style="paddingLeft:4px">{{item.image_count}}张</span>
          </div>

        </div>
      </template>
      </a-step>
    </a-steps>
  </a-modal>
</template>
<script>
import { toGetUserProcess } from '@/api/taskCentre'

export default {
  props: ['id'],
  data () {
    return {
      isShow: false,
      uid: '',
      userprocessList: []

    }
  },
  mounted () {
    document.querySelector('.ant-steps-vertical.ant-steps-dot .ant-steps-item:first-child .ant-steps-icon-dot').style.background = '#F5222D'
    console.log('背景颜色', document.getElementsByClassName('ant-steps-icon-dot')[0])
  },
  methods: {
    openImg (arr) {
      this.$viewerApi({
        images: arr
      })
    }
  },
  watch: {

    uid () {
      toGetUserProcess({
        uid: this.uid,
        task_id: +this.id
      }).then(res => {
        this.userprocessList = res.list
        this.$nextTick(() => {
          setTimeout(() => {
            document.querySelector('.ant-steps-vertical.ant-steps-dot .ant-steps-item:first-child .ant-steps-icon-dot').style.background = '#F5222D'
          })
        })
        console.log('任务中心-任务详情页-用户任务流水', res)
      })
    }
  }
}
</script>

<style lang='less' scoped>
/deep/ .ant-steps-item-title{
  color:rgba(0, 0, 0, 0.447058823529412) !important;
}
/deep/ .ant-steps-dot .ant-steps-item-content, .ant-steps-dot.ant-steps-small .ant-steps-item-content {
    width: 424px;
}
// .red{
//   background:#F5222D;
// }
</style>
