<template>
  <div class="memberArchive">
    <el-row>
      <el-col :span="3" :offset="1">
        <h3>参考人员列表</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="1">
        <el-divider></el-divider>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="3" align="left">
        <el-table :key="Math.random()" :data="memberPaperList" stripe style="width: 100%;margin-top:50px">
          <el-table-column :key="Math.random()" type="index" width="50"></el-table-column>
          <el-table-column :key="Math.random()" prop="member.name" label="姓名" ></el-table-column>
          <el-table-column :key="Math.random()" prop="member.examNumber" label="考号" ></el-table-column>
          <el-table-column :key="Math.random()" prop="score" label="成绩" ></el-table-column>
          <el-table-column :key="Math.random()" prop="" label="" width="240" align="center">
            <template slot-scope="scope" >
              <el-button size="mini" @click="readMemberPaper(scope.row)" round>阅卷</el-button>
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
  inject: ['reload'],
  data () {
    return {
      paperId: '',
      memberPaperList: [],
      paperName: ''
    }
  },
  created: function () {
    this.getRouterData()
    this.getAllMemberPaper()
  },
  methods: {
    getRouterData: function () {
      this.paperId = this.$route.query.paperId
      this.paperName = this.$route.query.paperName
    },
    getAllMemberPaper: function () {
      var _this = this
      axios.post('/api_getAllMemberPaper', qs.stringify({ 'paperId': _this.paperId })).then(function (respone) {
        _this.memberPaperList = respone.data
      })
    },
    getExcelList: function () {
      var _this = this
      axios.post('/api_downloadMemberPaperList', qs.stringify({ 'paperId': _this.paperId }), { responseType: 'blob' }).then(
        res => {
          let blob = new Blob([res.data], {
            type: 'application/vnd.ms-excel'
          })
          let url = window.URL.createObjectURL(blob)
          let a = document.createElement('a')
          a.href = url
          a.download = '【考号列表】' + _this.paperName + '.xls'
          a.click()
          window.URL.revokeObjectURL(url)
        }
      )
    },
    readMemberPaper: function (row) {
      var _this = this
      _this.$router.push({
        path: '/memberReview',
        query: {
          paperId: _this.paperId,
          paperName: _this.paperName,
          memberPaperId: row.id,
          memberName: row.member.name
        }
      })
    },
    redoExam: function (row) {
      var _this = this
      this.$alert('允许考生"' + row.member.name + '"重新参加本次考试，当前得分将作废', '请谨慎操作', {
        confirmButtonText: '继续',
        callback: action => {
          if (action === 'confirm') {
            axios.post('/api_redoExamForMemberPaper', qs.stringify({ 'memberPaperId': row.id })).then(function (respone) {
              _this.showSuccessMsg(respone.data.msgContent)
              _this.getAllMemberPaper()
              _this.reload()
            })
          }
        }
      })
    },
    deletepre: function (row) {
      var _this = this
      this.$alert('移除此考生"' + row.member.name + '"本次考试试卷，且无成绩记录', '请谨慎操作', {
        confirmButtonText: '继续',
        callback: action => {
          if (action === 'confirm') {
            axios.post('/api_removeMemberPaper', qs.stringify({ 'memberPaperId': row.id })).then(function (respone) {
              _this.showSuccessMsg(respone.data.msgContent)
              _this.getAllMemberPaper()
            })
          }
        }
      })
    },
    showSuccessMsg: function (msg) {
      this.$message({
        message: msg,
        type: 'success'
      })
    },
    showErrorMsg: function (msg) {
      this.$message({
        message: msg,
        type: 'error'
      })
    }
  }
}
</script>
