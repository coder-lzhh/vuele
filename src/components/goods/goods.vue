<template>
  <div class="con">
    <div class="meun" ref="meunIist">
      <div>
        <div
          v-for="(item,index) in goods "
          :key="index"
          class="meun-item"
          :class="{act:newIndex==index}"
          @click="clickMeun(index)"
        >
          <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
          {{item.name}}
        </div>
      </div>
    </div>
    <div class="goods" ref="foodIist">
      <div>
        <div v-for="(item,index) in goods" :key="index" class="food food-hook" @click="showfood">
          <div class="title">{{item.name}}</div>
          <div v-for="(foodItem,index) in item.foods " :key="index" class="food-item">
            <div class="img">
              <img width="57" height="57" :src="foodItem.icon" alt />
            </div>
            <div class="content" @click="selectedFood(foodItem)">
              <p>{{foodItem.name}}</p>
              <div class="desc">{{foodItem.description}}</div>
              <div class="sell">
                <span class="moonsell">月售{{foodItem.sellCount}}份</span>
                <span>好评率{{foodItem.rating}}%</span>
              </div>
              <div class="price">
                <span class="nowprice">￥{{foodItem.price}}</span>
                <span class="oldprice" v-if="foodItem.oldPrice">￥{{foodItem.oldPrice}}</span>
              </div>
              <cartcontrol @add="addfood" :food="foodItem" class="cartcontrol"></cartcontrol>
            </div>
          </div>
        </div>
      </div>
    </div>
    <shopcart ref="shopcart" :selectfood="selectCart"></shopcart>
    <food ref="food" :selectFood="selectFood" @add="addfood"></food>
  </div>
</template>

<script>
import { getdata } from "network/axios.js";
import BSroll from "better-scroll";

import shopcart from "../shopcart/shopcart";
import cartcontrol from "../cartcontrol/cartcontrol";
import food from "../food/food";
const ERR_OK = 0;
export default {
  name: "goods",
  components: { shopcart, cartcontrol, food },
  props: {},
  data() {
    return {
      goods: [],
      classMap: ["decrease", "discount", "special", "invoice", "guarantee"],
      listHeight: [],
      positonY: 0,
      selectFood: {},
    };
  },
  created() {
    this.data();
  },
  computed: {
    newIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        if (
          this.positonY >= this.listHeight[i] &&
          this.positonY < this.listHeight[i + 1]
        ) {
          return i;
        }
      }
    },
    selectCart() {
      let foods = [];
      // console.log(this.goods)
      for (let i of this.goods) {
        // console.log(i);
        for (let k of i.foods) {
          if (k.count) {
            foods.push(k);
          }
        }
      }
      return foods;
    },

    // let foods = [];
    // this.goods.forEach((good) => {
    //   good.foods.forEach((food) => {
    //     if (food.count) {
    //       foods.push(food);
    //     }
    //   });
    // });
    // return foods;
    // },
  },
  methods: {
    selectedFood(fooditem) {
      this.selectFood = fooditem;
    },
    showfood() {
      this.$refs.food.foodShow();
    },
    data() {
      getdata().then((res) => {
        if (res.data.errno === ERR_OK) {
          this.goods = res.data.data.goods;
          this.$nextTick(() => {
            this.initBS();
            this.calcHeight();
          });
        }
      });
    },
    initBS() {
      this.meunIist = new BSroll(this.$refs.meunIist, {
        click: true,
      });
      this.foodIist = new BSroll(this.$refs.foodIist, {
        click: true,
        probeType: 3,
      });

      this.foodIist.on("scroll", (positon) => {
        if (this.time) {
          clearTimeout(this.time);
        }
        this.time = setTimeout(() => {
          this.positonY = Math.abs(positon.y);
          console.log("object");
        }, 17);
      });
    },
    calcHeight() {
      let foodHeight = this.$refs.foodIist.getElementsByClassName("food-hook");
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodHeight.length; i++) {
        height += foodHeight[i].clientHeight;
        this.listHeight.push(height);
      }
    },
    clickMeun(index) {
      let foodHeight = this.$refs.foodIist.getElementsByClassName("food-hook");
      // console.log(index);
      let el = foodHeight[index];
      this.foodIist.scrollToElement(el, 300);
    },
    addfood(el) {
      // console.log(el);
      this.$refs.shopcart.drop(el);
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
  bottom: 48px;
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
      &.act {
        background: white;
      }
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
          position: relative;
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
          .cartcontrol {
            position: absolute;
            z-index: 1;
            bottom: 0;
            right: 0;
          }
        }
      }
    }
  }
}
</style>