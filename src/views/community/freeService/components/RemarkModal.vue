<template>
  <a-modal
    v-model="visible"
    title="备注预约"
    :destroyOnClose="true"
    @ok="submit"
  >
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
          >{{ editForm.owner }}</a
        ><span>{{ editForm.mobile }}</span>
      </a-form-model-item>
      <a-form-model-item class="form-item-text" label="预约服务">
        {{ editForm.service_satisfied_desc || "--" }}
        <div>借用服务 - 服务项目名称</div>
        (超时1天 20:00 已借1天 02:12)
      </a-form-model-item>
      <a-form-model-item class="form-item-text" label="服务状态">
        {{ editForm.service_satisfied_desc || "--" }}
      </a-form-model-item>
      <a-form-model-item label="备注" prop="service_content">
        <a-textarea
          v-model="editForm.service_content"
          :maxLength="1000"
          :autoSize="{ minRows: 4, maxRows: 4 }"
        ></a-textarea>
      </a-form-model-item>
      <a-form-model-item class="form-item-text" label="预约时间">
        {{ editForm.service_satisfied_desc || "--" }}
      </a-form-model-item>
      <a-form-model-item class="form-item-text" label="开始时间">
        {{ editForm.service_satisfied_desc || "--" }}
      </a-form-model-item>
      <a-form-model-item class="form-item-text" label="结束时间">
        <div>{{ editForm.service_satisfied_desc || "--" }}</div>
        <div v-if="true">
          用户取消-取消原因原因（补充说明内容内容内容内容内容）
        </div>
        <div v-else>
          后台取消(后台账号名称)-取消原因原因（补充说明内容内容内容内容内容）
        </div>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  name: 'RemarkModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      visible: this.value,
      editForm: this.data
    }
  },
  watch: {
    value (newValue) {
      this.visible = newValue
    },
    visible (newValue) {
      this.$emit('input', newValue)
    },
    data (newValue) {
      this.editForm = newValue
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
</style>
