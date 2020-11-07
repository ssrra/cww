<template>
  <div class="bird">
    <!-- 此div用于占位 -->
    <div class="sitting-box"></div>
    <div class="bird-video"> 
      <div class="choose-position">
        <div class="divInput">
            <select  id="reportCaremaNum" v-model="camera" @change="pagechange()">
              <option value="1" selected>监测点位1</option>
              <!-- <option value="2">监测点位2</option>
              <option value="3">监测点位3</option> -->
            </select>
            <!-- <img src="img/people/arrow.png" alt=""> -->
          <div class="option-list" v-show="show">
            <ul>
              <li @click="getvalue(index,item)" v-for="(item,index) in kind" :key="item.index">{{ item.name }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bird-video-box  animated fadeIn">
        <img src="img/people/video.png" alt="">
        <img :src="imgPath" alt="">
        <!-- <video src="img/base/video.mp4" controls="controls" autoplay="autoplay" muted="muted" loop="loop"></video> -->
      </div>
    </div>
    <!-- 实时数据展示 -->
    <div class="bird-real-time animated bounceInRight">
      <div class="bird-real-title">
        <h3>
          实时数据
          <div class="details-icon" @click="toReport">
            <svg class="icon" style="width: 1.75em; height: 1.75em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4343"><path d="M273.423 396.155l178.482-127.931c7.694-5.515 18.384-3.869 24.063 3.703l100.47 133.96c10.254 13.672 29.649 16.443 43.321 6.189l162.979-122.234c9.426-7.069 11.336-20.441 4.267-29.867-7.07-9.426-20.441-11.336-29.867-4.267L618.062 360.016c-8.021 6.016-19.4 4.39-25.416-3.631l-104.15-138.867c-6.524-8.699-18.771-10.655-27.68-4.422L251.472 359.568c-10.103 6.062-13.379 19.166-7.317 29.269 6.061 10.104 19.166 13.379 29.268 7.318zM954.182 69.818H69.818c-12.853 0-23.273 10.42-23.273 23.273s10.42 23.273 23.273 23.273h69.818V665.76c0 30.759 24.935 55.694 55.694 55.694h633.339c30.759 0 55.694-24.935 55.694-55.694V116.364h69.818c12.853 0 23.273-10.42 23.273-23.273 0.001-12.853-10.419-23.273-23.272-23.273zM837.818 665.76c0 5.045-4.104 9.149-9.149 9.149H195.331c-5.045 0-9.149-4.104-9.149-9.149V116.364h651.637V665.76zM302.545 535.273h325.818c12.853 0 23.273-10.42 23.273-23.273s-10.419-23.273-23.273-23.273H302.545c-12.853 0-23.273 10.42-23.273 23.273 0.001 12.853 10.42 23.273 23.273 23.273zM721.455 581.818h-418.91c-12.853 0-23.273 10.419-23.273 23.273 0 12.853 10.42 23.273 23.273 23.273h418.909c12.853 0 23.273-10.42 23.273-23.273s-10.419-23.273-23.272-23.273zM169.48 917.422c-7.864 7.864-8.793 20.555-1.651 29.08 8.158 9.738 22.696 10.216 31.48 1.431l226.478-226.479h-60.339L169.48 917.422zM645.908 721.455h-60.339l226.478 226.479a21.266 21.266 0 0 0 15.085 6.249 21.282 21.282 0 0 0 16.082-7.315c7.44-8.502 6.669-21.437-1.32-29.426L645.908 721.455z" p-id="4344"></path></svg>
          </div>
        </h3>
      </div>
      <div class="bird-real-table">
        <div class="bird-real-table-item" v-for="(item,i) in wsBirdList" :key="i">
          <p>{{item.name}}</p>
          <p>{{item.num}}</p>
        </div>
        <h4 class="to-bird-detailone" @click="toBirdsVideo">
          鱼类识别视频展示
          <svg class="icon" style="width: 1.0908203125em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1117 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3818"><path d="M970.28276331 465.43862766L553.28060931 55.61135266a45.816565 45.816565 0 0 0-63.815133 0 43.897313 43.897313 0 0 0 0 62.822031l388.079471 381.239346-388.079471 381.373246a43.741094 43.741094 0 0 0 0 62.68813 45.649188 45.649188 0 0 0 63.815133 0l417.035629-409.693374c9.719003-9.462359 13.590983-22.015607 12.82105-34.368002a43.294757 43.294757 0 0 0-12.854525-34.234102M656.15029031 499.67272966a43.038113 43.038113 0 0 0-12.653674-34.211785L226.50562131 55.61135266a46.017417 46.017417 0 0 0-63.993667 0 44.053531 44.053531 0 0 0 0 62.822031l388.391907 381.239346L162.51195431 881.04597566a43.863837 43.863837 0 0 0 0 62.68813 45.861199 45.861199 0 0 0 63.993667 0l417.024471-409.693374a43.328232 43.328232 0 0 0 12.620198-34.368002" p-id="3819"></path></svg>
        </h4>
        <h4 class="to-bird-detail" @click="toDetails">
          查看鱼类详情
          <svg class="icon" style="width: 1.0908203125em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1117 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3818"><path d="M970.28276331 465.43862766L553.28060931 55.61135266a45.816565 45.816565 0 0 0-63.815133 0 43.897313 43.897313 0 0 0 0 62.822031l388.079471 381.239346-388.079471 381.373246a43.741094 43.741094 0 0 0 0 62.68813 45.649188 45.649188 0 0 0 63.815133 0l417.035629-409.693374c9.719003-9.462359 13.590983-22.015607 12.82105-34.368002a43.294757 43.294757 0 0 0-12.854525-34.234102M656.15029031 499.67272966a43.038113 43.038113 0 0 0-12.653674-34.211785L226.50562131 55.61135266a46.017417 46.017417 0 0 0-63.993667 0 44.053531 44.053531 0 0 0 0 62.822031l388.391907 381.239346L162.51195431 881.04597566a43.863837 43.863837 0 0 0 0 62.68813 45.861199 45.861199 0 0 0 63.993667 0l417.024471-409.693374a43.328232 43.328232 0 0 0 12.620198-34.368002" p-id="3819"></path></svg>
        </h4>
      </div>
    </div>
    <!-- 鸟类出现频率图和历史数据表格 -->
    <div class="bird-history animated bounceInRight">
      <div class="bird-history-chart">
        <div class="bird-history-title">
          <h3>鱼类出现频率</h3>
          <!-- <input type="date"  v-model="date" @change="pagechange()" > -->
        </div>
        <div class="bird-chart">
          <div id="birdFrequency" :key="keyIndex"></div>
        </div>
      </div>
      <div class="bird-history-table" v-if="hasData">
        <div class="table-bird">
        <ul>
          <li>时间</li>
          <li v-for="(item,index) in birdsList" :key="index">{{item}}</li>
          <li>总数（只）</li>
        </ul>
        <ul v-for="(item,index) in dataList" :key="index">
            <li>{{item.time}}</li>
            <li v-for="(i,inde) in item.value" :key="inde">{{i.count}}</li>
            <li>{{item.sum}}</li>
        </ul>
      </div>
        <div class="page">
          <v-pagination :total="total" :current-page="current" @pagechange="pagechange"></v-pagination>
        </div>
      </div>
      <div v-else class="data-table">
        <h2>当天无数据</h2>
      </div>
    </div>

  </div>
</template>
<script>
import pagination from '@/components/base/pagenation.vue'
import {getReportTwo,getHistoryBirdDay} from '@/api/axiosApi.js'

export default {
  data(){
    return{
      keyIndex:0,
      tableData:[
        {'name':'监测点位1'},
        {'name':'监测点位2'},
        {'name':'监测点位3'},      
      ],
      show:false,
      value: '',
      allBirdData:[
        {time:'09:00',aCount:10,bCount:22,cCount:18},
        {time:'09:10',aCount:10,bCount:22,cCount:18},
        {time:'09:22',aCount:10,bCount:22,cCount:18},
        {time:'09:32',aCount:10,bCount:22,cCount:18},
        {time:'09:43',aCount:10,bCount:22,cCount:18},
        {time:'09:53',aCount:10,bCount:22,cCount:18},
        {time:'10:10',aCount:10,bCount:22,cCount:18},
        {time:'10:20',aCount:10,bCount:22,cCount:18},
        {time:'10:30',aCount:10,bCount:22,cCount:18},
        {time:'10:40',aCount:10,bCount:22,cCount:18},
      ],
      birdData:[],
      //////////////////分页数据
      total: 10, // 记录总条数
      display: 6, // 每页显示条数
      current: 1, // 当前的页数
      //////////////////
      imgPath:'',
      pNum:0,
      wsList:[null,null,null,null],//ws://192.168.20.222:8124
      socketList:[{ws:'ws://192.168.20.222:8124',capIndex:1},{ws:'ws://192.168.20.222:8124',capIndex:2},{ws:'ws://192.168.20.222:8124',capIndex:3}],
      wsBirdList:[{name:'鲤鱼',count:10},{name:'鲫鱼',count:3},{name:'草鱼',count:12},{name:'鲶鱼',count:10},{name:'绿头鸭',count:3},{name:'鲢鱼',count:12},{name:'黑鱼',count:3},{name:'鲈鱼',count:12}],
      ///////////////////////////////////////////
      date:'',//获取当天日期
      dataList:[],
      
      camera:1,//请求时的摄像头参数

      birdsList:[],//当月出现的所有鸟的种类
      tableList:[],//循环生成表格的列表
      hasData:true,//是否有数据，控制是否显示表格和折线图
      timeList:[],//折线图横轴
      trueBirds:[],//鸟的种类大于7时，显示的鸟的种类
      dataArr:[],//折线图series生成列表
      ///////////////////////////////////////////
    }
  },
  components: {
    'v-pagination': pagination
  },
  methods:{
    toDetails(){
      if(this.total==0){
        //$('.details-icon icon1').css('fill','#aaa');
        alert('当前画面未出现鸟类！');
      }else{
        this.$router.push({path:'/details'});

        // 传递数据
        sessionStorage.setItem("name",this.bird)

        sessionStorage.setItem("camera",this.camera)
      }
    },
    toBirdsVideo(){     
        this.$router.push({path:'/birdsVideo'});
    },
    toReport(){
      this.$router.push({path:'/report'});
    },
    openValue(){
      this.show=!this.show;
    },
    getvalue(index,item){
      this.value=item.name;
      this.show=false;
      this.pNum=index;
      for(let i=0;i<this.wsList.length;i++){
        if(this.wsList[i]!=null){
          this.wsList[i].close();
        }
      }
      if(this.pNum>3){
        this.pNum=2;
        this.setWebSocket();
      }else{
        this.setWebSocket();
      }
    },

    //鸟类出现频率图
    paintBirdFrequency(dataArr){
      // console.log(dataArr)
      let trueBirds=this.trueBirds;
      //console.log(this.trueBirds,this.dataArr)
      var myChart = echarts.init(document.getElementById('birdFrequency'));
      var option = {
        title: {
            text: ''
        },
        grid:{
              x:65,y:60,x2:50,y2:50,borderWidth:10,height: 200,width: 775
	      },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:trueBirds,
            top:"25px",
            right:"38px",
            textStyle:{
              color: "white"
            }
        },
        xAxis: {
            type: 'category',
            name:'时间',
            boundaryGap: false,
            data: this.timeList,
            axisLine: {  //这是x轴文字颜色
                lineStyle: {
                    color: "white",
                }
            },
        },
        yAxis: {
            name:'数量（只）',
            type: 'value',
            axisLine: {  //这是y轴文字颜色
            lineStyle: {
                color: "#fff",
              }
            }
        },
        series:(function(){
          let serie=[];
          //console.log('我运行到这里了');
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
        })()
        
      }
      myChart.setOption(option);
    },
    //分页
    pagechange(currentPage) {
      // 实时画面
      let cNum = parseInt(this.camera) - 1; // this.pNum;
      this.wsList[cNum] = new WebSocket(this.socketList[cNum]['ws'])
      this.wsList[cNum].onopen = () => {
        // Web Socket 已连接上，使用 send() 方法发送数据
        for(let i=0;i<this.wsList.length;i++){
          if(i==cNum){
            continue;
          }else{
            if(this.wsList[i]!=null){
              this.wsList[i].close();
            }
          }
        }
        // console.log('客户端WebSocket已启动');
        this.wsList[cNum].send("JS has connected!");
      };
      this.wsList[cNum].onmessage = e => {
        if(JSON.parse(e.data).capIndex==this.socketList[cNum]['capIndex']){
          //console.log(JSON.parse(e.data));
          let data=JSON.parse(e.data);
          this.imgPath='data:image/jpeg;base64,'+data.image;
          this.wsBirdList=data.birdsDict;
          // console.log(data.birdsDict)
          // console.log(this.wsBirdList)
          var bird = [];
          for(let i=0;i<data.birdsDict.length;i++){
            this.bird = data.birdsDict[i].name;  
            console.log(this.bird)    
          }   

          // for(let i=0;i<data.in.length-1;i++){
          //   this.enterList[i]=data.in[i];
          //   this.leaveList[i]=data.out[i];
          // }
        } 
        
      };
      this.wsList[cNum].onerror = function(error) {
          console.log('error :' + error.name + error.number);
      };

      //获取当日该监测点所有鸟的类型
      this.getReportBirdFun().then(res1=>{
        this.birdsList=res1.data;
        this.trueBirds=this.birdsList;
        //console.log(currentPage,sessionStorage.caremaIndex);
        // ajax请求, 向后台发送 currentPage, 来获取对应的数据
        let cameraIndex;
        //sessionStorage.caremaIndex编号为0,1,2,3
        //对应的摄像头编号为1,2,3,4
        if(sessionStorage.caremaIndex=='1'){
          cameraIndex=2;
        }else if(sessionStorage.caremaIndex=='2'){
          cameraIndex=3;
        }else if(sessionStorage.caremaIndex=='3'){
          cameraIndex=4;
        }else{
          cameraIndex=1;
        }
        let postKey={cameraNum:this.camera,date:this.date};
        // console.log(this.date)
        // 向接口请求数据
        getReportTwo(postKey).then(res=>{
          this.tableList=[];//清空之前的数据
          this.timeList=[];

          //console.log(res.data);
          //没有数据时，不显示表格和折线图
          if(res.data.length == 0){
            //console.log('无数据');
            this.hasData=false;
          }else{//有数据时

            this.hasData=true;
            //循环后端传来的数据
            for(let i=0;i<res.data.length;i++){
              this.timeList.push(res.data[i].time.substr(0,8));
              let object={},arr=[];
              object.time=res.data[i].time;
              //根据所有鸟的种类循环
              for(let j=0;j<this.birdsList.length;j++){
                let subObject={},count;
                let result=res.data[i].value.some(item=>{//查找数组中是否出现该鸟
                  if(item.name==this.birdsList[j]){
                    count=item.count;
                    return true
                  }else{
                    return false
                  }
                })
                //console.log(result);
                if(result!=false){
                  subObject.name=this.birdsList[j];
                  subObject.count=count;
                  arr.push(subObject);
                }else{//将当天没有出现的鸟的数量设为0
                  subObject.name=this.birdsList[j];
                  subObject.count=0;
                  arr.push(subObject);
                }
              }
              object.value=arr;

              //计算每个时间点对应的鸟的合计值
              let sum=0;
              for(let i=0;i<object.value.length;i++){
                sum+=object.value[i].count;
              }
              object.sum=sum;
              this.tableList.push(object);
            }
            // console.log(this.tableList);

            this.total=this.tableList.length;
            //     //获取每一页的数据
            if(currentPage==undefined){
              currentPage=1;
            }
            var start = (currentPage - 1) * 8;
            var end = currentPage * 8;
            this.dataList = this.tableList.slice(start, end);

            ///////////////////////////////////////

            //处理折线图数据
            // console.log(this.trueBirds,this.tableList)
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
            //console.log(this.trueBirds,this.dataArr)
            this.paintBirdFrequency(dataArr);
            //////////////////////////////

          }
          this.$forceUpdate();
          ////////////////////////////////////////////////
        }).catch(error=>{
          console.log(error)
        })
      });

      
    },

    //获取当天出现的鸟的种类
    getReportBirdFun(){
      let cameraIndex;
      //sessionStorage.caremaIndex编号为0,1,2,3   
      //对应的摄像头编号为1,2,3,4
      if(sessionStorage.caremaIndex=='1'){
        cameraIndex=2;
      }else if(sessionStorage.caremaIndex=='2'){
        cameraIndex=3;
      }else if(sessionStorage.caremaIndex=='3'){
        cameraIndex=4;
      }else{
        cameraIndex=1;
      }
      //console.log(this.date,cameraIndex)
      let data={cameraNum:this.camera,date:this.date};
      return getHistoryBirdDay(data)
    },

    //获取当前日期
    getTodayDate(){
      var obj=new Date();
      var month=obj.getMonth();
      if(month+1<=9){
        month='0'+(month+1);
      }else{
        month=month+1
      }
      var day=obj.getDate();
      if(day<10){
        day='0'+day;
      }
      var dateString=obj.getFullYear()+'-'+month+'-'+day;
      this.date=dateString;
      this.$forceUpdate();
    },
  },
  created(){
    this.getTodayDate();
  },
  beforeDestroy(){
    for(let i=0;i<this.wsList.length;i++){
      if(this.wsList[i]!=null){
        this.wsList[i].close();
      }
    }
  },
  mounted(){
    this.pagechange();
  }
}
</script>
<style scoped>
  .bird{
    cursor: default;
    flex-wrap: wrap;
  }
  /*视频*/
  .bird-video{
    width:52%;
    height:54%;
  }
  .bird-video-box{
    width:100%;
    height:90%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bird-video-box video{
    height:100%;
    /* border:5px solid #000; */
  }
  .bird-video-box img{
    height:90%;
    /* border:5px solid #000; */
  }
    /*下拉选样式*/
  .choose-position select,.choose-position option{
    background:transparent;
    cursor: pointer;
  }
  .choose-position{
    width:100%;
    height:2rem;
  }
  .divInput{
    position: absolute;
    top: 1.5rem;
    left: 19rem;
    cursor: pointer;
  }
  .input{
    width: 140px;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    margin-bottom: 1rem;
    position: relative;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  .input input{
    border: none;
    outline: none;
    width: 90%;
    height:100%;
    font-size:1.25rem;
    background:transparent;
    cursor: pointer;
  }
  .input input::placeholder{
    color:#fff;
  }
  .input img{
    position: absolute;
    right: 34px;
    top: 11%;
    width:10%;
  }
  .option-list{
    width: 150px;
    border: 1px solid #cccccc;
    overflow: hidden;
  }
  .option-list ul li{
    width: 100%;
    height: 30px;
    cursor: pointer;
    line-height: 30px;
    padding-left: 10px;
  }
  .option-list ul li:hover{
    background-color: #cccccc;
  }
  /*鸟类实时数据*/
  .bird-real-time{
    width:30%;
    height:54%;
  }
  .bird-real-title{
    width:100%;
    height:10%;
  }
  .bird-real-table{
    width:100%;
    height:90%;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-wrap: wrap;
    position: relative;
  }
  .bird-real-table .bird-real-table-item{
    width: 30%;
    height: 30%;
  }
  .bird-real-table .bird-real-table-item p{
    width: 100%;
    height: 50%;
    font-size: 1.25rem;
    letter-spacing: 1px;
    font-weight: 600;
  }
  .bird-real-table .bird-real-table-item p:first-child{
    color: #205aa7;
  }
  /* .bird-real-table table{
    width:100%;
    height:100%;
  }
  .bird-real-table table tr th{
    font-size:1.25rem;
  }
  .bird-real-table table tr td{
    text-align: center;
    font-size:1.25rem;
  } */
/*鸟类出现频率图*/
  .bird-history{
    width:100%;
    height:45%;
    display: flex;
    margin-top:1.5rem;
  }
  .bird-history-chart{
    width:60%;
    height:100%;
  }
  .bird-history-table{
    width:68%;
    height:100%;
  }
  .bird-history-title{
    display: flex;
    height:10%;
  }
    .bird-history-title h3{
    margin-left: 35px;
  }
  .bird-history-title input{
    margin-left:1rem;
    background:transparent;
    opacity: 0;
  }
  .bird-chart{
    width:100%;
    height:90%;
  }
  #birdFrequency{
    width:100%;
    height:100%;
  }
/*历史数据表格*/
  .bird-history-table table{
    width:100%;
    height:90%;
  }
  .bird-history-table table tbody tr{
    width:100%;
    height:12.5%;
  }
  .bird-history-table table tbody{
    width:100%;
    height:90%;
  }
  .bird-history-table table th,.bird-history-table table td{
    width:20%;
    text-align: center;
  }
  .bird-history-table table th{
    font-size:1.15rem;
  }
   .table-bird{
    font-size:15px;
  }
  .bird-history-table .page{
    width:100%;
    height:10%;
  }

  .details-icon{
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
  }
  .details-icon:hover{
    font-size: 25px;
  }
  .to-bird-detail{
    position: absolute;
    bottom: 0px;
    font-size: 18px;
    right: 0px;
    cursor: pointer;
  }
  .to-bird-detail:hover{
    font-size: 22px;
    
  }

  .to-bird-detailone{
    position: absolute;
    bottom: 35px;
    font-size: 18px;
    right: 0px;
    cursor: pointer;
  }
    .to-bird-detailone:hover{
    font-size: 22px;
    
  }

  .table-bird{
  width:100%;
  height:85%;
  margin-top: 30px;
}
.table-bird ul{
  display: flex;

  /* border-bottom:1px solid #bbb; */
  width:100%;
  height:10%;
}
.table-bird ul:first-child{
  height:20%;
  font-weight: 600;
}
.table-bird li{
  width:20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.data-table{
  width:55%;
  height:100%;
  padding:0px 2rem 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#reportCaremaNum{
  background:transparent;
  color: white;
  cursor: pointer;
  border: 1px solid white;
  border-radius: 5px;
  /* opacity: 0; */
  /* margin-top: -420px;
  margin-left: 40px; */
}
</style>