<template>
  <div class="msgList">
    <a-card class="card1">
      {{form.selectValue}}
      <a-form-model :model="form"
                    layout="inline">
        <a-form-model-item label="消息状态">
          <a-select class="w150"
                    style="width: 120px"
                    v-model="form.selectValue"
                    placeholder="请选择">
            <a-select-option value="jack">
              待提交
            </a-select-option>
            <a-select-option value="lucy">
              待审核
            </a-select-option>
            <a-select-option value="disabled">
              待推送
            </a-select-option>
            <a-select-option value="Yiminghe">
              已推送
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="消息模板">
          <a-select class="w150"
                    style="width: 120px"
                    v-model="form.selectValue"
                    placeholder="请选择">
            <a-select-option value="jack">
              待提交
            </a-select-option>
            <a-select-option value="lucy">
              待审核
            </a-select-option>
            <a-select-option value="disabled">
              待推送
            </a-select-option>
            <a-select-option value="Yiminghe">
              已推送
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="搜索">
          <a-input class="w150"
                   placeholder="标题、内容"></a-input>
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
        selectValue: undefined
      }
    }
  },
  methods: {
  }
}
</script>

<style lang='less'>
.msgList {
  .w150 {
    width: 200px !important;
  }
  .card1 {
    margin-top: 20px;
  }
}
</style>
