<template>
  <div class="history">
       <div class="nav">
      <h1>定点识别-历史识别</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div class="box">
      <div class="top">
        <div class="topnav">
          <!-- 监测点位选择器 -->
          <el-select class="camerachoose" v-model="value" placeholder="监测点位">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- 时间选择器 -->
          <div class="block">
            <el-date-picker
              class="timechoose"
              v-model="value2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
        <!-- 历史识别图 -->
        <div id="maintop"></div>
      </div>
      <div class="null"></div>
      <div class="bottom">
        <!-- 种类统计图 -->
        <div id="mainbottom"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value2: '',
      options: [{
        value: '1',
        label: '监测点位1'
      }, {
        value: '2',
        label: '监测点位2'
      }, {
        value: '3',
        label: '监测点位3'
      }, {
        value: '4',
        label: '监测点位4'
      }],
      value: '1',
    };
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },
    // 历史识别
    drawChartTop(){
        let myChart = this.$echarts.init(document.getElementById("maintop"));
        let option = {
            title: {
                // text: '非法行为统计',
                padding: [20,0,0,50],
                textStyle:{
                            fontSize: 18,
                            color: 'black'
                        },
              },
            grid: {
                left: '5%',
                right: '5%',
                // bottom: '10%',
                top: '20%',
                containLabel: true
            },
            legend:{
              data:['松鼠','兔子','鹿'],
              right:'5%',
              top:'5%'
            },
            xAxis: {
                name:"时间",
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20']
            },
            yAxis: {
                type: 'value'
            },
            series: [
              {
                name:"松鼠",
                data: [30, 42, 50, 70, 80, 100, 110,50,90,63,59,85,36,95,45,100,52,65,12,95],
                type: 'line',
                color: "orange",
                smooth: "true"
              },
              {
                name:"兔子",
                data: [56, 95, 56, 26, 28, 85, 25,56,90,25,59,85,36,56,45,95,65,25,34,85],
                type: 'line',
                color: "blue",
                smooth: "true"
              },
              {
                name:"鹿",
                data: [26, 90, 52, 90, 52, 90, 26,50,90,52,90,26,52,90,52,26,90,52,52,90],
                type: 'line',
                color: "red",
                smooth: "true"
              }]
        };
        myChart.setOption(option);
    },
    // 种类统计图
    drawChartBottom(){
        let myChart = this.$echarts.init(document.getElementById("mainbottom"));
        let option = {
            title: {
                text: '种类统计',
                padding: [20,0,0,50],
                textStyle:{
                            fontSize: 18,
                            color: 'black'
                        },
              },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)',
                transitionDuration:0
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: ['50%', '50%'],
                    avoidLabelOverlap: false,
                    data: [
                        {value: 335, name: '松鼠'},
                        {value: 310, name: '兔子'},
                        {value: 234, name: '鹿'}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    }
  },
  mounted() {
    this.drawChartTop();
    this.drawChartBottom();
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
  .history h1{
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

/* 历史识别表 */
.top{
  width: 100%;
  height: 48.95%;
}
.topnav{
  width: 100%;
  height: 12%;
  /* background-color: orange; */
}
.camerachoose{
  width: 8%;
  float: left;
  margin-left: 80px;
  margin-top: 10px;
}
.timechoose{
  width: 14%;
  margin-top: 10px;
  margin-left: 50px;
}
#maintop{
  width: 100%;
  height: 88%;
}
.null{
  width: 100%;
  height: 18px;
  background-color: #eeeeee;
}
.bottom{
  width: 100%;
  height: 48.95%;
}
#mainbottom{
  width: 100%;
  height: 100%;
}
</style>