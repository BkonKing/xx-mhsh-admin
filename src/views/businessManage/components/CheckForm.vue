<template>
  <a-modal
    v-model="modalShow"
    title="商户认证审核"
    :width="600"
    :destroyOnClose="true"
    @ok="handleSubmit"
  >
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <h3 v-if="isJustOne">商家认证</h3>
      <template v-if="isJustOne">
        <a-form-model-item v-if="showUser" label="商家用户"
          >{{ onlyData.nickname }}({{ onlyData.realname }})
          {{ onlyData.mobile }}</a-form-model-item
        >
        <a-form-model-item label="经营者"
          >{{ onlyData.operator_realname }}
          {{ onlyData.operator_mobile }}</a-form-model-item
        >
        <a-form-model-item label="认证类型">{{
          aType ? "个人" : "商户"
        }}</a-form-model-item>
        <a-form-model-item :label="aType ? '身份证' : '营业执照'">
          <a-row type="flex">
            <a-col>
              <upload-image
                v-model="onlyData.voucher_img_data"
                maxLength="1"
                :disabled="true"
              ></upload-image>
            </a-col>
            <!-- <a-col>
              <upload-image
                v-model="onlyData.voucher_img_data"
                maxLength="1"
                :openFileDialogOnClick="false"
              ></upload-image>
            </a-col> -->
          </a-row>
        </a-form-model-item>
      </template>
      <h3 v-if="isJustOne">审核信息</h3>
      <div v-if="!isJustOne">
        <a-form-model-item label="商家用户">
          <a
            v-for="(item, index) in data"
            :key="item.id"
            :href="`${userUrl}?uid=${item.uid}&isShop=1`"
            target="_blank"
            >{{ item.nickname }}({{ item.realname }})<template
              v-if="index !== data.length - 1"
              >、</template
            ></a
          >
        </a-form-model-item>
      </div>
      <a-form-model-item label="审核结果" prop="a_state">
        <a-radio-group v-model="form.a_state">
          <a-radio :value="3">
            通过
          </a-radio>
          <a-radio :value="2">
            不通过
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="审核说明" prop="explain">
        <a-textarea
          v-model="form.explain"
          placeholder="请输入"
          :auto-size="{ minRows: 3, maxRows: 5 }"
          style="max-width: 328px;"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import { mapGetters } from 'vuex'
import { UploadImage } from '@/components'
import { editShopAttestation, setShopAttestation } from '@/api/userManage/business'
const form = {
  a_state: 3,
  explain: ''
}
export default {
  name: 'CheckForm',
  components: {
    UploadImage
  },
  props: {
    showUser: {
      type: Boolean,
      default: true
    },
    type: {
      type: Number,
      default: 0
    },
    value: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(['projectId', 'isParentProject']),
    userUrl () {
      return this.isParentProject
        ? '/zht/user/user/getUserList'
        : '/xmht/household/member/getMemberList'
    },
    isJustOne () {
      return this.data.length < 2
    },
    onlyData () {
      return this.data[0] || {}
    },
    aType () {
      return +this.onlyData.a_type === 1
    }
  },
  data () {
    return {
      modalShow: this.value,
      form: clonedeep(form),
      rules: {
        a_state: [{ required: true, message: '请填写', trigger: 'change' }]
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }
  },
  watch: {
    value (val) {
      this.modalShow = val
    },
    modalShow (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    // 审核
    handleSubmit () {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            +this.type ? this.amendAttestation() : this.setShopAttestation()
          } else {
            reject(new Error(false))
            return false
          }
        })
      })
    },
    amendAttestation () {
      const params = clonedeep(this.form)
      editShopAttestation({
        ...params,
        shops_attestation_log_id: this.data[0].logId
      }).then(({ success, message }) => {
        if (success) {
          this.$message.success('修改成功')
          this.modalShow = false
          this.$emit('submit')
        } else {
          this.$message.error(message)
        }
      })
    },
    setShopAttestation () {
      const params = clonedeep(this.form)
      params.shops_id_text = this.data.map(obj => obj.id).join(',')
      setShopAttestation(params).then(({ success, message }) => {
        if (success) {
          this.$message.success('保存成功')
          this.modalShow = false
          this.$emit('submit')
        } else {
          this.$message.error(message)
        }
      })
    },
    resetFields () {
      this.form = clonedeep(form)
    }
  }
}
</script>

<style lang="less" scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

/deep/ .ant-form-item {
  margin-bottom: 16px;
}
</style>
