<template>
 <div class="wrap">
  <div class="content">
    <div class="detail_box" v-for="(item, index) in list" >
      <div class="empty" v-if="index!=0"></div>
      <router-link :to="{ path: 'detail', query: { id: item.tour_id}}">
      <div style="position:relative">
        <img :v-lazy="baseurl+item.tour.imgurl"  class="bg_img"/>
        <p class="name">{{item.tour.goods}}</p>
        <p class="info gray">{{item.tour.sub_title}}</p>
        <p class="right" style="margin-top:0.25rem;">
          <span class="base" style="font-size:0.32rem;font-weight:bold;font-family:'微软雅黑';">￥{{item.total_fee}}元</span>
          <span class="base" style="font-size:0.20rem;font-weight:bold;">已支付</span>
        </p>
        <!-- 订单 -->
        <p class="title" >订单号：{{item.out_trade_no}}</p><br/>
        <p class="title"><span class="base" style="margin-right:0.14rem;font-size:0.3rem;">·</span>出发地<span class="gray" style="margin-left:0.16rem">{{item.tour.depart}}</span></p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <p class="title"><span class="base" style="margin-right:0.14rem;font-size:0.3rem;">·</span>出发时间<span class="gray" style="margin-left:0.16rem">{{item.date}}</span></p><br/>
        <p class="title" v-for="info in item.persons"><span class="base" style="margin-right:0.14rem;font-size:0.3rem;">·</span>出行人<span class="gray" style="margin-left:0.16rem">{{info.realname}}</span><span class="gray" style="margin-left:0.33rem">{{info.phone}}</span><span class="base" style="margin-left:0.1rem" v-if="info.adult==1">( 儿童 )</span></p><br/>

        <!-- 去评价 -->
      <!--   <div class="right assess base" v-if="item.state=='待支付'">去支付</div>
        <router-link to="/tripEdit">
          <div class="right assess base" v-if="item.state=='已支付'">去评价</div>
        </router-link> -->
      </div>
      </router-link>
    </div>
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
    baseurl:"",
    list:[]
    }
  },
  mounted:function(){
    var self = this;
    this.baseurl=api.baseUrl;
    http(api.orders.method, api.orders.url,function(data){
      console.log(data)
      self.list = data
    })
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
@import '../assets/css/common.less';
@mainWidth:5.91rem;
.wrap{
   background:white;
  .content{
    width:@mainWidth;
    margin-left:(6.4-@mainWidth)/2;
  }
}
.detail_box{
    width:100%; 
    padding-top:0.32rem;
    margin-bottom:0.19rem;
    .bg_img{
      width:100%;
      height:2.41rem;
    }
    .name{
      width:60%;
      font-size:@fontBig;
      margin-top:0.1rem;
      color:#454545;
      overflow:hidden;
      text-overflow: ellipsis;
      white-space:nowrap;
      display:inline-block;
    }
    .del{
      background:@base;
      color:white;
      width:0.58rem;
      height:0.29rem;
      border-radius:3px;
      text-align:center;
      font-size:0.16rem;
      margin-top:0.11rem;
     
    }
    .info{
      width:59.2%;
      height:0.63rem;
      font-size:@fontSize;
      line-height:@lineHeight;
      overflow:hidden;
      text-overflow: ellipsis;
      display:inline-block;
    }
    .empty{
      width:100vw;
      margin-left:-(6.4-@mainWidth)/2;
      height:0.29rem;
      background:#ebebeb;
      margin-bottom:0.36rem;
    }
    //图片上的半透明标签
    .img_tag{
      width:0.92rem;
      height:0.7rem;
      color:white;
      position:absolute;
      right:0.26rem;
      top:1.76rem;
      text-align:center;
      over-flow:hidden;
      .img_tag_top{
        height:0.4rem;
        line-height:0.4rem;
        background:rgba(238,105,37,0.84);
        border-radius:6px;    
        font-size:@fontSmall;
      }
    }
    .title{
      display:inline-block;
      color:#454545;
      font-size:0.2rem;
    }
    .assess{
      border:2px solid @base;
      padding:0.05rem 0.19rem;
      border-radius:4px;
    }
  }
</style>