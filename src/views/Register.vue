<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    class="content"
    label-width="100px"
    status-icon
  >
    <h2 class="login-title">Sign Up</h2>
    <div class="form-box">
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
      <el-form-item prop="phone" style="margin-right: 30px">
        <label for="phone">Phone</label>
        <el-input id="phone" v-model="ruleForm.phone" maxlength="11"></el-input>
      </el-form-item>
    </div>
    <el-form-item prop="password">
      <label for="password">Password</label>
      <el-input id="password" type="password" v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <label for="checkPass">Retype Password</label>
      <el-input id="checkPass" type="password" v-model="ruleForm.checkPass"></el-input>
    </el-form-item>
    <el-form-item>
      <ul class="forget">
        <li>
          <el-link>Register represent accept our terms</el-link>
        </li>
        <li>
          <span>Already member ? <el-link @click="toLogin">Sing In</el-link></span>
        </li>
      </ul>
    </el-form-item>
    <el-form-item>
      <el-button class="register" type="primary" @click="registerForm('ruleForm')"
        >Sign In</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Register',
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
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      msg: '', //接收数据
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        phone: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在3到12个字符', trigger: ['blur', 'change'] },
        ],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
            // pattern: /^[1]([3-9])[0-9]{9}$/,   //若太过严谨则使用这个
            message: '请输入正确的手机号码',
            trigger: ['blur', 'change'],
          },
        ],
      },
    }
  },
  methods: {
    toLogin() {
      this.$router.push('/login')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    registerForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          let params = new FormData()
          params.append('username', this.ruleForm.username)
          params.append('password', this.ruleForm.password)
          params.append('phone', this.ruleForm.phone)
          login('/register', params)
            .then((result) => {
              console.log(result.data)
              // this.msg = result.data.msg
              if (result.data) {
                this.$alert('注册成功', '提示', {
                  confirmButtonText: '确定',
                  callback: () => {
                    this.$router.push('/login')
                  },
                })
              }
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          console.log('error register!!')
          return false
        }
      })
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
  .form-box {
    display: flex;
    justify-content: space-between;
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
        color: #7c8089;
      }
    }
  }
  .register {
    margin: 15px 0 0 -30px;
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

  ::v-deep #username {
    width: 280px;
  }
  ::v-deep #phone {
    width: 290px;
  }
  ::v-deep #password {
    width: 620px;
  }
  ::v-deep #checkPass {
    width: 620px;
  }
}
</style>
