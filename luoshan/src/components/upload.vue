<template>
  <div class="bird">
    <div class="Left">
      <div class="nav">
        <ul>
          <router-link to="/manage">
            <li><img src="../../public/img/huodong.png" alt=""><span>活动情况</span></li>
          </router-link>
          <router-link to="/manage/scree">
            <li  class="first"><img src="../../public/img/scree.png" alt=""><span>视频管理</span></li>
          </router-link>
          <router-link to="/manage/twice">
            <li><img src="../../public/img/twice.png" alt=""><span>二次校准</span></li>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="Right">
      <div class="nav2">
        <router-link to="/manage/scree">
          <el-radio v-model="radio" label="1" border>动物视频</el-radio>
        </router-link>
        <router-link to="/manage/upload">
          <el-radio v-model="radio" label="2" border>视频上传</el-radio>
        </router-link>
      </div>

      <div class="videoboxs">
        <div class="bg-container">
        <div class="con-container">
          <div class="con-upload">
            <div  class="upload-content">
              <div class="select-box">
                <select name="personName" id="personName">
                  <option value="0">人员</option>
                  <option value="1">蔡天洋</option>
                  <option value="2">吴明杰</option>
                  <option value="3">赵自文</option>
                  <option value="4">周至旺</option>
                  <option value="5">李春晖</option>
                </select>
                <!-- <select name="cameraId" id="cameraId">
                  <option value="0">监测点位</option>
                  <option value="1">监测点位1</option>
                  <option value="2">监测点位2</option>
                  <option value="3">监测点位3</option>
                  <option value="4">监测点位4</option>
                  <option value="5">监测点位5</option>
                </select> -->
                <select name="cameraId" id="cameraId">
                  <option v-for="item in options" :value="item.cameraId">{{item.cameraName}}</option>
                </select>
                <button class="sureUpload">确定</button>
                <div>
                  <input type="file" id="picture" multiple />
                </div> 
              </div>
              <div id="previewImg"></div>
            </div>
          </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {getCamera} from '../api/axiosApi.js'
export default {
  data(){
    return{
      radio: '2',
      options: [],
      options1: [{
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }],
      options2: [{
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }],
      personName: '1',  // 人员选择
    }
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },
    upLoad(){
      getCamera().then(res=>{
        this.options = res.data;
        // console.log(this.options)
      })
    var imgFiles = [];
    var formData;
    //var formData1,formData2,formdataAll;
    var formDataArray=[];
    $('#picture').on('change', function () {
      var imgFiles = $(this)[0].files
      for (let i = 0; i < imgFiles.length; i++) {
        // console.log(imgFiles[i])
        // console.log(inputfile[i].lastModified)
        // console.log(typeof imgFiles[i].lastModified);
        let filePath = imgFiles[i].name
        let fileFormat = filePath.split('.')[1].toLowerCase()
        let src = window.URL.createObjectURL(imgFiles[i])
                console.log(filePath,fileFormat);

        if (!fileFormat.match(/png|jpg|jpeg|mp4/)) {
          alert('上传错误,文件格式必须为：png/jpg/jpeg/mp4')
          return
        }
        var preview = document.getElementById("previewImg")
        //console.log(fileFormat);
        if(fileFormat=="mp4"){
          var div=document.createElement('div');
          div.classList.add("upload-box");
          var video=document.createElement('video');
          video.width=250;
          video.src=src;
          video.classList.add("margin-right");
          var p=document.createElement('p');
          p.classList.add("upload-state");
          p.textContent="未完成";
          
          div.appendChild(video);
          div.appendChild(p);
          preview.appendChild(div);
          $("p").css("background-color","	#708090");
          $("p").css("color","white");
        }else{
          var div=document.createElement('div');
          div.classList.add("upload-box");
          var img = document.createElement('img')
          img.width = 250;
          img.src = src;
          img.classList.add("margin-right");
          var p=document.createElement('p');
          p.classList.add("upload-state");
          p.textContent="上传中";
          div.appendChild(img);
          div.appendChild(p);
          preview.appendChild(div);
        }
        
      }
      
    })
    
    var doing=false;
    $(".sureUpload").click(function () {
      //console.log($("#cameraId").val(),$("#personName").val(),$('#picture')[0].files)
      if(doing){
        alert("上一操作未完成");
      }else{
        doing=true;
            if($("#personName").val()==0){
              alert("请选择人员编号");
            }else if($("#cameraId").val()==0){
              alert("请选择相机编号");
            }else if($('#picture')[0].files.length==0){
              alert("请选择上传图片")
            }else{
              //var inputfile = $('#picture')[0].files[0];
              var inputfile = $('#picture')[0].files;
              //var inputfileArray=Array.from(inputfile);
              for(var i = 0; i < inputfile.length; i++){
                formData = new FormData();
                formData.append("uploadFile", inputfile[i]);
                formData.append('mTime', inputfile[i].lastModified);
                formData.append('cameraId', $("#cameraId").val());
                formData.append('uploadPersonId', $("#personName").val());
                console.log($("#cameraId").val())
                $.ajax({
                  // url: "http://192.168.20.104:8081/filterVideoUpload/upload",
                  url: "http://192.168.1.5:8080/filterVideoUpload/upload",
                  type: "post",
                  data: formData,
                  dataType: "json",
                  processData: false,//必须是false
                  contentType: false,//必须是false
                  async:false,
                  success: function (res) {
                    // console.log(res);
                    let p=$("#previewImg p");
                    //console.log(p);
                    if(res.error==0){
                      p[i].textContent="上传成功";
                      $("p").css("background-color","	#3CB371");
                      //history.go(0);
                      // console.log("change");
                    }else{
                      p[i].textContent="上传失败";
                    }
                    
                  },
                  error: function (res) {
                    // console.log(res);
                    doing=false;
                  },
                  done: function(){
                    doing=false;
                  }
                })
              }

            }
      }
              
    })
    }
  },
  mounted(){
    this.upLoad();
  }

}
</script>

<style scoped>
  .bird{
    cursor: default;
    flex-wrap: wrap;
  }
  .Left{
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .Right{
    width: 85%;
    height: 100%;
    background-color: rgb(24, 23, 23);
    
  }
  .nav{
    width: 80%;
    height: 80%;
  }
  .nav ul li{
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    border-radius: 50px;
  }
  .nav span{
    font-size: 20px;
    color: white;
    margin-left: 20px;
  }
  .first{    background-color: #3b3a3a;
  }
  .nav ul li:hover{
    background-color: #3b3a3a;
    cursor: pointer;
    border-radius: 50px;
  }
  .nav2{
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    padding-left: 5%;
    border-bottom: 2px solid gray;
  }
  /deep/.el-radio__label {
    color: white;
}


 .videobox{
    height: 53.5rem;
  }
  .videobox h4{
    padding-top: 2.45%;
    margin-left: 1.55%;
    font-size: 18px;
    font-weight: normal;
  }
  .videoboxs{
    width: 97%;
    height: 38rem;
    /* background: rgba(128, 128, 128, 0.1); */
    margin: 0 auto;
  }
  .el-row{
    width: 500px;
  }
  .upload-demo{
    left: 200px;
    margin-left: 10%;
  }
  .el-upload-list.el-upload-list--text {
    margin-left: 150px;
  }
  #reportCaremaNum{
    width: 100px;
    height: 25px;
    margin-left: 30px;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 5px;
    background-color: transparent;
  }
  .day-input{
    width: 130px;
    height: 25px;
    margin-left: 60px;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 5px;
    background-color: transparent;
  }
  #personName{
    width: 8%;
    cursor:pointer;
  }
  #cameraId{
    width: 8%;
    margin-left: 15px;
    cursor:pointer;
  }
  .el-select{
    width: 8%;
    margin-left: 10px;
  }
  .nav2 input{
    height: 40px;
  }
  .buttonchoose{
    margin-left: 40px;
  }
  .buttonenter{
    margin-left: 20px;
  }
 .content{
   height: 40rem;
   display: flex;
   justify-content: center;
   align-items: center;
   border: 1px solid rgb(180, 180, 180);
 }
 .el-icon-sell{
   font-size: 100px;
   color: gray;
   opacity: 0.4;
 }
 .bg-container{
   height: 100%;
 }
 #picture{
   margin-left: 12px;
 }
</style>