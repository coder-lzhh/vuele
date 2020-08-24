<template>
  <div class="rscon">
    <div class="rat">
      <span class="all" @click="select(2)" :class="{act:selectType===2}">
        {{desc.all}}
        <span class="num">{{ ratings.length}}</span>
      </span>
      <span class="good" @click="select(0)" :class="{act:selectType===0}">
        {{desc.positive}}
        <span class="num">{{positiveLength}}</span>
      </span>
      <span class="bad" @click="select(1)" :class="{act:selectType===1}">
        {{desc.negative}}
        <span class="num">{{negativeLength}}</span>
      </span>
    </div>
    <div class="has" @click="onlyCon">
      <span class="iconfont icon-check-circle" :class="{act:onlyContent}"></span>
      <span class="text">只看有内容评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  name: "ratingselect",
  components: {},
  props: {
    onlyContent: {
      type: Boolean,
      default: true,
    },
    selectType: {
      type: Number,
      default: ALL,
    },
    ratings: {
      type: Array,
      default() {
        return [];
      },
    },
    desc: {
      type: Object,
      default() {
        return { all: "全部", positive: "满意", negative: "不满意" };
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    positiveLength() {
      return this.ratings.filter((i) => i.rateType === 0).length;
    },
    negativeLength() {
      return this.ratings.filter((i) => i.rateType === 1).length;
    },
  },
  methods: {
    onlyCon() {
      this.$emit("onlycon");
    },
    select(type) {
      this.$emit("select", type);
    },
  },
  watch: {},
};
</script>

<style  scoped lang='less'>
@import "~common/css/mixin.less";
.rscon {
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  .rat {
    padding-bottom: 18px;
    margin: 0 18px;
    .border-1px(rgba(7,17,27,0.1));
    .all,
    .good {
      font-size: 12px;
      background: #ccecf8;
      line-height: 16px;
      padding: 8px 12px;
      margin-right: 8px;
      color: rgb(77, 86, 93);
      .num {
        font-size: 8px;
      }
      &.act {
        color: white;
        background: #00a0dc;
      }
    }
    .all {
    }
    .good {
    }
    .bad {
      font-size: 12px;
      background: rgba(77, 86, 93, 0.2);
      line-height: 16px;
      padding: 8px 12px;
      margin-right: 8px;
      .num {
        font-size: 8px;
      }
      &.act {
        color: white;
        background: rgb(77, 86, 93);
      }
    }
  }
  .has {
    font-size: 0;
    padding: 12px 0;
    margin-left: 18px;
    .icon-check-circle {
      display: inline-block;
      vertical-align: top;
      color: #b7bbbf;
      font-size: 20px;
      padding-right: 4px;
      &.act {
        color: #00c850;
      }
    }
    .text {
      display: inline-block;
      vertical-align: top;
      font-size: 12px;
      color: rgb(147, 153, 159);
      line-height: 24px;
    }
  }
}
</style>