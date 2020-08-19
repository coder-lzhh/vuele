<template>
  <div class="con">
    <div class="bg">
      <img :src="seller.avatar" height="134px" />
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
        <div class="more" @click="innershow">
          {{seller.supports.length}}个
          <span class="iconfont icon-ARROW"></span>
        </div>
      </div>
    </div>
    <div class="xia" @click="innershow">
      <span class="gonggao"></span>
      <div class="text">{{seller.bulletin}}</div>
      <span class="iconfont icon-ARROW"></span>
    </div>
    <transition name="fade">
      <div class="inner" v-if="isShow">
        <div class="wrap clearfix">
          <div class="mian">
            <h2>{{seller.name}}</h2>
            <star :size="48" :score="seller.score" class="star"></star>
            <div class="fenge">
              <div class="line"></div>
              <div class="title">优惠信息</div>
              <div class="line"></div>
            </div>
            <div class="icontext" v-if="seller.supports">
              <div v-for="(item,index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{item.description}}</span>
              </div>
            </div>
            <div class="fenge">
              <div class="line"></div>
              <div class="title">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="indc">{{seller.bulletin}}</div>
          </div>
        </div>
        <div class="close" @click="innerhide">
          <span class="iconfont icon-searchclose"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from "../star/star";
export default {
  components: { star },
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
      isShow: false,
      // length: this.seller.supports.length,
    };
  },
  computed: {},
  methods: {
    innershow() {
      this.isShow = true;
    },
    innerhide() {
      this.isShow = false;
    },
  },
  watch: {},
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
};
</script>

<style  scoped lang='less'>

@import "~common/css/mixin.less";
// .bg-img(@img) {
//   background-image: url("@{img}@2x.png");
//   @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
//     background-image: url("@{img}@3x.png");
//   }
// }

div.con {
  height: 134px;
  background: rgba(7, 17, 27, 0.5);
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
  .inner {
    height: 100vh;
    width: 100%;
    background: rgba(7, 17, 27, 0.8);
    position: fixed;
    top: 0;
    overflow: auto;
    z-index: 10;

    &.fade-enter-active,
    &.fade-leave-active {
      transition: all 0.5s;
    }
    &.fade-enter,
    &.fade-leave-active {
      opacity: 0;
    }

    .wrap {
      min-height: 100%;
      width: 100%;
      color: white;
      .mian {
        margin-top: 64px;
        padding-bottom: 64px;
        h2 {
          text-align: center;
          font-size: 16px;
          font-weight: 700;
          line-height: 16px;
          padding-bottom: 16px;
        }
        .star {
          text-align: center;
          padding-bottom: 28px;
        }
        .fenge {
          width: 80%;
          margin: 0 auto;
          display: flex;
          padding-bottom: 24px;
          .line {
            flex: 1;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            // align-items: center;
            position: relative;
            top: -6px;
          }
          .title {
            padding: 0 12px;
            font-weight: 700;
            font-size: 16px;
            line-height: 16px;
          }
        }
        .icontext {
          // display: flex;
          // flex-direction: column;
          // justify-content: center;
          width: 80%;
          margin: 0 auto;
          padding-bottom: 28px;
          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: top;
            margin-right: 6px;
            margin-bottom: 12px;
            background-size: 16px 16px;
            &.decrease {
              .bg-img("decrease_2");
            }
            &.discount {
              .bg-img("discount_2");
            }
            &.special {
              .bg-img("special_2");
            }
            &.invoice {
              .bg-img("invoice_2");
            }
            &.guarantee {
              .bg-img("guarantee_2");
            }
          }

          .text {
            font-size: 12px;
            line-height: 12px;
            font-weight: 200;
          }
        }
        .indc {
          width: 75%;
          margin: 0 auto;
          font-size: 12px;
          line-height: 24px;
          font-weight: 200;
        }
      }
    }
    .close {
      position: relative;
      width: 32px;
      height: 32px;
      font-size: 0;
      margin: -64px auto 0 auto;
      clear: both;
      span {
        font-size: 32px;
        color: white;
      }
    }
  }
}
</style>