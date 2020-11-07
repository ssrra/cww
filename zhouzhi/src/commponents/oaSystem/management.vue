<template>
  <div class="leave">
    <div class="nav">
      <h1>固定资产-资产申请</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle">
        <i class="el-icon-s-custom"></i>
      </div>
    </div>
    <div class="boxs">
      <p>资产申请</p>
      <el-button type="primary" class="apply" style="float:right">申请</el-button>
      <!-- 表格区域 -->
      <el-table :data="tableData" style="width: 96%" class="el-table">
        <el-table-column prop="oddnumbers" label="领用单号"></el-table-column>
        <el-table-column prop="orderapply" label="申请人"></el-table-column>
        <el-table-column prop="applytime" label="申请时间"></el-table-column>
        <el-table-column prop="user" label="领用人"></el-table-column>
        <el-table-column prop="asset_name" label="资产名称"></el-table-column>
        <el-table-column prop="brand" label="品牌"></el-table-column>
        <el-table-column prop="model" label="型号"></el-table-column>
        <el-table-column prop="asset_code" label="资产编码"></el-table-column>
        <el-table-column prop="serial_number" label="设备序列号"></el-table-column>
        <el-table-column prop="status" label="审批状态" class="status">
          <template slot-scope="scope">
             <el-link type="success" v-if="scope.row.status">通过</el-link>
             <el-link type="danger" v-else>驳回</el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary">审批</el-button>
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
          oddnumbers: 'xxx单号',
          orderapply: '李明',
          applytime: '2020.11.2',
          user: '张丽',
          asset_name: 'xxx',
          brand: 'xxx',
          model: '127',
          asset_code: '485',
          serial_number: '485',
          status: 1
        },
        {
          oddnumbers: 'xxx单号',
          orderapply: '马丽',
          applytime: '2020.11.2',
          user: '张丽',
          asset_name: 'xxx',
          brand: 'xxx',
          model: '127',
          asset_code: '485',
          serial_number: '485',
          status: 1
        },
        {
          oddnumbers: 'xxx单号',
          orderapply: '张文武',
          applytime: '2020.11.2',
          user: '张丽',
          asset_name: 'xxx',
          brand: 'xxx',
          model: '127',
          asset_code: '485',
          serial_number: '485',
          status: 1
        },
        {
          oddnumbers: 'xxx单号',
          orderapply: '王城',
          applytime: '2020.11.2',
          user: '张丽',
          asset_name: 'xxx',
          brand: 'xxx',
          model: '127',
          asset_code: '485',
          serial_number: '485',
          status: 0
        },
        {
          oddnumbers: 'xxx单号',
          orderapply: '李明',
          applytime: '2020.11.2',
          user: '张丽',
          asset_name: 'xxx',
          brand: 'xxx',
          model: '127',
          asset_code: '485',
          serial_number: '485',
          status: 1
        },
        {
          oddnumbers: 'xxx单号',
          orderapply: '李明',
          applytime: '2020.11.2',
          user: '张丽',
          asset_name: 'xxx',
          brand: 'xxx',
          model: '127',
          asset_code: '485',
          serial_number: '485',
          status: 1
        },
        {
          oddnumbers: 'xxx单号',
          orderapply: '李明',
          applytime: '2020.11.2',
          user: '张丽',
          asset_name: 'xxx',
          brand: 'xxx',
          model: '127',
          asset_code: '485',
          serial_number: '485',
          status: 1
        },
        {
          oddnumbers: 'xxx单号',
          orderapply: '李明',
          applytime: '2020.11.2',
          user: '张丽',
          asset_name: 'xxx',
          brand: 'xxx',
          model: '127',
          asset_code: '485',
          serial_number: '485',
          status: 1
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

.boxs .apply {
  position: absolute;
  top: 70px;
  right: 50px;
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