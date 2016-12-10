<template>
  <div class="wrap">
    <div class="header">
    <router-link to="/user">
       <img src="../../static/cancel.png" class="cancel" >
    </router-link>
       <p>{{name}}的游记<span>发布</span></p>
    </div>
    <div class="content">
      <textarea placeholder="写点什么吧。。。。。。"></textarea>
     
    </div>
  </div>
</template>
<script>


export default {
  components: {
   
  },
  data: function () {
    return {
     name:"韩梅梅"
    }
  },
  mounted: function() {
    
  },
  methods: {
   
  }
}
</script>
<style lang="less" scoped>
@import '../assets/css/common.less';
.wrap{
  background:white;
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
  height:100vh-0.86rem;
  background:white;
  textarea{
    width:@mainWidth;
    height:100vh-0.86rem;
    margin-left:(6.4rem-@mainWidth)/2;
    margin-top:0.25rem;
    font-size:0.21rem;
  }

  }
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          font-family:"Microsoft Yahei";
          
      }

      ::-moz-placeholder { /* Mozilla Firefox 19+ */
        font-family:"Microsoft Yahei";
          
      }

      textarea:-ms-input-placeholder{
        font-family:"Microsoft Yahei";
          
      }

      textarea::-webkit-input-placeholder{
        font-family:"Microsoft Yahei";
          
      }
</style>