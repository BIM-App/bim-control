<template>
  <el-form ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    class="content"
    label-width="100px"
    label-position="left"
    status-icon>
    <h2 class="login-title">Sign In</h2>
    <el-form-item prop="username">
      <label for="username">Username</label>
      <el-input
        id="username"
        type="text"
        v-model="ruleForm.username"
        maxlength="12"
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <label for="password">Password</label>
      <el-input id="password" type="password" v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <ul class="forget">
        <li>
          <el-link>Forgot Username Or Password ?</el-link>
        </li>
        <li>
          <span>Don't have an Account ? <el-link @click="toRegister">Register</el-link></span>
        </li>
      </ul>
    </el-form-item>
    <el-form-item>
      <el-button class="login" type="primary" @click="submitForm('ruleForm')">Sign In</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'Login',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      msg: '', //接收数据
      ruleForm: {
        username: 'zakke001',
        password: '123455',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在3到12个字符', trigger: ['blur', 'change'] },
        ],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          let params = new FormData()
          params.append('username', this.ruleForm.username)
          params.append('password', this.ruleForm.password)
          login('/login', params)
            .then((result) => {
              // console.log(result)
              if (result.data.token) {
                window.localStorage.setItem('token', result.data.token)
                window.localStorage.setItem('Uid', result.data.Uid)

                _this.$store.commit('set_token', result.data.token)
                _this.$store.commit('set_Uid', result.data.Uid)

                _this.$router.push('/index')
                _this.$notify({
                  title: '成功',
                  message: '登录成功',
                  type: 'success',
                  duration: 1000,
                  offset: 80,
                })
              }
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    toRegister() {
      this.$router.push('/register')
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  margin: 0 auto;
  margin-top: 15vh;
  display: flex;
  width: 700px;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  // background-color: purple;
  h2 {
    margin-bottom: 55px;
    font-size: 36px;
    color: #464d5f;
  }
  .el-input {
    width: 620px;
  }
  .forget {
    margin-left: -30px;
    display: flex;
    width: 620px;
    font-size: 16px;
    flex-direction: row;
    justify-content: space-between;
    li:nth-child(1) {
      float: left;
      // background-color: red;
      .el-link {
        font-size: 16px;
        color: #91949c;
      }
    }
    li:nth-last-child(1) {
      float: right;
      color: #91949c;
      // background-color: green;
      .el-link {
        padding-bottom: 4px;
        font-size: 16px;
        color: #7C8089;
      }
    }
  }
  .login {
    margin: 18px 0 0 -30px;
    width: 620px;
    height: 60px;
    font-size: 16px;
    background-color: #5a84fd;
    box-shadow: 3px 3px 5px #90a1d4;
  }
  .el-form-item {
    margin-left: -50px;
    label {
      font-size: 16px;
      font-weight: 500;
      color: #7c8089;
      // text-transform: capitalize;
    }
  }
  ::v-deep .el-input__inner {
    height: 46px;
    font-size: 16px;
  }
}
</style>
