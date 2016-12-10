<template>
  <div class="wrap" :style="{height:height}">
    <div class="header">
      <router-link to="/user">
         <img src="../../static/cancel.png" class="cancel" >
      </router-link>
       <p>编辑出行人信息<span @click="save()">保存</span></p>
    </div>
    <div class="content">
      <div class="list">
        <p class="list_left">证件类型</p>
        <p class="right"><span :class="cardtype==0?'orange':''" @click="shengfenzheng()">身份证</span>/<span :class="cardtype==1?'orange':''" @click="huzhao()">护照</span></p>
      </div>
      <div class="list" v-if="cardtype==1">
        <p class="list_left">国籍</p>
        <input  type="text" :placeholder="placeholdercountry" v-model="country"  @focus="placeholdercountry=''" @blur="placeholdercountry='请填写国籍'"></input>
      </div>
      <div class="list">
        <p class="list_left">证件号</p>
        <input  type="number" :placeholder="placeholderidNumber" v-model="idNumber" @focus="placeholderidNumber=''" @blur="placeholderidNumber='请填写证件号'"></input>
      </div>
      <div class="list">
        <p class="list_left">姓名</p>
        <input  type="text" :placeholder="placeholdername" v-model="name" @focus="placeholdername=''" @blur="placeholdername='请填写姓名'"></input>
      </div>
      <div class="list">
        <p class="list_left">性别</p>
        <p class="right"><span :class="sex==0?'orange':''" @click="man()">男</span>/<span :class="sex==1?'orange':''" @click="women()">女</span></p>
      </div>
      <div class="list">
        <p class="list_left">是否成年</p>
        <p class="right"><span :class="adult==0?'orange':''" @click="changeadult()">成人</span>/<span :class="adult==1?'orange':''" @click="child()">儿童</span></p>
      </div>
      <div class="list">
        <p class="list_left">手机号码</p>
        <input  type="number" :placeholder="placeholderphoneNumber" v-model="phoneNumber" @focus="placeholderphoneNumber=''" @blur="placeholderphoneNumber='请填写手机号码'"></input>
      </div>
    </div>
    <div class="del" @click="del()">删除出行人</div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Switch } from 'mint-ui';
import 'mint-ui/lib/switch/style.css';
Vue.component(Switch.name, Switch);
import { http } from '../xhr.js'
import api from '../api/api.json'
import { MessageBox } from 'mint-ui';



export default {
  components: {
   
  },
  data: function () {
    return {
     cardtype:0,
     sex:0,
     adult:0,
     country:"",
     idNumber:"",
     name:"",
     phoneNumber:"",
     placeholdercountry:"",
     placeholderidNumber:"",
     placeholdername:"",
     placeholderphoneNumber:"",
     height:0
    }
  },
  mounted: function() {
    //获得数据
    var height=document.documentElement.clientHeight;
    this.height=height+"px";
     var self = this;
       http(api.getTraveler.method, api.getTraveler.url,{id:self.$route.query.id},function(data){
        console.log(data)
        self.cardtype = data.traveller.card_type
        self.placeholderidNumber = data.traveller.card_no
        self.sex = data.traveller.sex
        self.adult = data.traveller.adult
        self.placeholdername = data.traveller.realname
        self.placeholderphoneNumber = data.traveller.phone
        self.country = data.traveller.country
      })
  },
  methods: {
    // 点击身份证
    shengfenzheng:function(){
      this.cardtype=0
    },
    // 点击护照
    huzhao:function(){
      this.cardtype=1
    },
    // 点击男
    man:function(){
      this.sex=0
    },
    // 点击女
    women:function(){
      this.sex=1
    },
    // 点击成人
    changeadult:function(){
      this.adult=0
    },
    // 点击儿童
    child:function(){
      this.adult=1
    },
    // 保存
    save:function(){
       var self= this;
        if(self.country==""&&self.placeholdercountry!="请填写国籍"){
          self.country = self.placeholdercountry
        }
        if(self.cardtype==0){
         self.country="中国"
        }
        if(self.name==""&&self.placeholdername!="请填写姓名"){
          self.name = self.placeholdername
        }
         if(self.phoneNumber==""&&self.placeholderphoneNumber!="请填写手机号码"){
          self.phoneNumber = self.placeholderphoneNumber
        }
        if(self.idNumber==""&&self.placeholderidNumber!="请填写证件号"){
          self.idNumber = self.placeholderidNumber
        }
        if(self.country!=""&&self.name!=""&&self.idNumber!=""&&(self.phoneNumber+"").length==11){
          console.log(111)
          http(api.updateTraveler.method, api.updateTraveler.url,{realname:self.name,country:self.country,phone:self.phoneNumber,card_no:self.idNumber,card_type:self.cardtype,sex:self.sex,adult:self.adult,id:self.$route.query.id},function(data){
            if(data.status==1){
              MessageBox.alert(data.err_msg, '提示').then(action => {
                self.$router.go(-1)
              });
            }
          })
        }
    },
    // 删除
    del:function(){
      var self = this;
      MessageBox.alert("确认删除么？", '提示').then(action => {
              http(api.deleteTraveler.method, api.deleteTraveler.url,{id:self.$route.query.id},function(data){
                if(data.status==1){
                  MessageBox.alert(data.err_msg, '提示').then(action => {self.$router.go(-1)})
                }
              })
      });
      
    }
  }
}
</script>
<style lang="less" scoped>
@import '../assets/css/common.less';
.wrap{
  background:white;
}
.del{
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
  height:9.6rem;
  background:white;
  .list{
    width:6rem;
    height:0.99rem;
    border-bottom:2px solid #dadada ; 
    margin-left:0.2rem;
    font-size:0.24rem;
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
      color:black;
      font-family:"Microsoft Yahei"
    }
  }
  .connection{
    text-align:center;
    font-size:0.28rem;
    color:black;
    margin-top:0.23rem;
    margin-bottom:0.23rem;
  }

  
}

      :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          font-family:"Microsoft Yahei";
          color: #000; opacity:1; 
      }

      ::-moz-placeholder { /* Mozilla Firefox 19+ */
        font-family:"Microsoft Yahei";
          color: #000;opacity:1;
      }

      input:-ms-input-placeholder{
        font-family:"Microsoft Yahei";
          color: #000;opacity:1;
      }

      input::-webkit-input-placeholder{
        font-family:"Microsoft Yahei";
          color: #000;opacity:1;
      }
</style>