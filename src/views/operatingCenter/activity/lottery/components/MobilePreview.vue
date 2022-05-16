<template>
  <div class="mobile-container">
    <div class="mobile-nav-bar">{{ title }}</div>
    <img class="bg" src="@/assets/award/index-bg.png" mode="aspectFill" />
    <div class="award-container">
      <div class="award-text-1">{{ consumeText }}</div>
      <div class="award-text-2">今天还有 {{ infoData.chance_frequency || 0 }} 次机会</div>
      <div class="award-box">
        <div class="award-circle" :class="{ 'award-no-img': !isHaveImage }">
          <div
            v-for="(item, index) in listData"
            :key="index"
            class="award-item"
            :style="{
              transform: `rotate(${rotateDeg * index}deg)`
            }"
          >
            <div
              class="award-item-inner"
              :style="{
                transform: `translateX(-125px) rotate(${360 / len}deg)`
              }"
            ></div>
            <template v-if="isHaveImage">
              <div class="award-image-box" :style="noImageTextStyle">
                <span class="award-name">{{ item.award_name }}</span>
                <img :src="item.img" class="award-image" mode="widthFix" />
              </div>
            </template>
            <div
              v-if="!isHaveImage"
              class="award-name"
              :style="noImageTextStyle"
            >
              {{ item.award_name }}
            </div>
          </div>
        </div>
        <img
          class="award-btn"
          src="@/assets/award/start-btn.png"
          mode="aspectFill"
        />
      </div>
    </div>
    <div class="award-explain-container">
      <img
        class="award-explain-title-image"
        src="@/assets/award/title.png"
        mode="aspectFill"
      />
      <div class="award-explain-content">
        <div
          class="award-explain-text"
          v-html="activityExplain.replace(/\r\n|\n/g, '<br/>')"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobilePreview',
  props: {
    infoData: {
      type: Object,
      default: () => ({})
    },
    listData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      id: '', // 预览
      run: false, // 是否在转动
      activeIndex: 0, // 中奖索引 转盘图片排序 顺时针开始
      activeMessage: '',
      rotateAngle: 0, // 旋转角度
      width: 500,
      config: {
        duration: 8000, // 总旋转时间 ms级
        mode: 'ease-in-out', // 由快到慢 惯性效果都省了
        circle: 12 // 旋转圈数
      }
    }
  },
  computed: {
    title () {
      return this.infoData.title || '转盘抽奖'
    },
    consumeText () {
      const { consume, free_frequency: freeNum } = this.infoData
      if (+consume === 0) {
        return '免费抽奖'
      } else {
        const freeNumText = +freeNum ? `，前${freeNum}次免费` : ''
        return `抽奖每次消耗${consume}幸福币${freeNumText}`
      }
    },
    activityExplain () {
      return this.infoData.explain || ''
    },
    len () {
      return this.listData.length || 0
    },
    rotateDeg () {
      return this.len ? 360 / this.len : 0
    },
    isHaveImage () {
      return this.listData.some(obj => obj.img)
    },
    noImageTextStyle () {
      // PY：偏移，DB：底边
      // 半径
      const radius = this.width / 2
      // 文字旋转角度，将其旋转成正的
      const textDeg = this.rotateDeg / 2
      // 直角三角形另一个角
      const bDeg = 90 - textDeg
      // 第三边对应的sin值
      const sinOther = Math.sin(((2 * Math.PI) / 360) * bDeg)
      // 扇形圆心角一半角对应的sin值
      const sinTextDeg = Math.sin(((2 * Math.PI) / 360) * textDeg)
      // 直角对应的sin值,值为1
      const sinZhijiao = Math.sin(((2 * Math.PI) / 360) * 90)
      // 一半的扇形弧线两点直线距离（底边的一半）
      // 这个三角形为圆心到底边、一半底边和一条半径组成的直角三角形
      const halfDB = sinTextDeg * (radius / sinZhijiao)
      // 文本框的宽度
      const width = halfDB * 2
      const textWidth = 24

      // 实际移动距离（斜边）：和偏移量形成的直角三角形来计算
      function getRealityNum (value) {
        return (value / sinOther) * sinZhijiao
      }

      // 文本框旋转到居中,原本的文本框跟随扇形会产生偏移，宽度不是实际宽度
      // 旋转后宽度会变小，所以产生left偏移量，左右两边移动时只需计算一边，所以除以2
      var textPYWidth =
        (width * Math.cos(((2 * Math.PI) / 360) * textDeg) +
          radius * sinTextDeg -
          width) /
        2
      // 实际移动距离（斜边）：和偏移量形成的直角三角形来计算
      textPYWidth = getRealityNum(textPYWidth)

      // 圆心到底边的直角边：和半径、底边一半组成直角三角形
      var top = sinOther * (radius / sinZhijiao)
      // 定位top最小值：半径 - 圆心到底边的直角边
      top = getRealityNum(radius - top)
      var left = sinTextDeg * (top / sinZhijiao)
      left = textPYWidth + left
      left = Math.ceil(left)
      left = (left % 2) + left
      top = Math.ceil(top)
      top = (top % 2) + top
      const transformStyle = `transform: translateX(-${left /
        2}px) translateY(${top / 2}px) rotate(${textDeg}deg);`

      // 图片模式：文本框宽度与底边宽度一样，并且是居中显示，所以只要旋转一下，位移调整一下位置就行
      if (this.isHaveImage) {
        return `${transformStyle}width: ${width / 2}px;`
      } else {
        // 将宽度设置得跟底边一样长，内容宽度为字体宽度，通过padding来只显示一行，则跟图片模式一样
        var padding = (width - textWidth) / 2
        return `${transformStyle}width: ${width / 2}px;padding: 0 ${padding /
          2}px;height: ${radius / 2}px;`
      }
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.mobile-container {
  position: relative;
  width: 100%;
  height: 669px;
  border: 1px solid #eee;
  overflow-y: auto;
  .mobile-nav-bar {
    width: 100%;
    height: 44px;
    line-height: 44px;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 16px;
    text-align: center;
    z-index: 1;
    color: #222222;
  }
  .bg {
    width: 375px;
    height: 1046/2px;
    position: absolute;
    top: 0;
    z-index: 0;
  }
  .award-container {
    width: 750/2px;
    height: 976/2px;
    margin-top: 74px;
    position: relative;
    background-image: url("~@/assets/award/turntable-bn-2.png");
    background-size: cover;
    .award-text-1 {
      padding: 20/2px 0;
      font-size: 24/2px;
      line-height: 24/2px;
      color: #9b4004;
      text-align: center;
    }
    .award-text-2 {
      padding: 30/2px;
      margin-top: 40/2px;
      font-size: 28/2px;
      line-height: 28/2px;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
    }
    .award-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 640/2px;
      height: 640/2px;
      margin-top: 16/2px;
      margin-left: 55/2px;
      position: relative;
      background-image: url("~@/assets/award/turntable-bg-1.png");
      background-size: cover;
      .award-circle {
        position: relative;
        height: 500/2px;
        width: 500/2px;
        border-radius: 72/2px;
      }
      .award-no-img .award-name {
        position: absolute;
        left: 0;
        top: 0;
        width: 24/2px;
        height: 110/2px;
        overflow: initial;
        text-overflow: initial;
        white-space: initial;
        word-break: break-all;
      }
      .award-item {
        position: absolute;
        left: 250/2px;
        top: 0;
        width: 250/2px;
        height: 500/2px;
        border-radius: 0 250/2px 250/2px 0;
        overflow: hidden;
        transform-origin: left center;
      }
      .award-item-inner {
        width: 250/2px;
        height: 500/2px;
        transform: translateX(-250/2px);
        transform-origin: right center;
        border-radius: 250/2px 0 0 250/2px;
        background: linear-gradient(
          90deg,
          rgba(255, 202, 104, 0.6) 0%,
          rgba(255, 247, 232, 0) 100%
        );
      }
      .award-image-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 250/2px;
        position: absolute;
        top: 0;
        left: 0;
        .award-name {
          padding: 0px 20/2px;
          text-align: center;
        }
      }
      .award-name {
        display: block;
        transform-origin: center;
        font-size: 24/2px;
        color: #222222;
        @include text-ellipsis;
      }
      .award-image {
        width: 50%;
        max-width: 72/2px;
        max-height: 72/2px;
        // height: 72/2px;
        margin-top: 20/2px;
        border-radius: 50%;
      }
      .award-btn {
        width: 189/2px;
        height: 217/2px;
        position: absolute;
      }
    }
  }
  .award-explain-container {
    width: 750/2px;
    padding: 12/2px 30/2px 50/2px;
    position: relative;
    background: #ff4e33;
    .award-explain-title-image {
      width: 274/2px;
      height: 74/2px;
      position: absolute;
      top: -14/2px;
      left: 238/2px;
    }
    .award-explain-content {
      width: 100%;
      padding: 50/2px 30/2px;
      background: #db1e03;
      border-radius: 10/2px;
      font-size: 26/2px;
      color: #fff;
    }
  }
}
</style>
