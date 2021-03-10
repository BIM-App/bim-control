<template>
  <div class="taskAside">
    <div class="top-info">
      <h2>任务列表（{{ taskList.length }}）</h2>
      <div class="fr">
        <el-link :underline="false" style="fontSize:16px" @click="goAllTask">全部任务</el-link>
      </div>
    </div>
    <ul class="task-list">
      <li v-for="item in taskList" :key="item.tid">
        <div>{{ item.tname }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  data() {
    return {
      taskList: [{ tname: 'dadadadaddddddddddddddddad测试' }, { tname: 1 }, { tname: 1 }, { tname: 1 }, { tname: 1 }, { tname: 1 }, { tname: 1 }, { tname: 1 }]
    }
  },
  methods: {
    // 获取所有任务列表
    goAllTask() {
      this.$router.push(`/task/index`)
    }
  }
}
</script>

<style lang="scss" scoped>
.taskAside {
  // margin-top: 10px;
  // height: auto;
  background-color: lightgreen;
  border-left: 1px solid gainsboro;
  .top-info {
    padding: 0 22px 0 12px;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    background-color: lightcoral;
  }
  .task-list {
    padding: 5px;
    li {
      margin: 16px;
      height: 40px;
      font-size: 20px;
      // line-height: 24px;
      background-color: skyblue;
      overflow: hidden;
      border-radius: 5px;
    }
  }
}
</style>
