<template>
  <a-modal v-model="visible" :title="title" :destroyOnClose="true" @ok="submit">
    <a-form-model
      class="edit-form"
      ref="editForm"
      :model="editForm"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item v-if="isBatch" class="form-item-text" label="取消预约">
        <span class="alert-text">{{
          editForm.service_satisfied_desc || "--"
        }}</span>
      </a-form-model-item>
      <a-form-model-item
        label="取消原因"
        prop="service_content"
        required
        :rules="{ required: true, message: '请选择取消原因' }"
      >
        <a-select v-model="editForm.service_content" placeholder="请选择">
          <a-select-option
            v-for="option in causeOptions"
            :key="option.id"
            :value="option.id"
            >{{ option.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="补充说明" prop="service_content">
        <a-textarea
          v-model="editForm.service_content"
          :maxLength="1000"
          :autoSize="{ minRows: 4, maxRows: 4 }"
        ></a-textarea>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
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
      return this.selectKeys && this.selectKeys.length
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
      this.visible = newValue
    },
    visible (newValue) {
      this.$emit('input', newValue)
    }
  },
  methods: {
    submit () {

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
