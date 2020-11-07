<template>
  <div class="people">
      <div class="nav">
      <h1>道路卡口-人流统计</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div class="box">
      <div class="left">
        <div class="img">
          <video src="../../assets/image/人流量统计.mp4" autoplay="autoplay" loop="loop"></video>
        </div>
      </div>
      <div class="right">
        <!-- 实时数据 -->
        <div class="realtime">
          <h3>实时数据</h3>
          <ul>
            <li><img src="../../assets/image/goin.png"> 进入：21人</li>
            <li><img src="../../assets/image/goout.png">离开：25人</li>
            <li> <i class="el-icon-bell"></i> 违法行为：无</li>
          </ul>
        </div>
        <!-- 人流数据统计 -->
        <div class="peopledata">
          <h3>人流数量统计</h3>
          <table>
            <tr>
              <th>进入景区人数（个）</th>
              <th>离开景区人数（个）</th>
            </tr>
            <tr>
              <td>14（个）</td>
              <td>22（个）</td>
            </tr>
            <tr>
              <td>20（个）</td>
              <td>5（个）</td>
            </tr>
            <tr>
              <td>33（个）</td>
              <td>15（个）</td>
            </tr>
          </table>
        </div>
        <!-- 人流数据统计表 -->
        <div class="peopledataecharts">
          <h3>月度人流数量统计</h3>
          <div id="main"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components:{
    
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },
    // 人流数据统计图
    drawChart(){
        let myChart = this.$echarts.init(document.getElementById("main"));
        let option = {
            legend: {
                data: ['进入人数', '离开人数']
            },
            xAxis: {
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']
            },
            yAxis: {
                type: 'value'
            },
            series: [
              {
                data: [130, 142, 150, 170, 180, 100, 210,150,190,163,159,185,136,195,145,100,152,165,112,195,122,135,156,198,211,200,173,142,132,153],
                name: '进入人数',
                type: 'line',
                stack: '总量1',
              },
              {
                data: [132, 143, 150, 175, 178, 100, 211,146,199,160,154,188,135,195,146,103,151,163,112,197,120,134,146,198,201,205,176,145,134,151],
                name: '离开人数',
                type: 'line',
                stack: '总量2',
              }
            ]
        };
        myChart.setOption(option);
    }
  },
  mounted() {
    this.drawChart()
  }

}
</script>

<style scoped>
  .box{
    width: 98%;
    height: 53.5rem;
    background-color:white;
    margin: 0 auto;
    margin-top: 1rem;
    /* position: fixed; */
  }
  .nav{
    width: 100%;
    height: 3rem;
    background-color: white;
  }
  .people h1{
    width: 50%;
    float: left;
    font-size: 1.14rem;
    line-height: 3rem;
    margin-left: 1.2rem;
  }
  .el-icon-s-unfold{
    float: right;
    margin-right: 15px;
    font-size: 3rem;
    cursor: pointer;
    color: gray;
  }
  .el-icon-s-unfold:hover{
    color: black;
  }
.el-icon-s-custom{
  float: right;
  font-size: 2rem;
  cursor: pointer;
  color: white;
  margin-right: 3px;
  margin-top: 1px;
}
.nav span{
  float: right;
  line-height: 3rem;
  cursor: pointer;
  margin-right: 20px;
}
.nav a{
  float: right;
  line-height: 3rem;
  margin-right: 20px;
}
.circle{
  float: right;
  width: 40px;
  height: 40px;
  border: 1px solid #4682B4;
  border-radius: 100px;
  margin-top: 4px;
  background-color: #4682B4;
  margin-right: 10px;
}


  /* left */
  .left{
    width: 65%;
    height: 100%;
    float: left;
  }
  .img{
    width: 97%;
    height: 92%;
    /* background: url(../../assets/image/people.jpg) no-repeat;
    background-size: 100% 100%; */
    margin: 2.1% auto;
    border: 2px solid gray;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }
  .img video{
    width: 100%;
  }

  /* right */
  .right{
    width: 35%;
    height: 100%;
    float: left;
  }
  /* 实时数据 */
  .realtime{
    width: 100%;
    height: 28%;
    margin-top: 25px;
  }
  .realtime ul{
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .realtime ul li{
    width: 70%;
    height: 20%;
    display: flex;
    align-items: center;
    margin-top: 15px;
  }
  .realtime img{
    margin-right: 25px;
  }
  .el-icon-bell{
    margin-right: 20px;
    font-size: 30px;
    color: orange;

  }
  /* 人流数量统计 */
  .peopledata{
    width: 100%;
    height: 28%;
  }
  .peopledata table{
    width: 100%;
    height: 70%;
    margin-top: 15px;
  }
  .peopledata td {
    text-align: center;
  }
  /* 人流数量统计表 */
  .peopledataecharts{
    width: 100%;
    height: 37.5%;
  }
  #main{
    width: 100%;
    height: 100%;
  }
</style>