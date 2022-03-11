<template>
  <div class="image-card">
    <div v-if="data.name" class="jump-name">
      {{ data.type | typeName }}：<template v-if="data.type === 1"
        ><a>{{ data.name }}</a></template
      ><template v-else>{{ data.name }}</template>
    </div>
    <div v-else>--</div>
    <t-image v-if="data.url" :images="[data.url]" class="special-img" />
  </div>
</template>

<script>
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
  filters: {
    typeName (value) {
      const name = {
        1: '跳转至商品',
        2: '跳转至链接',
        3: '触发功能'
      }
      return name[value]
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
