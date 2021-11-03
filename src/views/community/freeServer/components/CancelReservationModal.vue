<template>
  <a-modal v-model="visible" :title="title" :destroyOnClose="true" @ok="submit">
    <a-form-model
      class="edit-form"
      ref="form"
      :model="editForm"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item v-if="isBatch" class="form-item-text" label="取消预约">
        <span class="alert-text">{{
          selectKeys.length || "0"
        }}个</span>
      </a-form-model-item>
      <a-form-model-item
        label="取消原因"
        prop="cancel_id"
        required
        :rules="{ required: true, message: '请选择取消原因' }"
      >
        <a-select v-model="editForm.cancel_id" placeholder="请选择">
          <a-select-option
            v-for="option in causeOptions"
            :key="option.id"
            :value="option.id"
            >{{ option.content }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="补充说明" prop="note">
        <a-textarea
          v-model="editForm.note"
          :maxLength="1000"
          :autoSize="{ minRows: 4, maxRows: 4 }"
        ></a-textarea>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { optReservation, getCancelReason } from '@/api/community'
export default {
  name: 'CancelReservationModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    selectKeys: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    isBatch () {
      return this.selectKeys && this.selectKeys.length > 1
    },
    title () {
      return this.isBatch ? '批量取消预约' : '取消预约'
    }
  },
  data () {
    return {
      visible: this.value,
      editForm: {},
      causeOptions: []
    }
  },
  watch: {
    value (newValue) {
      if (newValue && newValue !== this.visible) {
        this.getCancelReason()
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
    getCancelReason () {
      getCancelReason().then(({ list }) => {
        this.causeOptions = list || []
      })
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.cancelService()
        } else {
          return false
        }
      })
    },
    cancelService () {
      optReservation({
        type: 2, // 1设置完成 2取消
        ids: this.selectKeys,
        ...this.editForm
      }).then(({ success }) => {
        if (success) {
          this.$emit('success')
          this.visible = false
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
.alert-text {
  color: @error-color;
}
</style>
