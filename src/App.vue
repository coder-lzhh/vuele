<template>
  <div id="app">
    <headers :seller="seller"></headers>
    <div class="tab border-bottom">
      <router-link to="/goods" tag="div">商品</router-link>
      <router-link to="/ratings" tag="div">评论</router-link>
      <router-link to="/seller" tag="div">商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller='seller' />
    </keep-alive>
  </div>
</template>
<script>
import { getdata } from "network/axios.js";
import headers from "components/header/header";
const ERR_OK = 0;
export default {
  data() {
    return {
      seller: {},
    };
  },
  created() {
    this.data();
  },
  methods: {
    data() {
      getdata().then((res) => {
        if (res.data.errno === ERR_OK) {
          this.seller = res.data.data.seller;
          // console.log(this.seller);
        }
      });
    },
  },
  components: {
    headers,
  },
};
</script>
<style lang="less" scope>
.border-bottom {
  color: rgb(77, 85, 93);
  border-color: red;
}
.tab {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  div {
    flex: 1;
  }
  .active {
    color: red;
  }
}
</style>
