<template>
  <div class="taskAside">
    <div class="top-info">
      <h2>任务列表（{{ taskList.length }}）</h2>
      <div class="fr">
        <el-link :underline="false" style="fontSize:16px">全部任务</el-link>
      </div>
    </div>
    <ul class="task-list">
      12
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  data() {
    return {
      taskList: []
    }
  }
}
</script>

<style lang="scss" scoped>
.taskAside{
  // margin-top: 10px;
  // height: auto;
  background-color: lightgreen;
  border-left: 1px solid gainsboro;
  .top-info{
    padding: 0 22px 0 12px;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    // background-color: red;
  }
}
</style>
