<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#app{
  width:100%;
  height:100%;
  /* min-height:881px; */
  /* min-width: 1300px; */
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
    width: 9px;
    height: 9px
}
/*定义滚动条轨道*/
::-webkit-scrollbar-track {
    background-color: transparent;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
    background-color: #cedae2;
    /* background-image: -webkit-linear-gradient(45deg,rgba(255,255,255,.4) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.4) 50%,rgba(255,255,255,.4) 75%,transparent 75%,transparent); */
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em
}
</style>
