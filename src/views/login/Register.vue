<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="register-box" label-width="100px" label-position="left" status-icon>
    <h2 class="register-title">欢迎注册</h2>
    <el-form-item label="用户名" prop="username">
      <el-input type="text" v-model="ruleForm.username" maxlength="12" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item class="register-btn">
      <el-button type="primary" @click="registerForm('ruleForm')">注册</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Register',
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
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      msg: '',	//接收数据
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        email: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在3到12个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    registerForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          this.$axios.post(
            'http://localhost:4000/api/register',
            {
              username: _this.ruleForm.username,
              password: _this.ruleForm.password,
              email: _this.ruleForm.email
            }).then((result) => {
              console.log(result.data);
              this.msg = result.data.msg
            }).catch((err) => {
              console.log(err);
            });
        } else {
          console.log('error register!!');
          return false;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.register-box {
  margin: 150px auto;
  padding: 10px 20px;
  width: 480px;
  border-radius: 10px;
  box-shadow: 0 0 25px #909399;
  .register-title {
    text-align: center;
  }
}
.register-btn {
  margin-left: -60px;
  text-align: center;
  .el-button {
    width: 100px;
    margin-right: 50px;
  }
}
</style>