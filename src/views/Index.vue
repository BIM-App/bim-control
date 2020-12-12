<template>
  <div>
    <el-header>
      <top-bar />
    </el-header>
    <el-main>
      <dynamic-list />
    </el-main>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import DynamicList from '@/components/DynamicList'
export default {
  name: 'Index',
  components: {
    TopBar,
    DynamicList,
  },
}
</script>

<style lang="scss">
.el-main {
  height: 89vh;
  background-color: #eeeff4;
  color: #333;
  // text-align: center;
}
</style>
