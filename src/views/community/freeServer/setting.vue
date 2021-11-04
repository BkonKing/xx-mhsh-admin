<template>
  <page-header-view>
    <a-card title="取消预约">
      <a-form-model
        class="edit-form"
        ref="form"
        :model="editForm"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-form-model-item label="取消原因" required>
          <a-row
            v-for="(item, index) in editForm.cancelList"
            :key="item.id"
            type="flex"
            :gutter="20"
            style="margin-bottom: 24px;"
          >
            <a-col flex="1"
              ><a-form-model-item
                :prop="`cancelList.${index}.content`"
                :rules="{ required: true, message: '请输入取消原因' }"
              >
                <a-input
                  v-model="item.content"
                  :maxLength="20"
                  placeholder="取消原因"
                  @change="setChange"
                ></a-input></a-form-model-item
            ></a-col>
            <a-col flex="1"
              ><a-form-model-item>
                <a-input
                  v-model="item.list_order"
                  :maxLength="20"
                  v-number-input
                  @blur="changeSort"
                  @change="setChange"
                  placeholder="排序"
                ></a-input></a-form-model-item
            ></a-col>
            <a-col>
              <a-icon
                class="close-btn"
                type="minus-circle"
                @click="delCancel(index)"
              />
            </a-col>
          </a-row>
          <div class="addBtn" @click="addCancel">+ <span>添加</span></div>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <footer-tool-bar style="width: 100% !important;">
      <a-button @click="goback" style="margin-right: 15px;">
        取消
      </a-button>
      <a-button
        type="primary"
        :disabled="!isChange"
        :loading="loading"
        @click="submit"
      >
        提交
      </a-button>
    </footer-tool-bar>
  </page-header-view>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar'
import PageHeaderView from '@/layouts/PageHeaderView'
import { addCancelReason, getCancelReasonSettingList } from '@/api/community'
export default {
  name: 'freeServerSetting',
  components: {
    FooterToolBar,
    PageHeaderView
  },
  data () {
    return {
      editForm: {
        cancelList: []
      },
      isChange: false,
      loading: false
    }
  },
  created () {
    this.getCancelReasonSettingList()
  },
  methods: {
    getCancelReasonSettingList () {
      getCancelReasonSettingList().then(({ list }) => {
        this.editForm.cancelList = list || []
        this.$nextTick(() => {
          this.isChange = false
        })
      })
    },
    changeSort (e) {
      this.editForm.cancelList = this.editForm.cancelList.sort((el1, el2) => {
        return parseInt(el2.list_order) - parseInt(el1.list_order)
      })
    },
    setChange () {
      this.isChange = true
    },
    addCancel () {
      this.editForm.cancelList.push({
        id: Math.random() * 100000,
        content: '',
        list_order: ''
      })
    },
    delCancel (index) {
      this.editForm.cancelList.splice(index, 1)
      this.setChange()
    },
    submit () {
      // 先清除未输入行
      this.editForm.cancelList = this.editForm.cancelList.filter(obj => {
        return obj.content || obj.list_order
      })
      this.$nextTick(() => {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.saveCancelReason()
          } else {
            return false
          }
        })
      })
    },
    saveCancelReason () {
      this.loading = true
      addCancelReason({
        reason_list: this.editForm.cancelList
      })
        .then(({ success }) => {
          if (success) {
            this.isChange = false
            this.$message.success('提交成功')
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    goback () {
      this.$router.go(-1)
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
.addBtn {
  width: 100%;
  height: 32px;
  border-radius: 4px;
  border: 1px dashed #d9d9d9;
  text-align: center;
  line-height: 28px;
  cursor: pointer;
}
.close-btn {
  display: flex;
  margin-top: 7px;
  font-size: 18px;
}
</style>
