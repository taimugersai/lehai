<template>
  <div class="wrap">
    <div class="content">
    <!-- 出发日期 -->
        <p class="title"><span class="word">出发日期</span>(以下均为起价)</p>
        <div class="date clear" >
          <div class="detail" v-for="(item,index) in data.items" v-on:click="chooseDate(index)">
            <p style="color:#353434">{{item.start_date}}</p>
            <p style="color:#f95b1d">￥{{item.price}}</p>
            <P style="color:#7f7c7b">余{{item.number}}</P>
            <div class="choose" v-if="state==index">
              <img src="static/choosed.png">
            </div>
          </div> 
        </div>
    <!-- 选择出行人 -->
        <p class="title" style="margin-top:0.2rem"><span class="word">选择出行人</span><span class="add" @click="showAdd">添加</span></p> 
        <div class="people" >
          <div class="person" v-for="(item,index) in data.travelers">
            {{item.realname}}
            <span style="font-size:0.19rem;margin-left:0.17rem" v-if="item.adult==1">(儿童)</span>
            <div class="choosed" v-if="item.state==1" v-on:click="cancel(item.id,index)">
              <img src="static/choosed.png">
            </div>
            <div class="choose"  v-if="item.state==0" v-on:click="choose(item.id,index)"></div>
          </div>
        </div>
        <p class="prices">成人票：{{adult_price}}元人 <span style="margin-left:0.33rem">儿童票：{{child_price}}元/人</span></p>
    </div>
    <div class="button" v-on:click="pay">购买</div>
    <!-- 模态框 -->
    <div class="modal" :class="hide" v-on:click="hideall"></div>
    <!-- 添加弹窗 -->
    <div class="addModal" :class="hideAdd">
      <img  class="right"  src="static/cancel.png" >
      <div class="box">
        <p class="title" v-on:click="hideall">乐嗨旅行</p>
        <div class="travel">travel</div>
        <div class="list" style="margin-top:0.2rem">
          <p class="list_left">证件类型 </p>:
          <p class="choose" style="margin-left:0.7rem;"><span :class="type_active==0?'blackChoose':'unChoose'" @click="shengcenzheng">身份证</span><span style="color:#b9b9b9">/</span><span :class="type_active==1?'blackChoose':'unChoose'" @click="huzhao">护照</span></p>
        </div>
        <div class="list">
          <p class="list_left">国籍 </p>:
          <input  type="text" :placeholder="placeholderCountry" @focus="placeholderCountry=''" @blur="placeholderCountry='请填写国籍'" v-model='country'></input>
        </div>
        <div class="list">
          <p class="list_left">证件号 </p>:
          <input  type="number" :placeholder="placeholderNumber" @focus="placeholderNumber=''" @blur="placeholderNumber='请填写证件号'" v-model='idnumber'></input>
        </div>
        <div class="list">
          <p class="list_left">姓名 </p>:
          <input  type="text" :placeholder="placeholderName" @focus="placeholderName=''" @blur="placeholderName='请填写姓名'" v-model='name'></input>
        </div>
        <div class="list">
          <p class="list_left">性别</p>:
          <p class="choose"><span :class="sex_active==0?'blackChoose':'unChoose'" @click="man">男</span><span style="color:#b9b9b9">/</span><span :class="sex_active==1?'blackChoose':'unChoose'" @click="women">女</span></p>
        </div>
        <div class="list">
          <p class="list_left">是否成年</p>:
          <p class="choose" style="margin-left:0.8rem;"><span :class="adult_active==0?'blackChoose':'unChoose'" @click="adult">成人</span><span style="color:#b9b9b9">/</span><span :class="adult_active==1?'blackChoose':'unChoose'" @click="child">儿童</span></p>
        </div>
        <div class="list">
          <p class="list_left">手机号码 </p>:
          <input  type="number" :placeholder="placeholderPhone" @focus="placeholderPhone=''" @blur="placeholderPhone='请填写手机号码'" v-model='phonenumber'></input>
        </div>
        <div class="add" @click="add">添加</div>
      </div>
    </div>
    <!-- 协议 -->
    <div class="agreementModal" :class="hideAgreement">
      <img  src="static/cancelBig.png" v-on:click="hideall">
      <div class="detail">
      <span style="color:#454545;text-align:center">乐嗨用户购买协议</span>
      <p><span>一. 用户须知</span> 用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知。 一. 用户须知 
      </p>
      <p><span>一. 用户须知</span> 用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知。 一. 用户须知 
      </p>
      <p><span>一. 用户须知</span> 用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知。 一. 用户须知 
      </p>
      <p><span>一. 用户须知</span> 用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知。 一. 用户须知 
      </p>
      <p><span>一. 用户须知</span> 用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知。 一. 用户须知 
      </p>
      </div>
    </div>
    <!-- 支付框 -->
    <div class="takeOrder" :class="hidePay">
      <div class="info">
        <p class="title">付款</p>
        <div class="detail">支付方式 <img src="static/type.png"></div>
        <div class="detail">需付款 <span class="price"><span style="color:#f95b1d;font-size:0.297rem">{{price}}</span>元</span></div>
        <p class="agreement" v-if="price!=0">点击确认支付表示已阅读并同意 <span style="color:#f95b1d;" v-on:click="showAgreement">乐嗨旅行购买协议</span></p>
      </div>
      <div class="button" v-if="price!=0">确认支付</div>
      <div class="button stop" v-if="price==0">请勾选出行信息</div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { http } from '../xhr.js'
import api from '../api/api.json'
import { MessageBox } from 'mint-ui';

export default {
  components: {
   
  },
  data: function () {
    return {
      data:[],
      state:0,
      country:"",
      name:"",
      phonenumber:"",
      idnumber:"",
      adult_price:0,
      child_price:0,
      type_active:0,
      sex_active:0,
      price:0,
      adult_active:0,
      hide:"hide",
      hidePay:"hide",
      hideAgreement:"hide",
      hideAdd:"hide",
      placeholderCountry:"请填写国籍",
      placeholderNumber:"请填写证件号",
      placeholderName:"请填写姓名",
      placeholderPhone:"请填写手机号码"
    }
  },
  mounted: function() {
    var self = this;
     http(api.order.method, api.order.url,{id:self.$route.query.id},function(data){
      console.log(data)
          self.data=data;
          var index = self.state;
          self.adult_price = data.items[index].price;
          self.child_price = data.items[index].child_price;
          for(var i =0;i<self.data.travelers.length;i++){
            self.data.travelers[i].state = 0;
          }
        })
  },
  methods: {
    //添加出行人
    add:function(){

      var self= this;
      if(self.country!=""&&self.name!=""&&self.idnumber!=0&&(self.phonenumber+"").length==11){
        console.log(111)
        http(api.addTraveler.method, api.addTraveler.url,{realname:self.name,country:self.country,phone:self.phonenumber,card_no:self.idnumber,card_type:self.type_active,sex:self.sex_active,adult:self.adult_active},function(data){
          if(data.status==1){
            data.traveler.state=0;
            self.data.travelers.push(data.traveler);
            self.hide="hide",
            self.hideAdd="hide"
            
          }
          

      })
      }
      
    },
    //取消出行人
    cancel:function(id,index){
      var self = this;  
      self.data.travelers[index].state=0;
      self.data.travelers.splice(index,1,self.data.travelers[index])
    }, 
    //选择日期 
    chooseDate:function(id){
      var self=this;
      self.state=id;
      self.adult_price = self.data.items[id].price
      self.child_price = self.data.items[id].child_price
    },
    //选择出行人
    choose:function(id,index){
      var self = this;  
      self.data.travelers[index].state=1;
      self.data.travelers.splice(index,1,self.data.travelers[index])
    },
    //点击购买
    pay:function(){
      var self=this;
      self.price=0;
      for(var i=0;i<self.data.travelers.length;i++){
        if(self.data.travelers[i].state==1){
          if(self.data.travelers[i].adult==0){
              self.price = self.price+self.adult_price;
          }else if(self.data.travelers[i].adult==1){
              self.price = self.price+self.child_price;
          }
          this.hide="" ;
          this.hidePay="";
        }
      }
      if (self.price==0) {
        MessageBox.alert('请勾选出行信息!', '提示');
      }

    },
    //隐藏全部弹窗
    hideall:function(){
      this.hidePay="hide";
      this.hide="hide";
      this.hideAgreement="hide";
      this.hideAdd="hide"
    },
    //显示协议
    showAgreement:function(){
      this.hidePay="hide";
      this.hideAgreement=""
    },
    //添加出行人
    showAdd:function(){
      this.hide="";
      this.hideAdd=""
    },
    // 点击身份证
    shengcenzheng:function(){
      this.type_active=0
    },
    // 点击护照
    huzhao:function(){
      this.type_active=1
    },
      // 点击男
    man:function(){
      this.sex_active=0
    },
    // 点击女
    women:function(){
      this.sex_active=1
    },
      // 点击成年
    adult:function(){
      this.adult_active=0
    },
    // 点击女
    child:function(){
      this.adult_active=1
    }
  }
}
</script>
<style lang="less" scoped>
@import '../assets/css/common.less';
.wrap{
  height:100vh;
  .content{
    z-index:1;
    padding:0.3rem (6.4rem-@mainWidth)/2;
    padding-bottom:0.16rem;
    background:white;
    height:100%;
    .prices{
      color:@base;
      margin-left:0.11rem;
      margin-top:0.5rem;
      padding-bottom:1rem;
    }
    .title{
      height:0.4rem;
      border-left:0.1rem solid @base;
      .word{
        color:#353434;
        font-size:0.27rem;
        margin-left:0.37rem;
        margin-right:0.09rem;
      }
      .add{
        background:@base;
        color:white;
        margin-left:0.15rem;
        width:0.75rem;
        height:0.39rem;
        line-height:0.42rem;
        border-radius:4px;
        font-size:0.18rem;
        padding:3px 5px 1px 5px;
      }
    }
    .date{
      width:5.28rem;
      margin-top:0.28rem;
      .detail{
        width:1.42rem;
        height:0.89rem;
        border:1px solid #bcbcbc;
        border-radius:7px;
        float:left;
        margin-left:0.26rem;
        margin-right:0;
        margin-bottom:0.22rem;
        text-align:center;
        overflow:hidden;
         position: relative;
        p{
          line-height:0.3rem;
        }
        .choose{
          position: absolute;
          bottom:0;
          right:0;
          width: 0;
          height: 0;
          border-bottom: 0.3rem solid @base;
          border-left: 0.42rem solid transparent;
          img{
            width:0.15rem;
            height:0.14rem;
            float:right;
            margin-top:0.12rem;
            margin-right:0.05rem;
          }

        }
      }
    }
    .people{
      width:5.38rem;
      margin-top:0.1rem;
      margin-left:0.11rem;
      .person{
        height:0.71rem;
        border-bottom:2px solid #c4c6c6;
        font-size:0.235rem;
        color:#767373;
        line-height:0.71rem;
        .choose, .choosed{
          float:right;
          width:0.2rem;
          height:0.17rem;
          border:2px solid @base;
          margin-right:0.18rem;
          margin-top:0.26rem;
        }
        .choosed{
          background:@base;
          position: relative;
          img{
            width:100%;
            height:100%;
            position: absolute;
          }
        }
      }
    }
  }
   .button{
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
//模态框
.modal{
  width:100vw;
  height:100vh;
  background:rgba(0,0,0,0.8);
  position:fixed;
  top:0;
  left:0;
  z-index:2;
}
//添加弹窗
.addModal{
  width:4.95rem;
  height:7.3rem;
  position:fixed;
  top:1.62rem;
  left:0.72rem;
  z-index:4;
  background:white;
  border-radius:7px;
  img{
    margin-top:0.16rem;
    margin-right:0.16rem;
    z-index:6;
  }
  .box{
    width:4.56rem;
    height:5.33rem;
    margin-left:0.23rem;
    position: relative;
    z-index:5;
    .title{
      width:100%;
      height:1.04rem;
      line-height:1.04rem;
      font-size:0.256rem;
      color:#3f3e3e;
      text-align:center;
      font-weight:bold;
      border-bottom:1px solid @base;
      z-index:4;
    }
    .travel{
      color:@base;
      width:0.97rem;
      height:0.22rem;
      font-weight:bold;
      font-size:0.16rem;
      position: absolute;
      top:0.9rem;
      left:1.69rem;
      background:white;
      text-align:center;
      z-index:5;
    }
    .list{
      font-size:0.26rem;
      width:100%;
      height:0.64rem;
      border-bottom:2px solid #dadada ; 
      color:black;
      line-height:0.64rem;
      .blackChoose{
        color:black;
      }
      .unChoose{
        color:@textColor;
      }
      .list_left{
        display:inline-block;
        width:1.1rem;
        margin-left:0.04rem;
        text-align:justify;
        text-justify:inter-word;
        font-weight:blod;
      }
      .choose{
        display:inline-block;
        margin-left:1.1rem;
      }
      .adultChoose{
        display:inline-block;
        width:80%;
        height:0.6rem;
        margin-top:0.1rem;
        margin-bottom:0.1rem;
        margin-left:10%;
        text-align:center;
        border-radius:8px!important;
        border:1px solid @base;
        span{
          display:inline-block;
          width:50%;
          height:100%;
          text-align:center;
          color:@textColor;
        }
        .active-left{
          background:@base!important;
          color:white;
          border-top-left-radius:5px;
          border-bottom-left-radius:5px;
        }
        .active-right{
          background:@base!important;
          color:white;
          border-top-right-radius:5px;
          border-bottom-right-radius:5px;
        }
      }
      input{
        display:inline-block;
        margin-left:0.1rem;
        font-size:0.24rem;
        color:black;
        text-align:center;
        font-family:"Microsoft Yahei"
      }
    }
    .add{
      width:1.7rem;
      height:0.5rem;
      border:1px solid @base;
      border-radius:7px;
      margin:0.36rem auto;
      text-align:center;
      color:@base;
      font-size:0.19rem;
      line-height:0.5rem;
    }
  }
  
}
//协议弹窗
.agreementModal{
  width:5.01rem;
  height:8.44rem;
  position:fixed;
  top:0.65rem;
  left:0.73rem;
  z-index:4;
  img{
    float:right;
    width:0.34rem;
    height:0.35rem;
  }
  .detail{
    width:4.42rem;
    height:7.72rem;
    background:white;
    float:right;
    margin-top:0.18rem;
    text-align:center;
    padding-left: 0.36rem;
    padding-right: 0.36rem;
    padding-top:0.2rem;
    p{
      text-align:left;
      color:#454545;
      span{
        display:block;
        font-size:0.2rem;
      }
    }
  }
}
//下订单弹窗
.takeOrder{
  position:fixed;
  bottom:0.76rem;
  left:0;
  z-index:3;
  .info{
    height:3.09rem;
    width:100vw;
    background:white;
    .title{
      color:#262525;
      text-align:center;
      font-size:0.255rem;
      line-height:0.85rem;
      border-bottom:3px solid #706b6b;
      width:@mainWidth;
      margin-left:(6.4rem-@mainWidth)/2
    }
    .detail{
      color:#262525;
      font-size:0.255rem;
      line-height:0.58rem;
      border-bottom:1px solid #d2cece;
      width:4.95rem;
      height:0.58rem;
      margin-left:0.76rem;
      img{
        float:right;
        width:1.3rem;
        height:0.3rem;
        margin-top:0.15rem;
      }
      .price{
        float:right;
        font-size:0.17rem;
      }
    }
  .agreement{
    display:inline-block;
    width:5rem;
    margin-left:0.9rem;
    font-size:0.2rem;
    margin-top:0.35rem;
  }
  }
}
.hide{
  display:none
}
.stop{
  background:black!important;
}
</style>