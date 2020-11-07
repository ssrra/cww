<template>
  <div class="screening">
      <div class="nav">
        <h1>巡护监测-巡护历史</h1>
        <i class="el-icon-s-unfold" @click="goback()"></i>
        <a>|</a>
        <span>管理员</span>
        <div class="circle"><i class="el-icon-s-custom" ></i></div>
      </div>
      <div class="box">
      <div class="videobox">
      <h4>历史数据</h4>
      <div class="videoboxs">
        <div class="nav2">

          <!-- 时间选择器 -->
            <el-date-picker
              class="timechoose"
              v-model="value1"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>

          <!-- 保护站 -->
          <el-select class="kind" v-model="value" placeholder="保护站" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <!-- 模板表单 -->
          <el-select class="kind1" v-model="value" placeholder="模板表单">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <!-- 自定义表单 -->
          <el-select class="kind1" v-model="value" placeholder="自定义表单">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <!-- 工作人员 -->
          <el-select class="kind1" v-model="value" placeholder="工作人员">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!-- 历史数据列表 -->
        <div class="list">
            <el-table
              v-loading="loading"
              :data="tableData"
              height="619"
              border
              style="width: 100%">
              <el-table-column
                prop="startTime"
                label="工作开始"
                width="180">
              </el-table-column>
              <el-table-column
                prop="lastTime"
                label="工作结束"
                width="180">
              </el-table-column>
              <el-table-column
                prop="person"
                label="工作人员"
                width="180">
              </el-table-column>
              <el-table-column
                prop="distance"
                label="调查距离"
                width="180">
              </el-table-column>
              <el-table-column
                prop="workTime"
                label="工作时长"
                width="180">
              </el-table-column>
              <el-table-column
                prop="data"
                label="采集数据"
                width="180">
              </el-table-column>
              <el-table-column
                prop="img"
                label="采集图片"
                width="180">
              </el-table-column>
               <el-table-column
                  fixed="right"
                  label="操作"
                  width="120">
                   <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  </template>
                </el-table-column>

               <el-table-column
                  fixed="right"
                  label="操作"
                  width="120">
                   <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">审核</el-button>
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, tableData)"
                      type="text"
                      size="small">
                      <i class="el-icon-delete"></i>
                    </el-button>
                  </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="2000">
          </el-pagination>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return {
      options: [{
          value: 1,
          label: '新庄集管理站'
        }, {
          value: 2,
          label: '红城水管理站'
        }, {
          value: 3,
          label: '沙泉管理站'
        }, {
          value: 4,
          label: '管理局'
      }],
      value: '',
      value1: '',
      tableData: [{
          startTime: '2020-10-09 09:41',
          lastTime: '2020-10-09 11:27',
          person: '蔡天洋',
          distance: '2.46Km',
          workTime: '1小时46分钟10秒',
          data: '1',
          img: '5'
        }, {
          startTime: '2020-10-09 09:41',
          lastTime: '2020-10-09 11:27',
          person: '田君山',
          distance: '3.46Km',
          workTime: '2小时40分钟16秒',
          data: '5',
          img: '6'
        }, {
          startTime: '2020-10-09 09:41',
          lastTime: '2020-10-09 11:27',
          person: '田君山',
          distance: '2.82Km',
          workTime: '2小时03分钟23秒',
          data: '3',
          img: '4'
        }, {
          startTime: '2020-10-09 09:41',
          lastTime: '2020-10-09 11:27',
          person: '蔡天洋',
          distance: '2.56Km',
          workTime: '1小时45分钟11秒',
          data: '1',
          img: '6'
        }, {
          startTime: '2020-10-09 09:41',
          lastTime: '2020-10-09 11:27',
          person: '吴东明',
          distance: '3.56Km',
          workTime: '1小时45分钟19秒',
          data: '5',
          img: '3'
        }, {
          startTime: '2020-10-09 09:41',
          lastTime: '2020-10-09 11:27',
          person: '王泽宇',
          distance: '3.89Km',
          workTime: '1小时56分钟56秒',
          data: '6',
          img: '9'
        }, {
          startTime: '2020-10-09 09:41',
          lastTime: '2020-10-09 11:27',
          person: '蔡天洋',
          distance: '1.56Km',
          workTime: '1小时12分钟02秒',
          data: '2',
          img: '3'
        }, {
          startTime: '2020-10-09 09:41',
          lastTime: '2020-10-09 11:27',
          person: '杨连喜',
          distance: '2.02Km',
          workTime: '1小时56分钟35秒',
          data: '1',
          img: '2'
        }, {
          startTime: '2020-10-09 09:41',
          lastTime: '2020-10-09 11:27',
          person: '蔡天洋',
          distance: '3.26Km',
          workTime: '1小时35分钟54秒',
          data: '5',
          img: '6'
        }, {
          startTime: '2020-10-09 09:41',
          lastTime: '2020-10-09 11:27',
          person: '吴明东',
          distance: '3.54Km',
          workTime: '1小时26分钟25秒',
          data: '5',
          img: '8'
        }, ],
        loading: false
    }
  },
  methods:{
    goback(){
      this.$router.push('/home')
    }

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
    background: rgba(128, 128, 128, 0.1);
    margin: 25px auto;
  }
  .nav2{
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
  }
  .el-pagination {
    padding: 0;
    text-align: center;
    margin-top: 50px;
  }
.datachoose{
  width: 70%;
  margin-left: 15%;
}
.kind{
  width: 8%;
  margin-left: 1%;
}
.kind1{
  width: 8%;
  margin-left: 1%;
}
.timechoose{
  width: 15%;
  margin-left: 4%;
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
  .el-button--success {
    margin-left: -220%;
  }
  .content{
    height: 620px;
  }
  .list{
    width: 92%;
    height: 88%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 auto;
  }
  .list2{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
    bottom:620px;
  }
  .list .list_image{
    width: 20%;
    height: 200px;
    margin-left: 4%;
  }
  .list .image{
    width: 100%;
    height: 200px;
    border-radius: 8px;
    border: 2px solid white;
  }
  .xiazai{
    width: 20%;
    height: 200px;
    margin-left: 4%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .vedio{
    width: 40px;
    height: 40px;
    cursor: pointer;

  }
  .vedio:hover{
    width: 45px;
    height: 45px;
    cursor: pointer;
  } 
.page{
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-pagination {
    padding: 0;
    text-align: center;
    margin-top: 0;
}
.el-icon-delete{
  color: red;
  margin-left: 20px;
}
.shenghe{
  margin-left: 20px;
}
</style>