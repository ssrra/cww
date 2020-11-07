 <template>
  <div class="ecological-analyze-year">
    <!-- 此div用于占位 -->
    <div class="sitting-box"></div>
    <!-- 切换实时数据和总结分析 -->
    <div class="realtime-or-ana">
      <div class="input-div">
        <div class="input" @click="openValue">
          <input v-model="value" type="text" placeholder="总结分析" readonly>
          <img src="img/people/arrow.png" alt="">
        </div>
        <div class="eco-list" v-show="show">
          <ul>
            <li v-for="(item,index) in tableData" :key="index"  @click="getvalue(index,item)"><router-link :to="item.path">{{ item.name }}</router-link></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 视频 -->
    <div class="ecoanalyze-year-video">
      <div class="ecoanalyze-year-video-box">
        <video src="img/base/video.mp4" controls="controls" autoplay="autoplay" muted="muted" loop="loop"></video>  
      </div>
    </div>
    <!-- 超标分布和生态因子表格 -->
    <div class="eco-realtime-data">
      <div class="fator-table">
        <div class="table-countries day">
          <table id="countriesYear" class="table-striped" style="border-spacing:0px 7px;width: 100%;">
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
        <div class="func-box">
          <input type="text" class="table-search" v-model="likeName">
          <span class="search-icon" @click="pagechange(1)">
            <img src="img/base/search.png" alt="">
          </span>
        </div>
      </div>
      <div class="overstanderd-distribution">
        <div class="realtime-data-title">
          <h3>生态因子超标分布</h3>
        </div>
        <div class="eco-realtime-data-box">
          <div id="ecoOverDistributionYear"></div>
        </div>
        <div class="choose-month-year">
          <router-link to="ecoAnalyze" class="selected">月度总结</router-link>
          <router-link to="ecoAnalyzeYear">年度总结</router-link>
        </div>
      </div>
    </div>
    <!-- 超标和生态因子图表 -->
    <div class="eco-realtime-charts">
      <div class="over-standerd">
        <div class="realtime-data-title">
          <h3>超标总结</h3>
        </div>
        <div id="overStanderdSummaryYear"></div>
      </div>
      <div class="oxygen-ion-chart">
        <div class="realtime-data-title">
          <h3>生态因子趋势图</h3>
        </div>
        <div id="ecologicalFatorChartYear"></div>
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
            <li v-for="(item,i) in ecoFactorList" :key="i" :data-id="item.id" @click.stop="paintEcologicalFatorChartYear(i,item.name)">{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pagination from '@/components/base/pagenation.vue'
import {getOverSUmmaryYearChart,getEcoFactorYearChart,getEcoFactorYearTable,getOverCircleYearChart} from '@/api/axiosApi.js'
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
      date:'',
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
      factorChoosed:'土壤PH'//被选中的生态因子
    }
  },
   components: {
    'v-pagination': pagination
  },
  methods:{
     pagechange(currentPage) {
       this.getMonthNow();
      // console.log(currentPage);
      if(currentPage==undefined){
        currentPage=1;
      }
      let data={time:this.date,likeName:this.likeName,currPage:currentPage,pageSize:this.display};
        getEcoFactorYearTable(data).then(res=>{
          //console.log(res.data);
          this.total=res.data.totalCount;
          this.ecoDataList=[];
          for(let i=0;i<res.data.list.length;i++){
            this.ecoDataList[i]={};
            this.ecoDataList[i].name=res.data.list[i].sensor_type;
            this.ecoDataList[i].max=res.data.list[i].max;
            this.ecoDataList[i].min=res.data.list[i].min;
            this.ecoDataList[i].high=res.data.list[i].high_alert_flag;
            this.ecoDataList[i].low=res.data.list[i].low_alert_flag;
            this.ecoDataList[i].aveValue=res.data.list[i].avg;
          }
          //console.log(this.ecoDataList);
        });
    },
    openValue(){
        this.show=!this.show;
      },
      getvalue(index,item){
        this.value=item.name;
        this.show=false;
      },
       //获得当前时间所属年月
    getMonthNow(){
      let obj=new Date();
      let month=obj.getMonth();
      if(month+1<=9){
        month='0'+(month+1);
      }else{
        month=month+1
      }
      let monthNow=obj.getFullYear();
      this.date=monthNow;
      // console.log(this.date)
    },
    //生态因子超标分布图
    paintOverstanderdCharts(){
       this.getMonthNow();
      let time={time:this.date};
      getOverCircleYearChart(time).then(res=>{
        //console.log(res.data);
        let alert_count = [];
        let sensor_name = [];
        for(var i = 0; i < res.data.length; i++){
          alert_count.push({value: res.data[i].alert_count, name: res.data[i].sensor_name});
          sensor_name.push(res.data[i].sensor_name);
        }
        var myChart = echarts.init(document.getElementById('ecoOverDistributionYear'));
        var option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:sensor_name,
            textStyle: {
              color: "#fff"
            },  
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
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
    //绘制超标总结图
    paintOverStanderdSummaryYearChart(){
      this.getMonthNow();
      let data={time:this.date};
      getOverSUmmaryYearChart(data).then(res=>{
        console.log(res.data);
        let day = [];
        let total_alert = [];
        let total_alert_red = [];
        let total_alert_yellow = [];
        for(var i = 0; i < res.data.length; i++){
          day.push(res.data[i].month);
          total_alert.push(res.data[i].total_alert);
          total_alert_red.push(res.data[i].total_alert_red);
          total_alert_yellow.push(res.data[i].total_alert_yellow);
        }
        var myChart = echarts.init(document.getElementById('overStanderdSummaryYear'));
        var option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
              data:['下滑超标','上滑超标','所有超标'],
              textStyle: {
                color: "#fff"
              },  
            },
            xAxis: {
                type: 'category',
                name:'日期',
                boundaryGap: false,
                data: day,
                // ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19'],
                axisLine: {  //这是x轴文字颜色
                    lineStyle: {
                        color: "#fff",
                    }
                }
            },
            yAxis: {
                name:'人数（个）',
                type: 'value',
                axisLine: {  //这是y轴文字颜色
                    lineStyle: {
                        color: "#fff",
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
    clickEcoFactor(){
      $(".two-level-menu").slideToggle(200);
      $(document).one("click", function () {
        $(".two-level-menu").slideUp(200);
      });
    },
    //绘制生态因子趋势图
    paintEcologicalFatorChartYear(i,name){
      this.getMonthNow();
      this.factorChoosed=this.ecoFactorList[i].name;
      $(".two-level-menu").slideUp(200);
      let data={time:this.date,name:name};
      getEcoFactorYearChart(data).then(res=>{
        console.log(res.data);
        let value = [];
        let time_id = [];
        for(var i = 0; i < res.data.length; i++){
          value.push(res.data[i].value);
          time_id.push(res.data[i].time_id)
        }
        var myChart = echarts.init(document.getElementById('ecologicalFatorChartYear'));
        var option = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: time_id,
                // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisLine: {  //这是x轴文字颜色
                    lineStyle: {
                        color: "#fff",
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {  //这是y轴文字颜色
                    lineStyle: {
                        color: "#fff",
                    }
                }
            },
            series: [{
                data: value,
                // [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }]
        }
        myChart.setOption(option);
      });
        
    },
    monthOrYear(){
      let url=window.location.href;
      let allSystems=document.querySelectorAll(".choose-month-year a");
      for(let i=0;i<allSystems.length;i++){
        allSystems[i].classList.remove('selected');
      }
      if(url.indexOf('ecoAnalyzeYear')!=-1){
        allSystems[1].classList.add('selected');
        
      }else{
        allSystems[0].classList.add('selected');
      }
    }
  },
  mounted(){
    this.paintOverstanderdCharts();
    this.paintOverStanderdSummaryYearChart();
    this.paintEcologicalFatorChartYear(0,'土壤PH');
    this.pagechange();
    this.monthOrYear();
  }
}
</script>
<style scoped>
.ecological-analyze-year{
  flex-wrap:wrap;
}
.ecoanalyze-year-video{
  width:49%;
  height:54%;
}
.ecoanalyze-year-video-box{
  width:100%;
  height:90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ecoanalyze-year-video-box video{
  height:100%;
  /* border:5px solid #000; */
}


.eco-realtime-data{
  width:33%;
  height:100%;
}
.eco-realtime-charts{
  position:absolute;
  bottom:0px;
  left:0px;
  width:66%;
  height:46%;
  padding:2rem 1rem 0px;
  display:flex;
}
/*超标分布和生态因子表格*/
.overstanderd-distribution,.fator-table{
  width:100%;
}
.overstanderd-distribution{
  height:50%;
}
.eco-realtime-data-box{
  width:100%;
  height:75%;
  display:flex;
  flex-wrap: wrap;
  margin-top:1rem;
  z-index: 1;
}
#ecoOverDistributionYear{
  width:100%;
  height:100%;
  z-index:1;
}
/*表格样式*/
.fator-table{
  height:50%;
}
.table-countries {
	height: 280px;
    overflow: hidden;
}
.table-countries.day {
	height: 75%;
  overflow: hidden;
}
.table-countries.searchDay {
	height: 273px;
}
.table-countries.day.searchDay {
    height: 285px;
}
#countriesYear thead tr th {
  padding-bottom: 20px;
  font-size:1.15rem;
}
#countriesYear tbody tr td{
  text-align: center;
  font-size:1rem;
  padding-bottom:5px;
}
.page{
  margin-top:1rem;
  height:10%;
}
/*检索框*/
.func-box {
    display: flex;
    float: right;
}
.table-search {
    width: 200px;
    height: 25px;
    border: 1px solid #fff;
    border-radius: 20px;
    background: transparent;
    color: #fff;
    padding: 0 10px;
    box-sizing: border-box;
    
}
.table-search,.search-icon{
  margin: 15px 15px 0;
}
.search-icon, .search-icon img {
    width: 22px;
    height: 22px;
}
/*********************/
.choose-month-year{
  height:15%;
  display:flex;
  justify-content: space-around;
  align-items: center;
}
.choose-month-year a{
  color:#fff;
  display: inline-block;
  width:100px;
  height:40px;
  border-radius: 10px;
  line-height: 40px;
  text-align: center;
}
.choose-month-year a.selected{
  border:2px solid #fff;
}



/*图表样式*/
.over-standerd,.oxygen-ion-chart{
  width:50%;
  height:100%;
}
.oxygen-ion-chart{
  position: relative;
}
.oxygen-ion-chart .select-title {
    position: absolute;
    top: 10px;
    right: 85px;
    cursor: pointer;
    /* color: white; */
}
.select-title span{
  color: white;
}
.two-level-menu {
    display: none;
    font-size: 18px;
    position: absolute;
    /* right: -167px;
    top: -150px; */
    right: -70px;
    top: -370px;
    z-index: 9;
}
.two-level-menu ul {
    padding: 10px 0px;
   
}
.two-level-menu ul:after, .two-level-menu ul:before {
    content: "";
    display: block;
    width: 100%;
    height: 10px;
    background: rgba(82, 38, 27, 1);
}
.two-level-menu ul li {
    padding: 6px 30px 6px 20px;
    cursor: pointer;
    background: rgba(82, 38, 27, 1);
}
#overStanderdSummaryYear,#ecologicalFatorChartYear{
  width:100%;
  height:90%;
  margin-top:1rem;
}

.input-div{
  position: absolute;
  top:-50px;
  right:0px;
}
 ul li{
    list-style: none;
  }
  .input{
    width: 150px;
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    border: 1px solid #cccccc;
    position: relative;
  }
  .input input{
    border: none;
    outline: none;
    width: 90%;
    height:100%;
    background:transparent;
    font-weight:400;
    font-size:1.15rem;
  }
  .input input::placeholder{
    color:#fff;
    font-weight:400;
    font-size:1.15rem;
  }
  .input img{
    position: absolute;
    right: 34px;
    top: 26%;
    width:10%;
  }
  .eco-list{
    width: 150px;
    border: 1px solid #cccccc;
    overflow: hidden;
  }
  .eco-list ul li{
    width: 100%;
    height: 50px;
    cursor: pointer;
    line-height: 50px;
    padding-left: 10px;
    background:rgba(0, 0, 0, 0.9);
    font-size:1.15rem;
  }
  .eco-list ul li a{
    color:#fff;
    display: block;
    width:100%;
    height:100%;
  }
  .eco-list ul li a:hover{
    color:#000;
    background-color: #ccc;
	}
  .eco-list ul li:hover{
    background-color: #ccc;
  }

</style>
