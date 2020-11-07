<template>
  <div class="intrude">
      <div class="nav">
      <h1>非法行为-闯入识别</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div class="box">
      <div class="top">
        <div class="topLeft">
          <img src="../../assets/image/result.png" alt="">
        </div>
        <div class="topRight">

          <!-- 种类选择器 -->
          <el-select class="select" v-model="value" placeholder="相机">
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
              v-model="value1"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>

            <div class="list">
              <el-table
                :data="tableData"
                height="356"
                border
                style="width: 100%">
                <el-table-column
                  prop="camera"
                  label="监测点位"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="视频名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="时间"
                  width="130">
                </el-table-column>
              </el-table>
            </div>
        </div>
      </div>
      <div class="bottom">
        <!-- 非法行为统计图 -->
        <div id="main"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
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
        value1: '',// 获取时间
        tableData: [{
          camera: '监测点位1',
          name: '001-2020-09-25.mp4',
          date: '2020-09-25'
        }, {
          camera: '监测点位1',
          name: '001-2020-09-25.mp4',
          date: '2020-09-25'
        }, {
          camera: '监测点位1',
          name: '001-2020-09-25.mp4',
          date: '2020-09-25'
        }, {
          camera: '监测点位1',
          name: '001-2020-09-25.mp4',
          date: '2020-09-25'
        }, {
          camera: '监测点位1',
          name: '001-2020-09-25.mp4',
          date: '2020-09-25'
        }, {
          camera: '监测点位1',
          name: '001-2020-09-25.mp4',
          date: '2020-09-25'
        }, {
          camera: '监测点位1',
          name: '001-2020-09-25.mp4',
          date: '2020-09-25'
        }, {
          camera: '监测点位1',
          name: '001-2020-09-25.mp4',
          date: '2020-09-25'
        }]
    }
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },
    // 非法行为统计
    drawChart(){
        let myChart = this.$echarts.init(document.getElementById("main"));
        let option = {
          title: {
                text: '非法行为统计',
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
            xAxis: {
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [30, 42, 50, 70, 80, 100, 110,50,90,63,59,85,36,95,45,100,52,65,12,95],
                type: 'line',
                color: "orange"
            }]
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
  .intrude h1{
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
  height: 50%;
}

.topLeft{
  width: 60%;
  height: 100%;
  float: left;
  display: flex;
  justify-content: center;
}
.topLeft img{
  width: 92%;
  height: 95%;
  margin-top: 1.2rem;
}

.topRight{
  width: 40%;
  height: 100%;
  float: left;
  padding: 1.2rem;
}
/* 种类选择器 */
.select{
  width: 20%;
  float: left;
  margin-left: 80px;
}
/* 时间选择器 */
.el-input__inner {
  width: 35%;
  margin-left: 128px;
}
.list{
  width: 75%;
  height: 91%;
  margin: 0 auto;
  margin-top: 10px;
}
.bottom{
  width: 100%;
  height: 50%;
}
#main{
  width: 100%;
  height: 100%;
}
</style>