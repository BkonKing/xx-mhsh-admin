<template>
   <a-modal v-model="isShow" title="新增/修改群" @ok='submit'>
      <a-form-model :model="form" :rules='rules' :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="群名称" prop='group_name'>
                <a-input v-model="form.group_name" :maxLength='10'  :suffix="form.group_name.length+'/10'" />
        </a-form-model-item>
        <a-form-model-item label="允许加入">
           <a-switch :default-checked='checked' @change="changeSwitch" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
</template>

<script>
import { toAddGroup } from '@/api/taskCentre'
export default {
  data () {
    return {
       labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        group_name: ''
      },
      rules: {
        group_name: [{ required: true, message: '必填', trigger: 'change' }]
      },
      isShow: false,
      checked: true
    }
  },
  watch: {
    isShow (newVal) {
      if (newVal === false) {
        this.form.group_name = ''
        this.checked = true
      }
    }
  },
  methods: {
    // 添加群
   async submit () {
     if (this.form.group_name === '') {
       this.$message.error('请输入群名称')
       return
     }
   await toAddGroup({
      group_name: this.form.group_name,
      is_open: this.checked ? 1 : 0
    })
    // console.log('添加群', res)
    this.$parent.getData()
    this.$message.success('创建成功')
    this.isShow = false
    },
    // 是否开启
    changeSwitch (checked) {
      console.log(checked)
      this.checked = checked
    }
  }
}
</script>

<style>

</style>
