<template>
<div id="big">
  <div class="report" id="report">
    <div id="top"></div>
      <h1 class="report-title">湖北房县古南河鸟类多样性品种分析</h1>
      <h3 class="report-subtitle">简介</h3>
      <p class="report-shahu">湖北房县古南河国家湿地公园位于湖北省十堰市房县东南部。湿地公园总面积1817.82公顷，其中湿地面积1074.08公顷。湿地面积中库塘湿地1049.0公顷，稻田湿地4.44公顷，河流湿地20.64公顷，湿地率达59.09%。湿地公园内动植物资源非常丰富，有国家珍稀濒危保护野生植物41种，其中：国家重点保护野生植物21种，国家珍贵树种18种，国家珍稀濒危保护植物31种，野生动物61种，隶属8目25科52属，占湖北省121种兽类的50.4%；鸟类165种，隶属13目37科101属，占湖北省鸟类总种数的36.2%。湿地公园所在区域属北亚热带季风气候区。其特点为：冬长夏短，春秋相近，四季分明；垂直差异变化大，具有立体气候；同一海拔高度，阴坡与阳坡气温相差1—2.5℃ ；雨量集中，雨热同季。年平均气温在10℃ 至15℃ 之间，极端最低气温－17.6℃（1977年1月30日）；极端最高气温40.4℃（1996年7月20日）。无霜期年平均223天，年平均降水量914毫米，年日照时数1700—2000小时之间。</p>
      <h3 class="report-subtitle">
        鸟类多样性数据统计
        <input type="date" v-model="date" class="month-input" @change="getReportDemo();getReportDemoTwo()">
        <select  id="reportCaremaNum" v-model="camera" @change="getReportDemo();getReportDemoTwo()">
          <option value="1">监测点位1</option>
          <option value="2">监测点位2</option>
          <!-- <option value="3">监测点位3</option> -->
        </select>
      </h3>
      <div v-show="hasData">
        <div class="report-chart" id="reportChart" >
      </div>
      <h3 class="report-subtitle">峰值展示</h3>
         <div class="report-table">
          <ul>
            <li>种类</li>
            <li v-for="(item,index) in birdsList" :key="index">{{item}}</li>
          </ul>
          <ul>
            <li>峰值</li>
            <li v-for="(item,index) in birdsList" :key="index">{{maxList[index]}}</li>
          </ul>
          <ul>
            <li>时间</li>
            <li v-for="(item,index) in birdsList" :key="index">{{bigTime[index]}}</li>
          </ul>
          <ul>
            <li>谷值</li>
            <li v-for="(item,index) in birdsList" :key="index">{{minList[index]}}</li>
          </ul>
          <ul>
            <li>时间</li>
            <li v-for="(item,index) in birdsList" :key="index">{{smallTime[index]}}</li>
          </ul>
        </div>
        <h3 class="report-subtitle">照片展示</h3>
        <div id="reportChartTwo" ></div>
        <div id="bigback"></div>
        <div id="smallbox"></div>
          <div id="imagebox">
            <div class="show">
              <h3>照片展示</h3>
              <img src='../../../public/img/base/esc.png' id="esc" alt="">
            </div>
           <div class="border"></div>
            <ul class="list">
              <li v-for="(item,index) in birdListimage" :key="index">
                <img class="image" :src="imgurl + item" alt="">
              </li>
            </ul>
           <div class="border2"></div>
        </div>
      </div>
      <div v-show="!hasData" class="no-data"><h3>当月无数据!</h3></div>
      <div class="report-summary">
        <h3 class="report-subtitle">总结</h3>
        <p v-if="hasData">
          在湖北房县古南河国家湿地公园，于{{summaryList.time}}共监测到珍稀鸟类{{birdsList.length}}种，分别为 {{birdsList.toString()}},
          其中<span v-for="(item,index) in birdsList" :key="index">{{item}}出现频次峰值为{{maxList[index]}} 只，</span> 珍稀鸟类活动比较丰富，湿地生态多样性表现良好。
        </p>
        <p v-else>
          在湖北房县古南河国家湿地公园，于{{summaryList.time}}共监测到珍稀鸟类0种。
        </p>
      </div>
      <div class="report-btn">
        <button @click="toBack" class="go-back">返回</button>
        <button @click="toPrint" class="print">
          <!-- <a href="#top">打印</a>    -->
          打印
        </button>
      </div>
  </div>
  </div>
</template>
<script>
import {getReportTwo,getHistoryBirdDay,getImageBirdDay,getImageBird} from '@/api/axiosApi.js'

let birdInfo = [];
export default {
  data(){
    return {
      date:'',//请求时的时间参数
      camera:1,//请求时的摄像头参数
      birdsList:[],//当月出现的所有鸟的种类
      birdListimage:[],//鸟的图片
      maxList:[],//每种鸟的最大值
      bigTime:[],//每种鸟的最大值的时间
      minList:[],//每种鸟的最小值
      smallTime:[],//每种鸟的最小值的时间
      tableList:[],//循环生成表格的列表
      hasData:true,//是否有数据，控制是否显示表格和折线图
      timeList:[],//折线图横轴
      timeListTwo:[],//折线图2横轴
      numList:[],//折线图2纵轴
      trueBirds:[],//鸟的种类大于7时，显示的鸟的种类
      dataArr:[],//折线图series生成列表
      summaryList:{time:'2019年9月',birdsPopulation:3,name:'绿头鸭，鸳鸯，大天鹅'},
      summaryBirdsCount:{'绿头鸭':6,'鸳鸯':8,'大天鹅':7},
      imgurl:'http://192.168.20.222/'
      // imgurl:'http://192.168.1.130/' //测试地址
    }
  },
  methods:{
    toBack(){
      history.go(-1); 
    },
    //打印报表
    toPrint(){
      /* 隐藏返回和打印按钮 */
		$('.print').hide();
		$(".go-back").hide();
		/* ----------- */
       	var pdf = new jsPDF('p','pt','a4');
        pdf.internal.scaleFactor = 2.5;  //可以调整缩放比例
        $('#app').css("background","#fff");
        var options = {
        	background: "#fff",
            pagesplit: true //分页
            //pagesplit: false//不分页
        };
       	pdf.addHTML($('#app').get(0),0,0,options,function() {
            pdf.save($('.report-title').text()+'.pdf');
            /* 显示返回和打印按钮 */
	        $(".print").show();
			$(".go-back").show();
			/* ----------- */
        });
      
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
      let day=obj.getDate();
      if(day<10){
        day='0'+day;
      }
      let monthNow=obj.getFullYear()+'-'+month+'-'+day;
      this.date=monthNow;
      // console.log(this.date)
      this.summaryList.time=obj.getFullYear()+'年'+month+'月'+day+'日';
    },

    //获取当天出现的鸟的种类
    getReportBirdFun(){
      let data={cameraNum:this.camera,date:this.date};
      return getHistoryBirdDay(data)
    },

    // 向接口请求数据（鸟类多样性展示和峰值展示）
    getReportDemo(){
      // 获取该监测点所有鸟的类型
      this.getReportBirdFun().then(res=>{
        this.birdsList=res.data;

        this.trueBirds=this.birdsList;
        let data={cameraNum:this.camera,date:this.date};
        getReportTwo(data).then(res=>{
          this.tableList=[];//清空之前的数据
          this.timeList=[];
          console.log(res.data)
          // 没有数据时，不显示表格与折线图
          if(res.data.length == 0){
            console.log("无数据");
            this.hasData=false;
          }
          // 有数据时
          else{
            this.hasData=true;
            // 循环后端传来的数据
            // console.log(res.data)
            for(let i=0;i<res.data.length;i++){
              this.timeList.push(res.data[i].time.slice(0,8));
              // console.log(this.timeList)
              let object={},arr=[];
              object.time=res.data[i].time.slice(0,8);
              // 根据所有鸟的种类循环
              for(let j=0;j<this.birdsList.length;j++){
                // console.log(this.birdsList)
                let subObject={},count;
                let result=res.data[i].value.some(item=>{//查找数组中是否出现该鸟
                  // console.log(res.data[i].value)
                  if(item.name==this.birdsList[j]){
                    count=item.count;
                    return true
                  }else{
                    return false
                  }
                })
                if(result!=false){
                  subObject.name=this.birdsList[j];
                  subObject.count=count;
                  arr.push(subObject);
                  // console.log(arr)
                }else{//将当天没有出现的鸟的数量设为0
                  subObject.name=this.birdsList[j];
                  subObject.count=0;
                  arr.push(subObject);
                }
              }
              object.value=arr;
              // console.log(object.value)
              // 计算每个时间点对应的鸟的合计值
              let sum=0;
              for(let i=0;i<object.value.length;i++){
                sum+=object.value[i].count;
              }
              object.sum=sum;
              this.tableList.push(object);
              // console.log(this.tableList)
            }

            // 取每种鸟出现的最大值
            let max=[];
            let j=0;
            let bigtime=[];
            for(;j<this.birdsList.length;j++){
              for(let i=0;i<this.tableList.length;i++){
                if(max[j]==undefined){
                  max[j]=0;
                }
                if(this.tableList[i].value[j].count > max[j]){
                  max[j]=this.tableList[i].value[j].count;
                  // 取每种鸟峰值出现的时间
                  bigtime[j]=this.tableList[i].time;
                }
              }
            }
            this.maxList=max;
            this.bigTime=bigtime;
            // console.log(this.bigTime)


            // 取每种鸟出现的最小值
            let min=[];
            let m=0;
            let smalltime=[];
            for(;m<this.birdsList.length;m++){
              for(let i=0;i<this.tableList.length;i++){
                if(min[m]==undefined){
                  min[m]=999;
                }
                if(this.tableList[i].value[m].count < min[m]&&this.tableList[i].value[m].count!=0){
                  min[m]=this.tableList[i].value[m].count;
                  // 取每种鸟谷值出现的时间
                  smalltime[m]=this.tableList[i].time;
                }
              }
            }
            this.minList=min;
            this.smallTime=smalltime;
            // console.log(this.smallTime)

            // 处理折线图数据
            let dataArr=[];
            for(let j=0;j<this.trueBirds.length;j++){
              let arr=[];
              for(let i=0;i<this.tableList.length;i++){
                this.tableList[i].value.some(item=>{
                  if(item.name==this.trueBirds[j]){
                    arr.push(item.count);
                  }
                })
              }
              dataArr.push(arr);
            }
            this.dataArr=dataArr;
            this.$forceUpdate();
            this.paintReportChart();
            // console.log(dataArr)
          }
        })
        // console.log(this.birdsList)
      });
      // console.log(this)
      // console.log(this.trueBirds)

    },

    // 绘制折线图1（鸟类多样性统计图）
    paintReportChart(){
      // console.log(this.trueBirds,this.dataArr);
      let trueBirds=this.trueBirds;
      let dataArr=this.dataArr;
      var myChart = echarts.init(document.getElementById('reportChart'));
      var option = {
        title: {
            text: ''
        },
        grid:{
              x:65,y:50,x2:50,y2:50,borderWidth:10,height: 300,width: 1580
	      },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:trueBirds,
            right:"35px"
        },
        xAxis: {
            type: 'category',
            name:'时间',
            nameTextStyle: {
              verticalAlign: "top",
              padding: [10, 0, 0, 10],
              fontSize: 18
            },
            boundaryGap: false,
            data:this.timeList,
        },
        yAxis: {
            name:'数量（只）',
            type: 'value',
            nameTextStyle: {
              verticalAlign: "top",
              padding: [0, 0, 10, 0],
              fontSize: 18
            },
            axisLine:{
              show: false
            }
        },
      
        series: function(){
                  let serie=[];
                  //console.log(dataArr)
                  for( let i=0;i < dataArr.length;i++){
              　　　 let item={
                      name:trueBirds[i],
                      type:'line',
                      data:dataArr[i]
              　　　 };
              　　　　serie.push(item);
                　}
                    //console.log(serie)
                　　return serie;
                }()       
      }
      //console.log('我运行到这里了');
      myChart.setOption(option);
      this.$forceUpdate();
    },

    // 像接口请求数据（图片展示）
    getReportDemoTwo(){
      let data={cameraNum:this.camera,date:this.date};
      getImageBirdDay(data).then(res=>{
        this.timeListTwo=[];// 折线图2   y轴横坐标（时间）
        this.numList=[];// 折线图2   x轴纵坐标（鸟的总数）
        this.catenum=[];// 折线图2   物种统计
        this.imagenum=[];// 折线图2   抓拍数量
        //没有数据时
        if(res.data.length == 0){
          console.log("无数据");
          this.hasData=false;
        }//有数据时
        else{
          this.hasData=true;
          //循环后端传来的数据
          // console.log(res.data)
          birdInfo = [];
          for(let i=0;i<res.data.length;i++){
            // 折线图2   y轴横坐标（时间）
            this.timeListTwo.push(res.data[i].cruiseTime)
            // console.log(this.timeListTwo)

            // 折线图2   x轴纵坐标（鸟的总数）
            this.numList.push(res.data[i].birdNum)
            // console.log(this.numList)

            birdInfo.push({
              'id': res.data[i].cruiseId,
              'birdNum': res.data[i].birdNum,
              'imgNum': res.data[i].imageNum,
              'cateNum': res.data[i].cateNum,
              'cruiseTime': res.data[i].cruiseTime
            });
          }
          // console.log(birdInfo, res.data.length);

          this.paintReportChartTwo();
          // console.log(birdInfo)
        }
      })
      this.$forceUpdate();
    },

    // 绘制折线图2（图片展示图）
    paintReportChartTwo(){
      // console.log(this.numList)
      var myChart = echarts.init(document.getElementById('reportChartTwo'));
      var option = {
        title: {
            text: ''
        },
        grid:{
              x:65,y:50,x2:50,y2:50,borderWidth:10,height: 300,width: 1580
	      },
        xAxis: {
            type: 'category',
            name:'时间',
            nameTextStyle: {
              verticalAlign: "top",
              padding: [10, 0, 0, 10],
              fontSize: 18
            },
            boundaryGap: false,
            data:this.timeListTwo,
        },
        yAxis: {
            name:'鸟类总数（只）',
            type: 'value',
            nameTextStyle: {
              verticalAlign: "top",
              padding: [0, 0, 10, 0],
              fontSize: 18
            },
            axisLine:{
              show: false
            }
        },     
        series: 
        [{
            data: this.numList,
            type: 'line',
            symbol: 'circle',
            symbolSize: 14,
            itemStyle:{
              color:{
                type: 'linear'
              },
              normal:{
                color: '#3383ff',
                lineStyle:{
                  width: 3,
                  color: '#3383ff' ,
              },
              }
            },        
        }]
      }
      myChart.setOption(option);

      var SmallBox = document.getElementById("smallbox");
      myChart.on('mouseover',(param)=>{
        console.log(param)
        // console.log(birdInfo[param.dataIndex].cateNum)
        SmallBox.style.display = "block";
        SmallBox.innerHTML = " 物种统计：" + birdInfo[param.dataIndex].cateNum + 
        ' 种' + "&nbsp" + "&nbsp" + "&nbsp" + " 抓拍数量：" + birdInfo[param.dataIndex].imgNum
         + ' 张 ' + "&nbsp" + "&nbsp" + " 鸟类总数：" + birdInfo[param.dataIndex].birdNum +
          ' 只 ' + "&nbsp" + "&nbsp"+  " 抓拍时间：" 
        + birdInfo[param.dataIndex].cruiseTime;
        let evt = param.event.event;
        SmallBox.style.left = (evt.pageX - 60) + 'px';
        SmallBox.style.top = (evt.pageY - 130) + 'px';
        // console.log(SmallBox.style.left, SmallBox.style.top)
      })
      //鼠标离开
      myChart.on('mouseout',function(param){
        // console.log(birdInfo[param.dataIndex])
        SmallBox.style.display = "none";
      })
      

      // console.log(this)

      var Big = document.getElementById("big");
      var Img = document.getElementById("imagebox");
      var Ecs = document.getElementById("esc");
      myChart.on('click',(param)=>{
        // console.log(birdInfo[param.dataIndex])
        //向接口发送鸟接口
        let data={cruiseId:birdInfo[param.dataIndex].id}
        // console.log(birdInfo[param.dataIndex].id)
        getImageBird(data).then(res=>{
            this.birdListimage=res.data;
            // console.log(res.data)
            // console.log(this.birdListimage)
        })
        Img.style.display = "block";
        Big.style.backgroundColor = "#ccc";
      })

      Ecs.onmousedown= function(){
        Img.style.display = "none";
        Big.style.backgroundColor = "white";
      }
    },
    

  },
  beforeCreate(){         // 创建前

  },
  created(){              // 创建后
    
  },
  beforeMount(){          // 载入前
    
  },
  mounted(){              // 载入后
    this.getMonthNow();    
    this.getReportDemo();
    this.getReportDemoTwo();
  }
}
</script>
<style>
.report{
  padding:0 6rem;
  /* overflow:auto; */
  cursor: default;
}

.report-title{
  font-weight:400;
  text-align: center;
  margin:2rem auto;
  color: #000;
}
.report-subtitle{
  margin:2rem 0;
  font-size:1.5rem;
  font-weight:500;
  color: #000;
}
.report-shahu{
  text-indent: 2em;
  line-height: 2rem;
  font-size:1.25rem;
  color: #000;
}
.report-summary{
  border:1px solid #ccc;
  padding:0 1rem;
}
.report-btn{
  padding:2rem;
  display:flex;
  justify-content: space-between;
  align-items: center;
}
.report-btn button{
  width:80px;
  height:40px;
  font-size:1rem;
  color: #000;
}
.report-btn button a{
  display:flex;
  width:100%;
  height:100%;
  justify-content: center;
  align-items: center
}
#reportChart{
  width:100%;
  height:450px;
  padding: 1rem 0;
  /* margin: 0 auto; */
  z-index: 1;

}
.month-input,#reportCaremaNum{
  width:150px;
  font-size: 16px;
  height:2rem;
  line-height: 2rem;
  margin:0 2rem;
  color: #000;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
}
#reportCaremaNum{
  width:150px;
  cursor: pointer;
}
/*表格样式*/
.no-data{
  padding:2rem 0;
}
.no-data h3{
  text-align: center;
  font-size:1.5rem;
  font-weight:500;
}
.report-table{
  width:100%;
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
}
.report-table ul{
  width:100%;
  display:flex;  
  justify-content: center;
  align-items: center;
}
.report-table ul li{
  width:12%;
  height:3rem;
  font-size:1.25rem;
  display:flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  color: #000;
}
.report-table ul li:first-child{
  width:300px;
}
.report-summary{
  margin-top: 20px;
}
.report-summary p{
  text-indent: 2em;
  font-size:1.25rem;
  line-height: 2rem;
  padding-bottom:2rem;
  color: #000;
}
option{
    color: black;
}
span{
  color: black;
}

#reportChartTwo{
  width:100%;
  height:450px;
  padding: 1rem 0;
}

#smallbox{
  width: 155px;
  height: 104px;
  line-height: 23px;
  display: none;
  background-color: skyblue;
  border-radius: 10px;
  border: 5px solid skyblue;
  font-size: 16px;
  position: absolute;
 
}
.list{
  display: flex;
  flex-wrap: wrap;
}
#big{
  width: 100%;
  height: 2400px;
}
#imagebox{
  width: 85%;
  max-height: 750px;
  display: none;
  background-color: white;
  margin: 0 auto;
  margin-top: -500px;
  position: relative;
  border-radius: 15px;
  overflow-y: auto;
}
#imagebox h3{
  color: #000;
  width: 300px;
  float: left;
  margin-left: 120px;
  line-height: 60px;
}
#imagebox li{
  width: 39.8%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 7%;
}
#imagebox .image{
  width: 100%;
  height: 324px;
}
.show{
  width: 100%;
  height: 60px;
  position: sticky;
  top: 0px;  
  background-color: white;
  /* border-bottom: 1px solid gray; */
}
#esc {
    width: 40px;
    height: 40px;
    float: right;
    margin: 10px 10px 0 0;
    cursor: pointer;
}
#esc:hover {
    width: 42px;
    height: 42px;
}
.border{
  width: 90%;
  height: 10px;
  background-color: white;
  border-top: 1px solid gray;
  margin :0 auto;
   position: sticky;
  top: 60px;  
}
.border2{
  width: 100%;
  height: 10px;
  background-color: white;
  position: sticky;
  bottom: 0;  
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/ 
::-webkit-scrollbar {
    width: 12px;
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
    background-color: 	#C0C0C0;
    /* background-image: -webkit-linear-gradient(45deg,rgba(255,255,255,.4) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.4) 50%,rgba(255,255,255,.4) 75%,transparent 75%,transparent); */
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em
}
</style>
