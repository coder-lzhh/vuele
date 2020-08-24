<template>
  <div class="control">
    <transition name="fade">
      <span class="iconfont icon-remove" @click.stop.prevent="sub()" v-show="food.count>0"></span>
    </transition>
    <span class="num" v-show="food.count>0">{{food.count}}</span>
    <span class="iconfont icon-add" @click.stop.prevent="add"></span>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "cartcontrol",
  components: {},
  props: {
    food: {
      tyep: Object,
      defautl() {
        return {
          count: 0,
        };
      },
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    add(event) {
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count += 1;
      }
      // console.log(event.target)
      this.$emit("add", event.target);
    },
    sub() {
      if (this.food.count > 0) {
        this.food.count -= 1;
      }
    },
  },
  watch: {},
};
</script>

<style  scoped lang='less'>
.control {
  font-size: 0;
  // height: 36px;
  text-align: center;
  .icon-remove {
    text-align: center;
    display: inline-block;
    font-size: 24px;
    width: 24px;
    line-height: 24px;
    height: 24px;
    color: #00a0dc;
    padding: 6px;

    // position: absolute;
    // vertical-align: top;
    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
      transform: translate3d(30px, 0, 0) rotate(360deg);
    }
    &.fade-enter-active,
    &.fade-leave-active {
      transition: all 0.3s linear;
    }
  }
  .num {
    display: inline-block;
    font-size: 12px;
    // padding: 0 3px;
    position: relative;
    top: -4px;
    box-sizing: border-box;
    width: 12px;
    height: 12px;
    text-align: center;
    // line-height: 24px;
    // display: flex;
    // align-items: center;
    // vertical-align: top;
  }
  .icon-add {
    text-align: center;
    display: inline-block;
    border-radius: 50%;

    padding: 6px;
    font-size: 24px;
    font-size: 24px;
    height: 24px;
    line-height: 24px;
    color: #00a0dc;
    // vertical-align: top;
  }
}
</style>