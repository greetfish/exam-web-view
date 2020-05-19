<template>
    <div class="examing">
      <el-container direction="vertical" id="container1">
        <el-header>
          <el-row style="padding-top:10px;">
              <el-col :span="9" align="left">
                <h2>卷名：{{ currentQuestion.memberPaper.paper.paperName }}</h2>
              </el-col>
              <el-col :span="4" align="center" style="margin-top:20px;">剩余时间：<a class="timeLimit">{{ leftMinute }}分钟:{{ leftSecond }}秒</a></el-col>
              <el-col :span="10" align="right" style="margin-top:20px;">
                <a>欢迎您 {{ memberName }} 同志！ </a>
                <el-button size="small" @click="endExaming()">结束考核</el-button>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="22" :offset="1" align="left"></el-col>
          </el-row>
        </el-header>
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
                <el-col :span="4"><a class="questionTitle">作答区:</a></el-col>
                <el-col :span="20" align="left">
                  <div class="answerArea">
                    <div v-show="singleSelectInput == true">
                      <el-row>
                        <el-col :span="3" :offset="3">
                          <el-radio v-model="singleSelectInputValue" label="A">A</el-radio>
                        </el-col>
                        <el-col :span="3" :offset="1">
                          <el-radio v-model="singleSelectInputValue" label="B">B</el-radio>
                        </el-col>
                        <el-col :span="3" :offset="1">
                          <el-radio v-model="singleSelectInputValue" label="C">C</el-radio>
                        </el-col>
                        <el-col :span="3" :offset="1">
                          <el-radio v-model="singleSelectInputValue" label="D">D</el-radio>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-show="multiSelectInput">
                      <el-checkbox-group v-model="multiSelectInputValue">
                        <el-row>
                          <el-col :span="3" :offset="3">
                            <el-checkbox :label='AcheckBox.name' key="A">{{ AcheckBox.name }}</el-checkbox>
                          </el-col>
                          <el-col :span="3" :offset="1">
                            <el-checkbox :label='BcheckBox.name' key="B">{{ BcheckBox.name }}</el-checkbox>
                          </el-col>
                          <el-col :span="3" :offset="1">
                            <el-checkbox :label='CcheckBox.name' key="C">{{ CcheckBox.name }}</el-checkbox>
                          </el-col>
                          <el-col :span="3" :offset="1">
                            <el-checkbox :label='DcheckBox.name' key="D">{{ DcheckBox.name }}</el-checkbox>
                          </el-col>
                        </el-row>
                      </el-checkbox-group>
                    </div>
                    <div v-show="trueOrFalseInput">
                      <el-row>
                        <el-col :span="3" :offset="4">
                          <el-radio v-model="trueOrFalseInputValue" label="对">对</el-radio>
                        </el-col>
                        <el-col :span="3" :offset="6">
                          <el-radio v-model="trueOrFalseInputValue" label="错">错</el-radio>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-show="shortAnswerInput">
                      <el-row>
                        <el-col :span="14" :offset="3">
                          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="shortAnswerInputValue"></el-input>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </el-row>
              </div>
              <el-row>
                <el-col :span="3" align="left"><el-button type="primary" plain @click="preQuestion()"><i class="el-icon-arrow-left"></i></el-button></el-col>
                <el-col :span="3" align="left"><el-button type="primary" plain @click="nextQuestion()"><i class="el-icon-arrow-right"></i></el-button></el-col>
                <el-col :span="18" align="right"><el-button type="primary" @click="sureAnswer()">确定</el-button></el-col>
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
      memberName: '',
      questionList: [],
      currentQuestion: { question: { questionContent: '' } },
      questionTypeText: '题型',
      questionType: '',
      singleSelectInput: false,
      singleSelectInputValue: '',
      multiSelectInput: false,
      multiSelectInputValue: [],
      trueOrFalseInput: false,
      trueOrFalseInputValue: '',
      shortAnswerInput: false,
      shortAnswerInputValue: '',
      AcheckBox: { name: 'A', checked: false },
      BcheckBox: { name: 'B', checked: false },
      CcheckBox: { name: 'C', checked: false },
      DcheckBox: { name: 'D', checked: false },
      leftMinute: 0,
      leftSecond: 0,
      Interval: {}
    }
  },
  created: function () {
    this.getRouterData()
  },
  mounted: function () {
    this.FullScreen()
    this.leftMinute = this.currentQuestion.memberPaper.leftMinute - 1
    this.leftSecond = 59
    this.Interval = setInterval(this.countDown, 1000)
  },
  methods: {
    countDown: function () {
      if (this.leftSecond === 0) {
        if (this.leftMinute === 0) {
          this.endExaming()
          clearInterval(this.Interval)
          this.showScoreMsg('考试时间结束！')
        } else {
          this.leftMinute--
          this.leftSecond = 59
          axios.post('/user_rewriteLeftMinute', qs.stringify({ 'memberPaperId': this.currentQuestion.memberPaper.id, 'leftMinute': this.leftMinute })).then(function (respone) {})
        }
      } else {
        this.leftSecond--
      }
    },
    FullScreen: function () {
      const loading = this.$loading({
        lock: true,
        text: '正在加载试题...',
        spinner: 'el-icon-loading',
        background: 'rgba(40, 90, 6)'
      })
      setTimeout(() => {
        loading.close()
      }, 2000)
    },
    getRouterData: function () {
      this.questionList = this.$route.query.questionList
      this.memberName = this.$route.query.memberName
      this.currentQuestion = this.questionList[0]
      this.prepareAnswerArea(this)
    },
    showErrorMsg: function (msg) {
      this.$message({
        message: msg,
        type: 'error'
      })
    },
    endExaming: function () {
      var _this = this
      this.$alert('确定要交卷吗？', '请谨慎操作', {
        confirmButtonText: '继续',
        callback: action => {
          if (action === 'confirm') {
            axios.post('/user_endExaming', qs.stringify({ 'memberPaperId': _this.currentQuestion.memberPaper.id })).then(function (respone) {
              setTimeout(() => {
                _this.showScoreMsg('考试结束，得分：' + respone.data)
              }, 1200)
            })
            setTimeout(() => {
              _this.$router.push({
                path: '/'
              })
            }, 400)
            clearInterval(_this.Interval)
          }
        }
      })
    },
    quit: function () {
      this.$router.push({
        path: '/'
      })
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
      this.prepareAnswerArea(this)
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
    prepareAnswerArea: function (_this) {
      if (_this.currentQuestion.question.questionType === 1) {
        _this.singleSelectInput = true
        _this.singleSelectInputValue = _this.currentQuestion.memberAnswer
        _this.multiSelectInput = false
        _this.trueOrFalseInput = false
        _this.shortAnswerInput = false
      } else if (_this.currentQuestion.question.questionType === 2) {
        _this.singleSelectInput = false
        _this.multiSelectInput = true
        _this.multiSelectInputValue = []
        _this.loadMultiSelectInputValue(_this)
        _this.trueOrFalseInput = false
        _this.shortAnswerInput = false
      } else if (_this.currentQuestion.question.questionType === 3) {
        _this.singleSelectInput = false
        _this.multiSelectInput = false
        _this.trueOrFalseInput = true
        _this.trueOrFalseInputValue = _this.currentQuestion.memberAnswer
        _this.shortAnswerInput = false
      } else if (_this.currentQuestion.question.questionType === 4) {
        _this.singleSelectInput = false
        _this.multiSelectInput = false
        _this.trueOrFalseInput = false
        _this.shortAnswerInput = true
        _this.shortAnswerInputValue = _this.currentQuestion.memberAnswer
      }
    },
    loadMultiSelectInputValue: function (_this) {
      let answerstr = _this.currentQuestion.memberAnswer
      for (var i = 0; i < answerstr.length; i++) {
        _this.multiSelectInputValue.push(answerstr[i])
      }
    },
    sureAnswer: function () {
      var _this = this
      if (_this.singleSelectInput) {
        _this.currentQuestion.memberAnswer = _this.singleSelectInputValue
        _this.questionList[_this.currentQuestion.questionIndex].memberAnswer = _this.singleSelectInputValue
        if (_this.singleSelectInputValue !== '') {
          axios.post('/user_saveAnswer', qs.stringify({ 'examQuestionId': _this.currentQuestion.id, 'memberAnswer': _this.currentQuestion.memberAnswer })).then(function (respone) {
            if (respone.data.msgType === 1) {
              _this.showErrorMsg(respone.data.msgContent)
            }
          })
          _this.questionList[_this.currentQuestion.questionIndex].hasBeenAnswered = 1
        }
      } else if (_this.multiSelectInput) {
        _this.currentQuestion.memberAnswer = _this.multiSelectInputValue
        _this.questionList[_this.currentQuestion.questionIndex].memberAnswer = _this.multiSelectInputValue
        var answerStr = ''
        for (var i = 0; i < _this.multiSelectInputValue.length; i++) {
          answerStr += _this.multiSelectInputValue[i]
        }
        if (_this.multiSelectInputValue.length !== 0) {
          axios.post('/user_saveAnswer', qs.stringify({ 'examQuestionId': _this.currentQuestion.id, 'memberAnswer': answerStr })).then(function (respone) {
            if (respone.data.msgType === 1) {
              _this.showErrorMsg(respone.data.msgContent)
            }
          })
          _this.questionList[_this.currentQuestion.questionIndex].hasBeenAnswered = 1
        } else {
          axios.post('/user_saveAnswer', qs.stringify({ 'examQuestionId': _this.currentQuestion.id, 'memberAnswer': answerStr })).then(function (respone) {
            if (respone.data.msgType === 1) {
              _this.showErrorMsg(respone.data.msgContent)
            }
          })
          _this.questionList[_this.currentQuestion.questionIndex].hasBeenAnswered = 0
        }
      } else if (_this.trueOrFalseInput) {
        _this.currentQuestion.memberAnswer = _this.trueOrFalseInputValue
        _this.questionList[_this.currentQuestion.questionIndex].memberAnswer = _this.trueOrFalseInputValue
        if (_this.trueOrFalseInputValue !== '') {
          axios.post('/user_saveAnswer', qs.stringify({ 'examQuestionId': _this.currentQuestion.id, 'memberAnswer': _this.currentQuestion.memberAnswer })).then(function (respone) {
            if (respone.data.msgType === 1) {
              _this.showErrorMsg(respone.data.msgContent)
            }
          })
          _this.questionList[_this.currentQuestion.questionIndex].hasBeenAnswered = 1
        }
      } else if (_this.shortAnswerInput) {
        _this.currentQuestion.memberAnswer = _this.shortAnswerInputValue
        _this.questionList[_this.currentQuestion.questionIndex].memberAnswer = _this.shortAnswerInputValue
        if (_this.shortAnswerInputValue !== '') {
          axios.post('/user_saveAnswer', qs.stringify({ 'examQuestionId': _this.currentQuestion.id, 'memberAnswer': _this.currentQuestion.memberAnswer })).then(function (respone) {
            if (respone.data.msgType === 1) {
              _this.showErrorMsg(respone.data.msgContent)
            }
          })
          _this.questionList[_this.currentQuestion.questionIndex].hasBeenAnswered = 1
        }
      }
      _this.nextQuestion()
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
    height: 360px;
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
