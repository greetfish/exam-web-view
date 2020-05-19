<template>
    <div class="memberReview">
      <el-container direction="vertical" id="container1">
          <el-row style="padding-top:10px;">
              <el-col :span="9" align="left">
                <h2>卷名：{{ paperName }}</h2>
              </el-col>
              <el-col :span="4" align="center" style="margin-top:20px;">交卷剩余：<a class="timeLimit">{{ leftMinute }}分钟</a></el-col>
              <el-col :span="10" align="right" style="margin-top:20px;">
                <a>{{ memberName }} 的考卷，总分:{{ currentQuestion.memberPaper.score }}</a>
                <el-button size="small" @click="endReview()">结束阅卷</el-button>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="22" :offset="1" align="left"></el-col>
          </el-row>
      <el-container id="container2">
        <el-aside>
          <el-row>
            <el-col style="padding-top:30px" :span="22" :offset="1">
              <button v-for="(item,index) in questionList" :key="index" @click="drumpToQuestion(item.questionIndex)" :class="item.hasBeenAnswered == 0?'questionBtn':'questionBtn2'">{{ item.questionIndex+1 }}</button>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <el-row>
            <el-col style="padding-top:80px;" :span="14" :offset="3"  align="left">
              <div class="questionShowDiv">
              <el-row>
                <el-col :span="6" align="left">
                  <a class="questionTitle"
                  oncopy="event.returnValue=false"
                  onselectstart="event.returnValue=false"
                  ondragstart="event.returnValue=false"
                  oncontextmenu="event.returnValue=false">{{questionTypeText}}>第{{ currentQuestion.questionIndex+1 }}题:</a>
                </el-col>
                <el-col :span="16" align="left">
                  <div class= "questionContent"
                oncopy="event.returnValue=false"
                onselectstart="event.returnValue=false"
                ondragstart="event.returnValue=false"
                oncontextmenu="event.returnValue=false"
                v-html="currentQuestion.question.questionContent">
                </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6"><a class="questionTitle">更改得分:</a></el-col>
                <el-col :span="8"><el-input size="mini" v-model="newScore" placeholder="输入新的打分"></el-input></el-col>
                <el-col :span="4"><el-button size="mini" type="primary" plain @click="setnewScore()">确定</el-button></el-col>
              </el-row>
              <el-row>
                <el-col :span="6"><a class="questionTitle">本题得分:</a></el-col>
                <el-col :span="16" align="left"><span>{{ currentQuestion.score }}</span></el-col>
              </el-row>
              <el-row>
                <el-col :span="6"><a class="questionTitle">标准答案:</a></el-col>
                <el-col :span="16" align="left"><span>{{ currentQuestion.question.questionAnswer }}</span></el-col>
              </el-row>
              <el-row>
                <el-col :span="6"><a class="questionTitle">考生作答:</a></el-col>
                <el-col :span="16" align="left"><span>{{ currentQuestion.memberAnswer }}</span></el-col>
              </el-row>
              </div>
              <el-row>
                <el-col :span="3" align="left"><el-button type="primary" plain @click="preQuestion()"><i class="el-icon-arrow-left"></i></el-button></el-col>
                <el-col :span="3" align="left"><el-button type="primary" plain @click="nextQuestion()"><i class="el-icon-arrow-right"></i></el-button></el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      </el-container>
    </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      fullscreenLoading: false,
      paperId: '',
      paperName: '',
      memberName: '',
      questionList: [],
      currentQuestion: { question: { questionContent: '' } },
      questionTypeText: '题型',
      questionType: '',
      leftMinute: 0,
      leftSecond: 0,
      Interval: {},
      newScore: ''
    }
  },
  created: function () {
    this.getRouterData()
  },
  methods: {
    getRouterData: function () {
      this.memberName = this.$route.query.memberName
      this.paperId = this.$route.query.paperId
      this.paperName = this.$route.query.paperName
      var _this = this
      axios.post('/user_startExaming', qs.stringify({ 'memberPaperId': _this.$route.query.memberPaperId })).then(function (respone) {
        _this.questionList = respone.data
        _this.currentQuestion = _this.questionList[0]
        _this.leftMinute = _this.currentQuestion.memberPaper.leftMinute
      })
    },
    showErrorMsg: function (msg) {
      this.$message({
        message: msg,
        type: 'error'
      })
    },
    setnewScore: function () {
      if (this.newScore === '') {
        this.showErrorMsg('未输入新的打分')
        return
      }
      var _this = this
      axios.post('/api_setNewScoreForQuestion', qs.stringify({ 'questionId': _this.currentQuestion.id, 'newScore': _this.newScore })).then(function (respone) {
        if (respone.data.msgType === 1) {
          _this.showErrorMsg(respone.data.msgContent)
          _this.newScore = ''
        } else if (respone.data.msgType === 0) {
          _this.showSuccessMsg(respone.data.msgContent)
          _this.newScore = ''
          axios.post('/user_startExaming', qs.stringify({ 'memberPaperId': _this.$route.query.memberPaperId })).then(function (respone) {
            _this.questionList = respone.data
            _this.currentQuestion = _this.questionList[_this.currentQuestion.questionIndex]
            _this.leftMinute = _this.currentQuestion.memberPaper.leftMinute
          })
        }
      })
    },
    endReview: function () {
      var _this = this
      setTimeout(() => {
        _this.$router.push({
          path: '/memberArchive',
          query: {
            paperId: _this.paperId,
            paperName: _this.paperName
          }
        })
      }, 400)
      clearInterval(_this.Interval)
    },
    drumpToQuestion: function (questionIndex) {
      this.currentQuestion = this.questionList[questionIndex]
      if (this.currentQuestion.question.questionType === 1) {
        this.questionTypeText = '单选题'
      } else if (this.currentQuestion.question.questionType === 2) {
        this.questionTypeText = '多选题'
      } else if (this.currentQuestion.question.questionType === 3) {
        this.questionTypeText = '判断题'
      } else if (this.currentQuestion.question.questionType === 4) {
        this.questionTypeText = '简答题'
      }
    },
    preQuestion: function () {
      if (this.currentQuestion.questionIndex === 0) {
        this.showInfoMsg('当前为第一题')
      } else {
        this.drumpToQuestion(this.currentQuestion.questionIndex - 1)
      }
    },
    nextQuestion: function () {
      if (this.currentQuestion.questionIndex === (this.questionList.length - 1)) {
        this.showInfoMsg('已经到达最后一题')
      } else {
        this.drumpToQuestion(this.currentQuestion.questionIndex + 1)
      }
    },
    showSuccessMsg: function (msg) {
      this.$message({
        message: msg,
        type: 'success'
      })
    },
    showInfoMsg: function (msg) {
      this.$notify({
        title: '提示 ',
        message: msg,
        type: 'error',
        position: 'bottom-right',
        showClose: true
      })
    },
    showScoreMsg: function (msg) {
      this.$notify({
        title: '提示 ',
        message: msg,
        type: 'success',
        position: 'bottom-right',
        showClose: true
      })
    }
  }
}
</script>

<style type="text/css">
  html,body,#app,.examing,.el-container{
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
  .questionTitle{
    font-size: 18px;
    font-weight: 200;
    color:rgb(70, 146, 223);
  }
  .questionBtn{
    width: 60px;
    height: 30;
    margin-top: 4px;
    margin-left: 5px;
    color: #ffffff;
    background-color: rgba(56, 155, 255, 0.445);
    border-color: rgba(56, 155, 255, 0.445);
  }
  .questionBtn2{
    width: 60px;
    height: 30;
    margin-top: 4px;
    margin-left: 5px;
    color: #ffffff;
    background-color: rgba(37, 196, 77, 0.425);
    border-color: rgba(37, 196, 77, 0.425);
  }
  .questionShowDiv{
    color: #555555;
    height: 520px;
    padding: 30px 30px;
    margin-bottom: 10px;
    border-style:dotted;
    border-color: rgb(143, 186, 199);
    border-radius: 20px 20px 0 0;
  }
  .questionContent{
    height: 300px;
    margin-bottom: 20px;
    font-size: 16px ;
  }
  .answerArea{
    font-size: 20px ;
  }
  #container2{
    height: 90%;
  }
  .el-header{
  background-color: #ffffff;
  z-index: 100;
  position: relative;
  box-shadow:0px 0px 6px #8b8b8b;
  text-align: right;
  height: 10% ! important;
}
  .el-aside{
  background-color: #ffffff;
  box-shadow:0px 0px 5px #8b8b8b;
  z-index: 99;
  position: relative;
  width: 460px ! important;
}
.el-radio{
  color: #363636;
}
.el-main{
  background-color: #ffffff;
  padding: 0px 20px 0px 20px ! important;
  min-width: 740px;
}
.timeLimit{
  color:rgb(70, 146, 223);
}
</style>
