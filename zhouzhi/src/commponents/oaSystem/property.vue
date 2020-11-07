<template>
  <div class="leave">
    <div class="nav">
      <h1>固定资产-资产列表</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle">
        <i class="el-icon-s-custom"></i>
      </div>
    </div>
    <div class="boxs">
      <p>资产列表</p>
      <el-row class="boxs-hd">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-button type="primary">
              <i class="el-icon-plus"></i>新增
            </el-button>
            <el-button type="primary">
              操作
              <i class="el-icon-caret-bottom"></i>
            </el-button>
            <el-button>
              打印
              <i class="el-icon-caret-bottom"></i>
            </el-button>
            <el-button>
              导出
              <i class="el-icon-caret-bottom"></i>
            </el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light" style="float:right">
            <div class="search-box">
              <span class="search">搜索：</span>
              <el-input v-model="input" style="float:left"></el-input>
              <i class="el-icon-search"></i>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="tableData" style="width: 96%" class="el-table">
        <el-table-column prop="asset_status" label="资产状态"></el-table-column>
        <el-table-column prop="asset_number" label="资产编码"></el-table-column>
        <el-table-column prop="asset_name" label="资产名称"></el-table-column>
        <el-table-column prop="asset_class" label="资产分类"></el-table-column>
        <el-table-column prop="brand" label="品牌"></el-table-column>
        <el-table-column prop="model" label="型号"></el-table-column>
        <el-table-column prop="count" label="数量"></el-table-column>
        <el-table-column prop="user" label="使用人员"></el-table-column>
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
      input: '',
      tableData: [
        {
          asset_status: '社区名称1',
          asset_number: '001',
          asset_name: 'xxx资产名称',
          asset_class: 'xxx类',
          brand: '127',
          model: '485',
          count: '485',
          user: '李明'
        },
        {
          asset_status: '社区名称2',
          asset_number: '001',
          asset_name: 'xxx资产名称',
          asset_class: 'xxx类',
          brand: '113',
          model: '485',
          count: '485',
          user: '党芳'
        },
        {
          asset_status: '社区名称3',
          asset_number: '001',
          asset_name: 'xxx资产名称',
          asset_class: 'xxx类',
          brand: '108',
          model: '485',
          count: '485',
          user: '玛丽'
        },
        {
          asset_status: '社区名称2',
          asset_number: '001',
          asset_name: 'xxx资产名称',
          asset_class: 'xxx类',
          brand: '121',
          model: '485',
          count: '485',
          user: '王强'
        },
        {
          asset_status: '社区名称1',
          asset_number: '001',
          asset_name: 'xxx资产名称',
          asset_class: 'xxx类',
          brand: '127',
          model: '485',
          count: '485',
          user: '刘丽'
        },
        {
          asset_status: '社区名称3',
          asset_number: '001',
          asset_name: 'xxx资产名称',
          asset_class: 'xxx类',
          brand: '127',
          model: '485',
          count: '485',
          user: '李文'
        },
        {
          asset_status: '社区名称2',
          asset_number: '001',
          asset_name: 'xxx资产名称',
          asset_class: 'xxx类',
          brand: '127',
          model: '485',
          count: '485',
          user: '张雯'
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
  width: 96%;
  height: 6%;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-left: 2%;
  border-bottom: 1px solid gray;
}

.boxs-hd,
.el-table {
  margin: 25px 30px;
}

.search-box {
  position: relative;
}
.search {
  position: absolute;
  top: 10px;
  left: -50px;
}

.el-icon-search {
  position: absolute;
  top: 12px;
  right: 10px;
}

.el-table{
  border: 1px solid #e9e9e9;
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