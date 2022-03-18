<template>
  <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item label="提现用户">
      <div v-if="shopUser && shopUser.length">
        商家用户 -
        <a
          v-for="(item, index) in shopUser"
          :key="item.mobile"
          :href="`${userUrl}?uid=${item.uid}&isShop=1`"
          target="_blank"
        >
          {{ item.realname }}({{ item.mobile }}){{index === shopUser.length - 1 ? '' : '、'}}
        </a>
      </div>
      <div v-if="projectUser && projectUser.length">
        项目账户 -
        <span v-for="(item, index) in projectUser" :key="item.mobile">
          {{ item.realname }}({{ item.mobile }}){{index === projectUser.length - 1 ? '' : '、'}}
        </span>
      </div>
    </a-form-model-item>
    <a-form-model-item label="提现幸福币">
      {{ data.cash_credits }}
    </a-form-model-item>
    <a-form-model-item label="提现人民币">
      {{ data.cash_rmb }}（实际提现<span style="font-size: 22px;color: red;line-height: 1;"
        >￥{{ data.actual_rmb }}</span
      >）
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters(['userUrl']),
    projectUser () {
      return this.data.project_account || []
    },
    shopUser () {
      return this.data.shops_account || []
    }
  },
  data () {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }
  }
}
</script>

<style></style>
