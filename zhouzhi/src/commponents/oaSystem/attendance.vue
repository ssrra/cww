<template>
  <div class="attendance">
       <div class="nav">
      <h1>考勤管理-考勤统计</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div class="boxs">
      
      <p>考勤统计</p>

      <div class="block">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          @change="getData()">
        </el-date-picker>
      </div>

      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%;height:680px"
          stripe
          :default-sort = "{prop: 'date', order: 'descending'}"
          >
          <el-table-column
            prop="user.userName"
            label="员工"
            sortable>
          </el-table-column>

          <el-table-column
            prop="user.userSex"
            label="性别"
            sortable>
          </el-table-column>

          <el-table-column
            prop="signTime"
            label="签到日期"
            sortable>
            <template slot-scope="scope">
              {{scope.row.signTime | formatDate}}
            </template>
          </el-table-column>
          
          <el-table-column
            prop="startTime"
            label="上班打卡时间"
            sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.startTime == null">未打卡</span>
              <span v-else>{{scope.row.startTime | formatDateTime}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="endTime"
            label="下班打卡时间"
            sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.endTime == null">未打卡</span>
              <span v-else>{{scope.row.endTime | formatDateTime}}</span>
            </template>
          </el-table-column>
  
          <el-table-column
            label="打卡状态"
            sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.signStatus == 0">正常</span>
              <span v-else>缺卡</span>
            </template>
          </el-table-column>
          
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="10">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {getDataClocking} from '../../api/nanniwan.js'
export default {
  data () {
    return {
     value1: '2020-11-02',
     tableData: [],
     signTime: ''
    };
  },

  methods:{
    goback(){
      this.$router.push('/home')
    },
    formatter(row, column) {
      return row.address;
    },
    getData(){
        this.tableData = [];
        let data={dayTime:this.value1};
        getDataClocking(data).then(res=>{
          console.log(res.data.data)
          this.tableData = res.data.data;

          // for(let i = 0; i<res.data.data.length; i++){
          //   this.signTime = res.data.data[i].signTime;
          //   console.log(this.signTime)
          // }
        })
    }
  },

  filters: {
    formatDate: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d;
    },
    formatDateTime: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return h + ':' + m + ':' + s;
    }
  },

  mounted(){
    this.getData();
  }

}
</script>

<style scoped>
  .boxs{
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
  .boxs p{
    width: 96%;
    height: 6%;
    font-size: 20px;
    display: flex;
    align-items: center;
    margin-left: 2%;
    border-bottom: 1px solid gray;
  }
  .table{
    width: 96%;
    height: 84%;
    margin: 20px auto;
  }
  .block{
    float: right;
    margin-right: 2%;
    margin-top: 1%;
  }
  .el-pagination {
    text-align: center;
    margin-top: 1%;
  }
</style>