<template>
  <div class="c-form">
    <div style="margin-bottom: 10px">
      <a-select
        v-model="val.block_type"
        placeholder="点击后"
        @change="handleTypeChange"
        style="width: 100%;"
      >
        <a-select-option :value="0">
          无
        </a-select-option>
        <a-select-option :value="1">
          跳转至商品
        </a-select-option>
        <a-select-option :value="2">
          跳转至链接
        </a-select-option>
        <a-select-option :value="3">
          触发功能
        </a-select-option>
      </a-select>
    </div>
    <a-select
      v-if="val.block_type === 1"
      v-model="val.block_content"
      show-search
      option-filter-prop="children"
      :allowClear="true"
      :showArrow="false"
      :dropdownMatchSelectWidth="false"
      :filter-option="filterOption"
      placeholder="搜索商品ID/名称"
      style="width: 100%"
    >
      <a-select-option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
        >{{ item.label }}</a-select-option
      >
    </a-select>
    <a-select
      v-else-if="val.block_type === 3"
      v-model="val.block_content"
      :options="featureOptions"
      placeholder="请选择"
      style="width: 100%"
    >
    </a-select>
    <a-input
      v-else
      v-model="val.block_content"
    ></a-input>
    <upload-image v-model="val.block_img" maxLength="1"></upload-image>
  </div>
</template>

<script>
import { UploadImage } from '@/components'
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
    },
    goodsOptions: {
      type: Array,
      default: () => []
    },
    specialOptions: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      val: this.value,
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
      return this.val.block_type === 1
    },
    options () {
      if (!this.val.block_type) {
        return []
      }
      return this.isGoodsType ? this.newGoodsOptions : this.newSpecialOptions
    },
    newGoodsOptions () {
      return this.goodsOptions.map(obj => {
        return {
          value: obj.id,
          label: obj.goods_name
        }
      })
    },
    newSpecialOptions () {
      return this.specialOptions.map(obj => {
        return {
          value: obj.id,
          label: obj.title
        }
      })
    }
  },
  watch: {
    val: {
      handler (val) {
        this.$emit('input', val)
      },
      deep: true
    },
    value (val) {
      this.val = val
    }
  },
  methods: {
    handleTypeChange () {
      this.val.id = ''
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0 ||
        option.key == input.toLowerCase()
      )
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
}
/deep/ .ant-upload-list-item-uploading-text {
  margin-top: 32px;
  text-align: center;
}
</style>
