<template>
  <div class="leave">
    <div class="nav">
      <h1>社区共建-社区情况</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle">
        <i class="el-icon-s-custom"></i>
      </div>
    </div>
    <div class="boxs">
      <p>社区情况</p>
      <!-- 表格区域 -->
      <el-table :data="tableData" style="width: 96%" class="el-table">
        <el-table-column prop="community_name" label="社区名称"></el-table-column>
        <el-table-column prop="district" label="区、县"></el-table-column>
        <el-table-column prop="street" label="街道"></el-table-column>
        <el-table-column prop="office" label="办事处"></el-table-column>
        <el-table-column prop="households" label="居民户数"></el-table-column>
        <el-table-column prop="number_people" label="人数"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary">详情</el-button>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页区域 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="30">
    </el-pagination>
  </div>
</template>

<script>
import pagenation from '../base/pagenation'
export default {
  components:{
    pagenation
  },
  data() {
    return {
      tableData: [
        {
          community_name: '社区名称1',
          district: '周至县',
          street: 'xxx街道',
          office: 'xxx办事处',
          households: '127',
          number_people: '485'
        },
        {
          community_name: '社区名称2',
          district: '周至县',
          street: 'xxx街道',
          office: 'xxx办事处',
          households: '127',
          number_people: '485'
        },
        {
          community_name: '社区名称2',
          district: '周至县',
          street: 'xxx街道',
          office: 'xxx办事处',
          households: '127',
          number_people: '485'
        },
        {
          community_name: '社区名称3',
          district: '周至县',
          street: 'xxx街道',
          office: 'xxx办事处',
          households: '127',
          number_people: '485'
        },
        {
          community_name: '社区名称1',
          district: '周至县',
          street: 'xxx街道',
          office: 'xxx办事处',
          households: '127',
          number_people: '485'
        },
        {
          community_name: '社区名称2',
          district: '周至县',
          street: 'xxx街道',
          office: 'xxx办事处',
          households: '127',
          number_people: '485'
        },
        {
          community_name: '社区名称1',
          district: '周至县',
          street: 'xxx街道',
          office: 'xxx办事处',
          households: '127',
          number_people: '485'
        },
        {
          community_name: '社区名称3',
          district: '周至县',
          street: 'xxx街道',
          office: 'xxx办事处',
          households: '127',
          number_people: '485'
        }
      ],
      total: 20, // 总条数
      display: 8, // 每页的数据
      current: 1, //当前页数
    }
  },
  methods: {
    goback() {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.boxs {
  width: 98%;
  height: 53.5rem;
  background-color: white;
  margin: 0 auto;
  margin-top: 1rem;
  /* position: fixed; */
}
.nav {
  width: 100%;
  height: 3rem;
  background-color: white;
}
.leave h1 {
  width: 50%;
  float: left;
  font-size: 1.14rem;
  line-height: 3rem;
  margin-left: 1.2rem;
}
.el-icon-s-unfold {
  float: right;
  margin-right: 15px;
  font-size: 3rem;
  cursor: pointer;
  color: gray;
}
.el-icon-s-unfold:hover {
  color: black;
}
.el-icon-s-custom {
  float: right;
  font-size: 2rem;
  cursor: pointer;
  color: white;
  margin-right: 3px;
  margin-top: 1px;
}
.nav span {
  float: right;
  line-height: 3rem;
  cursor: pointer;
  margin-right: 20px;
}
.nav a {
  float: right;
  line-height: 3rem;
  margin-right: 20px;
}
.circle {
  float: right;
  width: 40px;
  height: 40px;
  border: 1px solid #4682b4;
  border-radius: 100px;
  margin-top: 4px;
  background-color: #4682b4;
  margin-right: 10px;
}
.boxs p {
  position: relative;
  width: 96%;
  height: 6%;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-left: 2%;
  border-bottom: 1px solid gray;
}

.el-table {
  border: 1px solid #e9e9e9;
  margin: 25px 30px;
}

.el-table >>> th {
  background-color: #f6f6f6;
  border-left: 1px solid #e9e9e9;
  text-align: center;
}

.el-table >>> td {
  height: 80px;
  text-align: center;
}

  .el-pagination {
    text-align: center;
    margin-top: -4%;
  }
</style>