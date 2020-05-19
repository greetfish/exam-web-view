
<template>
  <div id="app">
    <el-container direction="vertical" id="container1">
      <el-header>
        <el-row>
          <el-col :span="8" align="left"><h1><i class="el-icon-trophy"></i> {{ systemName }}</h1></el-col>
          <el-col :span="16" align="right" class="topTool">
            <el-avatar :size="50" v-bind:src="pic"></el-avatar><a @click="showLoginForm()">{{ usernameInput }}</a>
            <el-tooltip class="item" effect="dark" content="系统设置" placement="bottom">
              <i class="el-icon-s-tools topIcon" @click="showSystemSetting()"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
              <i class="el-icon-switch-button topIcon" @click="logOut()"></i>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-header>
      <el-container id="container2">
        <el-aside>
           <el-menu :router="true" text-color="#303133" active-text-color="#409EFF" class="el-menu-vertical-demo">
            <el-submenu index="/">
              <template slot="title">
                <i class="el-icon-s-cooperation"></i><span>考试控制</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/paperForExam">待考试卷</el-menu-item>
                <el-menu-item index="/examingControl">考场控制</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/paperGenerate">
              <i class="el-icon-document"></i>
              <span slot="title">试卷生成</span>
            </el-menu-item>
            <el-menu-item index="/courseManage">
              <i class="el-icon-menu"></i>
              <span slot="title">科目管理</span>
            </el-menu-item>
            <el-menu-item index="/paperArchive">
              <i class="el-icon-coin"></i>
              <span slot="title">归档试卷</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view v-if="isActive"/>
        </el-main>
      </el-container>
      <el-dialog :visible.sync="loginDialog" title="请登录" @close="loginDialogClose()" width="30%">
        <a size="small" @click="backToMemberLogin()">返回考生登录</a>
        <el-divider></el-divider>
        <el-row class="loginRow">
            <el-col :span="5" :offset="2" align="right" style="margin-top:6px">
              用户名：
            </el-col>
            <el-col :span="10" :offset="1" align="left">
              <el-input v-model="usernameInput" size="medium" placeholder="输入用户名"></el-input>
            </el-col>
        </el-row>
        <el-row class="loginRow">
          <el-col :span="5" :offset="2" align="right" style="margin-top:6px">
            密码：
          </el-col>
          <el-col :span="10" :offset="1" align="left">
            <el-input v-model="passwordInput" size="medium" type="password" placeholder="输入密码"></el-input>
          </el-col>
        </el-row>
        <el-row class="loginRow">
            <el-col :span="18" align="right">
              <el-button size="medium" @click="goLogin()">登录</el-button>
            </el-col>
        </el-row>
      </el-dialog>
      <el-drawer title="系统设置" :visible.sync="drawer" :direction="direction" >
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="系统配置" name="1" class="collapseItem">
            <el-row class="firstRowInDrawer">
              <el-col :span="7" :offset="1" align="left" class="discribeInDrawer">
                系统名称：
              </el-col>
              <el-col :span="14" align="left">
                <el-input v-model="systemNameInput" placeholder="更改系统名称"></el-input>
              </el-col>
            </el-row>
            <el-row class="rowInItemForButton">
              <el-col :span="3" :offset="8" align="left">
                <el-button size="medium" @click="changeSystemName()">确定</el-button>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="账户设置" name="2" class="collapseItem">
            <el-row class="rowInItem">
              <el-col :span="7" :offset="1" align="right" class="discribeInDrawer">
                新的密码：
              </el-col>
              <el-col :span="14" align="left">
                <el-input v-model="newPassWord" placeholder="输入新的登录密码"></el-input>
              </el-col>
            </el-row>
            <el-row class="rowInItem">
              <el-col :span="7" :offset="1" align="right" class="discribeInDrawer">
                确认密码：
              </el-col>
              <el-col :span="14" align="left">
                <el-input v-model="newPassWordAgain" placeholder="再次输入新的登录密码"></el-input>
              </el-col>
            </el-row>
            <el-row class="rowInItemForButton">
              <el-col :span="3" :offset="8" align="left">
                <el-button size="medium" @click="changePassword()">确定</el-button>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="关于" name="3" class="collapseItem">
            <el-row class="rowInItem">
              <el-col :span="8" :offset="1" align="right">
                开发人员：
              </el-col>
              <el-col :span="12" align="left">
                杨万
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
            <el-row class="rowInItem">
              <el-col :span="15" :offset="6" align="left">
                CopyRight@96721部队 2019-10
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-drawer>
    </el-container>
  </div>
</template>

<style type="text/css">
html,body,#app,.el-container{
  padding: 0px;
  margin: 0px;
  height: 100%;
  color: rgb(138, 138, 138);
  min-height: 800px;
  min-width: 1200px;
}
h1{
  color:#409EFF;
  font-size: 40px;
}
.topTool{
  margin: 33.2px 0;
}
#container2{
  height: 85%;
}
.el-header{
  background-color: #ffffff;
  z-index: 100;
  position: relative;
  box-shadow:0px 0px 6px #8b8b8b;
  text-align: right;
  height: 15% ! important;
  background-image: url('/img/topBackground.jpg')
}
.el-aside{
  background-color: #ffffff;
  box-shadow:0px 0px 5px #8b8b8b;
  z-index: 99;
  position: relative;
  width: 400px;
}
.el-main{
  background-color: #ffffff;
  padding: 0px 20px 0px 20px ! important;
  min-width: 800px;
}
.logo{
  height: 90px;
}
.link{
  text-decoration: none;
}
.topIcon{
  margin-left: 30px;
}
.firstRowInDrawer{
  margin-top: 50px;
}
.discribeInDrawer{
  margin-top: 5px;
}
.collapseItem{
  padding-left: 30px;
  margin-top: 30px;
}
.rowInItem{
  margin-top: 10px;
}
.rowInItemForButton{
  margin-top: 10px;
  margin-bottom: 30px;
}
.loginRow{
  margin-top: 10px;
}
</style>

<script type="text/javascript">
import axios from 'axios'
import qs from 'qs'
export default {
  provide: function () {
    return {
      reload: this.reload
    }
  },
  data: function () {
    return {
      isActive: true,
      pic: '/img/head.jpg',
      drawer: false,
      direction: 'rtl',
      activeName: '3',
      systemNameInput: '',
      newUserName: '',
      newPassWord: '',
      newPassWordAgain: '',
      loginDialog: true,
      usernameInput: '',
      passwordInput: '',
      loginSuccess: false,
      systemName: ''
    }
  },
  created: function () {
    this.getSystemName()
    this.$router.push({
      path: '/home'
    })
  },
  methods: {
    changePassword: function () {
      if (this.newPassWord !== this.newPassWordAgain) {
        this.showErrorMsg('两次输入的密码不一致，请重试')
        this.newPassWord = ''
        this.newPassWordAgain = ''
        return
      }
      var _this = this
      axios.post('/api_changePassword', qs.stringify({ 'newPassword': _this.newPassWord })).then(function (respone) {
        _this.showSuccessMsg(respone.data)
        _this.newPassWord = ''
        _this.newPassWordAgain = ''
      })
    },
    getSystemName: function () {
      var _this = this
      axios.get('/user_getSystemName').then(function (respone) {
        _this.systemName = respone.data
      })
    },
    changeSystemName: function () {
      var _this = this
      axios.post('/api_changeSystemName', qs.stringify({ 'newSystemName': _this.systemNameInput })).then(function (respone) {
        _this.showSuccessMsg(respone.data)
        _this.getSystemName()
        _this.systemNameInput = ''
      })
    },
    reload: function () {
      this.isActive = false
      this.$nextTick(function () {
        this.isActive = true
      })
    },
    showLoginForm: function () {
      console.log('aaa')
      this.loginDialog = true
    },
    loginDialogClose: function () {
      var _this = this
      if (_this.loginSuccess === false) {
        setTimeout(() => {
          _this.loginDialog = true
          _this.showErrorMsg('请先登录')
        }, 1000)
      }
    },
    goLogin: function () {
      var _this = this
      axios.post('/login', qs.stringify({ 'username': _this.usernameInput, 'password': _this.passwordInput })).then(function (respone) {
        console.log(respone.data)
        if (respone.data.status === '200') {
          _this.loginSuccess = true
          _this.showSuccessMsg('登录成功')
          _this.loginDialog = false
        } else if (respone.data.status === '400') {
          _this.showErrorMsg('用户名或密码错误，请重新输入')
          _this.passwordInput = ''
        }
      })
    },
    logOut: function () {
      var _this = this
      _this.$alert('退出登录？', '提示', {
        confirmButtonText: '继续',
        callback: action => {
          if (action === 'confirm') {
            axios.post('/logout').then(function (respone) {
              console.log(respone.data)
            })
            _this.showSuccessMsg('成功注销登录！')
            _this.loginSuccess = false
            _this.loginDialog = true
            setTimeout(() => {
              _this.$router.push({
                path: '/'
              })
            }, 1000)
          }
        }
      })
    },
    backToMemberLogin: function () {
      this.$router.push({
        path: '/'
      })
    },
    showSystemSetting: function () {
      this.drawer = true
    },
    handleClose: function (done) {
      this.$confirm('确认关闭？').then(_ => {
        done()
      }).catch(_ => {})
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
