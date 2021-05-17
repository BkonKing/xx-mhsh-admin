<template>
  <div class="addTask">
    <page-header-wrapper></page-header-wrapper>
    <a-card class="card1">
      <div class="title">基础信息</div>
      <a-form-model
        class="form"
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="任务创建者">
          <a-select
            placeholder="请选择"
            style="width: 440px"
            v-model="form.value1"
          >
            <a-select-option value="jack">
              Jack
            </a-select-option>
            <a-select-option value="lucy">
              Lucy
            </a-select-option>
            <a-select-option value="disabled" disabled>
              Disabled
            </a-select-option>
            <a-select-option value="Yiminghe">
              yiminghe
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="任务类型">
          <a-select
            placeholder="请选择"
            style="width: 440px"
            v-model="form.value2"
          >
            <a-select-option value="jack">
              Jack
            </a-select-option>
            <a-select-option value="lucy">
              Lucy
            </a-select-option>
            <a-select-option value="disabled" disabled>
              Disabled
            </a-select-option>
            <a-select-option value="Yiminghe">
              yiminghe
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="任务标题">
          <a-input
            placeholder="请输入"
            style="width: 440px"
            v-model="form.value3"
            :maxLength="20"
            :suffix="form.value3.length + '/20'"
          />
        </a-form-model-item>
        <a-form-model-item label="任务奖励">
          <a-input
            placeholder="请输入"
            style="width: 440px"
            addon-after="币/人"
            v-model="form.value4"
          ></a-input>
          <div class="txt">
            同类型任务参考价500~1000幸福币
          </div>
        </a-form-model-item>
        <a-form-model-item label="任务标签">
          {{ form.value5 }}
          <a-select
            ref="select"
            mode="tags"
            style="width: 440px"
            placeholder="请输入"
            v-model="form.value5"
            @change="handleChange"
            @search='handleSearch'
          >
            <a-select-option v-for="(item) in selectArr" :key="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: []
      },
      selectArr: ['Apples', 'Nails', 'Bananas', 'Helicopters']
    }
  },
  watch: {
    form: {
      handler () {
        if (this.form.value5.length === 6) {
          this.form.value5.splice(5)
        }
      },
      deep: true
    }
  },
  created () {

  },
  methods: {
    handleChange (value) {
      console.log('value', value)
    },
    handleSearch (value) {
      // if (value.length === 10) {
      //   value.substr(0, 10)
      // }
      console.log('handleSearch', value.substr(0, 10))
    }
  }
}
</script>

<style lang="less" scoped>
.addTask {
  .card1 {
    /deep/ .ant-card-body {
      padding-top: 0;
      padding-bottom: 0;
    }
    .title {
      height: 55px;
      line-height: 55px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
    }
    .form {
      width: 650px;
      margin: 0 auto;
      .txt {
        color: rgba(0, 0, 0, 0.447058823529412);
      }
    }
  }
}
</style>
