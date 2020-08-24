<template>
  <div class="ragtingscon">
    <div>
      <div class="shopmes">
        <div class="shopleft">
          <div class="score">{{seller.score}}</div>
          <div class="text">综合评分</div>
          <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="shopright">
          <div class="serviceScore">
            <span class="textscore">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="stars">{{seller.serviceScore}}</span>
          </div>
          <div class="foodScore">
            <span class="textscore">商品评价</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="stars">{{seller.foodScore}}</span>
          </div>
          <div class="deliveryTime">
            <span class="textscore">送达时间</span>
            {{seller.deliveryTime}}分钟
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect
        class="ratingselect"
        :ratings="ratings"
        :selectType="selectType"
        :onlyContent="onlyContent"
        @select="select"
        @onlycon="onlycon"
      ></ratingselect>
      <div class="userratings" v-for="(item,index) in ratObj" :key="index">
        <div class="left">
          <img :src="item.avatar" alt width="28" height="28" />
        </div>
        <div class="right">
          <div class="top">
            <div class="user">
              <div class="name">{{item.username}}</div>
              <div class="stars">
                <star :size="24" :score="item.score"></star>
                <span v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
              </div>
            </div>
            <div class="time">{{item.rateTime | dates}}</div>
          </div>
          <div class="mid">
            <p>{{item.text}}</p>
          </div>
          <div class="bottom">
            <span
              class="iconfont"
              :class="{'icon-thumb':item.rateType===0,'icon-icthumbdownpx':item.rateType===1}"
            ></span>
            <div class="recommend" v-if="item.recommend&&item.recommend.length!=0">
              <div
                v-for="(items,indexs) in item.recommend"
                :key="indexs"
                class="recommenditem"
              >{{items}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getdata } from "network/axios.js";
import split from "../split/split";
import star from "../star/star";
import ratingselect from "../ratingselect/ratingselect";

import { formatDate } from "../../common/js/date";
const ERR_OK = 0;
const ALL = 2;
export default {
  name: "ratings",
  components: { star, split, ratingselect },
  props: {
    seller: {
      type: Object,
    },
  },
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true,
    };
  },
  created() {
    this.data();
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
        return this.ratings.filter((i) => i.text);
      }
      if (this.selectType === 2 && !this.onlyContent) {
        return this.ratings;
      }
      if (this.selectType === 0 && this.onlyContent) {
        return this.ratings
          .filter((i) => i.rateType == 0)
          .filter((i) => i.text);
      }
      if (this.selectType === 0 && !this.onlyContent) {
        return this.ratings.filter((i) => i.rateType == 0);
      }
      if (this.selectType === 1 && this.onlyContent) {
        return this.ratings
          .filter((i) => i.rateType == 1)
          .filter((i) => i.text);
      }
      if (this.selectType === 1 && !this.onlyContent) {
        return this.ratings.filter((i) => i.rateType == 1);
      }
    },
  },
  methods: {
    onlycon() {
      this.onlyContent = !this.onlyContent;
      // this.$nextTick(() => {
      //   this.scroll.refresh();
      // });
    },
    select(type) {
      this.selectType = type;
      // this.$nextTick(() => {
      //   this.scroll.refresh();
      // });
    },
    data() {
      getdata().then((res) => {
        if (res.data.errno === ERR_OK) {
          this.ratings = res.data.data.ratings;
        }
      });
    },
  },
  watch: {},
};
</script>

<style  scoped lang='less'>
@import "~common/css/mixin.less";
.ragtingscon {
  // background: red;
  position: absolute;
  // z-index: -1;
  // overflow: hidden;
  top: 174px;
  bottom: 0;
  width: 100%;
  .shopmes {
    display: flex;
    margin: 18px 0;
    .shopleft {
      @media screen and (max-width: 320px) {
        flex: 0 0 120px;
      }
      flex: 0 0 147px;
      text-align: center;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      .score {
        padding: 6px 0;
        color: rgb(255, 153, 0);
        font-size: 24px;
        line-height: 28px;
      }

      .text {
        padding-bottom: 8px;
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 12px;
      }

      .rankRate {
        color: rgb(147, 152, 159);
        font-size: 10px;
        line-height: 19px;
      }
    }

    .shopright {
      flex: 1;
      padding-left: 24px;
      @media screen and (max-width: 320px) {
        padding-left: 8px;
      }
      .serviceScore {
        display: flex;
        padding-bottom: 8px;
        .textscore {
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 18px;
          padding-right: 12px;
        }

        .stars {
          padding-left: 12px;
          color: rgb(255, 153, 0);
          font-size: 12px;
          line-height: 18px;
        }
      }

      .foodScore {
        display: flex;
        padding-bottom: 8px;
        .textscore {
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 18px;
          padding-right: 12px;
        }

        .stars {
          padding-left: 12px;
          color: rgb(255, 153, 0);
          font-size: 12px;
          line-height: 18px;
        }
      }

      .deliveryTime {
        font-size: 12px;
        line-height: 18px;
        color: rgb(147, 152, 159);
        .textscore {
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 18px;
          padding-right: 12px;
        }
      }
    }
  }
  .ratingselect {
    padding-top: 24px;
  }
  .userratings {
    display: flex;
    margin: 18px;
    .left {
      img {
        border-radius: 50%;
        margin-right: 12px;
      }
    }

    .right {
      width: 100%;
      .top {
        display: flex;
        // justify-content: space-between;
        width: 100%;
        .user {
          flex: 1;
          .name {
            font-size: 10px;
            line-height: 12px;
          }

          .stars {
            display: flex;
            padding-top: 4px;
            padding-bottom: 6px;
            span {
              font-size: 10px;
              color: rgb(147, 152, 159);
              padding-left: 6px;
            }
          }
        }

        .time {
          font-size: 10px;
          color: rgb(147, 152, 159);
          font-weight: 200;
          line-height: 12px;
          // flex: 1;
          // display: flex;
          // justify-content: end;
        }
      }

      .mid {
        p {
          color: rgb(7, 17, 27);
          line-height: 18px;
          font-size: 12px;
        }
      }

      .bottom {
        display: flex;
        span.iconfont {
          padding-right: 8px;
          margin-top: 8px;
          &.icon-thumb {
            color: #00a0dc;
          }
          &.icon-icthumbdownpx {
            color: #b7bbbf;
          }
        }

        .recommend {
          display: flex;
          flex-wrap: wrap;
          .recommenditem {
            font-size: 9px;
            padding-right: 6px;
            padding-left: 6px;

            margin-right: 8px;
            margin-top: 8px;
            line-height: 16px;
            border: 1px solid rgba(7, 17, 27, 0.1);
            color: rgb(147, 152, 159);
          }
        }
      }
    }
  }
}
</style>