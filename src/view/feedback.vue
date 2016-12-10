<template>
  <div class="wrap">
    <!-- 用户反馈列表 -->
    <div class="content"  v-for="item in lists">
        <p class="user"><span class="title">用户：</span><span class="name">{{item.nickname}}</span> {{item.created_at}}</p>
        <p class="" style="color:#454444;font-size:0.24rem;margin-bottom:0.15rem;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">反馈问题：{{item.question}}</p>
        <p class="" style="color:#fa7850;font-size:0.24rem"><span style="float:left">乐嗨回复：</span><span class="answer">{{item.answer}}</sapn></p>
    </div>
    <div class="ask" @click="add">用户提问</div>
    <!-- 用户提问弹框 -->
    <div class="modal" :class="hide"></div>
    <div class="takeQuestion" :class="hide">
      <img src="static/cancel.png" class="right cancel clear" @click="cancel">
      <div class="clear"></div>
      <p class="clear">请提出您的问题</p>
      <textarea v-model="problem"></textarea>
      <br/>
      <span style="margin-left:8%;color:red" v-if="err==1">*{{err_msg}}</span>
      <div class="submit" @click="postProblem()">提交</div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import api from '../api/api.json'
import { http } from '../xhr'



export default {
  components: {
   
  },
  data: function () {
    return {
      lists:[],
      hide:"hide",
      problem:"",
      err:0,
      err_msg:"问题不能为空"
    }
  },
  mounted: function() {
    var self = this;
     http(api.getProblem.method, api.getProblem.url,{tour_id:self.$route.query.tour_id},function(data){
        self.lists = data.problem
     })
  },
  methods: {
    // 弹出弹窗
    add:function(){
      this.hide=""
    },
    // 关闭弹窗
    cancel:function(){
      this.hide="hide"
    },
    // 提出问题
    postProblem:function(){
      var self = this;
      if(self.problem!=""){
        self.err = 0;
        http(api.postProblem.method,api.postProblem.url,{tour_id:self.$route.query.tour_id,question:self.problem},function(data){
          if(data.status==1){
            var problem = data.problem;
            problem.answer='暂无回答';
            self.lists.push(problem)
            self.hide="hide"
          }else{
              self.err = 1;
              self.err_msg = "提交失败";
          }
        })
      }else{
        self.err = 1;
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '../assets/css/common.less';
@import '../assets/css/message.css';
.wrap{
  height:100vh;
  background:@bgColor;
  .content{
    padding:0 (6.4rem-@mainWidth)/2;
    background:white;
    height:2.2rem;
    margin-bottom:0.21rem;
    .user{
      padding-top:0.17rem;
      font-size:0.214rem;
      margin-bottom:0.15rem;
    }
    .title{
      letter-spacing:0.27rem;
    }
    .name{
      display:inline-block;
      width:1.06rem;
      overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
      position: relative;
      top:0.08rem;
    }
    .answer{
      display:inline-block;
      width:75%;
    }
  }
  .ask{
        position: fixed;
        bottom:0;
        left:0;
        background:@base;
        color:white;
        height:0.86rem;
        width:100%;
        text-align:center;
        line-height:0.86rem;
        font-size:0.28rem;
      }
}

//弹窗
.modal{
  width:100vw;
  height:100vh;
  background:rgba(0,0,0,0.8);
  position:fixed;
  top:0;
  left:0;
  z-index:2;
}
.takeQuestion{
  width:4.95rem;
  height:3.91rem;
  position:fixed;
  top:3.12rem;
  left:0.72rem;
  z-index:4;
  background:white;
  border-radius:7px;
  .cancel{
    width:0.3rem;
    height:0.3rem;
    margin-right:0.2rem;
    margin-top:0.2rem;
  }
  p{
    text-align:center;
    line-height:0.8rem;
    color:#545454;
    font-size:0.3rem;
  }
  textarea{
    width:75%;
    height:1.13rem;
    margin-left:8%;
    border-radius:6px;
    border:1px solid #b9b9b9;
    text-indent:1em;
    font-size:0.25rem;
    font-family:"Microsoft Yahei";
    padding-left:0.2rem;
    padding-right:0.2rem;
  }
  .submit{
    width:1.6rem;
    height:0.7rem;
    border:1px solid @base;
    margin:0.2rem auto;
    background:@base;
    border-radius:6px;text-align:center;
    color:white;
    line-height:0.7rem;
  }
}
</style>