<template>
  <div class="wrap">
  <div class="content">
    <div class="list user-info">
      <router-link :to="{ path: 'UserEdit', query: { icon: user.headimgurl,name:user.nickname,phone:user.phone}}">
        <img :src="user.headimgurl" alt="">
        <p>{{user.nickname}}<br/><span class="phoneNumber">积分：{{user.score}}<br/>手机号：{{user.phone}}</span></p>
        </router-link>
        <img src="../../static/twocode.png" class="twocode" alt="" @click="show_twoCode">
      
    </div>
    <div class="list">
      <a href="" class="lists">
        <div class="listsL">
          <img src="../../static/icon1.png" alt="">
          <span style="font-size:0.28rem">我的旅程</span>
        </div>
        <span class="listsR">用户足迹</span>
      </a>
    </div>
    <div class="ongoing">
      <p class="ongoingP">进行中的旅程</p>
      <ul class="head_icon">
        <li v-for="item in orders">
          <img :src="baseurl+item.imgurl" alt="">
          <p>{{item.title}}</p>
        </li>
        <li>
          <img src="../../static/icon12.png" alt="">
        </li>
      </ul>
    </div>
    <div class="list">
      <router-link to="/MyOrder" class="lists">
        <div class="listsL">
          <img src="../../static/icon2.png" alt="">
          <span>我的订单</span>
        </div>
      </router-link>
    </div>
    <div class="list">
      <router-link to="/MyPeople" class="lists">
        <div class="listsL">
          <img src="../../static/icon3.png" alt="">
          <span>出行人管理</span>
        </div>
      </router-link>
    </div>
    <div class="list">
      <router-link to="/MyCollection" class="lists">
        <div class="listsL">
          <img src="../../static/icon4.png" alt="">
          <span>我的收藏</span>
        </div>
      </router-link>
    </div>
    <!-- <div class="list">
      <router-link to="/Feedback" class="lists">
        <div class="listsL">
          <img src="../../static/icon6.png" alt="">
          <span>用户反馈</span>
        </div>
      </router-link>
    </div> -->
    <div class="list">
      <a  class="lists" @click="show_money">
        <div class="listsL">
          <img src="../../static/icon5.png" alt="">
          <span>人人合伙人</span>
        </div>
        <span class="listsR">10000元</span>
      </a>
    </div>
  </div>
  <!-- 底部按钮 -->
  <div class="footer">
      <router-link to="/">
        <div class="footer_left">
          <p class="icon iconfont">&#xe601;</p>
          <p class="words">线路</p>
        </div>
      </router-link>
      <router-link to="/user">
        <div class="footer_center">
          <p class="iconfont icon">&#xe64f;</p>
          <p class="words">我的</p>
        </div>
      </router-link>
      <router-link to="/user">
        <div class="footer_right">
          <p class="iconfont icon">&#xe76a;</p>
          <p class="words">客服</p>
        </div>
      </router-link>
    </div>
  <!-- 提取现金 -->
  <div class="modal" :class="hide"></div>
  <div class="money" :class="hide_money">
    <img src="../../static/cancel.png" class="right cancel" @click="hideall">
    <div class="money-title">提现</div>
    <div class="line"></div>
    <p style="font-size:0.31rem;margin-left:0.2rem;margin-bottom:0.34rem">提现金额</p>
    <span style="color:black;font-size:0.5rem;margin-left:0.2rem;display:inline-block">￥</sapn>
    <input type="number">
    <p style="font-size:0.27rem;color:#a7a6a6;line-height:0.32rem;margin-bottom:0.89rem">可用金额1000元<br/>提现金额发送到<span style="color:#fd7a06">微信红包</span></p>
    <div class="money-button">确认提现</div>
  </div>
  <!-- 二维码 -->
  <div class="twoCode" :class="hide_twoCode">
    <img src="../../static/cancel.png" class="right cancel" @click="hideall">
    <img src="../../static/logo.png" class="logo">
    <p>只要扫一扫你就是我们的合伙人</p>
    <img src="../../static/bg_twoCode.png" class="twocode">
  </div>
 </div>
  
</template>

<script>
import api from '../api/api.json'
import { http } from '../xhr'


export default {
  components: {
   
  },
  data: function () {
    return {
    baseurl:"",
     user:"",
     orders:"",
     hide:"hide",
     hide_money:"hide",
     hide_twoCode:"hide"
    }
  },
  mounted:function(){
    this.baseurl=api.baseUrl;
    var self = this
    http(api.center.method, api.center.url,function(data){
      console.log(data)
      self.user= data.user;
      self.orders = data.orders;
    })
  },
  methods: {
    //显示提现弹窗
    show_money:function(){
      this.hide=""
      this.hide_money=""
    },
    //显示二维码弹窗
    show_twoCode:function(){
      this.hide=""
      this.hide_twoCode=""
    },
    //隐藏全部
    hideall:function(){
      this.hide="hide"
      this.hide_money="hide"
      this.hide_twoCode="hide"
    },

  }
}

</script>
<style lang="less" scoped>
@import '../assets/css/common.less';
@import '../assets/css/user.less';
</style>