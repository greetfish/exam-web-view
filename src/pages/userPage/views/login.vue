<template>
    <div class="login">
      <div class="loginDiv">
      <el-row>
        <el-col class="loginForm" :span="6" :offset="16">
          <el-row>
            <el-col :span="13" :offset="1" align="left">
              <h3>考试登录：</h3>
            </el-col>
            <el-col :span="8"  align="right">
              <el-tooltip class="item" effect="dark" content="管理员登录" placement="bottom">
                <router-link class="linkToAdmin topIcon" to="/admin"><i class="linkToAdmin el-icon-s-tools"></i></router-link>
              </el-tooltip>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22" :offset="1" align="left">
              <el-input v-model="examNumber" class="loginInput" size="medium" placeholder="请输入考号"></el-input>
            </el-col>
          </el-row>
          <el-row class="loginRow">
            <el-col :span="8" :offset="1" align="left">
              <el-input v-model="sureCode" class="loginInput" size="medium" placeholder="输入验证码"></el-input>
            </el-col>
            <el-col :span="2" :offset="3" align="left">
              <span class="changeCode">
                <i class="el-icon-refresh"  @click="changeCode()"></i>
                </span>
            </el-col>
            <el-col class="code" :span="9" align="center">
              <span  oncopy="event.returnValue=false"
              onselectstart="event.returnValue=false"
              ondragstart="event.returnValue=false"
              oncontextmenu="event.returnValue=false">{{ code }}</span>
            </el-col>
          </el-row>
          <el-row class="loginRow">
            <el-col :span="22" :offset="1" align="right" style="padding-bottom:20px">
              <el-button @click="login()">登录</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="infoRow">
        <el-col :span="6" :offset="16">
          <el-collapse style="baground-color:transparent">
            <el-collapse-item style="baground-color:transparent" title="关于" name="3" class="collapseItem">
                <el-row class="rowInItem">
                  <el-col :span="8" :offset="1" align="right">
                    开发者：
                  </el-col>
                  <el-col :span="12" align="left">
                    96721部队____杨万
                  </el-col>
                </el-row>
                <el-row class="rowInItem">
                  <el-col :span="8" :offset="1" align="right">
                    联系方式：
                  </el-col>
                  <el-col :span="12" align="left">
                    greetfish@foxmail.com
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
        </el-col>
      </el-row>
      </div>
    </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      sureCode: '',
      examNumber: '',
      codeChars: [0, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      codeLength: 4,
      code: '',
      memberPaperList: [],
      memberName: ''
    }
  },
  created: function () {
    this.changeCode()
  },
  methods: {
    login: function () {
      if (this.sureCode === this.code) {
        var _this = this
        axios.post('/user_examLogin', qs.stringify({ 'examNumber': _this.examNumber, 'sureCode': _this.sureCode })).then(function (respone) {
          if (respone.data.length === 0) {
            _this.showErrorMsg('暂时没有有关该考号的待考核试卷')
            _this.loginFail(_this)
          } else {
            _this.memberPaperList = respone.data
            _this.memberName = respone.data[0].member.name
            _this.loginSuccess(_this)
          }
        })
      } else {
        this.showErrorMsg('验证码不正确，请重新输入')
        this.sureCode = ''
        this.changeCode()
      }
    },
    changeCode: function () {
      var _this = this
      _this.code = ''
      for (var i = 0; i < _this.codeLength; i++) {
        var charNum = Math.floor(Math.random() * 54)
        _this.code += _this.codeChars[charNum]
      }
    },
    loginFail: function (_this) {
      _this.changeCode()
      _this.sureCode = ''
      _this.examNumber = ''
    },
    loginSuccess: function (_this) {
      _this.$router.push({
        path: '/examList',
        query: {
          memberPaperList: _this.memberPaperList,
          memberName: _this.memberName
        }
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
  html,body,#app{
    padding: 0px;
    margin: 0px;
    height: 100%;
    min-height: 700px;
    min-width: 1200px;
  }
  .linkToAdmin{
    margin-top: 20px;
    text-decoration: none;
    color: #ffffff ! important;
  }
  .login{
    background-image: url('/img/examLoginBackGround.jpg');
    color: #ffffff;
    height: 100%;
  }
  .loginDiv{
    padding-top: 3%;
  }
  .loginForm{
    border: solid 1px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.39), 0 0 6px rgba(0, 0, 0, 0.185);
  }
  .el-collapse-item__header{
    color: #dddddd ! important;
    background-color: transparent ! important;
    border: none ! important;
  }
  .el-collapse{
    border: none ! important;
  }
  .el-collapse-item__wrap{
    background-color: transparent ! important;
  }
  .el-collapse-item__content{
    color: #dddddd ! important;
  }
  .code{
    font-size: 26px;
    line-height: 36px;
    color: #ffffff;
    background-color: rgb(37, 156, 146);
  }
  .changeCode{
    font-size:16px;
    line-height: 36px;
    color: #ffffff;
  }
  .loginRow{
    margin-top: 20px;
  }
  .loginInput{
    font-size: 22px;
  }
  h3{
    font-size: 16px;
    color: #ffffff;
  }
  .infoRow{
    padding-top: 27%;
  }
</style>
