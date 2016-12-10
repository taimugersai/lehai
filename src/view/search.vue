<template>
  <div class="wrap">
    <div class="header">
      <router-link to="/">
        <span style="margin-left:0.27rem;margin-right:0.2rem">取消</span>
      </router-link>
      <input type="text" :placeholder="placeholder" v-model="search"></input>
      <router-link :to="{ path: 'searchResult', query: { search: search}}">
        <span class="right iconfont" style="font-size:0.28rem;margin-right:0.26rem">&#xe606;</span>
      </router-link>
    </div>
    <div class="content clear">
      <p class="title">热门搜索</p>
      <div v-for="item in list" class="tag" @click="change(item)">{{item}}</div >
    </div>
  </div>
</template>
<script>
import { http } from '../xhr.js'
import api from '../api/api.json'


export default {
  components: {
   
  },
  data: function () {
    return {
     search:'',
     placeholder:"三亚",
     list:["泰国","日本","厦门","巴厘岛","云南","黄山","普吉岛","马尔代夫","北京","台湾","香港","韩国","长滩岛","杭州","哈尔滨",]
    }
  },
  mounted:function(){
  },
  methods: {
    change:function(item){
      this.placeholder=item;
      this.search=item;
    }
  }
}
</script>
<style scoped lang="less">
@import '../assets/css/common.less';
.wrap{
  height:100vh;
  background:white;
  .header{
    width:100vw;
    height:0.79rem;
    background:#f8f8f8;
    span{
      color:@base;
      font-size:0.22rem;
      line-height:0.79rem;
    }
    input{
      width:4.64rem;
      height:0.53rem;
      line-height:0.53rem;
      border-radius:6px;
      background:#e5e5e5;
      text-indent:1em;
      font-family:"Microsoft Yahei";
    }
  }
  .content{
    width:6.12rem;
    margin-left:0.17rem;
    padding-bottom:0.2rem;
    border-bottom:1px solid #c9c9c9;
    .title{
      padding-top:0.17rem;
      padding-bottom:0.17rem;
      width:6.05rem;
      border-bottom:1px solid #c9c9c9;
    }
    .tag{
      width:15%;
      height:0.5rem;
      border:1px solid #d2d2d2;
      border-radius:5px;
      float:left;
      margin-top:0.17rem;
      margin-right:2%;
      margin-left:2%;
      text-align:center;
      line-height:0.5rem;
    }
  }
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          font-family:"Microsoft Yahei";
          
      }

      ::-moz-placeholder { /* Mozilla Firefox 19+ */
        font-family:"Microsoft Yahei";
          
      }

      input:-ms-input-placeholder{
        font-family:"Microsoft Yahei";
          
      }

      input::-webkit-input-placeholder{
        font-family:"Microsoft Yahei";
          
      }
</style>