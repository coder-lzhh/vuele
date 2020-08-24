<template>
  <div class="sellercon">
    <div class="topcon">
      <div class="top">
        <div class="left">
          <div class="shopname">{{seller.name}}</div>
          <div class="stars">
            <star :size="36" :score="seller.score"></star>
            <span class="ratingCount">({{seller.ratingCount}})</span>
            <span class="sellCount">月售{{seller.sellCount}}单</span>
          </div>
        </div>
        <div class="right">
          <span class="iconfont icon-favorite-material" @click="like" :class="{act:favorite}"></span>
          <div class="coll">{{likedesc}}</div>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <span class="text">起送价</span>
          <div class="digital">
            {{seller.minPrice}}
            <span class="text1">元</span>
          </div>
        </div>
        <div class="mid">
          <span class="text">商家配送</span>
          <div class="digital">
            {{seller.deliveryPrice}}
            <span class="text1">元</span>
          </div>
        </div>
        <div class="right">
          <span class="text">评价配送时间</span>
          <div class="digital">
            {{seller.deliveryTime}}
            <span class="text1">分钟</span>
          </div>
        </div>
      </div>
    </div>
    <split></split>
    <div class="main">
      <h2>公告与活动</h2>
      <p>{{seller.bulletin}}</p>
      <div class="icontext" v-if="seller.supports">
        <div v-for="(item,index) in seller.supports" :key="index" class="iconwarp">
          <span class="icon" :class="classMap[seller.supports[index].type]"></span>
          <span class="text">{{item.description}}</span>
        </div>
      </div>
    </div>
    <split></split>
    <div>xxxx</div>
    <split></split>
    <div class="bottomcon">
      <h2>商家信息</h2>
      <div v-for="(item,index) in seller.infos" :key="index" class="btitem">{{item}}</div>
    </div>
  </div>
</template>

<script>
import star from "../star/star";
import split from "../split/split";
export default {
  components: { star, split },
  props: {
    seller: {
      type: Object,
    },
  },
  data() {
    return {
      favorite: false,
      classMap: ["decrease", "discount", "special", "invoice", "guarantee"],
    };
  },
  created() {},
  computed: {
    likedesc() {
      if (this.favorite) {
        return "已收藏";
      } else {
        return "收藏";
      }
    },
  },
  methods: {
    like() {
      this.favorite = !this.favorite;
    },
  },
  watch: {},
};
</script>

<style  scoped lang='less'>
@import "~common/css/mixin.less";

.sellercon {
  .topcon {
    margin: 18px;
    .top {
      display: flex;
      justify-content: space-between;
      padding-bottom: 18px;
      .border-1px(rgba(7,17,27,0.1));
      .left {
        .shopname {
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
          padding-bottom: 8px;
        }

        .stars {
          display: flex;
          font-size: 10px;
          line-height: 18px;
          span.ratingCount {
            padding-left: 8px;
            padding-right: 12px;
          }

          span.sellCount {
          }
        }
      }

      .right {
        span.iconfont.icon-favorite-material {
          font-size: 24px;
          color: #d4d6d9;
          &.act {
            color: #f01414;
          }
        }

        .coll {
          padding-top: 4px;
          text-align: center;
          font-size: 10px;
          width: 30px;
          color: rgb(77, 85, 93);
        }
      }
    }

    .bottom {
      display: flex;
      text-align: center;
      margin-top: 18px;
      .text {
        font-size: 10px;
        color: rgb(147, 153, 159);
        margin-bottom: 4px;
        display: inline-block;
      }
      .left {
        flex: 1;

        .digital {
          font-size: 24px;
          span.text1 {
            font-size: 10px;
          }
        }
      }

      .mid {
        flex: 1;
        border-left: 1px solid rgba(7, 17, 27, 0.1);
        border-right: 1px solid rgba(7, 17, 27, 0.1);

        .digital {
          font-size: 24px;
          span.text1 {
            font-size: 10px;
          }
        }
      }

      .right {
        flex: 1;

        .digital {
          font-size: 24px;
          span.text1 {
            font-size: 10px;
          }
        }
      }
    }
  }
  .main {
    margin: 18px 18px 0 18px;
    h2 {
      font-weight: 700;
      margin-bottom: 8px;
    }
    p {
      padding: 4px 12px 16px 12px;
      color: rgb(240, 20, 20);
      line-height: 24px;
      font-size: 12px;
      // font-weight: 200;
    }
    .icontext {
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      // width: 80%;
      // margin: 0 auto;
      padding-left: 12px;
      // padding-bottom: 28px;
      .iconwarp {
        padding-top: 16px;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        .icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          vertical-align: top;
          margin-right: 6px;
          margin-bottom: 16px;
          background-size: 16px 16px;
          &.decrease {
            .bg-img("decrease_4");
          }
          &.discount {
            .bg-img("discount_4");
          }
          &.special {
            .bg-img("special_4");
          }
          &.invoice {
            .bg-img("invoice_4");
          }
          &.guarantee {
            .bg-img("guarantee_4");
          }
        }

        .text {
          font-size: 12px;
          line-height: 12px;
          font-weight: 200;
          color: rgb(7, 17, 27);
        }
      }
    }
  }
  .bottomcon {
    margin: 18px 18px 0 18px;
    h2 {
      font-weight: 700;
      margin-bottom: 12px;
    }
    .btitem {
      font-size: 12px;
      line-height: 16px;
      padding: 16px 12px 16px 12px;
      border-top: 1px solid rgba(7, 17, 27, 0.1);
    }
  }
}
</style>