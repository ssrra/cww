<template>
  <div class="screening">
      <div class="nav">
        <h1>红外相机-视频上传</h1>
        <i class="el-icon-s-unfold" @click="goback()"></i>
        <a>|</a>
        <span>管理员</span>
        <div class="circle"><i class="el-icon-s-custom" ></i></div>
      </div>
      <div class="box">
      <div class="videobox">
      <h4>上传识别</h4>
      <div class="videoboxs">
        <div class="bg-container">
    <div class="con-container">
      <div class="con-upload">
        <div  class="upload-content">
          <div class="select-box">
            <select name="personName" id="personName">
              <!-- <option value="0">人员</option> -->
              <option value="1">蔡天洋</option>
              <option value="2">吴明杰</option>
              <option value="3">赵自文</option>
              <option value="4">周至旺</option>
              <option value="5">李春晖</option>
            </select>
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
  </div>
</template>

<script>
import {getCamera} from '../../api/axiosApi.js'
export default {
  data(){
    return {
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
      options: [],
      cameraId: '1',    // 监测点位
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
        let filePath = imgFiles[i].name
        let fileFormat = filePath.split('.')[1].toLowerCase()
        let src = window.URL.createObjectURL(imgFiles[i])
        console.log(filePath,fileFormat);

        if (!fileFormat.match(/mp4|avi|swf/)) {
          alert('上传错误,文件格式必须为：mp4/avi')
          return
        }
        var preview = document.getElementById("previewImg")
        console.log(fileFormat);
        if(fileFormat=="avi"|| fileFormat=="mp4" || fileFormat=="swf"){
          var div=document.createElement('div');
          div.classList.add("upload-box");
          var video=document.createElement('video');
          video.width=200;
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
          img.width = 200;
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
                // console.log($("#cameraId").val())
                $.ajax({
                  url: "http://192.168.20.104:8081/filterVideoUpload/upload",
                  // url: "http://192.168.1.5:8080/filterVideoUpload/upload",
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
  .screening h1{
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
    height: 43.75rem;
    /* background: rgba(128, 128, 128, 0.1); */
    margin: 25px auto;
  }
  .nav2{
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
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


  .el-pagination {
    padding: 0;
    text-align: center;
    margin-top: 50px;
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