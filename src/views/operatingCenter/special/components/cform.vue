<template>
  <div class="c-form">
    <div style="margin-bottom: 10px">
      <a-select
        v-model="formData.block_type"
        placeholder="点击后"
        @change="handleTypeChange"
        style="width: 100%;"
      >
        <a-select-option value="0">
          无
        </a-select-option>
        <a-select-option value="1">
          跳转至商品
        </a-select-option>
        <a-select-option value="2">
          跳转至链接
        </a-select-option>
        <a-select-option value="3">
          触发功能
        </a-select-option>
      </a-select>
    </div>
    <a-select
      v-if="+formData.block_type === 1"
      v-model="formData.block_content"
      show-search
      option-filter-prop="children"
      :showArrow="false"
      :dropdownMatchSelectWidth="false"
      :filter-option="false"
      :not-found-content="fetching ? undefined : null"
      placeholder="搜索商品ID/名称"
      @search="fetchGoods"
      style="width: 100%"
    >
      <a-select-option
        v-for="item in options"
        :key="item.id"
        :value="item.id"
        >{{ item.goods_name }}</a-select-option
      >
    </a-select>
    <a-select
      v-else-if="+formData.block_type === 3"
      v-model="formData.block_content"
      :options="featureOptions"
      placeholder="请选择"
      style="width: 100%"
    >
    </a-select>
    <a-input v-else v-model="formData.block_content"></a-input>
    <a-form-model ref="cForm" :model="formData">
      <a-form-model-item
        prop="block_img"
        :rules="{ required: true, message: '请上传图片' }"
        style="margin-bottom: 0;"
      >
        <upload-image v-model="formData.block_img" maxLength="1"></upload-image>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { UploadImage } from '@/components'
import { debounce, validAForm } from '@/utils/util'
import { searchGoods } from '@/api/operatingCenter/special'
// import cloneDeep from 'lodash.clonedeep'
export default {
  name: 'cform',
  components: {
    UploadImage
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    this.fetchGoods = debounce(this.fetchGoods, 500)
    return {
      formData: this.value,
      fetching: false,
      goodsOptions: [],
      featureOptions: [
        {
          label: '签到',
          value: '1'
        }
      ]
    }
  },
  computed: {
    isGoodsType () {
      return +this.formData.block_type === 1
    },
    options () {
      // 回填默认值
      if (!this.goodsOptions.length && this.formData.goods_name) {
        return [{ id: this.formData.block_content, goods_name: this.formData.goods_name }]
      }
      return this.goodsOptions
    }
  },
  watch: {
    formData: {
      handler (val) {
        this.$emit('input', val)
      },
      deep: true
    },
    value (val) {
      this.formData = val
    }
  },
  methods: {
    fetchGoods (value) {
      if (!value) {
        return
      }
      this.formData.goods_name = ''
      this.fetching = true
      searchGoods({
        goods_text: value
      }).then(({ data }) => {
        this.goodsOptions = data.list
        this.fetching = false
      })
    },
    handleTypeChange () {
      this.formData.block_content = undefined
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0 ||
        option.key == input.toLowerCase()
      )
    },
    validate () {
      if (!+this.formData.block_type) {
        return Promise.resolve()
      }
      return validAForm(this.$refs.cForm)
    }
  }
}
</script>

<style lang="less" scoped>
.c-form {
  line-height: 1;
}
/deep/ .ant-upload-list-picture-card-container,
/deep/ .ant-upload.ant-upload-select-picture-card {
  width: 100%;
  height: 110px !important;
  margin-top: 10px;
  margin-bottom: 0;
}
/deep/ .ant-form-explain {
  margin-top: -10px;
}
/deep/ .ant-upload-list-item-uploading-text {
  margin-top: 32px;
  text-align: center;
}
</style>
