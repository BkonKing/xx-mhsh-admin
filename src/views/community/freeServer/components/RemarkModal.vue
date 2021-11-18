<template>
  <a-modal
    v-model="visible"
    title="备注预约"
    :destroyOnClose="true"
    @ok="submit"
  >
    <a-spin :spinning="spinning">
      <a-form-model
        class="edit-form"
        ref="editForm"
        :model="editForm"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="预约人" class="form-item-text">
          <a
            :href="`/xmht/household/member/getMemberList?uid=${editForm.uid}`"
            target="_blank"
            style="margin-right: 10px;"
            >{{ editForm.nickname }}</a
          ><span>{{ editForm.mobile }}</span>
        </a-form-model-item>
        <a-form-model-item class="form-item-text" label="预约服务">
          <div>{{ editForm.category_type_desc }} - {{ editForm.category }}</div>
          <a-row type="flex">
            <span v-if="isShowOverTime || isShowTiming">(</span>
            <a-col v-if="isShowOverTime"
              ><Timewait
                :time="overtime"
                :delay="1000"
                upClass="color-red"
                upText="超时"
                type="2"
              ></Timewait
            ></a-col>
            <a-col v-if="isShowTiming" :class="{ marginTime: isShowOverTime }"
              ><Timewait
                :time="timing"
                :delay="1000"
                :upText="timingText"
                type="2"
              ></Timewait></a-col
            ><span v-if="isShowOverTime || isShowTiming">)</span>
          </a-row>
        </a-form-model-item>
        <a-form-model-item class="form-item-text" label="服务状态">
          {{ editForm.service_status || "--" }}
        </a-form-model-item>
        <a-form-model-item label="备注" prop="service_content">
          <a-textarea
            v-model="editForm.remark"
            :maxLength="100"
            :autoSize="{ minRows: 4, maxRows: 4 }"
          ></a-textarea>
        </a-form-model-item>
        <a-form-model-item class="form-item-text" label="预约时间">
          {{ editForm.ctime || "--" }}
        </a-form-model-item>
        <a-form-model-item
          v-if="editForm.stime"
          class="form-item-text"
          label="开始时间"
        >
          {{ editForm.stime || "--" }}
        </a-form-model-item>
        <a-form-model-item
          v-if="editForm.etime"
          class="form-item-text"
          label="结束时间"
        >
          <div>{{ editForm.etime || "--" }}</div>
          <div v-if="editForm.status === 3">
            {{ editForm.cancel_reson }}
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
import { Timewait } from '@/components'
import { getReservationInfo, setRemark } from '@/api/community'
export default {
  name: 'RemarkModal',
  components: {
    Timewait
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      visible: this.value,
      editForm: {},
      spinning: false
    }
  },
  computed: {
    // 超时
    overtime () {
      if (+this.editForm.status === 1) {
        return this.timing - this.editForm.duration
      }
      return 0
    },
    // 计时时长
    timing () {
      if (!this.editForm.stime) {
        return 0
      }
      const stime = new Date(this.editForm.stime).getTime()
      const curTime = new Date().getTime()
      return (curTime - stime) / 1000
    },
    timingText () {
      return +this.editForm.category_type === 1 ? '已排队' : '已借'
    },
    isShowOverTime () {
      return (
        +this.editForm.status === 1 &&
        +this.editForm.category_type === 2 &&
        this.overtime > 0
      )
    },
    isShowTiming () {
      return +this.editForm.status === 1
    }
  },
  watch: {
    value (newValue) {
      if (newValue !== this.visible && newValue) {
        this.getReservationInfo()
      }
      this.visible = newValue
    },
    visible (newValue) {
      if (!newValue) {
        this.$refs.form && this.$refs.form.resetFields()
      }
      this.$emit('input', newValue)
    }
  },
  methods: {
    getReservationInfo () {
      this.spinning = true
      getReservationInfo({
        id: this.id
      }).then(({ data }) => {
        this.editForm = data || {}
      }).finally(() => {
        this.spinning = false
      })
    },
    submit () {
      this.setRemark()
    },
    setRemark () {
      setRemark({
        id: this.id,
        remark: this.editForm.remark
      }).then(({ success }) => {
        if (success) {
          this.$message.success('提交成功')
          this.visible = false
          this.$emit('success')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 表单行高
/deep/ .ant-form-item-control,
/deep/ .ant-form-item-label {
  line-height: 32px;
}
// 表单显示行高
.form-item-text {
  /deep/ .ant-form-item-control,
  /deep/ .ant-form-item-label {
    line-height: 24px;
  }
}
.edit-form /deep/ .ant-form-item:last-child {
  margin-bottom: 0;
}
.marginTime {
  margin-left: 12px;
}
</style>
