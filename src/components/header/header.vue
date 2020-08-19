<template>
  <div class="con">
    <div class="bg">
      <img :src="seller.avatar" alt />
    </div>
    <div class="shang">
      <div class="img">
        <img :src="seller.avatar" />
      </div>
      <div class="text">
        <div class="top">
          <span class="brand"></span>
          <div class="shopname">{{seller.name}}</div>
        </div>
        <div class="mid">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="bottom" v-if="seller.supports">
          <span class="jian"></span>
          <div class="jiantext">{{seller.supports[0].description}}</div>
        </div>
      </div>
      <div class="right" v-if="seller.supports">
        <div class="more">
          {{seller.supports.length}}个
          <span class="iconfont icon-ARROW"></span>
        </div>
      </div>
    </div>
    <div class="xia">
      <span class="gonggao"></span>
      <div class="text">{{seller.bulletin}}</div>
      <span class="iconfont icon-ARROW"></span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // length: this.seller.supports.length,
    };
  },
  computed: {},
  methods: {},
  watch: {},
};
</script>

<style  scoped lang='less'>
// @import '../../common/css/mixin.less';
.bg-img(@img) {
  background-image: url("./@{img}@2x.png");
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url("./@{img}@3x.png");
  }
}

div.con {
  height: 134px;
  background:rgba(7,17,27,.5);
  // filter: blur(10px);
  overflow: hidden;
  position: relative;
  .bg {
    width: 100%;
    position: absolute;
     z-index: -1;
     filter: blur(10px);
    top: 0;
    img {
      width: 100%;
      position: absolute;
      top: 0;

      z-index: -2;
    }
  }
  div.shang {
    padding: 24px 12px 18px 24px;
    display: flex;
    color: white;
    // height: 106px;
    div.img {
      width: 64px;
      padding-right: 16px;
      img {
        width: 100%;
      }
    }

    div.text {
      display: flex;
      flex-direction: column;
      div.top {
        display: flex;
        span.brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          margin-right: 6px;
          background-size: 30px 18px;
          .bg-img("brand");
        }

        div.shopname {
          font-size: 16px;
          font-weight: bold;
          line-height: 18px;
        }
      }

      div.mid {
        font-size: 12px;
        line-height: 12px;
        font-weight: 200;
        margin-top: 8px;
        margin-bottom: 10px;
      }

      div.bottom {
        display: flex;

        span.jian {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          .bg-img("decrease_1");
        }

        div.jiantext {
          font-size: 10px;
          line-height: 12px;
          font-weight: 200;
        }
      }
    }

    div.right {
      // position: relative;
      div.more {
        position: absolute;

        right: 12px;
        top: 50px;
        background: rgba(0, 0, 0, 0.2);
        padding: 7px 8px;
        // font-size: 10px;
        line-height: 24px;
        border-radius: 20px;
        span.iconfont.icon-keyboard_arrow_right {
          // color: white;
          display: inline-block;
          line-height: 24px;
          // font-size: 7px;
        }
      }
    }
  }

  div.xia {
    height: 28px;
    display: flex;
    color: white;
    padding-left: 12px;
    padding-right: 12px;
    line-height: 28px;
    background: rgba(7, 17, 27, 0.2);
    span.gonggao {
      align-self: center;
      display: inline-block;
      vertical-align: top;
      min-width: 22px;
      height: 12px;
      .bg-img("bulletin");
      background-size: 22px 12px;
      margin-right: 4px;
    }

    div.text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 10px;
    }

    span {
    }
  }
}
</style>