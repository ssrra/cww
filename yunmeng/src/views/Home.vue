<template>
  <div class="home">
    <div class="home-content">
      <!-- 标题图 -->
      <div class="home-title">
        <div>
            <!-- <img src="img/home/title.png" alt=""> -->
        </div>
      </div>
      <!-- 六大板块 -->
      <div class="home-parts">
        <div class="home-parts-box">
          <div>
            <a href="http://121.41.60.233:8899/XAGIS" target="_black">
              <img src="img/home/bendi.png" alt="">
            </a>
          </div>
        </div>
        <div class="home-parts-box">
          <div>
            <a href="javascript:;">
              <img src="img/home/OA.png" alt="">
            </a>
            
          </div>
          <div>
            <router-link to="/people">
              <a href="javascript:;">
                <img src="img/home/artificial.png" alt="">
              </a>
            </router-link>
          </div>
        </div>
        <div class="home-parts-box">
          <div>
            <router-link to="/dataAnalyse">
              <img src="img/home/data.png" alt="">
            </router-link>      
          </div>
          <div>
            <a href="http://121.41.60.233:8899/XAGISM"  target="_black">
              <img src="img/home/GIS.png" alt="">
            </a>
            
          </div>
        </div>
        <div class="home-parts-box">
          <div>
            <router-link to="/realtime">
              <img src="img/home/realtime.png" alt="">
            </router-link>      
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.home{
  width: 100%;
  height:100%;
  /* min-height:881px; */
  position: fixed;
  top: 0px;
  left: 0px;
}
.home-content{
  width: 100%;
  height: 100%;
  /* min-height:881px; */
  background:url(../../public/img/home/bg.png) no-repeat; 
  background-size: 100% 100%; 
}
.home-title{
  width: 100%;
  height: 15%;
  padding: 2rem 0rem 0rem 2rem;
}
.home-parts{
  width: 100%;
  height: 85%;
  display: flex;
  padding: 0rem 5rem;
  justify-content: center;
}
.home-parts .home-parts-box{
  width: 20%;
  height: 100%;
  margin-right: 1rem;
}
.home-parts .home-parts-box:nth-child(odd){
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.home-parts .home-parts-box>div{
  width: 100%;
  /* height: 100%; */
}

.home-parts .home-parts-box>div img{
  width: 100%;
}
</style>