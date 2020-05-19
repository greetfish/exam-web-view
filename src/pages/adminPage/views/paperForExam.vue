<template>
  <div class="paperForExam">
    <el-row>
      <el-col :span="22" :offset="1">
        <h3>未开考试卷列表</h3>
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
            <el-button size="mini" @click="setPaperToExam(scope.row)" round>开考</el-button>
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
  data () {
    return {
      paperList: []
    }
  },
  created: function () {
    this.getAllPaper()
  },
  methods: {
    getAllPaper: function () {
      var _this = this
      axios.post('/api_getAllPaper', qs.stringify({ 'paperState': '0' })).then(function (respone) {
        _this.paperList = respone.data
      })
    },
    setPaperToExam: function (row) {
      var _this = this
      this.$alert('将试卷设置为开始考试，考生可以开始答题', '提示', {
        confirmButtonText: '继续',
        callback: action => {
          if (action === 'confirm') {
            axios.post('/api_setPaperToExam', qs.stringify({ 'paperId': row.id })).then(function (respone) {
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
    deletepre: function (row) {
      this.deletePaper(row)
    },
    deletePaper: function (row) {
      var _this = this
      this.$alert('此操作将删除试卷【' + row.paperName + '】，但试卷暂未开考，可放心删除', '请谨慎操作', {
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
