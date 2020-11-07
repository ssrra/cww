<template>
  <div class="result">
      <div class="nav">
      <h1>红外相机-识别结果</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div class="box">
      <div class="solid"> <span>校准结果</span> </div>
      <div class="left">
        <div class="img"></div>
      </div>
      <div class="right">

          <!-- 种类选择器 -->
          <el-select class="select" v-model="value" placeholder="种类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <!-- 时间选择器 -->
          <div class="block">
            <el-date-picker
              class="timechoose"
              v-model="value1"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>

          <div class="list">
            <el-table
              v-loading="loading"
              :data="tableData"
              height="630"
              border
              style="width: 100%">
              <el-table-column
                prop="name"
                label="物种名称"
                width="120">
              </el-table-column>
              <el-table-column
                prop="id"
                label="视频编号"
                width="200">
              </el-table-column>
               <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                   <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">移除</el-button>
                  </template>
                </el-table-column>
            </el-table>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      options: [{
          value: '1',
          label: '松鼠'
        }, {
          value: '2',
          label: '老鼠'
        }, {
          value: '3',
          label: '猴子'
        }, {
          value: '4',
          label: '老虎'
        }, {
          value: '5',
          label: '大象'
        }],
        value:"1",
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',// 获取时间
        tableData: [{
          name: '松鼠',
          id: '001-2020-09-25.mp4'
        }, {
          name: '松鼠',
          id: '001-2020-09-25.mp4'
        }, {
          name: '松鼠',
          id: '001-2020-09-25.mp4'
        }, {
          name: '松鼠',
          id: '001-2020-09-25.mp4'
        }, {
          name: '松鼠',
          id: '001-2020-09-25.mp4'
        }, {
          name: '松鼠',
          id: '001-2020-09-25.mp4'
        }, {
          name: '松鼠',
          id: '001-2020-09-25.mp4'
        }, {
          name: '松鼠',
          id: '001-2020-09-25.mp4'
        }, {
          name: '松鼠',
          id: '001-2020-09-25.mp4'
        }, {
          name: '松鼠',
          id: '001-2020-09-25.mp4'
        }, {
          name: '松鼠',
          id: '001-2020-09-25.mp4'
        }, {
          name: '松鼠',
          id: '001-2020-09-25.mp4'
        }, {
          name: '松鼠',
          id: '001-2020-09-25.mp4'
        }, {
          name: '松鼠',
          id: '001-2020-09-25.mp4'
        }],
        loading: false
    }
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // handleDelete(index, row) {
    //     row.splice(index, 1);
    // }
  }
}
</script>

<style scoped>
  body {
    margin: 0;
  }
  .box{
    width: 98%;
    height: 53.5rem;
    background-color:white;
    margin: 0 auto;
    margin-top: 1rem;
  }
  .nav{
    width: 100%;
    height: 3rem;
    background-color: white;
  }
  .result h1{
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
  .solid{
   width: 98%;
   border-bottom: 2px solid white; 
   position: relative;
   top: 42px;
   left: 17px;
  }
  .solid span{
    display: block;
    font-size: 18px;
    margin-left: 10px;
    padding-bottom: 5px;
  }
    /* left */
  .left{
    width: 65%;
    height: 80%;
    float: left;
    margin: 3.5% auto;
  }
  .img{
    width: 94.8%;
    height: 100%;
    background: url(../../assets/image/result.png) no-repeat;
    background-size: 100% 100%;
    border: 5px solid black;
    border-radius: 2px;
    margin: 0 auto;
  }

  /* right */
  .right{
    width: 34%;
    height: 80%;
    float: left;
    margin: 3.5% auto;
  }
  /* 种类选择器 */
  .select{
    width: 20%;
    float: left;
    margin-left: 13%;
  }
  /* 时间选择器 */
.el-input__inner {
    width: 38%;
    margin-left: 22%;
}

.list{
  width: 80%;
  height: 85%;
  margin-left: 13%;
  margin-top: 10px;
}
.page{
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>