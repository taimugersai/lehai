<template>
  <div class="wrap">
    <!-- 头部介绍 -->
    <header>
      <div class="h-figure">
        <img :src="baseurl+detail.imgurl" alt="">
        <router-link to="/">
          <img class="back" src="../assets/images/back_icon.png" alt="">
        </router-link>
      </div>
      <!-- 是否收藏 -->
       <div class="h-tips right" @click="collect">
          <span class="iconfont text-large">{{ isCollect ? '&#xe605;' : '&#xe60d;' }}</span><br>
          <span class="text-small">收藏</span>
        </div>
      <!-- 线路信息 -->
      <div class="h-intro">
        <p class="h-title">{{ detail.title }}</p>
        <p>
          <span class="h-price">￥{{ detail.price }}元</span>
          <span style="font-size:.28rem;">/人</span>起
        </p>
        <p class="h-describe">
          {{ detail.sub_title }}
        </p>
      </div>
    </header>
    
    <!-- 出发地 -->
    <div class="group">
      <p>出发地<span style="margin-left:10px;">{{ detail.depart }}</span></p>
    </div>

    <!-- 出发日期 -->
    <div class="group">
      <p>出发日期<span class="text-small gray">（以下均为起价）</span></p>
      <div class="content clear">
        <div class="layout left" v-for="item in detail.items">
          <p class="gray">{{ item.start_date }}</p>
          <p class="base">￥{{ item.price }}/人</p>
        </div>
      </div>

    </div>

    
    <div class="group">
    <!-- 导航栏 -->
    <div class="nav-content" :class="fixed?'nav-content-fix':''">
    <mt-navbar class="detailnav" v-model="selected"  >
        <mt-tab-item id="1" class="nav-item"><a href="#special" @click="goto">线路特色</a></mt-tab-item>
        <mt-tab-item id="2" class="nav-item"><a href="#router" @click="goto">参考行程</a></mt-tab-item>
        <mt-tab-item id="3" class="nav-item"><a href="#mustKnow" @click="goto">出行须知</a></mt-tab-item>
        <mt-tab-item id="4" class="nav-item"><a href="#introduce" @click="goto">预定说明</a></mt-tab-item>
        <mt-tab-item id="5" class="nav-item"><a href="#promise" @click="goto">服务承诺</a></mt-tab-item>
        <mt-tab-item id="6" class="nav-item"><a href="#feedback" @click="goto">用户反馈</a></mt-tab-item>
      </mt-navbar> 
    </div>
    <!-- 线路特色 -->
      <p id="special">线路特色</p>
      <div class="g-container" v-html="detail.characteristic"></div>
    </div>

    <!-- 参考行程 时间轴 -->
    <div class="group" id="router">
      <p >参考行程</p>
      <ul class="content">
        <li v-for="(item, index) in detail.steps">
          <timeline :color="color[index]" :sub="days[index]" :step="index" :title="detail.steps[index].title">
            <div v-html="detail.steps[index].content"></div>
          </timeline>
        </li>
      </ul>
    </div>

    <!-- 出行须知 -->
    <div class="group" id="mustKnow">
      <p >出行须知</p>
      <div class="content">
        <div class="g-column">
          <div class="g-title">
            <span class="iconfont bold">&#xe6c3;</span>费用包含：
          </div>
          <div class="g-container" v-html="detail.contain"></div>
        </div>
        <div class="g-column">
          <div class="g-title">
            <span class="iconfont bold">&#xe6c3;</span>费用不包含：
          </div>
          <div class="g-container" v-html="detail.uncontain"></div>
        </div>
      </div>
    </div>

    <!-- 预定说明 -->
    <div class="group" id="introduce">
      <p >预定说明</p>
      <div class="content">
        <div class="g-column">
          <div class="g-title">
            <span class="iconfont bold">&#xe6c3;</span>购物说明：
          </div>
          <div class="g-container" v-html="detail.explain"></div>
        </div>
        <div class="g-column">
          <div class="g-title">
            <span class="iconfont bold">&#xe6c3;</span>注意事项：
          </div>
          <div class="g-container" v-html="detail.notice"></div>
        </div>
      </div>
    </div>

    <!-- 服务承诺 -->
    <div class="group">
       <div class="g-title" id="promise">
            特别提醒：
          </div>
      <div class="content">
        <div class="g-container" v-html="detail.remind"></div>
      </div>
    </div>

    <!-- 用户反馈 -->
    
    <div class="group" id="feedback">
       <div class="g-title">用户反馈：<router-link :to="{ path: 'Feedback', query: { tour_id: detail.id}}"><span class="right more">更多>></span> </router-link></div>
       <div class="feedback"  v-for="item in feedback">
        <p class="user"><span class="title">用户：</span><span class="name">{{item.nickname}}</span> {{item.created_at}}</p>
        <p class="" style="color:#454444;font-size:0.24rem;margin-bottom:0.1rem;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">反馈问题：{{item.question}}</p>
        <p class="" style="color:#fa7850;font-size:0.24rem;"><span style="float:left">乐嗨回复：</span><span class="answer">{{item.answer}}</sapn></p>
      </div>
    </div>
   
<!-- 返回顶部 -->
   <img src="static/top.png" class="goToTop" >
   <div class="h12 bg-white"></div>

<!-- 底部菜单 -->
    <div class="footer">
      <div class="f-left">
        <div class="f-tips">
          <span class="iconfont text-large">&#xe601;</span><br>
          <span class="text-small">线路</span>
        </div>
        <div class="f-tips">
          <span class="iconfont text-large">&#xe70d;</span><br>
          <span class="text-small">客服</span>
        </div>
      </div>
      <router-link :to="{ path: 'takeOrder', query: { id: detail.id}}">
        <div class="f-right">
          下一步
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>

import api from '../api/api.json'
import { http } from '../xhr'
import Timeline from '../components/timeline/timeline'

export default {
  components: {
   Timeline
  },

  data: function () {
    return {
      isCollect: false,
      baseurl:"",
      fixed:false,
      scrollTop:'0',
      selected:'1',
      feedback:[],
      detail:[],
      days: ['Day One','Day Two','Day Three','Day Four','Day Five','Day Six','Day Seven','Day Eight','Day Nine','Day Ten','Day Eleven','Day Twelve','Day Thirteen','Day Fourteen','Day Fifteen','Day Sixteen','Day Seveteen','Day Eighteen','Day Nineteen','Day Twenty'],
      color: ['#f95b1d', '#7f80ae', '#ef4136', '#2b3991', '#00a79d', '#f95b1d', '#7f80ae', '#ef4136', '#2b3991', '#00a79d','#f95b1d', '#7f80ae', '#ef4136', '#2b3991', '#00a79d', '#f95b1d', '#7f80ae', '#ef4136', '#2b3991', '#00a79d']
    }
  },
  
  mounted:function(){
    var self = this;
    this.baseurl=api.baseUrl;
    //请求数据
    http(api.detail.method, api.detail.url,{id:self.$route.query.id},function(data){
      console.log(data);
      self.detail=data.detail;
      self.feedback=data.problem;
      if(data.detail.star == 0){
        self.isCollect = false
      }else if(data.detail.star == 1){
        self.isCollect = true
      }
    })
    //返回顶部
    $(window).scroll(function(){
      var sc=$(window).scrollTop();    
      var rwidth=$(window).width()    
      if(sc>0){     
        $(".goToTop").css("display","block");     
         
      }
      else{$(".goToTop").fadeOut(500);}  
    })  
    $(".goToTop").click(function(){    
      var sc=$(window).scrollTop();    
      $('body,html').animate({scrollTop:0},500);  
    }) 
    
    
    //导航栏（需要修改）
    setInterval(function(){
      var feedback = $("#feedback").offset().top-$("body").scrollTop()
      var promise = $("#promise").offset().top-$("body").scrollTop()
      var introduce = $("#introduce").offset().top-$("body").scrollTop()
      var router = $("#router").offset().top-$("body").scrollTop()
      var special = $("#special").offset().top-$("body").scrollTop()
      var mustKnow = $("#mustKnow").offset().top-$("body").scrollTop()

      self.scrollTop=document.documentElement.scrollTop||document.body.scrollTop;

      
     if(self.scrollTop<573){
        self.fixed=false
        self.selected='1'
      }else if(self.scrollTop>573){
        self.fixed=true      
      }
      if(feedback<116){
        self.selected='6'
      }else if(promise<43){
        self.selected='5'
      }else if(introduce<33){
        self.selected="4"
      }else if(mustKnow<35){
        self.selected="3"
      }else if(router<35){
        self.selected="2"
      }
    },300)
  },
  methods: {
    // 收藏
    collect () {
      this.isCollect = !this.isCollect;
      var self = this;
      http(api.star.method, api.star.url,{id:self.$route.query.id},function(data){
        console.log(data)
        if(data.status==1){
          this.isCollect = !this.isCollect;
        }
      })
    },
    //点击导航栏
    goto(){
      this.fixed=true;
    }
  }
}
</script>
<style lang='less'>
@import '../assets/css/common.less';
@import '../assets/css/swipe.css';
@import '../assets/css/detail.less';

</style>