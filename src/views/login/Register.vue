<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="register-box" label-width="100px" label-position="left" status-icon>
    <el-link class="back" type="primary" @click="back">返回</el-link>
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
    <el-form-item label="电话" prop="phone">
      <el-input v-model="ruleForm.phone"></el-input>
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
        phone: ''
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
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
            // pattern: /^[1]([3-9])[0-9]{9}$/,   //若太过严谨则使用这个
            message: '请输入正确的手机号码', trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    back() {
      this.$router.push('/login')
    },
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
              phone: _this.ruleForm.phone
            }).then((result) => {
              // console.log(result.data);
              this.msg = result.data.msg
              if (result.data.status == 200) {
                this.$alert('注册成功', '提示', {
                  confirmButtonText: '确定',
                  callback: () => {
                    this.$router.push('/login')
                  }
                })
              }
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
.back {
  float: left;
}
.register-box {
  margin: 150px auto;
  padding: 10px 20px;
  width: 480px;
  border-radius: 10px;
  box-shadow: 0 0 25px #909399;
  .register-title {
    margin: 20px 0;
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