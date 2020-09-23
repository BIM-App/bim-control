<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="login-box" label-width="100px" label-position="left" status-icon>
    <h2 class="login-title">欢迎登录</h2>
    <el-form-item label="用户名" prop="username">
      <el-input type="text" v-model="ruleForm.username" maxlength="12" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-link class="lost" type="danger" :underline="false">忘记密码</el-link>
      <el-link @click="toRegister" class="register" type="primary" :underline="false">立即注册</el-link>
    </el-form-item>
    <el-form-item class="login-btn">
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      <!-- <el-button type="primary" @click="registerForm('ruleForm')">注册</el-button> -->
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Login',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    return {
      msg: '',	//接收数据
      ruleForm: {
        username: 'admin',
        password: 'admin'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在3到12个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          this.$axios.post(
            'http://localhost:4000/api/login',
            {
              username: _this.ruleForm.username,
              password: _this.ruleForm.password
            }).then((result) => {
              // console.log(result.data);
              this.msg = result.data.msg

              if (result.data.msg == '登录成功') {
                _this.$router.push('/index')
                _this.$notify({
                  title: '成功',
                  message: '登录成功',
                  type: 'success'
                })
              }

            }).catch((err) => {
              console.log(err);
            });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toRegister() {
      this.$router.push('/register')
    }
  },
}
</script>

<style lang="scss" scoped>
.login-box {
  margin: 150px auto;
  padding: 10px 20px;
  width: 480px;
  // background-color: pink;
  border-radius: 10px;
  box-shadow: 0 0 25px #909399;
  .login-title {
    margin: 20px 0;
    text-align: center;
  }
}

.lost,
.register {
  margin-left: 50px;
}

.login-btn {
  margin-left: -60px;
  text-align: center;
  .el-button {
    width: 100px;
    margin-right: 50px;
  }
}
</style>