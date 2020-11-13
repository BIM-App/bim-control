<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" style="height:30px">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加项目</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="project-card">
      <el-form ref="form" :model="ProjectForm" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="ProjectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="ProjectForm.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="projectAdd">添加项目</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
</style>
