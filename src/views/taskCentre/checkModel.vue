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
          <div class="t1">{{item.progress_title}}</div>
          <div class="t2">{{item.content}}</div>
          <div class="t3" style="color:#1890FF;cursor: pointer;" v-if="item.image_count>0" @click="openImg(item.image_arr)">
              图片{{item.image_count}}张
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
        console.log('任务中心-任务详情页-用户任务流水', res)
      })
    }
  }
}
</script>

<style lang='less' scoped>
/deep/ .ant-steps-dot .ant-steps-item-content, .ant-steps-dot.ant-steps-small .ant-steps-item-content {
    width: 200px;
}
</style>
