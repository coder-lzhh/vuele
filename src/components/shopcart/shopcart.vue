<template>
  <div class="shopcart">
    <div class="conwarp">
      <div class="cartleft" @click="toggleFold">
        <div class="cartwarp">
          <div class="cart" :class="{highlight:totalCount>0}">
            <span class="iconfont icon-cart-icon" :class="{highlight:totalCount>0}"></span>
            <div class="count" v-show="totalCount>0">{{totalCount}}</div>
          </div>
        </div>
        <div class="total-price" :class="{highlight:totalCount>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="cartright" :class="deliveryClass" @click="pay">{{deliveryDesc}}</div>
    </div>
    <div class="ball-con">
      <div v-for="(ball,index) in balls" :key="index">
        <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fold">
      <div class="cart-list" v-show="isShowCartList">
        <div class="top">
          <span class="text">购物车</span>
          <span class="clean" @click="cleanLsit">清空</span>
        </div>
        <div class="mian" ref="mianScroll">
          <div>
            <div v-for="(item,index) in selectfood" :key="index" class="cart-list-item">
              <div class="foodname">{{item.name}}</div>
              <div class="list-item-price" v-if="item">￥{{item.price*item.count}}</div>
              <div class="list-conwarp">
                <cartcontrol @add="addfoods" :food="item"></cartcontrol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mask">
      <div class="mask" v-show="isShowCartList" @click="toggleFold"></div>
    </transition>
  </div>
</template>

<script>
import BSroll from "better-scroll";
import cartcontrol from "../cartcontrol/cartcontrol";
export default {
  name: "shopcart",
  components: { cartcontrol },
  props: {
    selectfood: {
      type: Array,
      default() {
        return [
          {
            price: 10,
            count: 0,
          },
          {
            price: 2,
            count: 10,
          },
        ];
      },
    },
    deliveryPrice: {
      type: Number,
      default: 4,
    },
    minPrice: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      balls: [
        {
          show: false,
        },
        {
          show: false,
        },
        {
          show: false,
        },
        {
          show: false,
        },
        {
          show: false,
        },
      ],
      dropBalls: [],
      fold: true,
    };
  },
  computed: {
    isShowCartList() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }

      let show = !this.fold;

      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BSroll(this.$refs.mianScroll, {
              click: true,
            });
          } else {
            this.scroll.refresh();
          }
        });
      }

      return show;
    },
    totalPrice() {
      return this.selectfood.reduce((price, item) => {
        price += item.price * item.count;
        return price;
      }, 0);
    },
    totalCount() {
      return this.selectfood.reduce((count, item) => {
        count += item.count;
        return count;
      }, 0);
    },
    deliveryDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return "去结算";
      }
    },
    deliveryClass() {
      if (this.totalPrice < this.minPrice) {
        return "";
      } else {
        return "go";
      }
    },
  },
  methods: {
    addfoods(el) {
      // console.log(el);
      this.drop(el);
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      alert(`总共需要支付${this.totalPrice}元`);
    },
    cleanLsit() {
      for (let i of this.selectfood) {
        i.count = 0;
      }
    },
    toggleFold() {
      if (this.totalCount > 0) {
        this.fold = !this.fold;
      }
    },
    drop(el) {
      // console.log(el);
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          // console.log(this.dropBalls);
          return;
        }
      }
    },
    beforeDrop(el) {
      // console.log('xxxxx');
      let count = this.balls.length;
      while (count--) {
        // console.log(count);
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.x - 32;
          let y = -(window.innerHeight - rect.y - 32);
          el.style.display = "";
          el.style.transform = `translate3d(0,${y}px,0)`;
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
          console.log(ball.show,x,y,el);
        }
      }
    },
    dropping(el, done) {
      let rf = el.offsetHeight;
      // console.log(el);

      this.$nextTick(() => {
        el.style.webkitTransform = "translate3d(0,0,0)";
        el.style.transform = "translate3d(0,0px,0)";
        let inner = el.getElementsByClassName("inner-hook")[0];
        inner.style.transform = "translate3d(0px,0,0)";
        inner.style.webkitTransform = "translate3d(0,0,0)";
        el.addEventListener("transitionend", done);
      });

    },
    afterDrop(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = "none";
        // console.log(ball);
      }
    },
  },
  watch: {},
};
</script>

<style  scoped lang='less'>
@import "~common/css/mixin.less";
.shopcart {
  width: 100%;
  height: 48px;
  position: fixed;
  bottom: 0;
  z-index: 9;
  .conwarp {
    height: 48px;
    display: flex;
    position: relative;
    // top: 0;
    z-index: 5;
    .cartleft {
      flex: 1;
      background: #141d27;
      display: flex;
      align-items: center;
      .cartwarp {
        position: relative;
        top: -2px;
        height: 50px;
        width: 50px;
        padding: 6px;
        margin-left: 12px;
        border-radius: 50%;
        background: #141d27;
        // text-align: center;
        display: flex;
        justify-content: center;
        .cart {
          height: 44px;
          width: 44px;
          border-radius: 50%;
          background: #29323a;
          text-align: center;
          &.highlight {
            background: #0d95dc;
          }
          .count {
            position: absolute;
            width: 24px;
            height: 16px;
            line-height: 16px;
            color: white;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
            font-size: 10px;

            background: rgb(240, 20, 20);
            border-radius: 16px;
            top: 0;
            right: 0;
          }
          .icon-cart-icon {
            color: #80858a;
            font-size: 24px;
            line-height: 44px;
            &.highlight {
              color: white;
            }
          }
        }
      }
      .total-price {
        // align-items: center;
        font-size: 16px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
        padding: 0 12px;
        line-height: 24px;
        border-right: 1px rgba(255, 255, 255, 0.1) solid;
        &.highlight {
          color: white;
        }
      }
      .desc {
        padding-left: 12px;
        font-size: 10px;
        color: rgba(255, 255, 255, 0.4);
      }
    }
    .cartright {
      flex: 0 0 105px;
      width: 105px;
      background: #2b333b;
      color: rgba(255, 255, 255, 0.4);
      line-height: 48px;
      font-size: 12px;
      text-align: center;
      &.go {
        background: #0d9c3f;
        font-weight: 700;
        color: white;
      }
    }
  }
  .ball-con {
    // height: 16px;
    position: absolute;
    z-index: 10;
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 2;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #0d95dc;
        transition: all 0.4s linear;
      }
    }
  }
  div.cart-list {
    position: absolute;
    // top: -300px;
    left: 0;
    bottom: 48px;
    width: 100%;
    z-index: 4;
    &.fold-enter,
    &.fold-leave-to {
      // opacity: 0;
      transform: translateY(100%);
    }
    &.fold-enter-active,
    &.fold-leave-active {
      transition: all 0.5s;
    }
    div.top {
      height: 40px;
      background: #f3f5f7;
      padding: 0 18px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      span.text {
        font-size: 14px;
        font-weight: 200;
        line-height: 40px;
      }

      span.clean {
        color: rgb(0, 160, 220);
        font-size: 12px;

        line-height: 40px;
      }
    }

    div.mian {
      max-height: 240px;
      overflow: hidden;
      background: white;
      div.cart-list-item {
        display: flex;
        align-items: center;
        height: 48px;
        padding: 0 18px;
        .border-1px(rgba(7, 17, 27,0.1));
        div.foodname {
          font-size: 14px;
          color: rgb(7, 17, 27);
          line-height: 48px;
        }

        div.list-item-price {
          flex: 1;
          text-align: right;
          color: rgb(240, 20, 20);
          font-weight: 700;
          font-size: 14px;
          padding-right: 6px;
        }

        div.list-conwarp {
          height: 36px;

          // cartcontrol {
          // }
        }
      }
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background: rgba(7, 17, 27, 0.6);
    z-index: 3;
    &.mask-enter,
    &.mask-leave-to {
      opacity: 0;
      // transform: translateY(100%);
    }
    &.mask-enter-active,
    &.mask-leave-active {
      transition: all 0.5s;
    }
  }
}
</style>