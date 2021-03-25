<template>
  <div class="addNote">
    <page-header-wrapper> </page-header-wrapper>
    <a-card class="card">
      <a-form-model class="form"
                    :model='form'
                    ref="form"
                    :rules='rules'
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item label='短信模板'>
          <a-select placeholder="请选择"
                    style="width: 400px">
            <a-select-option value="1">
              Jack
            </a-select-option>
            <a-select-option value="2">
              Lucy
            </a-select-option>
            <a-select-option value="3">
              yiminghe
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item prop='titleValue'
                           class="item2"
                           label='标题'>
          <a-input v-model="form.titleValue"
                   style="width: 400px"
                   placeholder="请输入"></a-input>
        </a-form-model-item>
        <a-form-model-item prop='contentValue'
                           class="item2"
                           label='内容'>
          <a-textarea v-model="form.contentValue"
                      style="width: 400px"
                      placeholder="请输入"
                      :rows="3" />
        </a-form-model-item>
        <div class="line"></div>
        <a-form-model-item prop='radioValue'
                           label='推送用户'>
          <a-radio-group v-model="form.radioValue">
            <a-radio :value="1">
              全部
            </a-radio>
            <a-radio :value="2">
              部分
            </a-radio>
            <a-radio :value="3">
              指定
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item class="item2">
          <div class="selects">
            <a-select class="select"
                      placeholder="项目">
              <a-select-option value="1">
                Jack
              </a-select-option>
              <a-select-option value="2">
                Lucy
              </a-select-option>
              <a-select-option value="3">
                yiminghe
              </a-select-option>
            </a-select>
            <a-select class="select"
                      placeholder="角色">
              <a-select-option value="1">
                Jack
              </a-select-option>
              <a-select-option value="2">
                Lucy
              </a-select-option>
              <a-select-option value="3">
                yiminghe
              </a-select-option>
            </a-select>
          </div>
        </a-form-model-item>
        <a-form-model-item class="item2">
          <a-select class="tagSelect"
                    mode="tags"
                    style="width: 100%"
                    :token-separators="[',']"
                    @change="handleChange"
                    @dropdownVisibleChange="openDropDown">
            <a-select-option v-for="i in 10"
                             :key="i.toString(36)">
              <div class="selectItem">用户昵称
                <span class="mg200">业主</span>
              </div>
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <div class="selectPeople"
             v-if="selectPeople"
             :style="{marginTop:marginTop}">已选{{selectPeople}}人</div>
        <a-form-model-item class="toPush"
                           :style="{marginTop:marginTop1}">
          推送量：预计2000
        </a-form-model-item>
        <a-form-model-item prop='pushTime'
                           label='计划推送时间'>
          <a-radio-group v-model="form.pushTime">
            <a-radio :value="1">
              定时
            </a-radio>
            <a-radio :value="2">
              立即
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item class="item2">
          <a-date-picker class="picker"
                         format="YYYY-MM-DD HH:mm:ss"
                         :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }" />
        </a-form-model-item>
        <a-form-model-item class="item2">
          <div class="btns">
            <a-button type='primary'
                      @click="submit">提交审核</a-button>
            <a-button type='primary'>保存</a-button>
            <a-button>取消</a-button>
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      form: {
        titleValue: '',
        contentValue: '',
        radioValue: 1,
        selectValue: [],
        pushTime: ''
      },
      rules: {
        titleValue: [{ required: true, message: '必填', trigger: 'change' }],
        contentValue: [{ required: true, message: '必填', trigger: 'change' }],
        radioValue: [{ required: true, message: '必填', trigger: 'change' }],
        pushTime: [{ required: true, message: '必填', trigger: 'change' }]
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      selectPeople: '',
      marginTop: 0,
      marginTop1: 0,
      isShow: false
    }
  },
  methods: {
    // 提交审核
    submit () {
      this.$refs.form.validate(result => {
        if (result) {
          this.$message.success('验证通过')
        } else {
          this.$message.error('验证失败')
        }
      })
    },
    moment,
    // select值改变事件
    handleChange (value) {
      console.log(value.length)
      this.selectPeople = value.length
      if (this.selectPeople) {
        this.marginTop1 = '0px'
      } else {
        if (this.isShow) {
          this.marginTop1 = '256px'
        } else {
          this.marginTop1 = '0px'
        }
      }
    },
    // 展开下拉菜单事件
    openDropDown (open) {
      this.isShow = open
      if (open) {
        this.marginTop = '256px'
        this.marginTop1 = '256px'
      } else {
        this.marginTop = '0'
        this.marginTop1 = '0px'
      }
    }
  }
}
</script>

<style lang='less' scoped>
.addNote {
  .card {
    margin-top: 20px;
    .form {
      width: 600px;
      margin: 0 auto;
    }
    .line {
      margin: 30px 0;
      height: 1px;
      background-color: #ebebeb;
    }
    .ant-input {
      max-width: 400px !important;
    }
    .selects {
      display: flex;
      align-items: center;
      .select:first-child {
        margin-left: 102px;
      }
      .select:last-child {
        margin-left: 20px;
      }
      .ant-select-selection {
        width: 193px;
      }
    }
    .tagSelect.ant-select {
      margin-left: 102px;
      width: 375px !important;
    }
    .selectPeople {
      margin-left: 100px;
      // margin-top: 256px;
      color: #c0c0c0;
    }
    .toPush {
      margin-top: 10px;
      margin-left: 100px;
    }
    .ant-select-selection--multiple {
      width: 405px;
    }
    .picker {
      margin-left: 100px;
      width: 400px;
    }
    .btns {
      margin-left: 100px;
      button:nth-child(n + 2) {
        margin-left: 10px;
      }
    }
    .item2 {
      margin-top: 20px;
    }
  }
}
</style>
