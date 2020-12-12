<template>
  <div>
    <top-bar />
    <el-main>
      <div class="user-box">
        <div class="avatar">
          <img :src="user.avatar" alt="" />
          <div class="user-info">
            <div>昵称：{{ user.nickname }}</div>
            <div>用户：{{ user.username }}</div>
          </div>
          <div class="change">
            <el-button type="primary">修改个人信息</el-button>
          </div>
        </div>
        <div class="other-info">
          <ul>
            <li>姓名</li>
            <li>性别</li>
            <li>年龄</li>
            <li>工作单位</li>
            <li>电话</li>
            <li>QQ</li>
            <li>邮箱</li>
          </ul>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
export default {
  name: 'Profile',
  components: { TopBar },
  data() {
    return {
      user: {
        id: '',
        nickname: '笑傲江湖',
        username: 'Zakke',
        avatar: 'https://api.ixiaowai.cn/api/api.php',
        gender: '',
        age: '',
        workUnit: '',
        mobile: '',
        QQ: '16776047778',
        email: '',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  height: 89vh;
  background-color: #eeeff4;
  color: #333;
  // text-align: center;
  .user-box {
    width: 800px;
    height: 600px;
    background-color: lightgreen;
    .avatar {
      display: flex;
      margin-left: 50px;
      margin-top: 20px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid skyblue;
      }
      .user-info {
        margin: 20px 0 0 100px;
        font-size: 20px;
      }
      .change {
        margin-left: 70px;
        line-height: 86px;
      }
    }
    .other-info {
      ul li {
        margin: 20px;
        line-height: 50px;
        list-style: none;
        background-color: pink;
      }
    }
  }
}
</style>
