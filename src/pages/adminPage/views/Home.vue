<template>
  <div class="home">
    <iframe align="center" width="100%" :height="frameHeight" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" src="/can.html"></iframe>
  </div>
</template>

<script type="text/javascript">
export default {
  data: function () {
    return {
      frameHeight: 0
    }
  },
  created: function () {
    this.getFirameHeriht(this)
  },
  methods: {
    getFirameHeriht: function (_this) {
      _this.frameHeight = window.innerHeight * 85 / 100
    }
  }
}
</script>

<style type="text/css">
html,body{
  background-color: #eee;
  overflow: hidden;
  height: 100%;
}
canvas {
  background-color: #eee;
  display: block;
  margin: 0 auto;
}
.el-main{
  padding: 0 ! important;
}
</style>
