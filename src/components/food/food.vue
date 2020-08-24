<template>
  <transition name="food">
    <div class="foodcon" v-show="isShow" ref="foodcon">
      <div>
        <div class="back" @click="foodShow">
          <span class="iconfont icon-left"></span>
        </div>
        <div class="foodtop">
          <div class="img">
            <img :src="selectFood.image" alt />
          </div>
          <div class="foodmes">
            <p>{{selectFood.name}}</p>
            <div class="sell">
              <span class="moonsell">月售{{selectFood.sellCount}}份</span>
              <span>好评率{{selectFood.rating}}%</span>
            </div>
            <div class="price">
              <span class="nowprice">￥{{selectFood.price}}</span>
              <span class="oldprice" v-if="selectFood.oldPrice">￥{{selectFood.oldPrice}}</span>
            </div>
            <transition name="buy">
              <div class="buy" v-show="!selectFood.count" @click="addbuy">加入购物车</div>
            </transition>
            <div class="conwarp">
              <cartcontrol :food="selectFood" @add="addfood"></cartcontrol>
            </div>
          </div>
        </div>
        <split></split>
        <div class="intro" v-if="selectFood.info">
          <h2>商品介绍</h2>
          <p>{{selectFood.info}}</p>
        </div>
        <split v-if="selectFood.info"></split>
        <div class="rating">
          <h2 class="ratingTitle">商品评价</h2>
          <ratingselect
            :ratings="selectFood.ratings"
            :selectType="selectType"
            :onlyContent="onlyContent"
            :desc="desc"
            @select="select"
            @onlycon="onlycon"
          ></ratingselect>
        </div>
        <div class="ratingList" v-if="selectFood.ratings&&selectFood.ratings.length">
          <div v-for="(item,index) in ratObj" :key="index">
            <div class="shang">
              <div class="time">{{item.rateTime | dates}}</div>
              <div class="user">
                <div class="name">{{item.username}}</div>
                <img :src="item.avatar" alt width="12" height="12" />
              </div>
            </div>
            <div class="xia">
              <span
                class="iconfont"
                :class="{'icon-thumb':item.rateType===0,'icon-icthumbdownpx':item.rateType===1}"
              ></span>
              <span class="rattext">{{item.text}}</span>
            </div>
          </div>
        </div>
        <div class="no-rat" v-else>暂无评价</div>
      </div>
    </div>
  </transition>
</template>

<script>
import { formatDate } from "../../common/js/date";
import cartcontrol from "../cartcontrol/cartcontrol";
import ratingselect from "../ratingselect/ratingselect";
import BSroll from "better-scroll";
import split from "../split/split";
import Vue from "vue";

const ALL = 2;
export default {
  name: "food",
  components: { cartcontrol, split, ratingselect },
  props: {
    selectFood: {
      type: Object,
    },
  },
  data() {
    return {
      isShow: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽",
      },
    };
  },
  filters: {
    dates(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd ss:mm");
    },
  },
  computed: {
    ratObj() {
      if (this.selectType === 2 && this.onlyContent) {
        return this.selectFood.ratings.filter((i) => i.text);
      }
      if (this.selectType === 2 && !this.onlyContent) {
        return this.selectFood.ratings;
      }
      if (this.selectType === 0 && this.onlyContent) {
        return this.selectFood.ratings
          .filter((i) => i.rateType == 0)
          .filter((i) => i.text);
      }
      if (this.selectType === 0 && !this.onlyContent) {
        return this.selectFood.ratings.filter((i) => i.rateType == 0);
      }
      if (this.selectType === 1 && this.onlyContent) {
        return this.selectFood.ratings
          .filter((i) => i.rateType == 1)
          .filter((i) => i.text);
      }
      if (this.selectType === 1 && !this.onlyContent) {
        return this.selectFood.ratings.filter((i) => i.rateType == 1);
      }
    },
  },
  methods: {
    onlycon() {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    select(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    addbuy(event) {
      if (!this.selectFood.count) {
        Vue.set(this.selectFood, "count", 1);
      } else {
        this.selectFood.count++;
      }
      // console.log(event.target)
      this.$emit("add", event.target);
    },
    addfood(el) {
      this.$emit("add", el);
    },
    foodShow() {
      this.isShow = !this.isShow;
      this.selectType = ALL;
      this.onlyContent = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BSroll(this.$refs.foodcon, {
            click: true,
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
  },
  watch: {},
};
</script>

<style  scoped lang='less'>
@import "~common/css/mixin.less";
.foodcon {
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 48px;
  background: white;
  z-index: 2;
  &.food-enter,
  &.food-leave-to {
    transform: translateX(100%);
  }
  &.food-enter-active,
  &.food-leave-active {
    transition: all 0.2s;
  }
  .back {
    position: fixed;
    top: 5px;
    padding: 10px;
    .icon-left {
      font-size: 20px;
      color: #00a0dc;
    }
  }
  .foodtop {
    .img {
      height: 0;
      overflow: hidden;
      width: 100%;
      padding-bottom: 75%;
      img {
        width: 100%;
        height: 281.5px;
      }
    }
    div.foodmes {
      position: relative;
      margin: 18px;
      p {
        font-weight: 700;
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
        padding-bottom: 8px;
      }

      div.sell {
        font-size: 10px;
        line-height: 10px;
        color: rgb(147, 153, 159);
        padding-bottom: 8px;
        span.moonsell {
          padding-right: 12px;
        }
      }

      div.price {
        span.nowprice {
          font-size: 14px;
          font-weight: 700;
          line-height: 14px;
          color: rgb(240, 20, 20);
          padding-right: 8px;
        }

        span.oldprice {
          font-size: 10px;
          text-decoration: line-through;
          font-weight: 700;
          line-height: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .buy {
        position: absolute;
        bottom: 4px;
        right: 5px;
        // height: 24px;
        z-index: 2;
        font-size: 10px;
        background: #00a0dc;
        line-height: 12px;
        padding: 8px 12px;
        color: white;
        border-radius: 16px;
        &.buy-enter,
        &.buy-leave-to {
          opacity: 0;
        }
        &.buy-enter-active,
        &.buy-leave-active {
          transition: all 0.5s;
        }
      }
      .conwarp {
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
  .intro {
    margin: 18px;
    h2 {
      font-weight: 700;
      font-size: 14px;
      padding-bottom: 6px;
    }
    p {
      font-size: 12px;
      font-weight: 200;
      line-height: 24px;
      color: rgb(77, 85, 93);
    }
  }
  .rating {
    margin-top: 18px;
    .ratingTitle {
      margin-left: 18px;
      font-weight: 700;
      font-size: 14px;
      margin-bottom: 18px;
    }
  }
  .ratingList {
    margin: 0 18px;
    .shang {
      padding-top: 16px;
      padding-bottom: 6px;
      display: flex;
      justify-content: space-between;
      .time {
        font-size: 10px;
        color: rgb(147, 153, 159);
        line-height: 12px;
      }

      .user {
        display: flex;
        font-size: 10px;
        color: rgb(147, 153, 159);
        line-height: 12px;
        .name {
          padding-right: 6px;
        }

        img {
          border-radius: 50%;
        }
      }
    }

    .xia {
      padding-bottom: 16px;
      .border-1px(rgba(7,17,27,0.1));
      span.iconfont {
        padding-right: 4px;
        &.icon-thumb {
          color: #00a0dc;
        }
        &.icon-icthumbdownpx {
          color: #b7bbbf;
        }
      }

      span.rattext {
        color: rgb(7, 17, 27);
        font-size: 12px;
      }
    }
  }
  .no-rat {
    padding: 16px;
    font-size: 12px;
    color: rgb(147, 153, 159);
  }
}
</style>