<template>
  <a-modal
    v-model="publishVisible"
    title="发布店铺券"
    :width="600"
    @ok="publishCoupon"
    :destroyOnClose="true"
  >
    <a-form-model
      ref="publishForm"
      :model="publishForm"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item label="店铺券">
        <span
          v-for="item in active"
          :key="item.id"
          class="publish-modal-span"
          >{{ item.coupon_name }}</span
        >
      </a-form-model-item>
      <a-form-model-item
        label="发布时间"
        prop="release_type"
        style="margin-bottom: 0;"
      >
        <a-radio-group
          v-model="publishForm.release_type"
          :options="releaseTypes"
        />
        <a-form-model-item
          v-if="publishForm.release_type === '2'"
          prop="time"
          :rules="{ required: true, message: '请选择时间' }"
          style="margin-top: 12px;margin-bottom: 0;"
        >
          <a-range-picker
            v-model="publishForm.time"
            valueFormat="YYYY-MM-DD HH:mm:ss"
            :show-time="{ defaultValue: [defaultTime, defaultEndTime] }"
            :placeholder="['开始时间', '结束时间']"
            style="width: 100%;"
          />
        </a-form-model-item>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
import moment from 'moment'
import { validAForm } from '@/utils/util'
import { publishCoupon } from '@/api/userManage/business'
export default {
  name: 'PublishModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    active: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      defaultEndTime: moment('23:59:59', 'HH:mm:ss'),
      publishVisible: this.value,
      publishForm: {
        release_type: '1',
        time: []
      },
      releaseTypes: [
        { label: '立即发布', value: '1' },
        { label: '定时发布', value: '2' }
      ]
    }
  },
  watch: {
    value (newValue) {
      if (this.publishVisible !== newValue && newValue) {
        this.publishForm = {
          release_type: '1',
          time: []
        }
      }
      this.publishVisible = newValue
    },
    publishVisible (newValue) {
      this.$emit('input', newValue)
    }
  },
  methods: {
    publishCoupon () {
      validAForm(this.$refs.publishForm).then(async () => {
        const params = cloneDeep(this.publishForm)
        const time = params.time
        if (time && time.length) {
          params.plan_stime = time[0]
          params.plan_etime = time[1]
        }
        const { success } = await publishCoupon({
          shops_coupon_id_text: this.active.map(obj => obj.id).join(','),
          ...params
        })
        if (success) {
          this.$emit('success')
          this.$message.success('提交成功')
          this.publishVisible = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-form-item-control,
/deep/ .ant-form-item-label {
  line-height: 32px;
}
.publish-modal-span + .publish-modal-span::before {
  content: "、";
}
</style>
