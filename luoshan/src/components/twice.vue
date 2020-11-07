<template>
  <div class="bird">
    <div class="Left">
      <div class="nav">
        <ul>
          <router-link to="/manage">
            <li><img src="../../public/img/huodong.png" alt=""><span>活动情况</span></li>
          </router-link>
          <router-link to="/manage/scree">
            <li><img src="../../public/img/scree.png" alt=""><span>视频管理</span></li>
          </router-link>
          <router-link to="/manage/twice">
            <li  class="first"><img src="../../public/img/twice.png" alt=""><span>二次校准</span></li>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="Right">
    <div class="box">
      <div class="left">
        <div class="img">
          <img class="image" :src="url + this.imgPath" alt="">
          <a :href="url + this.animalPath" download><img class="vedio" src="../../public/img/base/xiazai1.png" alt=""></a>
        </div>
      </div>
      <div class="right">

          <!-- 种类选择器 -->
          <el-select class="select" v-model="value" placeholder="种类" @change="getAnimalsTwice()">
            <el-option
              v-for="item in options"
              :key="item.beastChina"
              :value="item.beastChina">
            </el-option>
          </el-select>

          <!-- 时间选择器! -->
          <div class="block">
            <el-date-picker
              @change="getAnimalsTwice()"
              class="timechoose"
              v-model="value1"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              >
            </el-date-picker>
          </div>

          <!-- <el-row class="button">
            <el-button type="success" >确定</el-button>
          </el-row> -->

          <div class="list">
            <el-table :data="tableData" @cell-mouse-enter='cell' fit height="615px" border style="width: 100%" @cell-click="handle" ref="monthlyPlanTable">
              <!-- 动物名称 -->
              <el-table-column
                prop="speciesName"
                label="物种名称"
                width="80">
              </el-table-column>

              <!-- 视频编号 -->
              <el-table-column
                prop="videoNumber"
                label="视频编号"
                width="190">
              </el-table-column>

               <!-- 数量 -->
              <el-table-column
                prop="animalsNumber"
                label="数量"
                width="50">
              </el-table-column>

              <!-- 操作 -->
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                    <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- 修改表单 -->
          <div class="alter" v-show="isShow">
            <div class="name">
              <span>动物种类：</span> 
              <el-select class="animalName" v-model="value2" placeholder="种类">
                <el-option
                  v-for="item in options1"
                  :key="item.beastChina"
                  :value="item.beastChina">
                </el-option>
              </el-select>
            </div>
            <div class="num">
              <span>动物数量：</span> 
              <el-input class="animalNum" placeholder="请输入动物数量" v-model="input" clearable></el-input>    
            </div>
            <div class="alter-nav">
              <el-button type="primary" @click="success()">提交</el-button>
              <el-button @click="esc()">取消</el-button>
            </div>
          </div>

          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="currentPage" 
            :total="totalCount"
            :page-size='pageSize'>
          </el-pagination>
          
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import {getAnimal,getAnimalsVideoTwice,getAnimalsVideoTwiceAlter,getAnimalsVideoTwiceDelete} from '../api/axiosApi.js'
export default {
  data(){
    return{
      options: [],
      options1: [],
      value: '马',// 请求时的动物种类
      value1: ['2020-01-01 00:00:00','2020-10-15 00:00:00'],// 请求时的时间参数
      tableData: [],
      value2: '',
      input: '', //修改的动物数量
      isShow: false,
      animalId: '',//动物Id
      url:'http://192.168.1.130/filter_aft/', //测试地址
      // url:'http://192.168.20.103/filter_aft/', //地址
      animalPath: '2020-10-12/马/1602508761.0346599.avi',
      imgPath: '2020-10-12/马/1602508761.0346599.jpg',
      pageSize: 8, // 每页的数据
      currentPage: 1,
      totalCount: this.totalCount
    }
  },

  watch: {
    value: function (currentPage) {
      this.currentPage = 1;
    },
    value1: function (currentPage) {
      this.currentPage = 1;
    }
  },

  methods:{
    goback(){
      this.$router.push('/home')
    },

    handleCurrentChange(val) {
        // 改变默认的页数
        this.currentPage=val
        this.getAnimalsTwice(val,1)
    },

    // 动物视频二次校准
    getAnimalsTwice(){
      // 获取动物种类
      getAnimal().then(res=>{
        this.options = res.data;
        this.options1 = res.data;
      })
      // 获取动物视频信息
      this.startDate = this.value1[0];
      this.endDate = this.value1[1];
      let data={animalType:this.value,startDate:this.startDate,endDate:this.endDate,currPage:this.currentPage,pageSize:this.pageSize};
      console.log(data)
      getAnimalsVideoTwice(data).then(res=>{
        this.totalCount = res.data.totalCount;
        console.log(res.data)
        this.tableData = [];
        this.tableData = res.data.list;
        if(this.tableData.length) this.handle(this.tableData[0]);
      })
    },

    // 修改操作
    handleEdit(index, row) {
      this.isShow = true;
      this.animalId = row.resultId;
      this.value2 = row.speciesName;
      this.input = row.animalsNumber;
      console.log(row)
    },
    // 提交
    success(){
      let data={resultId: this.animalId,animalName: this.value2,animalsNumber: this.input};
      getAnimalsVideoTwiceAlter(data).then(res=>{
        console.log(res.data)
        if(res.data=='success'){
          this.getAnimalsTwice();
          this.isShow = false;
          this.$message({
            message: '提交成功',
            type: 'success'
          });
        }else{
          this.$message.error('提交失败');
        } 
      })  
    },
    
    // 删除操作
    handleDelete(index, row) {
      let data={resultId: row.resultId};
      getAnimalsVideoTwiceDelete(data).then(res=>{
        console.log(res.data)
        if(res.data=='success'){
          this.tableData.splice(index, 1);
          this.isShow = false;
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        }else{
          this.$message.error('删除失败');
        } 
      })  
    },
    // 关闭弹窗
    esc(){
      this.isShow = false;
    },
    // 点击表格
    handle(row) {
      // console.log(row)
      this.animalPath = row.animalPath;
      this.imgPath = row.imgPath;
    },
    cell(row, column, cell, event){
      console.log(row, column, cell, event)

    }
  },
  
  created(){
    this.getAnimalsTwice();
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
    /* background-color: white; */
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
  .first{
    background-color: #3b3a3a;
  }
  .nav ul li:hover{
    background-color: #3b3a3a;
    cursor: pointer;
    border-radius: 50px;
  }
  /* left */
  .left{
    width: 70%;
    height: 700px;
    float: left;
    margin: 2.1% auto;
  }
  .img{
    width: 100%;
    height: 100%;
    /* background: url(../../assets/image/result.png) no-repeat; */
    background-size: 100% 100%;
    border: 10px solid #3b3a3a;
    border-radius: 2px;
    margin: 0 auto;
  }
  .image{
    width: 100%;
    height: 100%;
  }
  .vedio{
    width: 50px;
    height: 50px;
    cursor: pointer;
    position: relative;
    bottom: 58%;
    left: 48%;
  }
  .vedio:hover{
    width: 55px;
    height: 55px;
    cursor: pointer;
  } 
  /* right */
  .right{
    width: 30%;
    height: 80%;
    float: left;
    margin: 2.2% auto;
  }
  /* 种类选择器 */
  .select{
    width: 20%;
    float: left;
    margin-left: 5%;
  }
  /* 时间选择器 */
.el-input__inner {
    width: 50%;
    float: left;
    margin-left: 24.5%;
}
.list{
  width: 95%;
  height: 85%;
  margin-left: 5%;
  margin-top: 55px;
}
.page{
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-icon-edit{
  font-size: 18px;
  color: white;
}
.el-icon-delete{
  font-size: 18px;
  color: white;
}

.alter{
  width: 85%;
  height: 40%;
  position: relative;
  top: -475px;
  left: -124%;
  background-color: white;
  border-radius: 5px;
  padding: 3rem 0;
  z-index: 999;
}
.alter span{
  display: flex;
  align-items: center;
}
.name{
  width: 100%;
  display: flex;
  justify-content: center;
}
.num{
  width: 100%;  
  display: flex;
  justify-content: center;
  padding-top: 2rem;
}
.animalName{
  width: 50%;
}
.animalNum{
  width: 50%;
}
.alter-nav{
  width: 100%;
  height: 22%;
  display: flex;
  justify-content: center;
  margin-top: 10%;
}

.el-pagination {
  text-align: center;
  margin-top: 5px;
}


/deep/.el-table tr {
    height: 68px;
    background-color: black;
    color: white;
}
/deep/.el-table th{
    background-color: black;
    text-align: center;
}
</style>