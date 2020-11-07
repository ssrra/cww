<template>
  <div class="leave">
    <div class="nav">
      <h1>社区共建-社区共管</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle">
        <i class="el-icon-s-custom"></i>
      </div>
    </div>
    <div class="boxs">
      <p>社区共管</p>
      <el-row class="boxs-hd">
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <span>管护站</span>
            <el-select v-model="value" placeholder="全部">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span style="margin-left='20px'">巡护人员</span>
            <el-select v-model="value" placeholder="全部">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
              <span>时间</span>
              <el-select v-model="value" placeholder="2020-10">
              <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light" style="float:right">
            <el-button type="primary" class="download">
              <i class="el-icon-download"></i>
            </el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="tableData" style="width: 96%" class="el-table">
        <el-table-column prop="station" label="管护站"></el-table-column>
        <el-table-column prop="patrol_personnel" label="巡护人员"></el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="place" label="地点"></el-table-column>
        <el-table-column prop="longitude" label="经度"></el-table-column>
        <el-table-column prop="latitude" label="纬度"></el-table-column>
        <el-table-column prop="weather" label="天气"></el-table-column>
        <el-table-column prop="content_work" label="社区工作内容"></el-table-column>
        <el-table-column prop="information" label="情况说明"></el-table-column>
        <el-table-column label="详情">
          <i class="el-icon-tickets"></i>
        </el-table-column>
        <el-table-column label="定位">
          <i class="el-icon-location-outline"></i>
        </el-table-column>
        <el-table-column label="删除">
          <i class="el-icon-delete"></i>
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
  components: {
    pagenation
  },
  data() {
    return {
      options1: [
        {
          value: '选项1',
          label: 'xxx管护站'
        },
        {
          value: '选项2',
          label: 'xx管护站'
        },
        {
          value: '选项3',
          label: 'x管护站'
        }
      ],
      options2: [
        {
          value: '选项1',
          label: '李明'
        },
        {
          value: '选项2',
          label: '马丽'
        },
        {
          value: '选项3',
          label: '王权'
        }
      ],
      options3: [
        {
          value: '选项1',
          label: '2020-09'
        },
        {
          value: '选项2',
          label: '2020-08'
        },
        {
          value: '选项3',
          label: '2020-07'
        }
      ],
      tableData: [
        {
          station: 'xxx管护站',
          patrol_personnel: '李明',
          date: '2020.11.2',
          place: 'xxx地',
          longitude: 'xxx',
          latitude: 'xxx',
          weather: '晴',
          content_work: '其它',
          information: '无'
        },
        {
          station: 'xxx管护站',
          patrol_personnel: '李明',
          date: '2020.11.2',
          place: 'xxx地',
          longitude: 'xxx',
          latitude: 'xxx',
          weather: '晴',
          content_work: '其它',
          information: '无'
        },
        {
          station: 'xxx管护站',
          patrol_personnel: '马丽',
          date: '2020.11.2',
          place: 'xxx地',
          longitude: 'xxx',
          latitude: 'xxx',
          weather: '晴',
          content_work: '其它',
          information: '无'
        },
        {
          station: 'xxx管护站',
          patrol_personnel: '李明',
          date: '2020.11.2',
          place: 'xxx地',
          longitude: 'xxx',
          latitude: 'xxx',
          weather: '晴',
          content_work: '其它',
          information: '无'
        },
        {
          station: 'x管护站',
          patrol_personnel: '王权',
          date: '2020.11.2',
          place: 'xxx地',
          longitude: 'xxx',
          latitude: 'xxx',
          weather: '晴',
          content_work: '其它',
          information: '无'
        },
        {
          station: 'xxx管护站',
          patrol_personnel: '李明',
          date: '2020.11.2',
          place: 'xxx地',
          longitude: 'xxx',
          latitude: 'xxx',
          weather: '晴',
          content_work: '其它',
          information: '无'
        },
        {
          station: 'xx管护站',
          patrol_personnel: '马丽',
          date: '2020.11.2',
          place: 'xxx地',
          longitude: 'xxx',
          latitude: 'xxx',
          weather: '晴',
          content_work: '其它',
          information: '无'
        }
      ],
      value: '',
      total: 20, // 总条数
      display: 8, // 每页的数据
      current: 1 //当前页数
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

.boxs-hd span {
  line-height: 40px;
  margin-left: 20px;
}

.boxs-hd span,
.el-select {
  float: left;
}

.el-select {
  width: 120px;
  margin: 0 0 0 10px;
}

.download {
  position: relative;
  width: 40px;
  height: 35px;
}

.el-icon-download {
  position: absolute;
  top: 10px;
  right: 13px;
}

.el-table {
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

.el-icon-tickets {
  font-size: 20px;
}

.el-icon-location-outline {
  font-size: 20px;
  color: #2e5ca7;
}

.el-icon-delete {
  font-size: 20px;
  color: #f84d4d;
}
  .el-pagination {
    text-align: center;
    margin-top: -4%;
  }
</style>