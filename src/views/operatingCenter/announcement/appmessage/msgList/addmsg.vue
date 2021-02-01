<template>
  <div class="addmsg">
    <page-header-wrapper> </page-header-wrapper>
    <a-card class="card">
      <a-form-model class="model"
                    ref="form"
                    :model="form"
                    :rules="rules"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item label="消息模板">
          <a-select placeholder="请选择"
                    v-model="form.selectValue">
            <a-select-option value="jack">
              Jack
            </a-select-option>
            <a-select-option value="lucy">
              Lucy
            </a-select-option>
            <a-select-option value="disabled">
              Disabled
            </a-select-option>
            <a-select-option value="Yiminghe">
              yiminghe
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item class="item"
                           label="标题"
                           prop="value1">
          <a-input placeholder="请输入"
                   v-model="form.value1"></a-input>
        </a-form-model-item>
        <a-form-model-item class="item"
                           label="内容"
                           prop="value2">
          <a-textarea placeholder="请输入"
                      :auto-size="{ minRows: 3, maxRows: 5 }"
                      v-model="form.value2" />
        </a-form-model-item>
        <div class="line"></div>
        <a-form-model-item label="推送用户"
                           prop="value3">
          <a-radio-group v-model="form.value3">
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
        <a-form-model-item class="item">
          <div class="select">
            <a-select class="select1"
                      default-value="jack">
              <a-select-option value="jack">
                项目
              </a-select-option>
            </a-select>
            <a-select class="select2"
                      default-value="jack">
              <a-select-option value="jack">
                角色
              </a-select-option>
            </a-select>
          </div>
        </a-form-model-item>
        <a-form-model-item class="item">
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
        <div class="toPush"
             :style="{marginTop:marginTop1}">
          推送量：预计2000
        </div>
        <a-form-model-item class="radioGroup"
                           label="计划推送时间"
                           prop="value4">
          <a-radio-group v-model="form.value4">
            <a-radio :value="1">
              定时
            </a-radio>
            <a-radio :value="2">
              立即
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item>
          {{time}}
          <a-date-picker v-model="time"
                         format="YYYY-MM-DD HH:mm:ss"
                         :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
                         class="picker" />
        </a-form-model-item>
        <a-form-model-item class="btn item">
          <a-button type="primary"
                    @click="submit">提交审核</a-button>
          <a-button type="primary">保存</a-button>
          <a-button>取消</a-button>
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
        selectValue: '',
        value1: '',
        value2: '',
        value3: 1,
        value4: '',
        value5: ''
      },
      rules: {
        value1: [{ required: true, message: '必填', trigger: 'change' }],
        value2: [{ required: true, message: '必填', trigger: 'change' }],
        value3: [{ required: true, message: '必填', trigger: 'change' }],
        value4: [{ required: true, message: '必填', trigger: 'change' }]
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      selectPeople: '',
      marginTop: 0,
      marginTop1: 0,
      isShow: false,
      time: ''
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
    range (start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    disabledDate (current) {
      // Can not select days before today and today
      return current && current < moment().endOf('day')
    },
    onChange1 (e) {
      console.log(e.target.value)
    },
    // select值改变事件
    handleChange (value) {
      console.log(value.length)
      this.selectPeople = value.length
      if (this.selectPeople) {
        this.marginTop1 = '10px'
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
        this.marginTop1 = '10px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.addmsg {
  .item {
    margin: 20px 0;
  }
  .card {
    margin-top: 30px;
  }
  .model {
    width: 600px;
    margin: 0 auto;

    .line {
      width: 400px;
      height: 1px;
      background-color: #d9d9d9;
      margin: 20px 0;
      margin-left: 70px;
    }
    .select {
      margin-left: 80px;
      display: flex;
      align-items: center;
      .ant-select-selection__rendered {
        margin-left: 50px;
        width: 100px !important;
      }
      .ant-select-selection {
        margin-left: 20px;
      }
    }
    .tagSelect.ant-select {
      margin-left: 80px;
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
    .radioGroup {
      margin-top: 30px;
    }
    .picker {
      margin-left: 100px;
      width: 375px !important;
    }
    .btn {
      margin-left: 100px;
      button {
        margin-left: 10px;
      }
    }
  }
}
</style>
