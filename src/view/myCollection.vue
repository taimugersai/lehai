<template>
  <div class="wrap">
  <div class="content">
    <div class="detail_box" v-for="(item, index) in detail" :class="index==0?'top':''">
      <div class="empty" v-if="index!=0"></div>
      <div style="position:relative">
        <img v-lazy="baseurl+item.imgurl"  class="bg_img"/>
        <p class="name">{{item.title}}</p>
        <div class="del right" @click="del(item.id)">删除</div>
        <p class="info gray">{{item.sub_title}}</p>
        <p>
          <span class="tag" v-for="tag in tags[index]">{{tag}}</span>
        </p>
        <p class="right" style="margin-top:0.01rem;">
          <span class="base" style="font-size:0.39rem;font-weight:bold;font-family:'微软雅黑';">￥{{item.price}}元</span>
          <span class="gray" style="font-size:0.26rem;">/人</span><span class="gray" style="font-size:0.22rem;">起</span>
        </p>
        <div class="clear"></div>
      </div>
    </div>
   </div>
  </div>
</template>
<script>

import api from '../api/api.json'
import { http } from '../xhr'
import { MessageBox } from 'mint-ui';

export default {
  components: {
   
  },
  data: function () {
    return {
      baseurl:"",
      tags:[],
      detail:[]
    }
  },
  mounted:function(){
    this.baseurl=api.baseUrl;
    var self = this;
    http(api.starList.method, api.starList.url,function(data){
      self.detail = data.list;
      for(var i =0;i<data.list.length;i++){
        self.tags.push(data.list[i].keyword.split('/'))
      }
    })
  },
  methods: {
    //删除
    del:function(id){
      var self = this
      MessageBox.alert("确认删除？", '提示').then(action => {
        http(api.star.method, api.star.url,{id:id},function(data){
          if(data.status==1){
            MessageBox.alert("删除成功", '提示').then(action => {
                for(var i = 0;i<self.detail.length;i++){
                  if (self.detail[i].id==id){
                    self.detail.splice(i,1)
                    self.tags.splice(i,1)
                  }
                }
            })
          }
        });  
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../assets/css/common.less';
.wrap{
   background:white;
  .content{
    width:@mainWidth;
    margin-left:(6.4-@mainWidth)/2;
  }
}
.top{
  margin-top:0!important;
  padding-top:0.36rem;
}
.detail_box{
    width:100%; 
    margin-top:0.24rem;
    border-bottom:1px solid #ebebeb;
    background:white;
    position:relative;
    .bg_img{
      width:100%;
      height:2.23rem;
    }
    .name{
      display:inline-block;
      font-size:@fontBig;
      margin-top:0.1rem;
      color:#454545
    }
    .info{
      width:100%;
      height:0.63rem;
      font-size:@fontSize;
      margin-top:0.1rem;
      margin-bottom:0.17rem;
      line-height:@lineHeight;
      overflow:hidden;
      text-overflow: ellipsis;
      display:inline-block;
    }
    .tag{
      display:inline-block;
      border:1px solid @base;
      color:@base;
      font-size:@fontSmall;
      padding:0px 5px;
      margin-right:0.14rem;
      margin-bottom:0.2rem;
      border-radius:3px;
    }
    .empty{
      width:100vw;
      margin-left:-(6.4-@mainWidth)/2;
      height:0.21rem;
      background:#ebebeb;
      margin-bottom:0.36rem;
    }
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
</style>