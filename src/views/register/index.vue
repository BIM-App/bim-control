<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    class="content"
    label-width="100px"
    status-icon
  >
    <h2 class="login-title">注册</h2>
    <div class="form-box">
      <el-form-item prop="username">
        <label for="username">用户名</label>
        <el-input
          id="username"
          v-model="ruleForm.username"
          type="text"
          maxlength="12"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="mobile" style="margin-right: 30px">
        <label for="mobile">手机</label>
        <el-input id="mobile" v-model="ruleForm.mobile" maxlength="11" />
      </el-form-item>
    </div>
    <el-form-item prop="password">
      <label for="password">密码</label>
      <el-input id="password" v-model="ruleForm.password" type="password" />
    </el-form-item>
    <el-form-item prop="checkPass">
      <label for="checkPass">确认密码</label>
      <el-input id="checkPass" v-model="ruleForm.checkPass" type="password" />
    </el-form-item>
    <el-form-item>
      <ul class="forget">
        <li>
          <el-link>Register represent accept our terms</el-link>
        </li>
        <li>
          <span>已经有账号？ <el-link @click="toLogin">马上登录</el-link></span>
        </li>
      </ul>
    </el-form-item>
    <el-form-item>
      <el-button
        class="register"
        type="primary"
        @click="registerForm('ruleForm')"
      >立即注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { register } from '@/api/user'

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
      msg: '', // 接收数据
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在3到12个字符', trigger: ['blur', 'change'] }
        ],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
            // pattern: /^[1]([3-9])[0-9]{9}$/,   //若太过严谨则使用这个
            message: '请输入正确的手机号码',
            trigger: ['blur', 'change']
          }
        ]
      }
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
          // const params = new FormData()
          // params.append('username', this.ruleForm.username)
          // params.append('password', this.ruleForm.password)
          // params.append('mobile', this.ruleForm.mobile)
          const data = {
            'username': _this.ruleForm.username,
            'password': _this.ruleForm.password,
            'mobile': _this.ruleForm.mobile
          }
          register(data)
            .then((res) => {
              // console.log(res)
              // this.msg = res.data.msg
              if (res.data.status === 201) {
                _this.$alert('注册成功', '提示', {
                  confirmButtonText: '确定',
                  callback: () => {
                    _this.$router.push('/login')
                  }
                })
              }
              if (res.data.status === 404) {
                setTimeout(() => {
                  _this.$alert('该用户名重复，请重新注册', '提示', {
                    confirmButtonText: '确定',
                    closeOnClickModal: true
                  })
                }, 500)
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
    }
  }
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
  ::v-deep #mobile {
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
