<template>
<div class="history-styz-month">
  <div class="nav">
    <h1>生态因子-历史数据</h1>
    <i class="el-icon-s-unfold" @click="goback()"></i>
    <a>|</a>
    <span>管理员</span>
    <div class="circle"><i class="el-icon-s-custom" ></i></div>
    
  </div>
  <div class="box">
    <!-- 超标总结图 -->
    <div class="over-standerd">
      <div id="overStanderdSummary"></div>
    </div>

    <!-- 生态因子超标分布图 -->
    <div class="overstanderd-distribution">
      <div id="ecoOverstanderdDistribution"></div>
    </div>

    <!-- 生态因子趋势图 -->
    <div class="oxygen-ion-chart">
      <div id="ecologicalFatorChart"></div>
      <div class="select-title" @click.stop="clickEcoFactor">
        <span>{{factorChoosed}}</span>
        <svg class="icon down-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024"
          version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1364">
          <path d="M511.999488 124.201743 959.789071 124.201743 735.891721 512 511.999488 899.797233 288.106232 512 64.209906 124.201743Z"
            p-id="1365"></path>
        </svg>
      </div>
      <div class="two-level-menu">
        <ul>
          <li v-for="(item,i) in ecoFactorList" :key="i" :data-id="item.id" @click.stop="paintEcologicalFatorChart(i,item.name)">{{item.name}}</li>
        </ul>
      </div>         
    </div>

    <!-- 生态因子表格 -->
    <div class="eco-realtime-data">
      <div class="fator-table">
        <div class="table-countries day">
          <table id="countries" class="table-striped" style="border-spacing:0px 7px;width: 100%;">
            <thead>
              <tr class="table-thead">
                <th data-field="rank">生态因子</th>
                <th data-field="country">最低值</th>
                <th data-field="population">最高值</th>
                <th data-field="date">平均值</th>
                <th data-field="world">超过上限</th>
                <th data-field="language">超过下限</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in ecoDataList" :key="i">
                <td>{{item.name}}</td>
                <td>{{item.min}}</td>
                <td>{{item.max}}</td>
                <td>{{item.aveValue}}</td>
                <td>{{item.high}}</td>
                <td>{{item.low}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="page">
          <v-pagination :total="total" :current-page="current" @pagechange="pagechange"></v-pagination>
        </div>
      </div>
      <div class="choose">
        <div class="month"><h4>月度总结</h4></div>
        <div class="year" @click="gohistorystyzyear()"><h4>年度总结</h4></div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import pagination from '../base/pagenation'
import {getOverSUmmaryChart,getEcoFactorChart,getEcoFactorTable,getOverCircleChart} from '../../api/huzhuApi.js'
export default {
  data(){
    return{
      allDataList:[
        {max:'20',min:'2',high:'Y',low:'Y',name:'风速',value:'5',unit:'m/s',color:'border-green',aveValue:'5'},
        {max:'25',min:'3',high:'N',low:'Y',name:'温度',value:'5',unit:'摄氏度',color:'border-green',aveValue:'5'},
        {max:'233',min:'4',high:'Y',low:'Y',name:'风向',value:'东南',unit:'',color:'border-green',aveValue:'5'},
        {max:'100',min:'0',high:'N',low:'N',name:'实时雨量',value:'3',unit:'mm',color:'border-green',aveValue:'5'},
        {max:'1332',min:'1',high:'Y',low:'N',name:'大气压强',value:'5',unit:'m/s',color:'border-red',aveValue:'5'},
        {max:'200',min:'2',high:'Y',low:'Y',name:'累计雨量',value:'15',unit:'mm',color:'border-yellow',aveValue:'5'},
        {max:'300',min:'4',high:'N',low:'N',name:'PM2.5',value:'125',unit:'',color:'border-red',aveValue:'5'},
        {max:'99',min:'5',high:'Y',low:'Y',name:'PM10',value:'5',unit:'',color:'border-green',aveValue:'5'},
        {max:'20',min:'1',high:'N',low:'N',name:'CO2',value:'50',unit:'m/s',color:'border-red',aveValue:'5'},
        {max:'118540',min:'0',high:'Y',low:'N',name:'光照度',value:'50',unit:'m/s',color:'border-red',aveValue:'5'},
      ],
      ecoDataList:[],
      likeName:'',
      tableData:[
        {
          'name':"实时数据",'path':"ecological"
        },
        {
          'name':"总结分析",'path':"ecoAnalyze"
        }
      ],
      show:false,
      value:'',
      total: 10, // 记录总条数
      display: 8, // 每页显示条数
      current: 1, // 当前的页数
      ecoFactorList:[//生态因子趋势图选项
        {name:'土壤PH',id:'S00001'},
        {name:'土壤电导率',id:'S00002'},
        {name:'土壤温度',id:'S00003'},
        {name:'土壤湿度',id:'S00004'},
        {name:'土壤ⅠPH',id:'S00005'},
        {name:'土壤Ⅰ电导率',id:'S00006'},
        {name:'土壤Ⅰ温度',id:'S00007'},
        {name:'土壤Ⅰ湿度',id:'S00008'},
        {name:'土壤ⅡPH',id:'S00009'},
        {name:'土壤Ⅱ电导率',id:'S00010'},
        {name:'土壤Ⅱ温度',id:'S00011'},
        {name:'土壤Ⅱ湿度',id:'S00012'},
        {name:'风速',id:'S00013'},
        {name:'风向',id:'S00014'},
        {name:'大气温度',id:'S00015'},
        {name:'大气湿度',id:'S00016'},
        {name:'光照度',id:'S00017'},
        {name:'PM2.5',id:'S00018'},
        {name:'二氧化碳',id:'S00019'},
        {name:'氧气',id:'S00020'},
      ],
      factorChoosed:'土壤PH',//被选中的生态因子
      month:'',//当月时间
    }
  },
  components: {
    'v-pagination': pagination
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },
    gohistorystyzyear(){
      this.$router.push('/realtime/history-styz-year')
    },
    getvalue(index,item){
      this.value=item.name;
      this.show=false;
    },
    clickEcoFactor(){
      $(".two-level-menu").slideToggle(200);
      $(document).one("click", function () {
        $(".two-level-menu").slideUp(200);
      });
    },
    
    // 超标总结图
    paintOverStanderdSummaryChart(){
      let data={time:this.month};
      getOverSUmmaryChart(data).then(res=>{
        // console.log(res.data);
        let day = [];
			  let total_alert = [];
			  let total_alert_red = [];
        let total_alert_yellow = [];
        for(var i = 0; i < res.data.length; i++){
		  		day.push(res.data[i].day);
		  		total_alert.push(res.data[i].total_alert);
		  		total_alert_red.push(res.data[i].total_alert_red);
		  		total_alert_yellow.push(res.data[i].total_alert_yellow);
        }
        var myChart = echarts.init(document.getElementById('overStanderdSummary'));
        var option = {
            title: {
                text: '超标总结',
                padding: [50,0,90,128],
                textStyle:{
                            fontSize: 20,
                            color: 'black'
                        },
            },
            grid: {
                left: '15%',
                right: '15%',
                // bottom: '10%',
                top: '30%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
              data:['下滑超标','上滑超标','所有超标'],
              textStyle: {
                color: "black"
              },  
              right:'130px',
              top:'80px'
            },
            xAxis: {
                type: 'category',
                name:'日期',
                boundaryGap: false,
                data: day,
                // ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19'],
                axisLine: {  //这是x轴文字颜色
                    lineStyle: {
                        color: "black",
                    }
                }
            },
            yAxis: {
                name:'人数（个）',
                type: 'value',
                axisLine: {  //这是y轴文字颜色
                    lineStyle: {
                        color: "black",
                    }
                }
            },
            series: [
                {
                    name:'下滑超标',
                    type:'line',
                    stack: '总量1',
                    data:total_alert_yellow,
                    // [220, 132, 101, 234, 290, 230, 120,255,166,233,111,156,154,221,245,243,233,244,166]
                    itemStyle: {
                      normal: {
                        lineStyle: {
                          color: 'red',
                        },
                      }
                    },
                },
                {
                    name:'上滑超标',
                    type:'line',
                    stack: '总量2',
                    data:total_alert_red,
                    // [120, 90, 50, 111, 222, 100, 60,133,155,121,98,121,55,122,111,144,122,122,133]
                    itemStyle: {
                      normal: {
                        lineStyle: {
                          color: 'orange',
                        },
                      }
                    },
                },
                {
                    name:'所有超标',
                    type:'line',
                    stack: '总量3',
                    data:total_alert,
                    // [340, 222, 151, 345, 512, 330, 180,388,321,354,209,277,209,343,356,387,355,366,299]
                    itemStyle: {
                      normal: {
                        lineStyle: {
                          color: 'yellow',
                        },
                      }
                    },
                }
            ]
        }
        myChart.setOption(option);
      });
        
    },

    // 生态因子超标分布图
    paintOverstanderdCharts(){
      let time={time:this.month};
      getOverCircleChart(time).then(res=>{
        // console.log(res.data);
        let alert_count = [];
        let sensor_name = [];
        for(var i = 0; i < res.data.length; i++){
          alert_count.push({value: res.data[i].alert_count, name: res.data[i].sensor_name});
          sensor_name.push(res.data[i].sensor_name);
        }
        var myChart = echarts.init(document.getElementById('ecoOverstanderdDistribution'));
        var option = {
          title: {
                text: '生态因子超标分布',
                padding: [50,0,90,150],
                textStyle:{
                            fontSize: 20,//字体大小
                            color: 'black'//字体颜色
                        },
            },
            grid: {
                left: '10%',
                right: '10%',
                // bottom: '10%',
                top: '20%',
                containLabel: true
            },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            y:'',
            textStyle:{
                        fontSize: 15,//字体大小
                        color: 'black'//字体颜色
                    },
            right: 45,
            top: 60,
            data:sensor_name, 
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              width: '30%',
              height: '30%',
              radius: ['50%', '70%'],
              center:['50%', '57%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                    show: false
                }
              },
              data:alert_count
              // [
              //   {value:335, name:'气象'},
              //   {value:310, name:'土壤'},
              //   {value:234, name:'环境'},
              // ]
            }
          ]
        }
        myChart.setOption(option);
      });
      
    },

    // 生态因子趋势图
    paintEcologicalFatorChart(i,name){
      this.factorChoosed=this.ecoFactorList[i].name;
      $(".two-level-menu").slideUp(200);
      let data={time:this.month,name:name};
      getEcoFactorChart(data).then(res=>{
        // console.log(res.data);
        let value = [];
        let time_id = [];
        for(var i = 0; i < res.data.length; i++){
          value.push(res.data[i].value);
          time_id.push(res.data[i].time_id)
        }
        var myChart = echarts.init(document.getElementById('ecologicalFatorChart'));
        var option = {
          title: {
                text: '生态因子趋势图',
                padding: [50,0,90,128],
                textStyle:{
                            fontSize: 20,
                            color: 'black'
                        },
            },
            grid: {
                left: '10.2%',
                right: '15%',
                // bottom: '10%',
                top: '25%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: time_id,
                // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisLine: {  //这是x轴文字颜色
                    lineStyle: {
                        color: "black",
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {  //这是y轴文字颜色
                    lineStyle: {
                        color: "black",
                    }
                }
            },
            series: [{
                data:value,
                //  [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }]
        }
        myChart.setOption(option);
      });
        //console.log(document.getElementById('ecologicalFatorChart'))
        
    },

    // 生态因子表格
    pagechange(currentPage) {
      // console.log(currentPage);
      if(currentPage==undefined){
        currentPage=1;
      }
      let data={time:this.month,likeName:this.likeName,currPage:currentPage,pageSize:this.display};
        getEcoFactorTable(data).then(res=>{
          // console.log(res.data);
          this.total=res.data.totalCount;
          this.ecoDataList=[];
          for(let i=0;i<res.data.list.length;i++){
            this.ecoDataList[i]={};
            this.ecoDataList[i].name=res.data.list[i].sensor_type;
            this.ecoDataList[i].max=res.data.list[i].max;
            this.ecoDataList[i].min=res.data.list[i].min;
            this.ecoDataList[i].high=res.data.list[i].high_alert_flag;
            this.ecoDataList[i].low=res.data.list[i].low_alert_flag;
            this.ecoDataList[i].aveValue=res.data.list[i].avg.toFixed(2);
          }
          // console.log(this.ecoDataList);
        });
    },

  },

  mounted(){
    // 超标总结图
    this.paintOverStanderdSummaryChart();
    // 生态因子超标分布图
    this.paintOverstanderdCharts();
    // 生态因子趋势图
    this.paintEcologicalFatorChart(0,'土壤PH');
    // 生态因子表格
    this.pagechange();
  },
  created(){
    let myDate = new Date();
    let tYear = myDate.getFullYear();
    let tMonth = myDate.getMonth();
 
    let m = tMonth + 1;
    if (m.toString().length == 1) {
        m = "0" + m;
    }
    this.month=tYear.toString() + m.toString();
    //console.log(this.month);
  }
  
}
</script>

<style scoped>
ul li{
  list-style: none;
}
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
.history-styz-month h1{
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

/* 超标总结 */
.over-standerd{
  width: 50%;
  height: 26.75rem;
  float: left;
}
.select-title {
  position: absolute;
  left: 44.895%;
  top: 536px;
  color: gray;
  cursor: pointer;
}
.two-level-menu {
  display: none;
  font-size: 18px;
  position: absolute;
  left: 48.5%;
  top: 158px;
  border-radius: 5px;
  z-index: 9;
}
.two-level-menu ul {
  border-radius: 5px;
}
.two-level-menu ul:after, .two-level-menu ul:before {
  content: "";
  display: block;
  width: 100%;
  height: 10px;
}
.two-level-menu ul li {
  padding: 6px 30px 6px 20px;
  cursor: pointer;
  background: rgb(55, 144, 204);
}
.two-level-menu ul li:hover {
  color: white;
  background-color: teal;
}
#overStanderdSummary,#ecologicalFatorChart{
  width:100%;
  height:100%;
}

/* 生态因子超标分布 */
.overstanderd-distribution{
  width: 50%;
  height: 26.75rem;
  float: left;
}
#ecoOverstanderdDistribution{
  width: 90%;
  height: 24.75rem;
}
/* 生态因子趋势图 */
.oxygen-ion-chart{
  width: 50%;
  height: 26.75rem; 
  float: left;
}
/* 生态因子表格 */
.eco-realtime-data{
  width: 50%;
  height: 26.75rem; 
  float: left;
}
.fator-table{
  height:85%;
}
.table-countries {
	height: 280px;
    overflow: hidden;
}
.table-countries.day {
	height: 85%;
  overflow: hidden;
}
.table-countries.searchDay {
	height: 273px;
}
.table-countries.day.searchDay {
  height: 285px;
}
#countries thead tr th {
  padding-bottom: 20px;
  font-size:1.15rem;
}
#countries tbody tr td{
  text-align: center;
  font-size:1rem;
  padding-bottom:5px;
}


.choose{
  width: 30%;
  height: 15%;
  display: flex;
  /* align-items: center; */
  float: right;
  margin-right: 50px;
}
.month{
  width: 50%;
  height: 50%;
  border: 1px solid skyblue;
  background-color: skyblue;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: normal;
  cursor: pointer;
  margin-right: 10px;
}

.year{
  width: 50%;
  height: 50%;
  border: 1px solid skyblue;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: skyblue;
  font-weight: normal;
  cursor: pointer;
}
.year:hover{
  background: skyblue;
  color: white;
}
.month:hover{
  background: skyblue;
  color: white;
}
.year h4{
  display: inline-block;
}
</style>
