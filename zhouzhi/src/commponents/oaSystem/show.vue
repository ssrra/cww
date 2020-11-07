<template>
  <div class="attendance">
       <div class="nav">
      <h1>社区共建-审批展示</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div id="boxs">
      
      <p>审批展示</p>

      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%;height:690px"
          stripe
          :default-sort = "{prop: 'date', order: 'descending'}"
          >
          <el-table-column
            prop="userId"
            label="项目名称">
          </el-table-column>

          <el-table-column
            prop="userNmae"
            label="负责人">
          </el-table-column>

          <el-table-column
            prop="department"
            label="施工单位">
          </el-table-column>
          
          <el-table-column
            prop="personKind"
            label="单位资源">
          </el-table-column>

          <el-table-column
            prop="sex"
            label="经费来源">
          </el-table-column>

          <el-table-column
            prop="startDate"
            label="管理形式">
          </el-table-column>
          
          <el-table-column label="操作">
            <el-button type="primary">审批</el-button>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="30">
        </el-pagination>
      </div>

      <div id="pop-up" v-show="isShow">
          <h3>基本情况登记表</h3>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名">
              <el-input class="input" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-input class="input" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item class="input" label="民族">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item class="input" label="出生日期">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            
            <el-form-item class="input" label="婚姻状况">
              <el-radio-group v-model="form.resource">
                <el-radio label="已婚"></el-radio>
                <el-radio label="未婚"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item class="input" label="社会关系">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
              <el-form-item class="input" label="工作经历">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
              <el-form-item class="input" label="学习经历">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              
              <el-button type="primary" @click="onSubmit">提交</el-button>
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
          userId: '项目1号',
          userNmae: '张宏',
          department: 'xxx单位',
          personKind: 'xxxxxx',
          sex: 'xxxxxx',
          startDate: '自然资源共管',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944'
        }, {
          userId: '项目1号',
          userNmae: '张宏',
          department: 'xxx单位',
          personKind: 'xxxxxx',
          sex: 'xxxxxx',
          startDate: '自然资源共管',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944'
        }, {
          userId: '项目1号',
          userNmae: '张宏',
          department: 'xxx单位',
          personKind: 'xxxxxx',
          sex: 'xxxxxx',
          startDate: '自然资源共管',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944'
        }, {
          userId: '项目1号',
          userNmae: '张宏',
          department: 'xxx单位',
          personKind: 'xxxxxx',
          sex: 'xxxxxx',
          startDate: '自然资源共管',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944'
        }, {
          userId: '项目1号',
          userNmae: '张宏',
          department: 'xxx单位',
          personKind: 'xxxxxx',
          sex: 'xxxxxx',
          startDate: '自然资源共管',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944'
        }, {
          userId: '项目1号',
          userNmae: '张宏',
          department: 'xxx单位',
          personKind: 'xxxxxx',
          sex: 'xxxxxx',
          startDate: '自然资源共管',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944'
        }, {
          userId: '项目1号',
          userNmae: '张宏',
          department: 'xxx单位',
          personKind: 'xxxxxx',
          sex: 'xxxxxx',
          startDate: '自然资源共管',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944'
        }, {
          userId: '项目1号',
          userNmae: '张宏',
          department: 'xxx单位',
          personKind: 'xxxxxx',
          sex: 'xxxxxx',
          startDate: '自然资源共管',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944'
        }, {
          userId: '项目1号',
          userNmae: '张宏',
          department: 'xxx单位',
          personKind: 'xxxxxx',
          sex: 'xxxxxx',
          startDate: '自然资源共管',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944'
        }, {
          userId: '项目1号',
          userNmae: '张宏',
          department: 'xxx单位',
          personKind: 'xxxxxx',
          sex: 'xxxxxx',
          startDate: '自然资源共管',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944'
        }, {
          userId: '项目1号',
          userNmae: '张宏',
          department: 'xxx单位',
          personKind: 'xxxxxx',
          sex: 'xxxxxx',
          startDate: '自然资源共管',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944'
        }, {
          userId: '项目1号',
          userNmae: '张宏',
          department: 'xxx单位',
          personKind: 'xxxxxx',
          sex: 'xxxxxx',
          startDate: '自然资源共管',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944'
        }, {
          userId: '项目1号',
          userNmae: '张宏',
          department: 'xxx单位',
          personKind: 'xxxxxx',
          sex: 'xxxxxx',
          startDate: '自然资源共管',
          age: '30',
          nation: '汉族',
          place: '陕西',
          post: '科员',
          marriage: '已婚',
          phone: '17864563944'
        }]
    };
  },

  methods:{
    goback(){
      this.$router.push('/home')
    },
    formatter(row, column) {
      return row.address;
    },
    onSubmit() {
      console.log('submit!');
    },
    getOpen(){
      // this.isShow = true;
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
    margin: 50px auto;
  }
  .block{
    float: right;
    margin-right: 4%;
    margin-top: 0.5%;
  }
  .el-pagination {
    text-align: center;
    margin-top: 1%;
  }
  #pop-up{
    width: 65%;
    height: 74%;
    background-color: white;
    position: absolute;
    top: 15%;
    left: 22%;
    border: 5px solid #eeeeee;
  }
  #pop-up h3{
    display: flex;
    justify-content: center;
    font-weight: normal;
    margin-top: 2%;
  }
  .input{
    width: 96%;
  }
</style>