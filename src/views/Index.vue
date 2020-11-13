<template>
  <el-container style="height: 100%;">
    <!-- header部分 -->
    <el-header>
      <header-bar></header-bar>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <nav-bar></nav-bar>
      </el-aside>
      <!-- 右侧主体部分 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavBar from '../components/NavBar'
import HeaderBar from '../components/HeaderBar'
export default {
  name: 'Index',
  components: {
    NavBar,
    HeaderBar
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  height: 100vh;
  // background-color: #d3dce6;
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 200px;
  position: fixed;
  .el-menu {
    border-right: 0;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  // line-height: 160px;
  overflow: hidden;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
