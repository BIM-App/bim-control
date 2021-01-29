<template>
  <div class="user">
    <div class="user-box">
      <div class="avatar">
        <el-upload
          ref=""
          action=""
          :on-change="handleChange"
          :http-request="uploadPicture"
          :auto-upload="true"
          :show-file-list="false"
        >
          <img :src="user.avatar" alt="">
        </el-upload>
        <div class="user-info">
          <div>
            <span>用户名：{{ user.username }}</span><br>
          </div>
        </div>
        <div class="change">
          <el-button type="primary" @click.native="dialogFormVisible = true">修改个人信息</el-button>
          <el-button type="danger" @click="deleteUser()">注销用户</el-button>
        </div>
      </div>
      <div class="other-info">
        <ul>
          <li>用户昵称：{{ user.name }}</li>
          <li>用户密码：{{ user.password }}</li>
          <li>性别：{{ user.gender }}</li>
          <li>年龄：{{ user.age }}</li>
          <li>工作单位：{{ user.workunit }}</li>
          <li>手机：{{ user.mobile }}</li>
          <li>QQ：{{ user.qq }}</li>
          <li>邮箱：{{ user.email }}</li>
        </ul>
      </div>
    </div>
    <!-- 修改个人资料Dialog -->
    <el-dialog title="修改个人资料" :visible.sync="dialogFormVisible" style="margin-top:-40px">
      <el-row :gutter="15">
        <el-form ref="form" :model="form" label-width="100px">
          <el-col :span="22">
            <el-form-item label="用户昵称" prop="name">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="性别" prop="gender">
              <el-input v-model="form.gender" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="form.age" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="工作单位" prop="workunit">
              <el-input v-model="form.workunit" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="手机" prop="mobile">
              <el-input v-model="form.mobile" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="QQ" prop="qq">
              <el-input v-model="form.qq" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false
            updateUser()
          "
        >确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUser, setUser, removeUser, removeMember, removeProjectPID } from '@/utils/cookie'
import { findUserApi, updateUserApi, addUserPictureApi, deleteUserApi } from '@/api/user'
import eventVue from '@/utils/eventVue'

export default {
  name: 'Profile',
  data() {
    return {
      user: {},
      dialogFormVisible: false,
      form: {},
      pictureFile: ''
    }
  },
  mounted() {
    // 查询用户信息
    findUserApi(getUser().id).then((res) => {
      console.log(res.data)
      this.user = res.data
      this.form = res.data
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    // 获取上传的图片
    handleChange(file, fileList) {
      this.pictureFile = file.raw
      // console.log(this.form.Picture);
    },
    // 提交修改用户信息表单
    updateUser() {
      const _this = this
      const data = {
        id: this.user.id,
        username: this.user.username,
        password: this.form.password,
        name: this.form.name,
        gender: this.form.gender,
        age: this.form.age,
        workunit: this.form.workunit,
        mobile: this.form.mobile,
        qq: this.form.qq,
        email: this.form.email
      }
      updateUserApi(data).then((res) => {
        // console.log(res)
        if (res.data.status === 200) {
          // 查询用户信息
          findUserApi((getUser().id))
          _this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 1000,
            offset: 80
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 上传用户头像
    uploadPicture() {
      const _this = this
      const data = new FormData()
      data.append('uid', getUser().id)
      data.append('pictureFile', this.pictureFile)
      addUserPictureApi(data).then((res) => {
        console.log(res)
        if (res.data.status === 201) {
          // 查询用户信息
          findUserApi(getUser().id).then((res) => {
            // console.log(res)
            _this.user.avatar = res.data.avatar // 更新页面头像
            setUser(res.data) // 更新cookie里的用户信息
            // 向兄弟组件传值
            eventVue.$emit('avatar', res.data.avatar)
          }).catch((err) => {
            console.log(err)
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 注销用户
    deleteUser() {
      const _this = this
      deleteUserApi(getUser().id, getUser().username).then((res) => {
        // console.log(res)
        if (res.data.status === 204) {
          _this.$store.commit('user/SET_USER', '')
          removeUser()
          removeMember()
          removeProjectPID()
          _this.$router.replace(`/login?redirect=${this.$route.fullPath}`)
          _this.$notify({
            title: '成功',
            message: '注销成功',
            type: 'success',
            duration: 1000,
            offset: 80
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  overflow:auto
}
.user {
  // margin-top: -5px;
  display: flex;
  justify-content: center;
  align-items: center;
  // margin-top: 50px;
  height: 89vh;
  // background-color: #eeeff4;
  color: #333;
  text-align: center;
  .user-box {
    width: 800px;
    height: 600px;
    // background-color: lightgreen;
    .avatar {
      display: flex;
      margin-left: 50px;
      margin-top: 20px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        // border: 1px solid skyblue;
        cursor: pointer;
      }
      .user-info {
        margin: 5px 0 5px 100px;
        padding: 5px;
        font-size: 20px;
        line-height: 80px;
        span {
          background-color: #eeeff4;
        }
      }
      .change {
        margin-left: 90px;
        line-height: 86px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // background-color: red;
        :nth-child(2) {
          margin-left: 30px;
        }
      }
    }
    .other-info {
      ul li {
        margin: 15px;
        padding-left: 20px;
        line-height: 50px;
        list-style: none;
        background-color: #eeeff4;
        border-radius: 20px;
      }
    }
  }
}
</style>
