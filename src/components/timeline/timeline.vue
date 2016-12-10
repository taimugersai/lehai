<template>
  <div>
    <!-- 时间轴 -->
    <div class="timeline clear">
      <div class="t-left">
        <p :style="{color:color}">
          <span class="text-large bold">{{(step+1)<10 ? '0'+(step+1) : (step+1)}}</span><br>
          <span class="text-small">{{ sub }}</span><br>
          <span class="dot" :style="{backgroundColor:color}"></span>
        </p>
      </div>
      <div class="t-right">
        <p class="text-big t-title">{{ title }}</p>
        <div class="t-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
   
  },
  props: {
    color: String,
    step: Number,
    sub: [Number, String],
    title: String
  },
}
</script>
<style lang='less'>
@import './timeline.less';
</style>