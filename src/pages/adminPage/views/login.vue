<template>
    <div class="login">
      <el-row>
        <el-col :span="3" :offset="8" align="right">
          <h3>用户名：</h3>
        </el-col>
      <el-row>
        <el-col :span="5" align="left">
          <el-input v-model="userName" size="medium" placeholder="请输入"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="8" align="right">
          <h3>密码：</h3>
        </el-col>
      <el-row>
        <el-col :span="5" align="left">
          <el-input v-model="password" size="medium" placeholder="请输入"></el-input>
        </el-col>
      </el-row>
      <el-button @click="login()">登录<el-button>
    </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
    }
  },
  methods: {
    login: function () {
        axios.post('/api_deleteQuestionByType', qs.stringify({ 'userName': 'jack', 'password': '123' })).then(function (respone) {
            console.log(respone.data)
        })
    }
  }
}
</script>
