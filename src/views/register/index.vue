<template>
  <el-form
    ref="form"
    :model="form"
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
          v-model="form.username"
          type="text"
          maxlength="12"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="mobile" style="margin-right: 30px">
        <label for="mobile">手机</label>
        <el-input id="mobile" v-model="form.mobile" maxlength="11" />
      </el-form-item>
    </div>
    <el-form-item prop="password">
      <label for="password">密码</label>
      <el-input id="password" v-model="form.password" type="password" />
    </el-form-item>
    <el-form-item prop="checkPass">
      <label for="checkPass">确认密码</label>
      <el-input id="checkPass" v-model="form.checkPass" type="password" />
    </el-form-item>
    <el-form-item v-if="checked" prop="invitationCode">
      <label for="invitationCode">邀请码</label>
      <el-input id="invitationCode" v-model="form.invitationCode" />
    </el-form-item>
    <el-form-item>
      <ul class="forget">
        <li>
          <el-checkbox v-model="checked">通过邀请码注册用户
            <el-popover
              placement="right"
              title="Tip"
              width="200"
              trigger="hover"
              content="通过邀请码注册成为该邀请码所属的公司员工"
            >
              <i slot="reference" class="el-icon-info" />
            </el-popover>
          </el-checkbox>
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
        @click="registerForm('form')"
      >立即注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { registerApi } from '@/api/user'

export default {
  name: 'Register',
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
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      checked: false,
      form: {
        username: '',
        password: '',
        checkPass: '',
        mobile: '',
        invitationCode: '',
        role: ''
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
        ],
        invitationCode: [{ required: true, message: '请输入正确邀请码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度为6个字符', trigger: ['blur', 'change'] }]
      }
    }
  },
  methods: {
    toLogin() {
      this.$router.push('/login')
    },
    // 用户注册
    registerForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            username: _this.form.username,
            password: _this.form.password,
            mobile: _this.form.mobile,
            invitationCode: _this.form.invitationCode,
            role: _this.checked ? 'staff' : 'admin'
          }
          registerApi(data).then((res) => {
            console.log(res)
            if (res.data.status === 201) {
              _this.$alert('注册成功', '提示', {
                confirmButtonText: '确定',
                callback: () => {
                  _this.$router.push('/login')
                }
              })
            }
            if (res.data.status === 402) {
              setTimeout(() => {
                _this.$alert('邀请码错误，请重新注册', '提示', {
                  confirmButtonText: '确定',
                  closeOnClickModal: true
                })
              }, 500)
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 0 auto;
  padding-top: 80px;
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
    margin-top: -10px;
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
  ::v-deep #invitationCode {
    width: 620px;
  }
}
</style>
