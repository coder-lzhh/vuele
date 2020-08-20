<template>
  <div class="con">
    <div class="meun" ref="meunIist">
      <div>
        <div v-for="(item,index) in goods " :key="index" class="meun-item">
          <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
          {{item.name}}
        </div>
      </div>
    </div>
    <div class="goods" ref="foodIist">
      <div>
        <div v-for="(item,index) in goods" :key="index" class="food">
          <div class="title">{{item.name}}</div>
          <div v-for="(foodItem,index) in item.foods " :key="index" class="food-item">
            <div class="img">
              <img width="57" height="57" :src="foodItem.icon" alt />
            </div>
            <div class="content">
              <p>{{foodItem.name}}</p>
              <div class="desc">{{foodItem.description}}</div>
              <div class="sell">
                <span class="moonsell">月售{{foodItem.sellCount}}份</span>
                <span>好评率{{foodItem.rating}}%</span>
              </div>
              <div class="price">
                <span class="nowprice">￥{{foodItem.price}}</span>
                <!-- <span v-if="foodItem.oldPrice">{{foodItem.oldPrice}}</span> -->
                <span class="oldprice">￥28</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getdata } from "network/axios.js";
import BSroll from "better-scroll";

const ERR_OK = 0;
export default {
  name: "goods",
  components: {},
  props: {},
  data() {
    return {
      goods: [],
      classMap: ["decrease", "discount", "special", "invoice", "guarantee"],
    };
  },
  created() {
    this.data();
    this.$nextTick(() => {
      this.initBS();
    });
  },
  computed: {},
  methods: {
    data() {
      getdata().then((res) => {
        if (res.data.errno === ERR_OK) {
          this.goods = res.data.data.goods;
          console.log(this.goods);
        }
      });
    },
    initBS() {
      this.meunIist = new BSroll(this.$refs.meunIist, {});
      this.foodIist = new BSroll(this.$refs.foodIist, {});
    },
  },
  watch: {},
};
</script>

<style  scoped lang='less'>
@import "~common/css/mixin.less";
.con {
  position: absolute;
  // z-index: -1;
  top: 174px;
  bottom: 64px;
  width: 100%;
  display: flex;
  overflow: hidden;
  .meun {
    flex: 0 0 80px;
    background: #f3f5f7;
    .meun-item {
      .border-1px(rgba(7,17,27,0.1));
      height: 54px;
      padding: 0 12px;
      // line-height: 28px;
      // color: rgb(240,20,20);
      font-weight: 200;
      font-size: 12px;
      display: flex;
      align-items: center;
      .icon {
        display: inline-block;
        min-width: 12px;
        height: 12px;
        vertical-align: top;
        margin-right: 2px;
        margin-bottom: 12px;
        background-size: 12px 12px;
        &.decrease {
          .bg-img("decrease_3");
        }
        &.discount {
          .bg-img("discount_3");
        }
        &.special {
          .bg-img("special_3");
        }
        &.invoice {
          .bg-img("invoice_3");
        }
        &.guarantee {
          .bg-img("guarantee_3");
        }
      }
    }
  }
  .goods {
    flex: 1;
    .food {
      .title {
        height: 26px;
        background: #f3f5f7;
        line-height: 26px;
        color: rgb(147, 153, 159);
        border-left: 2px solid #d9dde1;

        font-size: 12px;
        padding-left: 12px;
      }
      .food-item {
        .border-1px(rgba(7,17,27,0.1));
        padding-bottom: 18px;
        display: flex;
        margin: 18px;
        &:last-child {
          margin-bottom: 0;
          .border-none();
        }
        .img {
          flex: 0 0 57px;
          margin-right: 5px;
        }
        .content {
          flex: 1;
          p {
            padding-top: 2px;
            font-size: 14px;
            line-height: 14px;
            color: rgb(7, 17, 27);
            // color: red;
          }
          .desc {
            font-size: 10px;
            line-height: 10px;
            color: rgb(147, 153, 159);
            padding: 8px 0;
          }
          .sell {
            font-size: 10px;
            line-height: 10px;
            color: rgb(147, 153, 159);
            padding-bottom: 8px;
            .moonsell {
              padding-right: 12px;
            }
          }
          .price {
            .nowprice {
              font-size: 14px;
              font-weight: 700;
              line-height: 14px;
              color: rgb(240, 20, 20);
              padding-right: 8px;
            }
            .oldprice {
              font-size: 10px;
              text-decoration: line-through;
              font-weight: 700;
              line-height: 10px;
              color: rgb(147, 153, 159);
            }
          }
        }
      }
    }
  }
}
</style>