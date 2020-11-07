<template>
  <div class="attendance">
       <div class="nav">
      <h1>社区共建-成效评估</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div id="boxs">
      <div class="top">
        <div class="topLeft">
          <div id="mainLeft"></div>
        </div>

        <div class="topRight">
          <div id="mainRight"></div>
          <el-select class="select1" v-model="value1">
          <el-option 
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </div>
      </div>

      <div class="bottom">
        <div id="mainBottom"></div>
        <el-select class="select" v-model="value">
          <el-option 
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [{
          value: '1',
          label: '管理基础'
        }, {
          value: '2',
          label: '管理措施'
        }, {
          value: '3',
          label: '管理保障'
        }, {
          value: '4',
          label: '管理成效'
        }, {
          value: '5',
          label: '负面影响'
        }],
        options1: [{
          value: '1',
          label: '第一季度'
        }, {
          value: '2',
          label: '第二季度'
        }, {
          value: '3',
          label: '第三季度'
        }, {
          value: '4',
          label: '第四季度'
        }],
        value: '1',
        value1: '1'
    };
  },

  methods:{
    goback(){
      this.$router.push('/home')
    },
    // 月度评估
    drawChartMonth(){
        let myChart = this.$echarts.init(document.getElementById("mainLeft"));
        let option = {
            title: {
                text: '月度评估',
                padding: [20,0,0,20],
                textStyle:{
                            fontSize: 16,
                            color: 'black',
                            fontWeight: 'normal'
                        },
            },
            legend: {
                orient: 'vertical',
                right: 50,
                top: 30,
                data: ['管理基础', '管理成效', '管理保障', '负面影响', '管理措施']
            },
            series: [
                {
                    name: '面积模式',
                    type: 'pie',
                    radius: [20, 160],
                    center: ['45%', '55%'],
                    roseType: 'area',
                    data: [
                        {value: 25, name: '管理基础'},
                        {value: 5, name: '管理成效'},
                        {value: 15, name: '管理保障'},
                        {value: 10, name: '负面影响'},
                        {value: 45, name: '管理措施'}
                    ]
                }
            ]
        };
        myChart.setOption(option);
    },
    // 季度评估
    drawChartQuarter(){
        let myChart = this.$echarts.init(document.getElementById("mainRight"));
        let option = {
           title: {
              text: '年度评估',
              padding: [20,0,0,20],
              textStyle:{
                          fontSize: 16,
                          color: 'black',
                          fontWeight: 'normal'
                      },
            },
            tooltip: {
                trigger: 'axis',
                transitionDuration: 0
            },
            legend: {
                right: 50,
                top: 30,
                data: ['管理基础', '管理措施', '管理保障', '管理成效', '负面影响']
            },
            grid: {
                left: '10%',
                right: '10%',
                top: '30%',
                bottom:'10%',
                containLabel: true
            },
            xAxis: {
                name: '季度',
                type: 'category',
                boundaryGap: false,
                data: ['四月', '五月', '六月']
            },
            yAxis: {
                name: '指数',
                type: 'value'
            },
            series: [
                {
                    name: '管理基础',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101]
                },
                {
                    name: '管理措施',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191]
                },
                {
                    name: '管理保障',
                    type: 'line',
                    stack: '总量',
                    data: [150, 232, 201]
                },
                {
                    name: '管理成效',
                    type: 'line',
                    stack: '总量',
                    data: [320, 332, 301]
                },
                {
                    name: '负面影响',
                    type: 'line',
                    stack: '总量',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
          };
        myChart.setOption(option);
    },
    // 年度评估
    drawChartYear(){
        let myChart = this.$echarts.init(document.getElementById("mainBottom"));
        let option = {
            title: {
                text: '年度评估',
                padding: [20,0,0,20],
                textStyle:{
                            fontSize: 16,
                            color: 'black',
                            fontWeight: 'normal'
                        },
            },
            color: ['#3398DB'],
            grid: {
                left: '5%',
                right: '5%',
                top: '25%',
                bottom:'10%',
                containLabel: true
            },
            xAxis: [
                {
                    name: "月份",
                    type: 'category',
                    data: ['1', '2', '3','4','5','6','7','8','9','10','11','12',],
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
                    data: [50, 45, 40,35,33,35,20,35,20,21,36,37,38]
                }
            ]
          };
        myChart.setOption(option);
    }
    
  },
  mounted(){
    this.drawChartMonth();
    this.drawChartQuarter();
    this.drawChartYear();
  }

}
</script>

<style scoped>
  #boxs{
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
  .attendance h1{
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

  .top{
    width: 100%;
    height: 49.5%;
  }
  .topLeft{
    width: 49.5%;
    height: 100%;
    background-color: white;
    float: left;
  }
  #mainLeft{
    width: 100%;
    height: 100%;
  }
  
  .topRight{
    width: 49.5%;
    height: 100%;
    background-color: white;
    float: right;
  }
  #mainRight{
    width: 100%;
    height: 100%;
  }
  .select1{
    position: absolute;
    top: 12%;
    left: 60%;
  }
  .bottom{
    width: 100%;
    height: 49.5%;
    background-color: white;
    margin-top: 0.5%;
  }
  .select{
    position: absolute;
    top: 57.5%;
    left: 16%;
  }
  #mainBottom{
    width: 100%;
    height: 100%;
  }
</style>