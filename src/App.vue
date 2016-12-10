<template>
  <div>
    <loading :show="isLoading" text="载入中..."></loading>
    <router-view></router-view>
  </div>
</template>

<script>
import store from './vuex/store' 
import Loading from './components/loading/loading'

export default {
  components: {
    Loading
  },
  mounted () {
    document.getElementsByClassName('loader')[0].remove();
  },
  data:function(){
    return {
      
    }
  },
  computed: {
    isLoading () {
      return store.state.isLoading
    }
  }
}
</script>

<style>
@import './assets/css/loading.css';
</style>
