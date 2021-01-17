<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    class="content"
    label-width="100px"
    label-position="left"
    status-icon
  >
    <h2 class="login-title">登录</h2>
    <el-form-item prop="username">
      <label for="username">用户名</label>
      <el-input
        id="username"
        v-model="form.username"
        type="text"
        maxlength="12"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item prop="password">
      <label for="password">密码</label>
      <el-input id="password" v-model="form.password" type="password" />
    </el-form-item>
    <el-form-item prop="forget">
      <ul class="forget">
        <li>
          <el-link>忘记密码？</el-link>
        </li>
        <li>
          <span>没有账号？ <el-link @click="toRegister">注册</el-link></span>
        </li>
      </ul>
    </el-form-item>
    <el-form-item prop="login">
      <el-button
        class="login"
        type="primary"
        @click="login('form')"
      >立即登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { loginApi } from '@/api/user'
import { setUser, setRole } from '@/utils/cookie'
export default {
  name: 'Login',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      form: {
        username: 'zakke',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在3到12个字符', trigger: ['blur', 'change'] }
        ],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 用户登录
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          const params = {
            username: _this.form.username,
            password: _this.form.password
          }
          loginApi(params).then((res) => {
            // console.log(res) // for debug
            if (res.data.id) {
              setUser(res.data)
              setRole(res.data.role)
              sessionStorage.setItem('uid', res.data.id)
              _this.$store.commit('user/SET_USER', res.data)
              _this.$store.commit('user/SET_ROLE', res.data.role)
              _this.$router.push('/dashboard')
              _this.$notify({
                title: '成功',
                message: '登录成功',
                type: 'success',
                duration: 1000,
                offset: 80
              })
            }
            // 404状态码回应
            if (res.data.status === 404) {
              // console.log(res)
              this.$message({
                type: 'danger',
                message: '用户名或密码错误，请重新登录'
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
        color: #7c8089;
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
