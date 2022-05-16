<template>
  <a-modal
    v-model="visible"
    :title="title"
    :width="700"
    :destroyOnClose="true"
    @ok="submit"
  >
    <a-form-model
      ref="form"
      :model="formData"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item label="服务类型" prop="category_type">
        <a-radio-group
          v-model="formData.category_type"
          :options="serviceTypes"
        ></a-radio-group>
      </a-form-model-item>
      <a-form-model-item
        label="服务名称"
        required
        prop="category"
        :rules="{ required: true, message: '请输入服务名称' }"
      >
        <a-input
          v-model="formData.category"
          :maxLength="20"
          placeholder="请输入"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="服务地点" prop="location">
        <a-input v-model="formData.location" :maxLength="50"></a-input>
      </a-form-model-item>
      <a-form-model-item label="服务时间" prop="service_time">
        <a-input v-model="formData.service_time" :maxLength="50"></a-input>
      </a-form-model-item>
      <a-form-model-item label="服务状态" prop="status">
        <a-radio-group
          v-model="formData.status"
          :options="serviceStatus"
        ></a-radio-group>
      </a-form-model-item>
      <a-form-model-item
        v-if="formData.category_type === 2"
        label="库存"
        required
        prop="nums"
        :rules="[
          { required: true, message: '请输入库存' },
          { validator: validRepertory }
        ]"
      >
        <a-input-number
          v-model="formData.nums"
          :min="0"
          :max="9999999999"
        ></a-input-number
        ><span style="margin-left:8px;">个</span>
      </a-form-model-item>
      <a-form-model-item
        v-if="formData.category_type === 2"
        label="借用时长"
        required
        prop="duration"
        :rules="{ required: true, message: '请输入借用时长' }"
      >
        <a-input-number
          v-model="formData.duration"
          :min="0"
          :max="99999"
        ></a-input-number
        ><span style="margin-left:8px;">小时</span>
      </a-form-model-item>
      <a-form-model-item
        v-if="formData.category_type === 1"
        label="需要排队"
        prop="is_lineup"
      >
        <a-radio-group
          v-model="formData.is_lineup"
          :options="queueRadio"
        ></a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="可见用户" prop="visible_user">
        <a-checkbox-group
          v-model="formData.visible_user"
          :options="userTypes"
        />
      </a-form-model-item>
      <a-form-model-item label="可预约用户" prop="reserved_users">
        <a-checkbox-group
          v-model="formData.reserved_users"
          :options="userTypes"
          @change="handleChange"
        />
      </a-form-model-item>
      <a-form-model-item class="mb-0" label="是否启用" prop="is_enabled">
        <a-switch v-model="formData.is_enabled"></a-switch>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { addFreeCategory } from '@/api/community'
import cloneDeep from 'lodash.clonedeep'
const formData = {
  id: '',
  category_type: 1,
  category: '',
  location: '',
  service_time: '',
  status: 0,
  nums: '',
  duration: '',
  is_lineup: 0,
  visible_user: ['1', '2', '3'],
  reserved_users: ['1', '2', '3'],
  is_enabled: true
}
export default {
  name: 'CancelReservationModal',
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
  computed: {
    title () {
      return this.data && this.data.id ? '编辑服务' : '新增服务'
    }
  },
  data () {
    return {
      visible: this.value,
      formData: cloneDeep(formData),
      causeOptions: [],
      serviceTypes: [
        { value: 1, label: '人工服务' },
        { value: 2, label: '借用服务' }
      ],
      serviceStatus: [
        { value: 0, label: '正常' },
        { value: 1, label: '暂停' }
      ],
      queueRadio: [
        { value: 0, label: '无需排队' },
        { value: 1, label: '需要排队' }
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
      if (newValue !== this.visible && newValue) {
        this.$nextTick(() => {
          this.setFormData()
        })
      }
      this.visible = newValue
    },
    visible (newValue) {
      if (!newValue) {
        this.formData = cloneDeep(formData)
      }
      this.$emit('input', newValue)
    },
    'formData.visible_user': {
      handler (newValue, oldValue) {
        // 取消勾选可见：可预约自动取消勾选
        if (newValue.length < oldValue.length) {
          const cancelValue = oldValue.filter(value => {
            return !newValue.includes(value)
          })
          const reservedUser = this.formData.reserved_users
          cancelValue.forEach(value => {
            const index = reservedUser.findIndex(obj => obj === value)
            index > -1 && reservedUser.splice(index, 1)
          })
        }
      }
    }
  },
  methods: {
    setFormData () {
      if (this.data) {
        const data = cloneDeep(this.data)
        data.visible_user = data.visible_user
          ? data.visible_user.split(',')
          : []
        data.reserved_users = data.reserved_users
          ? data.reserved_users.split(',')
          : []
        data.status = data.is_stop
        data.is_enabled = !!+data.is_enabled
        this.formData = data
      }
    },
    // 可预约必定可见：勾起可预约时，可见自动勾起
    handleChange () {
      const reservedUser = this.formData.reserved_users
      const visibleUser = this.formData.visible_user
      reservedUser.forEach(value => {
        !visibleUser.includes(value) && visibleUser.push(value)
      })
    },
    submit () {
      this.$refs.form.validate(valid => {
        valid && this.addFreeCategory()
      })
    },
    addFreeCategory () {
      const params = cloneDeep(this.formData)
      params.is_enabled = params.is_enabled ? 1 : 0
      params.visible_user = params.visible_user.join(',')
      params.reserved_users = params.reserved_users.join(',')
      addFreeCategory(params).then(({ success }) => {
        if (success) {
          this.$message.success('提交成功')
          this.visible = false
          this.$emit('success')
        }
      })
    },
    validRepertory (rule, value, callback) {
      const borrowingNum = +this.formData.borrowings_num
      if (borrowingNum > value) {
        callback(
          new Error(`已借出${borrowingNum}个，库存不能小于${borrowingNum}`)
        )
      } else {
        callback()
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
