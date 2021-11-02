<template>
  <a-modal
    v-model="visible"
    :title="title"
    :width="700"
    :destroyOnClose="true"
    @ok="submit"
  >
    <a-form-model
      class="edit-form"
      ref="form"
      :model="formData"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item label="服务类型" prop="aa">
        <a-radio-group
          v-model="formData.aa"
          :options="serviceTypes"
        ></a-radio-group>
      </a-form-model-item>
      <a-form-model-item
        label="服务名称"
        required
        prop="bb"
        :rules="{ required: true, message: '请输入服务名称' }"
      >
        <a-input
          v-model="formData.bb"
          :maxLength="20"
          placeholder="请输入"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="服务地点" prop="cc">
        <a-input v-model="formData.cc" :maxLength="50"></a-input>
      </a-form-model-item>
      <a-form-model-item label="服务时间" prop="dd">
        <a-input v-model="formData.dd" :maxLength="50"></a-input>
      </a-form-model-item>
      <a-form-model-item label="服务状态" prop="ee">
        <a-radio-group
          v-model="formData.ee"
          :options="serviceStatus"
        ></a-radio-group>
      </a-form-model-item>
      <a-form-model-item
        v-if="formData.aa === '2'"
        label="库存"
        required
        prop="zz"
        :rules="{ required: true, message: '请输入库存' }"
      >
        <a-input-number
          v-model="formData.zz"
          :min="1"
          :max="9999999999"
        ></a-input-number
        ><span style="margin-left:8px;">个</span>
      </a-form-model-item>
      <a-form-model-item
        v-if="formData.aa === '2'"
        label="借用时长"
        required
        prop="yy"
        :rules="{ required: true, message: '请输入借用时长' }"
      >
        <a-input-number
          v-model="formData.yy"
          :min="0"
          :max="99999"
        ></a-input-number
        ><span style="margin-left:8px;">小时</span>
      </a-form-model-item>
      <a-form-model-item label="需要排队" prop="ff">
        <a-radio-group
          v-model="formData.ff"
          :options="queueRadio"
        ></a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="可见用户" prop="oo">
        <a-checkbox-group v-model="formData.oo" :options="userTypes" />
      </a-form-model-item>
      <a-form-model-item label="可预约用户" prop="pp">
        <a-checkbox-group
          v-model="formData.pp"
          :options="userTypes"
          @change="handleChange"
        />
      </a-form-model-item>
      <a-form-model-item label="是否启用" prop="xx">
        <a-switch v-model="formData.xx"></a-switch>
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
      type: [Array, Object],
      default: () => []
    }
  },
  computed: {
    isBatch () {
      return this.selectKeys && this.selectKeys.length
    },
    title () {
      return this.isBatch ? '编辑服务' : '新增服务'
    }
  },
  data () {
    return {
      visible: this.value,
      formData: {
        aa: '1',
        ee: '1',
        ff: '1',
        oo: ['1', '2', '3'],
        pp: ['1', '2', '3'],
        xx: true
      },
      causeOptions: [],
      serviceTypes: [
        { value: '1', label: '人工服务' },
        { value: '2', label: '借用服务' }
      ],
      serviceStatus: [
        { value: '1', label: '正常' },
        { value: '2', label: '暂停' }
      ],
      queueRadio: [
        { value: '1', label: '无需排队' },
        { value: '2', label: '需要排队' }
      ],
      userTypes: [
        { label: '已认证用户', value: '1' },
        { label: '游客-未认证业主', value: '2' },
        { label: '游客-定位', value: '3' }
      ]
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
      if (newValue) {
        this.formData = newValue
      } else {
        this.$refs.form && this.$refs.form.resetField()
      }
    },
    'formData.oo': {
      handler (newValue, oldValue) {
        // 取消勾选可见：可预约自动取消勾选
        if (newValue.length < oldValue.length) {
          const cancelValue = []
          oldValue.forEach(value => {
            !newValue.includes(value) && cancelValue.push(value)
          })
          this.formData.pp.forEach((value, index) => {
            cancelValue.includes(value) && this.formData.pp.splice(index, 1)
          })
        }
      }
    }
  },
  methods: {
    // 可预约必定可见：勾起可预约时，可见自动勾起
    handleChange () {
      this.formData.pp.forEach(value => {
        if (!this.formData.oo.includes(value)) {
          this.formData.oo.push(value)
        }
      })
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {

        } else {
          return false
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
.edit-form /deep/ .ant-form-item:last-child {
  margin-bottom: 0;
}
</style>
