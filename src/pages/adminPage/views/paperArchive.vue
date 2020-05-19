<template>
  <div class="paperArchive">
    <el-row>
      <el-col :span="22" :offset="1">
        <h3>已归档试卷列表</h3>
        <el-divider></el-divider>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="3" align="left">
      <el-table :data="paperList" stripe style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="paperName" label="试卷名" ></el-table-column>
        <el-table-column prop="generateTime" label="创建时间" ></el-table-column>
        <el-table-column prop="course.courseName" label="科目" ></el-table-column>
        <el-table-column prop="memberGroup.groupName" label="人员组" ></el-table-column>
        <el-table-column prop="memberGroup.countMember" label="人数" ></el-table-column>
        <el-table-column prop="" label="" width="240" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="routerTo(scope.row)" round>成绩查看</el-button>
            <el-tooltip class="item" effect="dark" content="导出Excel成绩报表" placement="bottom">
              <el-button size="mini" @click="getScoreExcelList(scope.row)" round>导出成绩</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除试卷" placement="bottom">
              <el-button type="danger" @click="deletePaper(scope.row)" icon="el-icon-delete" size="mini" circle></el-button>
            </el-tooltip>
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
      paperList: []
    }
  },
  created: function () {
    this.getAllPaper()
  },
  methods: {
    routerTo: function (row) {
      this.$router.push({
        path: '/memberArchive',
        query: {
          paperId: row.id,
          paperName: row.paperName
        }
      })
    },
    getAllPaper: function () {
      var _this = this
      axios.post('/api_getAllPaper', qs.stringify({ 'paperState': '3' })).then(function (respone) {
        _this.paperList = respone.data
      })
    },
    getExcelList: function (row) {
      axios.post('/api_downloadMemberPaperList', qs.stringify({ 'paperId': row.id }), { responseType: 'blob' }).then(
        res => {
          let blob = new Blob([res.data], {
            type: 'application/vnd.ms-excel'
          })
          let url = window.URL.createObjectURL(blob)
          let a = document.createElement('a')
          a.href = url
          a.download = '【考号列表】' + row.paperName + '.xls'
          a.click()
          window.URL.revokeObjectURL(url)
        }
      )
    },
    getScoreExcelList: function (row) {
      axios.post('/api_downloadScore', qs.stringify({ 'paperId': row.id }), { responseType: 'blob' }).then(
        res => {
          let blob = new Blob([res.data], {
            type: 'application/vnd.ms-excel'
          })
          let url = window.URL.createObjectURL(blob)
          let a = document.createElement('a')
          a.href = url
          a.download = '【成绩报表】' + row.paperName + '.xls'
          a.click()
          window.URL.revokeObjectURL(url)
        }
      )
    },
    endExam: function (row) {
      var _this = this
      this.$alert('结束本次考试并结算分数（正在考试的人员将被强制收卷）', '请谨慎操作', {
        confirmButtonText: '继续',
        callback: action => {
          if (action === 'confirm') {
            axios.post('/api_endExamForPaper', qs.stringify({ 'paperId': row.id })).then(function (respone) {
              _this.showSuccessMsg(respone.data.msgContent)
              _this.getAllMemberPaper()
              _this.reload()
            })
          }
        }
      })
    },
    documentPaper: function (row) {
      var _this = this
      this.$alert('归档试卷，本次考核将归入档案，只提供查询功能', '请谨慎操作', {
        confirmButtonText: '继续',
        callback: action => {
          if (action === 'confirm') {
            axios.post('/api_documentPaper', qs.stringify({ 'paperId': row.id })).then(function (respone) {
              if (respone.data.msgType === 0) {
                _this.showSuccessMsg(respone.data.msgContent)
                _this.getAllMemberPaper()
                _this.reload()
              } else if (respone.data.msgType === 1) {
                _this.showErrorMsg(respone.data.msgContent)
              }
            })
          }
        }
      })
    },
    deletepre: function (row) {
      this.deletePaper(row)
    },
    deletePaper: function (row) {
      var _this = this
      this.$alert('此操作将删除试卷【' + row.paperName + '】，并丢失人员成绩', '请谨慎操作', {
        confirmButtonText: '继续',
        callback: action => {
          if (action === 'confirm') {
            axios.post('/api_deletePaper', qs.stringify({ 'paperId': row.id })).then(function (respone) {
              _this.getAllPaper()
              if (respone.data.msgType === 0) {
                _this.showSuccessMsg(respone.data.msgContent)
              } else if (respone.data.msgType === 1) {
                _this.showErrorMsg(respone.data.msgContent)
              }
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
