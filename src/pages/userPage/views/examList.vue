<template>
    <div class="examList">
      <el-row>
          <el-col :span="8" :offset="2" align="left">
            <h2>待考核试卷列表</h2>
          </el-col>
          <el-col :span="12" align="right" style="margin-top:20px;">
            <a>欢迎您 {{ memberName }} 同志！ </a>
            <router-link class="link topIcon" to="/">退出登录</router-link>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="2">
          <el-divider></el-divider>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :offset="3" align="left">
          <el-table :data="memberPaperList" stripe style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="paper.paperName" label="待考试卷名" ></el-table-column>
            <el-table-column prop="paper.generateTime" label="创建时间" ></el-table-column>
            <el-table-column prop="paper.course.courseName" label="科目" ></el-table-column>
            <el-table-column prop="paper.totalScore" label="总分" ></el-table-column>
            <el-table-column prop="paper.timeLimit" label="时间(min)" ></el-table-column>
            <el-table-column prop="" label="" width="240" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="begin(scope.row)" round>进行考试</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      memberName: '',
      memberPaperList: []
    }
  },
  created: function () {
    this.getRouterData()
  },
  methods: {
    getRouterData: function () {
      this.memberPaperList = this.$route.query.memberPaperList
      this.memberName = this.$route.query.memberName
    },
    showErrorMsg: function (msg) {
      this.$message({
        message: msg,
        type: 'error'
      })
    },
    quit: function () {
      this.$router.push({
        path: '/'
      })
    },
    begin: function (row) {
      var _this = this
      axios.post('/user_startExaming', qs.stringify({ 'memberPaperId': row.id })).then(function (respone) {
        _this.$router.push({
          path: '/examing',
          query: {
            questionList: respone.data,
            memberName: _this.memberName
          }
        })
      })
    }
  }
}
</script>

<style type="text/css">
  html,body,#app{
    padding: 0px;
    margin: 0px;
    height: 100%;
    min-height: 700px;
    min-width: 1200px;
    background-image: url('');
  }
  h2{
    color: rgb(107, 107, 107);
    font-size: 18px;
  }
</style>
