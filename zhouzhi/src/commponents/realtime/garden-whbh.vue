<template>
  <div class="garden"> 
    <div class="nav">
      <h1>植物样方-物候变化</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div class="box">
      <div class="whbh-title">
        <h3>物候变化</h3>
        <div class="select-box">
          <select name="yangfagndi" id="choosen-yf">
            <option value="1">样方地1</option>
            <option value="2">样方地2</option>
            <option value="3">样方地3</option>
          </select>
          <select name="year" id="choosen-year">
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
          </select>
        </div>
      </div>
      <div class="whbh-content">
        <div class="option-box">
          <div class="div-option">
            <img src="../../assets/icon/红色.png" alt="">
            <span>开花</span>
          </div>
          <div class="div-option">
            <img src="../../assets/icon/绿色.png" alt="">
            <span>结果</span>
          </div>
          <div class="div-option">
            <img src="../../assets/icon/橙色.png" alt="">
            <span>变色</span>
          </div>
        </div>
        <div class="process-box">
          <!-- 1到12周 -->
          <div class="week-12">
            <div class="div-hr"></div>
            <div class="week-12-box">
              <div class="week-item" v-for="(item,i) in week1T012" :key="i" @click="showDetailOrNot(i)">
                <img :src="item.imgPath" alt="">
                <p>第{{item.weekNum}}周</p>
              </div>
            </div>
            <div class="div-string-right"></div>
          </div>
          <!-- 13到24周 -->
          <div class="week-12">
            <div class="div-hr"></div>
            <div class="week-12-box">
              <div class="week-item" v-for="(item,i) in week13To24" :key="i">
                <img :src="item.imgPath" alt="">
                <p>第{{item.weekNum}}周</p>
              </div>
            </div>
            <div class="div-string-right"></div>
            <div class="div-string-left"></div>

          </div>
          <!-- 25到36周 -->
          <div class="week-12">
            <div class="div-hr"></div>
            <div class="week-12-box">
              <div class="week-item" v-for="(item,i) in week25To36" :key="i">
                <img :src="item.imgPath" alt="">
                <p>第{{item.weekNum}}周</p>
              </div>
            </div>
            <div class="div-string-right"></div>
            <div class="div-string-left"></div>
          </div>
          <!-- 37到48周 -->
          <div class="week-12">
            <div class="div-hr"></div>
            <div class="week-12-box">
              <div class="week-item" v-for="(item,i) in week37To48" :key="i">
                <img :src="item.imgPath" alt="">
                <p>第{{item.weekNum}}周</p>
              </div>
            </div>
            <div class="div-string-right"></div>
            
          </div>
        </div>
        <div class="detail-img-box" v-if="showDetail">
          <div class="svg" @click="closeDetail">
            <svg class="icon" style="width: 2em; height: 2em;vertical-align: middle;fill: #ccc;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1966"><path d="M566.355825 512l90.479264 90.507708a38.398933 38.398933 0 0 1-54.298936 54.32738L512.028445 566.270492l-90.507708 90.507709a38.398933 38.398933 0 0 1-54.32738-54.298937L457.757952 512l-90.507708-90.507708a38.398933 38.398933 0 0 1 54.298936-54.32738L512.028445 457.729508l90.507708-90.507709a38.398933 38.398933 0 0 1 54.32738 54.298937L566.298937 512zM874.030834 149.969168c199.95889 199.95889 199.95889 524.102775 0 724.061664-199.95889 199.95889-524.102775 199.95889-724.061665 0-199.95889-199.95889-199.95889-524.102775 0-724.061664 199.95889-199.95889 524.102775-199.95889 724.061665 0z m-54.32738 54.327379c-169.922391-169.979278-445.484514-169.979278-615.435349 0-169.950835 169.922391-169.950835 445.484514 0 615.435349s445.512958 169.950835 615.463793 0c169.950835-169.950835 169.950835-445.512958 0-615.463792z" p-id="1967"></path></svg>
          </div>
          <div class="prev" @click="prevImg">
            <svg class="icon" style="width: 2em; height: 2em;vertical-align: middle;fill: #ccc;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2358"><path d="M743.46 898.54L356.91 512l386.55-386.54a36 36 0 0 0-50.92-50.92l-412 412A35.92 35.92 0 0 0 270 512a35.9 35.9 0 0 0 4.84 18c0.23 0.39 0.47 0.78 0.71 1.16a36 36 0 0 0 5 6.27l412 412a36 36 0 0 0 50.92-50.91z" p-id="2359"></path></svg>
          </div>
          <div class="next" @click="nextImg">
            <svg class="icon" style="width: 2em; height: 2em;vertical-align: middle;fill: #ccc;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2969"><path d="M280.54 898.54L667.09 512 280.54 125.46a36 36 0 0 1 50.92-50.92l412 412A35.92 35.92 0 0 1 754 512a35.9 35.9 0 0 1-4.84 18c-0.23 0.39-0.47 0.78-0.71 1.16a36 36 0 0 1-5 6.27l-412 412a36 36 0 0 1-50.92-50.91z" p-id="2970"></path></svg>
          </div>
          <div class="img">
            <h3 class="weekTime">{{currentPicture.weekTime}}</h3>
            <p class="time">拍摄时间:{{currentPicture.time}}</p>
            <p class="period">{{currentPicture.period}}</p>
            <img :src="currentPicture.imgPath" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      showDetail:false,
      week1T012:[
        {imgPath:require('../../assets/icon/红色.png'),weekNum:1},
        {imgPath:require('../../assets/icon/红色.png'),weekNum:2},
        {imgPath:require('../../assets/icon/红色.png'),weekNum:3},
        {imgPath:require('../../assets/icon/红色.png'),weekNum:4},
        {imgPath:require('../../assets/icon/绿色.png'),weekNum:5},
        {imgPath:require('../../assets/icon/绿色.png'),weekNum:6},
        {imgPath:require('../../assets/icon/绿色.png'),weekNum:7},
        {imgPath:require('../../assets/icon/绿色.png'),weekNum:8},
        {imgPath:require('../../assets/icon/橙色.png'),weekNum:9},
        {imgPath:require('../../assets/icon/橙色.png'),weekNum:10},
        {imgPath:require('../../assets/icon/橙色.png'),weekNum:11},
        {imgPath:require('../../assets/icon/橙色.png'),weekNum:12},
      ],
      week13To24:[
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:24},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:23},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:22},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:21},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:20},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:19},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:18},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:17},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:16},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:15},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:14},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:13},
      ],
      week25To36:[
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:25},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:26},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:27},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:28},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:29},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:30},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:31},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:32},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:33},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:34},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:35},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:36},
      ],
      week37To48:[
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:48},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:47},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:46},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:45},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:44},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:43},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:42},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:41},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:40},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:38},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:38},
        {imgPath:require('../../assets/icon/灰色.png'),weekNum:37},
      ],
      detailImgList:[
        {weekTime:'第1周',imgPath:require('../../assets/image/开花.png'),time:'2020年1月7日',period:'开花期'},
        {weekTime:'第2周',imgPath:require('../../assets/image/开花.png'),time:'2020年1月15日',period:'开花期'},
        {weekTime:'第3周',imgPath:require('../../assets/image/开花.png'),time:'2020年1月23日',period:'开花期'},
        {weekTime:'第4周',imgPath:require('../../assets/image/开花.png'),time:'2020年1月7日',period:'开花期'},
        {weekTime:'第5周',imgPath:require('../../assets/image/结果.jpg'),time:'2020年1月15日',period:'结果期'},
        {weekTime:'第6周',imgPath:require('../../assets/image/结果.jpg'),time:'2020年1月23日',period:'结果期'},
        {weekTime:'第7周',imgPath:require('../../assets/image/结果.jpg'),time:'2020年1月7日',period:'结果期'},
        {weekTime:'第8周',imgPath:require('../../assets/image/结果.jpg'),time:'2020年1月15日',period:'结果期'},
        {weekTime:'第9周',imgPath:require('../../assets/image/变色.jpg'),time:'2020年1月23日',period:'变色期'},
        {weekTime:'第10周',imgPath:require('../../assets/image/变色.jpg'),time:'2020年1月7日',period:'变色期'},
        {weekTime:'第11周',imgPath:require('../../assets/image/变色.jpg'),time:'2020年1月15日',period:'变色期'},
        {weekTime:'第12周',imgPath:require('../../assets/image/变色.jpg'),time:'2020年1月23日',period:'变色期'}
      ],
      keyIndex:0,
      currentPicture:{}
    }
  },
  components:{
    
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },
    showDetailOrNot(i){
      this.showDetail=true;
      this.keyIndex=i;
      this.currentPicture=this.detailImgList[i];
    },
    closeDetail(){
      this.showDetail=false;
    },
    prevImg(){
      if(this.keyIndex==0){
        alert("当前为第一周采集图像！");
      }else{
        let j=this.keyIndex-1;
        this.keyIndex=j;
        this.currentPicture=this.detailImgList[j];
      }
    },
    nextImg(){
      let z=this.detailImgList.length-1;
      if(this.keyIndex==z){
        alert("之后时期暂无图像！");
      }else{
        let j=this.keyIndex+1;
        this.keyIndex=j;
        this.currentPicture=this.detailImgList[j];
      }
    }
  },
  created(){
    
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
    padding: 2rem;
  }
  .nav{
    width: 100%;
    height: 3rem;
    background-color: white;
  }
  .garden h1{
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

.box .whbh-title{
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: space-between;
  border-bottom:1px solid #dfdfdf;
}
.box .whbh-title .select-box{
  width: 20%;
  display: flex;
  justify-content: space-between;
}
.box .whbh-title .select-box select{
  width: 40%;
  height: 50%;
  color: #ccc;
  border: 1px solid #dfdfdf;
  outline: none;
}
.box .whbh-content{
  width: 100%;
  height: 92%;
  position: relative;
}
.box .whbh-content .option-box{
  width:100%;
  height: 5%;
  display: flex;
  justify-content: flex-end;
}
.box .whbh-content .option-box .div-option{
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box .whbh-content .option-box .div-option span{
  margin-left: 5px;
}
.box .whbh-content .process-box{
  width: 100%;
  height: 95%;
  padding:3rem 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.process-box .week-12{
  width: 1200px;
  height: 140px;
  position: relative;
}
.div-hr{
  width: 1200px;
  height: 3px;
  background:#d1beb4;
  position:absolute;
  right: 0px;
}/*横线*/
.week-12 .div-hr{
  top: 50%;
}
.div-string-right{
  width:3px;
  height: 70px;
  background:#d1beb4;
  position:absolute;
  right: 0px;
}/*右竖线*/
.div-string-left{
  width:3px;
  height: 70px;
  background:#d1beb4;
  position:absolute;
  left: 0px;
}/*左竖线*/
.week-12 .div-string-right{
  top: 50%;
}
.week-12-box{
  width: 1200px;
  height: 140px;
  display: flex;
}
.week-item{
  width: 120px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.week-item img{
  margin-bottom: 30px;
}
.process-box :nth-child(2) .div-string-right{
  top:0;
}/*13-24周右上竖线*/
.process-box :nth-child(2) .div-string-left{
  bottom:0;
}/*13-24周左下竖线*/
.process-box :nth-child(3) .div-string-left{
  top:0;
}/*25-36周左上竖线*/
.process-box :nth-child(4) .div-string-right{
  top:0;
}/*37-48周右上竖线*/
.detail-img-box{
  position: absolute;
  width: 800px;
  height: 600px;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  right: 0;
  top:0;
  bottom: 0;
  margin: auto;
  border-radius: 8px;
}
.detail-img-box .svg{
  position:absolute;
  top:0;
  right: 0;
}
.detail-img-box .prev{
  position:absolute;
  top: 48%;
  left: 0;
}
.detail-img-box .next{
  position:absolute;
  top: 48%;
  right: 0;
}
.detail-img-box .img{
  width: 740px;
  height: 540px;
  position: absolute;
  left: 0;
  right: 0;
  top:0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.detail-img-box .img img{
  width: 90%;
}
.detail-img-box .img .weekTime{
  position: absolute;
  top: 0;
  left: 0;
  color: #eee;
}
.detail-img-box .img .time{
  position: absolute;
  top: 0;
  left: 100px;
  color: #eee;
}
.detail-img-box .img .period{
  position: absolute;
  top: 0;
  left: 350px;
  color: #eee;
}
</style>