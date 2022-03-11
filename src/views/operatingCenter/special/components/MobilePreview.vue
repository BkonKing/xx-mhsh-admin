<template>
  <div class="mobile-container">
    <div class="mobile-nav-bar">{{ data.title }}</div>
    <div class="mobile-content">
      <div
        v-for="(item, index) in data.list"
        :key="index"
        class="mobile-image-box"
      >
        <template v-for="(imgData, i) in item.list">
          <img
            v-if="isImageUrlString ? imgData.url : imgData.url[0]"
            :key="`img${i}`"
            :src="isImageUrlString ? imgData.url : imgData.url[0]"
            class="mobile-image"
          />
        </template>
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
    },
    imageUrlType: {
      type: String,
      default: 'string'
    }
  },
  computed: {
    isImageUrlString () {
      return this.imageUrlType === 'string'
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
    width: 375px;
    height: calc(100% - 44px);
    overflow-y: auto;
  }
  .mobile-image-box {
    display: flex;
    .mobile-image {
      flex: 1;
      width: 0;
      object-fit: cover;
    }
  }
}
</style>
