<template>
  <div class="image-card">
    <div v-if="+data.block_type" class="jump-name">
      {{ data.block_type | typeName }}：<template v-if="+data.block_type === 1"
        ><a :href="goodsDetailUrl" target="_blank">{{
          data.goods_name
        }}</a></template
      ><template v-else-if="+data.block_type === 2">{{
        data.block_content
      }}</template
      ><template v-else>{{ data.block_content | featureText }}</template>
    </div>
    <div v-else>--</div>
    <t-image
      v-if="data.block_img"
      :images="[data.block_img]"
      class="special-img"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TImage } from '@/components'

export default {
  name: 'ImageCard',
  components: {
    TImage
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters(['projectId', 'isParentProject']),
    goodsDetailUrl () {
      const id = this.data.block_content
      return this.isParentProject
        ? `/zht/life/goods/getGoodsList?goods_id=${id}`
        : `/xmht/life/goods/getGoodsList?goods_id=${id}`
    }
  },
  filters: {
    typeName (value) {
      const name = {
        1: '跳转至商品',
        2: '跳转至链接',
        3: '触发功能'
      }
      return name[value]
    },
    featureText (value) {
      let text = '--'
      const textObj = {
        1: '签到'
      }
      value && (text = textObj[value])
      return text
    }
  }
}
</script>

<style lang="less" scoped>
.special-img {
  /deep/ .image-box {
    margin: 0;
  }
  /deep/ img {
    width: 100% !important;
    height: initial !important;
    max-height: 120px;
  }
}
.image-card {
  width: 100%;
}
.jump-name {
  width: 100%;
  margin-bottom: 10px;
  white-space: break-spaces;
  .textOverflowMultiLine();
}
</style>
