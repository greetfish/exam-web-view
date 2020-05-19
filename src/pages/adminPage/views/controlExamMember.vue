<template>
  <div class="controlExamMember">
    <el-row>
      <el-col :span="3" :offset="1">
        <h3>考场控制</h3>
      </el-col>
      <el-col :span="19" align="right" style="margin-top:20px">
        <el-button size="small" type="primary" @click="getExcelList()">导出考号</el-button>
        <el-button size="small" type="primary" @click="reFlash()" >刷新</el-button>
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
              <el-button size="mini" @click="endExam(scope.row)" round>结束</el-button>
              <el-button size="mini" @click="redoExam(scope.row)" round>重考</el-button>
              <el-button type="danger" @click="deletepre(scope.row)" icon="el-icon-delete" size="mini" circle></el-button>
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
    reFlash: function () {
      this.reload()
      this.getAllMemberPaper()
    },
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
    endExam: function (row) {
      var _this = this
      this.$alert('结束考生"' + row.member.name + '"的本次考试，并结算分数', '请谨慎操作', {
        confirmButtonText: '继续',
        callback: action => {
          if (action === 'confirm') {
            axios.post('/api_endExamForMemberPaper', qs.stringify({ 'memberPaperId': row.id })).then(function (respone) {
              _this.showSuccessMsg(respone.data.msgContent)
              _this.getAllMemberPaper()
              _this.reload()
            })
          }
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
