<template>
  <div class="taskAside">
    <div class="top-info">
      <h2>任务列表（{{ taskList.length }}）</h2>
      <div class="fr">
        <el-link
          :underline="false"
          style="fontSize:16px"
          @click="goAllTask"
        >全部任务</el-link>
      </div>
    </div>
    <ul class="task-list">
      <li
        v-for="item in taskList"
        :key="item.tid"
      >
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
      taskList: [{ tname: 'dadadadaddddddddddddddddadA测试' }, { tname: 1 }, { tname: 1 }, { tname: 1 }, { tname: 1 }, { tname: 1 }, { tname: 1 }, { tname: 1 }]
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
  width: 340px;
  // margin-top: 10px;
  // height: auto;
  // background-color: lightgreen;
  border-radius: 10px;
  border: 3px solid gainsboro;
  .top-info {
    padding: 0 22px 0 12px;
    height: 40px;
    line-height: 40px;
    display: flex;
    border-radius: 10px;
    border: 1px solid gainsboro;
    justify-content: space-between;
    background-color: #eee;
  }
  .task-list {
    // padding-right: 50px;
    li {
      margin: 16px;
      height: 40px;
      font-size: 20px;
      // line-height: 24px;
      background: rgb(227, 244, 255);
      overflow: hidden;
      border-radius: 5px;
    }
    li:hover {
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
      border-color: #eee;
      transition: all 0.2s ease-in-out;
    }
  }
}
</style>
