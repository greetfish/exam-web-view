<template>
  <div class="paperGenerate">
    <el-row>
      <el-col :span="22" :offset="1">
        <h3>请补全试卷生成的必要信息</h3>
        <el-divider></el-divider>
      </el-col>
    </el-row>
    <el-row class="inputRow">
      <el-col :span="3" :offset="3" :clearable="true" style="margin-top:5px" align="right">
        <a class="inputDescription">试卷名：</a>
      </el-col>
      <el-col :span="14"  align="left">
        <el-input v-model="paper.paperName" size="medium" placeholder="输入即将生成的试卷名称"></el-input>
      </el-col>
    </el-row>
    <el-row class="inputRow">
      <el-col :span="3" :offset="3" style="margin-top:5px" align="right">
        <a class="inputDescription">考核科目：</a>
      </el-col>
      <el-col :span="14"  align="left">
        <el-select v-model="paper.courseId" @change="courseChange" placeholder="请选择考核的科目" style="width:100%">
          <el-option v-for="course in courseList" :key="course.value" :label="course.courseName" :value="course.id">
            <span style="float: left">{{ course.courseName }}</span>
            <span class="spanInSelect">简答{{ course.countQuestion_D }}道</span>
            <span class="spanInSelect">判断{{ course.countQuestion_C }}道</span>
            <span class="spanInSelect">多选{{ course.countQuestion_B }}道</span>
            <span class="spanInSelect">单选{{ course.countQuestion_A }}道</span>
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="inputRow">
      <el-col :span="3" :offset="3" style="margin-top:5px" align="right">
        <a class="inputDescription">考试时长：</a>
      </el-col>
      <el-col :span="2"  align="left">
        <el-input v-model="paper.timeLimit" :clearable="true" size="medium" placeholder="分钟"></el-input>
      </el-col>
      <el-col :span="2" style="margin-top:5px" align="right">
        <a class="inputDescription">总分：</a>
      </el-col>
      <el-col :span="2"  align="left">
        <el-input v-model="paper.score" :clearable="true" size="medium" placeholder="输入整数"></el-input>
      </el-col>
      <el-col :span="3" style="margin-top:5px" align="right">
        <a class="inputDescription">允许超时：</a>
      </el-col>
      <el-col :span="1"  align="right" class="switchCol">
        <el-switch v-model="paper.allowTimeOut"></el-switch>
      </el-col>
      <el-col :span="3" style="margin-top:5px" align="right">
        <a class="inputDescription">随机抽题：</a>
      </el-col>
      <el-col :span="1"  align="right" class="switchCol">
        <el-switch v-model="paper.atRandom"></el-switch>
      </el-col>
    </el-row>
    <el-row class="inputRow">
      <el-col :span="3" :offset="3" style="margin-top:5px" align="right">
        <a class="inputDescription">参加人员：</a>
      </el-col>
      <el-col :span="10"  align="left">
        <el-select v-model="paper.memberGroupId" placeholder="从列表中选择人员分组" style="width:100%">
          <el-option v-for="memberGroup in memberGroupList" :key="memberGroup.id" :label="memberGroup.groupName" :value="memberGroup.id">
            <span style="float: left">{{ memberGroup.groupName }}</span>
            <span class="spanInSelect">共{{ memberGroup.countMember }}人</span>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4"  align="right">
        <el-button size="mudium" @click="memberEditDialogOpen()">人员编辑</el-button>
      </el-col>
    </el-row>
    <el-row class="inputRow">
      <el-col :span="3" :offset="3" style="margin-top:5px" align="right">
        <a class="inputDescription">组卷策略：</a>
      </el-col>
      <el-col :span="10"  align="left" class="courseTable">
        <table class="generateTable">
          <tr>
            <th class="generateTableTd" style="width:80px">题  型</th>
            <th class="generateTableTd">单选题</th>
            <th class="generateTableTd">多选题</th>
            <th class="generateTableTd">判断题</th>
            <th class="generateTableTd">简答题</th>
          </tr>
          <tr  align="center">
            <td class="generateTableTd">现有题量</td>
            <td class="generateTableTd">{{ course.countQuestion_A }}</td>
            <td class="generateTableTd">{{ course.countQuestion_B }}</td>
            <td class="generateTableTd">{{ course.countQuestion_C }}</td>
            <td class="generateTableTd">{{ course.countQuestion_D }}</td>
          </tr>
          <tr align="center">
            <td class="generateTableTd">组卷题量</td>
            <td class="generateTableTd"><el-input :disabled="allowEditA" type="number" @change="generateTableChange" v-model="paper.countQuestionTypeA" size="medium" placeholder="整数"></el-input></td>
            <td class="generateTableTd"><el-input :disabled="allowEditB" type="number" @change="generateTableChange" v-model="paper.countQuestionTypeB" size="medium" placeholder="整数"></el-input></td>
            <td class="generateTableTd"><el-input :disabled="allowEditC" type="number" @change="generateTableChange" v-model="paper.countQuestionTypeC" size="medium" placeholder="整数"></el-input></td>
            <td class="generateTableTd"><el-input :disabled="allowEditD" type="number" @change="generateTableChange" v-model="paper.countQuestionTypeD" size="medium" placeholder="整数"></el-input></td>
          </tr>
          <tr align="center">
            <td class="generateTableTd">每题分值</td>
            <td class="generateTableTd"><el-input :disabled="allowEditA" @change="generateTableChange" v-model="paper.scoreQuestionTypeA" size="medium" placeholder="分值"></el-input></td>
            <td class="generateTableTd"><el-input :disabled="allowEditB" @change="generateTableChange" v-model="paper.scoreQuestionTypeB" size="medium" placeholder="分值"></el-input></td>
            <td class="generateTableTd"><el-input :disabled="allowEditC" @change="generateTableChange" v-model="paper.scoreQuestionTypeC" size="medium" placeholder="分值"></el-input></td>
            <td class="generateTableTd"><el-input :disabled="allowEditD" @change="generateTableChange" v-model="paper.scoreQuestionTypeD" size="medium" placeholder="分值"></el-input></td>
          </tr>
        </table>
      </el-col>
      <el-col :span="4"  align="right" style="padding-top:116px">
        <el-alert show-icon center :type="alertType" :closable="false"><a style="font-size: 16px">总分：{{ selectedScore }}</a></el-alert>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="1">
        <el-divider></el-divider>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="16" style="margin-top:5px" align="right">
        <el-button size="mudium" type="primary" @click="beginMakePaper()">生成试卷</el-button>
      </el-col>
    </el-row>
    <el-dialog title="人员编辑" :visible.sync="memberEditDialog" @close="memberEditDialogClose()">
      <el-row>
        <el-divider content-position="left">从Excel文件导入分组</el-divider>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="3" align="left">
          <el-input v-model="newMemberGroupName" :clearable="true" size="small" placeholder="设置组名(必填)"></el-input>
        </el-col>
        <el-col :span="10" align="right">
          <el-upload class="upload-demo" ref="upload" :on-success="uploadSuccess" :data="uploadData" :show-file-list="true" action="api_uploadMemberGroupFile"
          :limit="1" :on-exceed="handleExceed" :file-list="fileList" :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确认上传</el-button>
          <div slot="tip" class="el-upload__tip">请选取Excel文件(<a href="/新的人员名单.xlsx">样表下载</a>)</div>
        </el-upload>
        </el-col>
      </el-row>
      <el-row>
        <el-divider content-position="left">编辑组内人员</el-divider>
      </el-row>
      <el-row class="inputRow">
      <el-col :span="15" :offset="3" align="left">
        <el-select v-model="memberGroupIdFromEdit" @change="memberGroupChanged" placeholder="从列表中选择人员分组" style="width:100%">
          <el-option v-for="memberGroup in memberGroupListForEdit" :key="memberGroup.id" :label="memberGroup.groupName" :value="memberGroup.id">
            <span style="float: left">{{ memberGroup.groupName }}</span>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" align="right">
          <el-tooltip class="item" effect="dark" content="删除该分组及其所属人员" placement="bottom">
            <el-button @click="deleteMemberGroup()">删除分组</el-button>
          </el-tooltip>
        </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="3" align="left">
        <el-table :data="memberList" height="400" border style="width: 100%;margin-top:20px;">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="remarks" label="单位"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="examNumber" label="考号" align="center"></el-table-column>
          <el-table-column prop="" label="" width="60" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="删除该人员及其成绩记录" placement="left">
                <el-button type="danger" @click="memberDelete(scope.row)" icon="el-icon-delete" size="mini" circle></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
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
      memberGroupList: [],
      memberGroupListForEdit: [],
      memberGroupIdFromEdit: '',
      memberList: [],
      fileList: [],
      course: {},
      selectedScore: '0',
      allowEditA: true,
      allowEditB: true,
      allowEditC: true,
      allowEditD: true,
      alertType: 'info',
      newMemberGroupName: '',
      memberEditDialog: false,
      paper: {
        paperName: '',
        courseId: '',
        memberGroupId: '',
        score: '100',
        timeLimit: '60',
        countQuestionTypeA: '0',
        countQuestionTypeB: '0',
        countQuestionTypeC: '0',
        countQuestionTypeD: '0',
        scoreQuestionTypeA: '0',
        scoreQuestionTypeB: '0',
        scoreQuestionTypeC: '0',
        scoreQuestionTypeD: '0',
        allowTimeOut: false,
        atRandom: true
      }
    }
  },
  created: function () {
    this.getAllCourse()
    this.getAllMemberGroup()
    this.getAllMemberGroupForEdit()
  },
  computed: {
    uploadData: function () {
      return {
        'memberGroupName': this.newMemberGroupName
      }
    }
  },
  methods: {
    getAllCourse: function () {
      var _this = this
      axios.get('/api_getAllCourse').then(function (respone) {
        _this.courseList = respone.data
      })
    },
    getAllMemberGroup: function () {
      var _this = this
      axios.get('/api_getAllMemberGroup').then(function (respone) {
        _this.memberGroupList = respone.data
      })
    },
    getAllMemberGroupForEdit: function () {
      var _this = this
      axios.get('/api_getAllMemberGroup').then(function (respone) {
        _this.memberGroupListForEdit = respone.data
      })
    },
    memberGroupChanged: function () {
      var _this = this
      axios.post('/api_getAllMemberByMemberGroupId', qs.stringify({ 'memberGroupId': _this.memberGroupIdFromEdit })).then(function (respone) {
        _this.memberList = respone.data
      })
    },
    courseChange: function () {
      var _this = this
      axios.post('/api_getCourseById', qs.stringify({ 'courseId': _this.paper.courseId })).then(function (respone) {
        _this.course = respone.data
        if (_this.course.countQuestion_A === 0) {
          _this.allowEditA = true
        } else {
          _this.allowEditA = false
        }
        if (_this.course.countQuestion_B === 0) {
          _this.allowEditB = true
        } else {
          _this.allowEditB = false
        }
        if (_this.course.countQuestion_C === 0) {
          _this.allowEditC = true
        } else {
          _this.allowEditC = false
        }
        if (_this.course.countQuestion_D === 0) {
          _this.allowEditD = true
        } else {
          _this.allowEditD = false
        }
      })
    },
    beginMakePaper: function () {
      var _this = this
      if ((_this.selectedScore.toString() === _this.paper.score) & (_this.paper.paperName !== '') & (_this.paper.courseId !== '') & (_this.paper.memberGroupId !== '')) {
        axios.post('/api_newPaper', qs.stringify(_this.paper)).then(function (response) {
          if (response.data.msgType === 0) {
            _this.showSuccessMsg(response.data.msgContent + '————请前往考试控制中查看试卷')
          } else if (response.data.msgType === 1) {
            _this.showErrorMsg(response.data.msgContent)
          }
        })
      } else {
        _this.showErrorMsg('请将信息填写完整再生成')
      }
    },
    generateTableChange: function () {
      var _this = this
      _this.selectedScore = _this.paper.countQuestionTypeA * this.paper.scoreQuestionTypeA + _this.paper.countQuestionTypeB * this.paper.scoreQuestionTypeB + _this.paper.countQuestionTypeC * this.paper.scoreQuestionTypeC + _this.paper.countQuestionTypeD * this.paper.scoreQuestionTypeD
      if (_this.selectedScore.toString() === _this.paper.score) {
        _this.alertType = 'success'
      } else {
        _this.alertType = 'info'
      }
    },
    memberEditDialogOpen: function () {
      this.memberEditDialog = true
    },
    memberEditDialogClose: function () {
      this.newMemberGroupName = ''
    },
    deleteMemberGroup: function () {
      var _this = this
      axios.post('/api_deleteMemberGroup', qs.stringify({ 'memberGroupId': _this.memberGroupIdFromEdit })).then(function (respone) {
        if (respone.data.msgType === 0) {
          _this.showSuccessMsg(respone.data.msgContent)
          _this.getAllMemberGroup()
        } else if (respone.data.msgType === 1) {
          _this.showErrorMsg(respone.data.msgContent)
        }
      })
    },
    memberDelete: function (row) {
      var _this = this
      axios.post('/api_memberDelete', qs.stringify({ 'memberId': row.id })).then(function (respone) {
        _this.memberList = respone.data
      })
    },
    handleExceed: function () {
      console.log('Exceed')
    },
    uploadSuccess: function (response, file, fileList) {
      this.$refs.upload.clearFiles()
      this.getAllMemberGroup()
      this.getAllMemberGroupForEdit()
      if (response.msgType === 0) {
        this.showSuccessMsg(response.msgContent)
      } else if (response.msgType === 1) {
        this.showErrorMsg(response.msgContent)
      }
    },
    submitUpload: function () {
      this.$refs.upload.submit()
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
<style type="text/css">
.inputDescription{
  margin-top: 5px;
}
.inputRow{
  margin-top: 20px;
}
.spanInSelect{
  float: right;
  margin-right: 10px;
  color: #8492a6;
  font-size: 13px
}
.switchCol{
  margin-top: 3px;
}
.generateTable{
  margin-top: 8px;
  font: outline;
  width: 100%;
  border: solid 1px;
  border-color: #c2c2c2;
}
.generateTableTd{
  border: solid 1px;
  border-spacing: 0;
  border-color: #c2c2c2;
  padding: 0;
  line-height: 30px;
  color: #414141;
}
.paperGenerate{
  width: 90%;
  margin-left: 5%;
}
</style>
