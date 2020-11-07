<template>
  <div class="activity">
     <div class="nav">
      <h1>数据综合分析-生态因子</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div class="box">
      <div class="left">
        <h2>报表总结</h2>
          <!-- 日度报表 -->
          <div class="lefttop">
          <el-select class="select" v-model="value" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div id="mainday"></div>
            <p>总结：今日生态因子指数为{{8}}</p>
        </div>
        <!-- 月度报表 -->
        <div class="leftbottom">
          <div id="mainmonth"></div>
        </div>
      </div>
      <div class="right">
        <div class="question">
          <h2>专家评审</h2>
          <i class="el-icon-user"></i>
          <div class="demo-input-suffix">
            <el-input
            type="textarea"
              autosize
              placeholder="请输入问题"
              prefix-icon="el-icon-search"
              v-model="input2">
            </el-input>
          </div>
          <el-button class="butt" type="primary">快速提问</el-button>
        </div>
        <div class="solve">
          <h2>小智解答</h2>
          <p>1.PM2.5是怎样产生的？</p>
          <h5> <span>回答：</span> 1.直接以固态形式排出的一次粒子。</h5>
          <h5></h5>
          <h5>2.在高温状态下以气态形式排除，在烟雨的稀释和冷却过程中凝结成固态的一次可凝结粒子。</h5>

          <p>2.水质PH对环境有什么影响？</p>
          <p>3.PM2.5是怎样产生的？</p>
          <p>4.水质PH对环境有什么影响？</p>
          <p>5.水质PH对环境有什么影响？</p>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
     options: [{
          value: '选项1',
          label: 'PM2.5'
        }, {
          value: '选项2',
          label: '大气温度'
        }, {
          value: '选项3',
          label: '光照率'
        }, {
          value: '选项4',
          label: '二氧化碳'
        }, {
          value: '选项5',
          label: '风速'
        }, {
          value: '选项6',
          label: '风向'
        }, {
          value: '选项7',
          label: '氧气'
        }, {
          value: '选项8',
          label: '土壤PH'
        }, {
          value: '选项9',
          label: '土壤温度'
        }],
        value: 'PM2.5',
        input2: ''
    };
  },
  components:{
    
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },
    // 日度报表
    drawChartDay(){
        let myChart = this.$echarts.init(document.getElementById("mainday"));
        let option = {
            title: {
                text: '日度报表',
                padding: [20,0,50,100],
                textStyle:{
                            fontSize: 15,
                            color: 'black'
                        },
            },
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '15%',
                right: '15%',
                top: '18%',
                bottom:'10%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '15%',
                    data: [0, 52, 0]
                }
            ]
          };
        myChart.setOption(option);
    },
    // 月度报表
    drawChartMonth(){
        let myChart = this.$echarts.init(document.getElementById("mainmonth"));
        let option = {
           title: {
                text: '月度报表',
                padding: [20,0,50,100],
                textStyle:{
                            fontSize: 15,
                            color: 'black'
                        },
            },
            grid: {
                left: '15%',
                right: '15%',
                top: '18%',
                bottom:'10%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17', '18', '19', '20', '21', '22', '23','24','25','26','27','28','29','30']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 50, 901, 50, 65, 1330, 89,820, 50, 901, 50, 65, 1330, 89,820, 50, 901, 50, 65, 1330, 89,820, 50, 901, 50, 65, 1330, 89,589,56],
                type: 'line',
                lineStyle: {
                  color: '#1E90FF',
                  width: 3
                },
                areaStyle: {
                  color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                      offset: 0, color: '#1E90FF' // 0% 处的颜色
                  }, {
                      offset: 1, color: 'white' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
              }
                }
            }]
        };
        myChart.setOption(option);
    }
  },
  mounted(){
    this.drawChartDay();
    this.drawChartMonth();
  }
}
</script>

<style scoped>
.box{
  width: 98%;
  height: 53.5rem;
  background-color:#eeeeee;
  margin: 0 auto;
  margin-top: 1rem;
  /* position: fixed; */
}
.nav{
  width: 100%;
  height: 3rem;
  background-color: white;
}
.activity h1{
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

.left{
  width: 65%;
  height: 100%;
  background-color: white;
  float: left;
}
.left h2{
  font-size: 1.14rem;
  margin: 15px 0 0 15px;
}
.lefttop{
  width: 100%;
  height: 54%;
}
.lefttop p{
  margin-left: 130px;
}
#mainday{
  width: 100%;
  height: 95%;
}
.leftbottom{
  width: 100%;
  height: 41.4%;
  /* background-color: gray; */
}
#mainmonth{
  width: 100%;
  height: 100%;
}

.right{
  width: 34%;
  height: 100%;
  float: right;
  background-color: #eeeeee;
}
.question{
  width: 100%;
  height: 40%;
  background-color: white;
}
.question h2{
  font-size: 1.14rem;
  padding: 15px 0 0 15px;
}
.solve{
  width: 100%;
  height: 58.3%;
  margin-top: 2.5%;
  background-color: white;
}
.solve h2{
  font-size: 1.14rem;
  padding: 15px 0 0 15px;
}
.solve p{
  padding: 20px 50px;
}
.solve h5{
  padding: 2px 70px;
  font-weight: normal;
}
.solve span{
  font-weight: 600;
}
.select{
  float: right;
  z-index: 99;
  padding: 20px 160px 0 0;
}
.el-icon-user{
  font-size: 50px;
  margin-left: 46%;
  margin-top: 5%;
}
.demo-input-suffix{
  width: 50%;
  margin: 30px auto;
}
.butt{
  width: 40%;
  margin-left: 31%;
  margin-top: 3%;
}
</style>