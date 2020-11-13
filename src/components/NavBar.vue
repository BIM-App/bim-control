<template>
  <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen"
    @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#409EFF"
    router>
    <el-menu-item disabled>
      <span slot="title">$$$$$$$$$$</span>
    </el-menu-item>
    <el-submenu index="/management">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>项目管理</span>
      </template>
      <el-menu-item index="/projectAdd">添加项目</el-menu-item>
    </el-submenu>
    <!-- <el-menu-item index="/management">
      <i class="el-icon-menu"></i>
      <span slot="title">项目管理</span>
    </el-menu-item> -->
    <el-menu-item index="/modellist">
      <i class="el-icon-document"></i>
      <span slot="title">模型列表</span>
    </el-menu-item>
    <el-menu-item index="/profile">
      <i class="el-icon-setting"></i>
      <span slot="title">个人信息</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {

    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
}
</script>

<style>
</style>
