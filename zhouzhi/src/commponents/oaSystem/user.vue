<template>
  <div class="attendance">
       <div class="nav">
      <h1>权限管理-用户管理</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div id="boxs">
      
      <p>用户管理</p>
      <div class="choose">
        
        归属部门：<el-select class="chooses" v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        登录名：<el-input class="input2" v-model="input" ></el-input>
        姓名：<el-input class="input2" v-model="input" ></el-input>
        <el-button class="block" type="primary" >查询</el-button>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%;height:633px"
          stripe
          :default-sort = "{prop: 'date', order: 'descending'}">
          <el-table-column
            prop="management"
            label="所属管理站">
          </el-table-column>

          <el-table-column
            prop="department"
            label="归属部门">
          </el-table-column>

          <el-table-column
            prop="userLogin"
            label="登录名">
          </el-table-column>
          
          <el-table-column
            prop="userNmae"
            label="姓名">
          </el-table-column>

          <el-table-column
            prop="phone"
            label="电话">
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button  @click="handleClick(scope.row)" type="text" size="small" ><i class="el-icon-edit" @click="getOpen()"></i></el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small"><i class="el-icon-delete"></i></el-button>
            </template>
          </el-table-column>
          
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="30">
        </el-pagination>
      </div>

      <div id="pop-up" v-show="isShow">
          <h3>用户修改</h3>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="管理站">
              <el-select v-model="form.region" placeholder="请选择所属管理站">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="工号">
              <el-input class="input" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input class="input" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="登录名">
              <el-input class="input" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input class="input" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input class="input" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input class="input" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input class="input" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="手机">
              <el-input class="input" v-model="form.name"></el-input>
            </el-form-item>
            
            <el-form-item class="input" label="用户角色">
              <el-radio-group v-model="form.resource">
                <el-radio label="科员"></el-radio>
                <el-radio label="管理员"></el-radio>
                <el-radio label="科长"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item class="input" label="备注">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              
              <el-button type="primary" @click="onSubmit">确定</el-button>
              <el-button @click="getClose()">取消</el-button>
            </el-form-item>
          </el-form>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: '2020-11-02',
      isShow: false,
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        tableData: [
        {
          userId: '001号',
          management: 'xx管理站',
          userNmae: '李明',
          department: '财务部',
          personKind: '在职人员',
          sex: '男',
          startDate: '1990-02-23',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944',
          userLogin: 'zhouzhi'
        }, {
          userId: '001号',
          management: 'xx管理站',
          userNmae: '李明',
          department: '财务部',
          personKind: '在职人员',
          sex: '男',
          startDate: '1990-02-23',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944',
          userLogin: 'zhouzhi'
        }, {
          userId: '001号',
          management: 'xx管理站',
          userNmae: '李明',
          department: '财务部',
          personKind: '在职人员',
          sex: '男',
          startDate: '1990-02-23',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944',
          userLogin: 'zhouzhi'
        }, {
          userId: '001号',
          management: 'xx管理站',
          userNmae: '李明',
          department: '财务部',
          personKind: '在职人员',
          sex: '男',
          startDate: '1990-02-23',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944',
          userLogin: 'zhouzhi'
        }, {
          userId: '001号',
          management: 'xx管理站',
          userNmae: '李明',
          department: '财务部',
          personKind: '在职人员',
          sex: '男',
          startDate: '1990-02-23',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944',
          userLogin: 'zhouzhi'
        }, {
          userId: '001号',
          management: 'xx管理站',
          userNmae: '李明',
          department: '财务部',
          personKind: '在职人员',
          sex: '男',
          startDate: '1990-02-23',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944',
          userLogin: 'zhouzhi'
        }, {
          userId: '001号',
          management: 'xx管理站',
          userNmae: '李明',
          department: '财务部',
          personKind: '在职人员',
          sex: '男',
          startDate: '1990-02-23',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944',
          userLogin: 'zhouzhi'
        }, {
          userId: '001号',
          management: 'xx管理站',
          userNmae: '李明',
          department: '财务部',
          personKind: '在职人员',
          sex: '男',
          startDate: '1990-02-23',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944',
          userLogin: 'zhouzhi'
        }, {
          userId: '001号',
          management: 'xx管理站',
          userNmae: '李明',
          department: '财务部',
          personKind: '在职人员',
          sex: '男',
          startDate: '1990-02-23',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944',
          userLogin: 'zhouzhi'
        }]
    };
  },

  methods:{
    goback(){
      this.$router.push('/home')
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    formatter(row, column) {
      return row.address;
    },
    onSubmit() {
      console.log('submit!');
    },
    getOpen(){
      this.isShow = true;
    },
    getClose(){
      this.isShow = false;
    }
  }

}
</script>

<style scoped>
  #boxs{
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
  #boxs p{
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
    margin-right: 4%;
  }
  .el-pagination {
    text-align: center;
    margin-top: 1%;
  }
  #pop-up{
    width: 40%;
    height: 90%;
    background-color: white;
    position: absolute;
    top: 5%;
    left: 35%;
    border: 5px solid #eeeeee;
    z-index: 999;
  }
  #pop-up h3{
    display: flex;
    align-items: center;
    font-weight: normal;
    height: 8%;
    padding-left: 2%;
  }
  .input{
    width: 96%;
  }
  .input2{
    width: 10%;
    margin-right: 2%;
  }
  .el-icon-edit{
    font-size: 20px;
  }
  .el-icon-delete{
    font-size: 20px;
    color: red;
  }
  .choose{
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    padding-left: 2%;
  }
  .chooses{
    margin-right: 2%;
  }
</style>