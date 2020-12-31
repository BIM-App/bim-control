<template>
  <header class="header">
    <div class="top-left">
      <span class="home" @click="jumpRouter('/index')">首页</span>
    </div>
    <div class="top-right">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-avatar class="user-avatar" :src="avatar"></el-avatar>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" router>
          <el-dropdown-item @click.native="jumpRouter('/profile')"
            >个人信息</el-dropdown-item
          >
          <el-dropdown-item @click.native="jumpRouter('/login')"
            >退出账号</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TopBar',
  data() {
    return {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    }
  },
  methods: {
    jumpRouter(url) {
      this.$router.push(url)
      if (url === '/login') {
        this.$store.commit('del_all')
      }
    },
  },
}
</script>

<style lang="scss">
.header {
  position: fixed;
  height: 55px;
  padding: 0 30px;
  left: 0;
  right: 0;
  top: 0;
  background-color: #ffffff;
  border-bottom: 1px solid #e8e9ed;
  z-index: 9999;
  .top-left {
    float: left;
    position: relative;
    left: 16px;
    top: 16px;
    .home {
      background-color: #eee;
      cursor: pointer;
    }
  }
  .top-right {
    float: right;
    padding-right: 0;
    position: relative;
    left: -16px;
    top: 16px;
    .el-dropdown-link {
      cursor: pointer;
      .user-avatar {
        width: 40px;
        height: 40px;
        margin-top: -10px;
        border-radius: 50%;
        border: 1px solid skyblue;
      }
    }
    .demonstration {
      display: block;
      color: #8492a6;
      font-size: 14px;
      margin-bottom: 20px;
    }
  }
}
</style>
