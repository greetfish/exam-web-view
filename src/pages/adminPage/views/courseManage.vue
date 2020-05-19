
<template>
  <div class="courseManage">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="openAddCourseDialog()" class="addButton">新增</el-button>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12" :offset="6" align="left">
        <el-table :data="courseList" stripe style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="courseName" label="科目" ></el-table-column>
          <el-table-column prop="" label="" width="240" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="questionEdit(scope.row)" round>题库维护</el-button>
              <el-button type="danger" @click="courseDelete(scope.row)" icon="el-icon-delete" size="mini" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
        </el-col>
      </el-row>
      <el-dialog :visible.sync="questionEditDialog" @close="questionEditDialogClose()"><span class="dialogTitle">题库编辑：{{ currCourseName }}</span>
        <el-row>
          <el-col :span="22" :offset="1" align="center">
            <el-table :data="questionEditDialog_Data" style=" width:560px">
              <el-table-column label="单选题" width="140" align="center">
                <template slot-scope="scope">
                  <a class="dialogTagA">{{ scope.row.countQuestion_A }}条</a>
                  <el-button size="mini" @click="courseQuestionClean('1')" icon="el-icon-delete" circle></el-button>
                </template>
              </el-table-column>
              <el-table-column label="多选题" width="140" align="center">
                <template slot-scope="scope">
                  <a class="dialogTagA">{{ scope.row.countQuestion_B }}条</a>
                  <el-button size="mini" @click="courseQuestionClean('2')" icon="el-icon-delete" circle></el-button>
                </template>
              </el-table-column>
              <el-table-column label="判断题" width="140" align="center">
                <template slot-scope="scope">
                  <a class="dialogTagA">{{ scope.row.countQuestion_C }}条</a>
                  <el-button size="mini" @click="courseQuestionClean('3')" icon="el-icon-delete" circle></el-button>
                </template>
              </el-table-column>
              <el-table-column label="简答题" width="140" align="center">
                <template slot-scope="scope">
                  <a class="dialogTagA">{{ scope.row.countQuestion_D }}条</a>
                  <el-button size="mini" @click="courseQuestionClean('4')" icon="el-icon-delete" circle></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="17" :offset="2">
            <el-upload class="upload-demo" ref="upload" :headers="uploadData" :on-success="uploadSuccess" :data="uploadData" :show-file-list="true" action="api_uploadQuestionFile"
            :limit="1" :on-exceed="handleExceed" :file-list="fileList" :auto-upload="false" style="height: 100px">
              <el-select size="medium" v-model="select" placeholder="题型" class="questionFileTypeSelect">
                <el-option label="单选题" value="1"></el-option>
                <el-option label="多选题" value="2"></el-option>
                <el-option label="判断题" value="3"></el-option>
                <el-option label="简答题" value="4"></el-option>
              </el-select>
              <el-button style="margin-left:20px" slot="trigger" size="medium" icon="el-icon-folder-add"></el-button>
              <el-button style="margin-left:20px;margin-top:30px;float:right" size="medium" type="success" @click="submitUpload()">上传</el-button>
            </el-upload>
          </el-col>
          <el-col :span="4" style="margin-top:55px;" align="left"><a href="/导入题库的样题.rar">样题下载</a></el-col>
        </el-row>
      </el-dialog>
      <el-dialog :visible.sync="addCourseDialog" title="新增科目" @close="addCourseDialogClose()" width="30%">
        <el-divider></el-divider>
        <el-row class="firstRowInDrawer">
            <el-col :span="5" :offset="2" align="right" style="margin-top:6px">
              科目名：
            </el-col>
            <el-col :span="10" align="left">
              <el-input v-model="newCourseNameInput" size="medium" placeholder="输入科目名"></el-input>
            </el-col>
            <el-col :span="4" align="right">
              <el-button size="medium" @click="submitAddingCourse()">确定</el-button>
            </el-col>
        </el-row>
      </el-dialog>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      courseList: [],
      currCourseId: '',
      currCourseName: '',
      questionEditDialog_Data: [],
      questionEditDialog: false,
      addCourseDialog: false,
      input1: '',
      select: '',
      fileList: [],
      newCourseNameInput: ''
    }
  },
  computed: {
    uploadData: function () {
      return {
        'courseId': this.currCourseId,
        'questionType': this.select
      }
    }
  },
  created: function () {
    this.getMsg()
    this.getAllCourse()
  },
  methods: {
    getMsg: function () {
      var _this = this
      axios.get('/test').then(function (respone) {
        _this.msg = respone.data
        console.log(respone.data)
      })
    },
    getAllCourse: function () {
      var _this = this
      axios.get('/api_getAllCourse').then(function (respone) {
        _this.courseList = respone.data
      })
    },
    questionEdit: function (row) {
      var _this = this
      _this.courseId = ''
      _this.questionEditDialog_Data = []
      _this.questionEditDialog_Data.push(row)
      _this.currCourseId = row.id
      _this.currCourseName = row.courseName
      _this.questionEditDialog = true
    },
    questionEditDialogClose: function () {
      var _this = this
      _this.questionEditDialog_Data = []
      _this.currCourseId = ''
    },
    courseEdit: function (row) {
    },
    courseDelete: function (row) {
      this.deleteConfirm(row)
    },
    courseQuestionClean: function (questionType) {
      var _this = this
      if (questionType === '1') {
        this.$alert('删除所有的单选题？', '请谨慎操作', {
          confirmButtonText: '继续',
          callback: action => {
            if (action === 'confirm') {
              axios.post('/api_deleteQuestionByType', qs.stringify({ 'courseId': _this.currCourseId, 'questionType': questionType })).then(function (respone) {
                _this.showSuccessMsg(respone.data.msgContent)
                _this.questionEditDialog = false
                _this.getAllCourse()
              })
            }
          }
        })
      }
      if (questionType === '4') {
        this.$alert('删除所有的简答题？', '请谨慎操作', {
          confirmButtonText: '继续',
          callback: action => {
            if (action === 'confirm') {
              axios.post('/api_deleteQuestionByType', qs.stringify({ 'courseId': _this.currCourseId, 'questionType': questionType })).then(function (respone) {
                _this.showSuccessMsg(respone.data.msgContent)
                _this.questionEditDialog = false
                _this.getAllCourse()
              })
            }
          }
        })
      }
      if (questionType === '2') {
        this.$alert('删除所有的多选题？', '请谨慎操作', {
          confirmButtonText: '继续',
          callback: action => {
            if (action === 'confirm') {
              axios.post('/api_deleteQuestionByType', qs.stringify({ 'courseId': _this.currCourseId, 'questionType': questionType })).then(function (respone) {
                _this.showSuccessMsg(respone.data.msgContent)
                _this.questionEditDialog = false
                _this.getAllCourse()
              })
            }
          }
        })
      }
      if (questionType === '3') {
        this.$alert('删除所有的判断题？', '请谨慎操作', {
          confirmButtonText: '继续',
          callback: action => {
            if (action === 'confirm') {
              axios.post('/api_deleteQuestionByType', qs.stringify({ 'courseId': _this.currCourseId, 'questionType': questionType })).then(function (respone) {
                _this.showSuccessMsg(respone.data.msgContent)
                _this.questionEditDialog = false
                _this.getAllCourse()
              })
            }
          }
        })
      }
    },
    deleteConfirm: function (row) {
      var _this = this
      this.$alert('此操作将删除该科目', '请谨慎操作', {
        confirmButtonText: '继续',
        callback: action => {
          if (action === 'confirm') {
            axios.post('/api_deleteCourse', qs.stringify({ 'courseId': row.id })).then(function (respone) {
              if (respone.data.msgType === 0) {
                _this.showSuccessMsg(respone.data.msgContent)
                _this.getAllCourse()
              } else if (respone.data.msgType === 1) {
                _this.showErrorMsg(respone.data.msgContent)
              }
            })
          }
        }
      })
    },
    uploadSuccess: function (response, file, fileList) {
      var _this = this
      _this.questionEditDialog = false
      _this.questionEditDialog_Data = []
      _this.courseId = ''
      _this.currCourseName = ''
      _this.select = ''
      this.$refs.upload.clearFiles()
      this.getAllCourse()
      if (response.msgType === 0) {
        this.showSuccessMsg(response.msgContent)
      } else if (response.msgType === 1) {
        this.showErrorMsg(response.msgContent)
      }
    },
    submitUpload: function () {
      if (this.select !== '') {
        this.$refs.upload.submit()
      } else {
        this.showErrorMsg('请选择题型')
      }
    },
    handleExceed: function (files, fileList) {
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
    },
    openAddCourseDialog: function () {
      this.addCourseDialog = true
    },
    addCourseDialogClose: function () {
      this.newCourseNameInput = ''
    },
    submitAddingCourse: function () {
      var _this = this
      if (_this.newCourseNameInput !== '') {
        axios.post('/api_newCourse', qs.stringify({ 'courseName': _this.newCourseNameInput })).then(function (respone) {
          _this.showSuccessMsg(respone.data.msgContent)
          _this.addCourseDialog = false
          _this.newCourseNameInput = ''
          _this.getAllCourse()
        })
      } else {
        _this.showErrorMsg('请填写科目名')
      }
    }
  }
}
</script>

<style scoped type="text/css">
.addButton{
  margin-left: 30px;
  margin-top: 20px;
}
.el-dialog{
  width: 830px;
  height: 800px;
}
.dialogTagA{
  margin-left: 15px;
  margin-right: 5px;
}
.questionFileInput{
  margin-top: 30px;
}
.questionFileTypeSelect{
  margin-top: 30px;
  width: 90px;
}
.dialogTitle{
  font-size: 20px;
}
.upload-demo{
  margin-top: 20px;
  padding-left: 80px;
  float: left;
}
.el-upload-list{
  float: right;
}
.el-upload-list--text{
  float: right;
}
.el-upload-list__item{
  padding-top: 25px;
}
.courseManage{
  width: 90%;
  margin-left: 5%;
}
</style>
