<template>
  <div class="wrap" :style="{height:height}">
    <div class="content">
      <div class="list" style="height:1.43rem;line-height:1.43rem;border-top:0">
        <p class="list_left">头像</p>
        <div class="right">    
          <div style="height:1rem">
            <img :src="img" alt="">      
          </div>  
        </div>
      </div>
      <div class="list">
        <p class="list_left">昵称</p>
        <input  type="text" :placeholder="placeholdername" @focus="placeholdername='',hide='hide'" @blur="placeholdername='请填写昵称',hide=''" v-model="name"></input>
      </div>
      <div class="list">
        <p class="list_left">手机号码</p>
        <input  type="number" :placeholder="placeholderphoneNumber" @focus="placeholderphoneNumber='',hide='hide'" @blur="placeholderphoneNumber='请填写手机号码',hide=''" v-model="phone"></input>
      </div>
     <!--  <div class="list" style="border-top:0">
        <p class="list_left">个性签名</p>
        <input  type="text" :placeholder="placeholderWords" @focus="placeholderWords='',hide='hide'" @blur="placeholderWords='请填写个性签名',hide='show'"></input>
      </div> -->
    </div>
    <div class="save" @click="save()">保存</div>
  </div>
</template>
<script>
import Vue from 'vue'
import api from '../api/api.json'
import { http } from '../xhr'
import { MessageBox } from 'mint-ui';


export default {
  components: {
   
  },
  data: function () {
    return {
     img:"",
     placeholdername:"旅行者",
     name:"",
     placeholderphoneNumber:"12312332123",
     placeholderWords:"加油 加油",
     hide:'',
     height:0,
     phone:""
    }
  },
  mounted: function() {
    var height=document.documentElement.clientHeight;
    this.height=height+"px";
    this.img=this.$route.query.icon;
    this.placeholdername = this.$route.query.name;
    this.placeholderphoneNumber = this.$route.query.phone;
  },
  methods: {
    save:function(){
      var self = this
      if(self.placeholdername==self.$route.query.name){
        self.name = self.placeholdername;
      }
      if(self.name==""){
         MessageBox.alert("昵称不能为空", '提示')
      }
      if(self.placeholderphoneNumber == self.$route.query.phone){
        self.phone = self.placeholderphoneNumber
      }
      if((self.phone+"").length!=11){
         MessageBox.alert("手机号码长度不正确", '提示')
      }
      if(self.name!=""&&(self.phone+"").length==11){
        http(api.info.method, api.info.url,{nickname:self.name,phone:self.phone},function(data){
          if(data.status==1){
            MessageBox.alert(data.err_msg, '提示').then(action => {
              self.$router.go(-1)
            });
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '../assets/css/common.less';
.save{
    position: absolute;
    bottom:0;
    left:0;
    background:@base;
    color:white;
    height:0.86rem;
    width:100%;
    text-align:center;
    line-height:0.86rem;
    font-size:0.28rem;
    z-index:113;
  }
.header{
  background:#eeeeee;
  width:6.4rem;
  height:0.86rem;
  border-bottom:1px solid #c8c8c8;
  .cancel{
    width:0.18rem;
    height:0.18rem;
    margin-top:0.34rem;
    margin-left:0.2rem
  }
  p{
    display:inline-block;
    color:black;
    font-size:0.28rem;
    margin-left:1.8rem;
    span{
      font-size:0.24rem;
      margin-left:1.53rem
    }
  }
}
.content{
  background:white;
  .list{
    width:6rem;
    height:0.99rem;
    border-top:2px solid #dadada ; 
    margin-left:0.2rem;
    font-size:0.24rem;
    z-index:2;
    color:black;
    line-height:0.99rem;
    .list_left{
      display:inline-block;
      width:1rem;
      margin-left:0.04rem;
    }
    input{
      width:4rem;
      margin-left:0.8rem;
      text-align:right;
      font-size:0.24rem;
      color:@textColor;
      font-family:"Microsoft Yahei"
    }
    img{
      width:1rem;
      height:1rem;
      margin-top:0.18rem;
      margin-right:0.03rem;
    } 
  }
 .empty{
      width:6.4rem;
      height:0.4rem;
      background:#ebebeb
    }
  
}
.orange{
  color:@base
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