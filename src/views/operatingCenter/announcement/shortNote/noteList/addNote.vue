<template>
  <div class="addNote">
    <page-header-wrapper> </page-header-wrapper>
    <a-card class="card">
      <a-form-model class="form"
                    :model='form'
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
        <a-form-model-item label='标题'>
          <a-input style="width: 400px"
                   placeholder="请输入"></a-input>
        </a-form-model-item>
        <a-form-model-item label='内容'>
          <a-textarea style="width: 400px"
                      placeholder="请输入"
                      :rows="3" />
        </a-form-model-item>
        <div class="line"></div>
        <a-form-model-item label='推送用户'>
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
        <a-form-model-item>
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
        <a-form-model-item>
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
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        radioValue: 1,
        selectValue: []
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

<style lang='less'>
.addNote {
  .card {
    margin-top: 20px;
    .form {
      width: 600px;
      height: 2000px;
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
  }
}
</style>
