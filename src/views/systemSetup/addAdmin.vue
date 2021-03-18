<template>

  <a-modal v-model="isShow"
           okText='保存'
           cancelText='关闭'
           @ok="add">
    <template #title>
      <div class="title">
        {{mode==='add'?'新增':'编辑'}}
      </div>
    </template>
    <a-form-model :model="form"
                  ref="form"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol"
                  :rules="rules">
      <a-form-model-item label='用户名'
                         prop="account">
        <a-input v-model="form.account"></a-input>
      </a-form-model-item>
      <a-form-model-item label='密码'>
        <a-input v-model="form.password"></a-input>
        <div class="txt">
          创建新用户时不输入密码，则默认密码为888888。如果修改用户信息不输入密码则不会变更用户的密码
        </div>
      </a-form-model-item>
      <a-form-model-item label='所属权限组'
                         prop="roleId">
        <a-tree-select v-model="form.roleId"
                       style="width: 100%"
                       :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                       :tree-data="roleList"
                       placeholder="Please select"
                       tree-default-expand-all
                       :replaceFields='{key:"id",title:"role_name",value:"id"}'>
          <span slot="title"
                slot-scope="{title }"
                style="color: #08c">
            {{title}}
          </span>
        </a-tree-select>
        <div class="txt">
          当前用户所拥有的权限对应的角色
        </div>
      </a-form-model-item>
      <a-form-model-item label='真实姓名'>
        <a-input v-model="form.realName"></a-input>
      </a-form-model-item>
      <a-form-model-item label='手机号'>
        <a-input v-model="form.mobile"
                 :maxLength="11"></a-input>
      </a-form-model-item>
      <a-form-model-item label='性别'>
        <a-radio-group v-model="form.gender">
          <a-radio :value="1">
            男
          </a-radio>
          <a-radio :value="2">
            女
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { getRoles, addAdmin, updateAdmin } from '@/api/systemSetup.js'
export default {
  watch: {
    isShow (newVal) {
      if (newVal === false) {
        this.form = {
          account: '', // 否varchar管理员登录账户
          password: '', // 否varchar登录密码
          realName: '', // 否varchar姓名
          mobile: '', // 否varchar手机号
          gender: '', // 否int性别
          roleId: '' // 否int权限角色ID
        }
      }
      this.$nextTick(() => {
        this.$refs.form.clearValidate(['account', 'roleId'])
      })
    }
  },
  data () {
    return {
      isShow: false,
      mode: 'add',
      form: {
        account: '', // 否varchar管理员登录账户
        password: '', // 否varchar登录密码
        realName: '', // 否varchar姓名
        mobile: '', // 否varchar手机号
        gender: '', // 否int性别
        roleId: '' // 否int权限角色ID
      },
      rules: {
        account: [{ required: true, message: '请输入用户名', trigger: 'change' }],
        roleId: [{ required: true, message: '请选择权限组', trigger: 'change' }]
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      treeExpandedKeys: [],
      roleList: []
    }
  },
  methods: {
    // 新增 编辑 管理员
    add () {
      this.$refs.form.validate(async result => {
        if (result) {
          if (this.mode === 'add') {
            await addAdmin(this.form)
          } else {
            await updateAdmin(this.form)
          }
          this.$parent.getData()
          // this.$parent.pagination.currentPage = 1
          this.isShow = false
        }
      })
    }
  },
  async created () {
    const res = await getRoles()
    this.roleList = res.data
  }
}
</script>

<style lang='less' scoped>
.title {
  height: 20px;
}
/deep/ .ant-modal-content {
  width: 600px;
}
/deep/ .ant-modal-footer {
  text-align: center;
}
.txt {
  background-color: #c8e9f3;
  color: #255b6c;
  padding: 15px;
  line-height: normal;
  border-radius: 10px;
}
</style>
