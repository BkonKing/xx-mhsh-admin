<template>
  <div class="mobile-container">
    <div class="mobile-nav-bar">{{ data.zzzzz || "少时诵诗书" }}</div>
    <div class="mobile-content">
      <div
        v-for="(item, index) in data.list"
        :key="index"
        class="mobile-image-box"
      >
        <img
          v-for="(img, i) in item.list"
          :key="`img${i}`"
          :src="img.url"
          class="mobile-image"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobilePreview',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    jump () {
      this.$router.push({
        name: ''
      })
    }
  }
}
</script>

<style lang="less" scoped>
.mobile-container {
  width: 100%;
  height: 669px;
  border: 1px solid #eee;
  .mobile-nav-bar {
    height: 44px;
    line-height: 44px;
    font-size: 17px;
    text-align: center;
  }
  .mobile-content {
    height: calc(100% - 44px);
    overflow: auto;
  }
  .mobile-image-box {
    display: flex;
    .mobile-image {
      flex: 1;
    }
  }
}
</style>
