<template>
  <div class="taskAside">
    <div class="top-info">
      <h2>任务列表（{{ taskList.length }}）</h2>
      <div class="fr">
        <el-link
          :underline="false"
          style="fontSize:14px"
          @click="goAllTask"
        >全部任务</el-link>
      </div>
    </div>
    <ul class="task-list">
      <li
        v-for="item in taskList"
        :key="item.tid"
      >
        <div>任务名称：{{ item.TName }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import eventVue from '@/utils/eventVue'
import { findTaskByPIDApi } from '@/api/task'
export default {
  name: 'TaskList',
  data() {
    return {
      taskList: []
    }
  },
  created() {
    this.receiveData()
  },
  methods: {
    // 接收兄弟组件传来的值
    receiveData() {
      eventVue.$on('currentProjectId', (data) => {
        console.log(data)
        this.findTaskByPID(data)
      })
    },
    findTaskByPID(pid) {
      findTaskByPIDApi(pid).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          this.taskList = res.data.data
        }
        console.log(this.taskList)
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取所有任务列表
    goAllTask() {
      this.$router.push(`/task/index`)
    }
  }
}
</script>

<style lang="scss" scoped>
.taskAside {
  width: 100%;
  height: 100%;
  background-color: #fff;
  // margin-top: 10px;
  // height: auto;
  // background-color: lightgreen;
  // border-radius: 10px;
  // border: 3px solid gainsboro;
  .top-info {
    padding: 0 22px 0 12px;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 700;
    border-bottom: 1px solid #f3f4f5;
    // background-color: #eee;
  }
  .task-list {
    // padding-right: 50px;
    li {
      margin: 16px;
      height: 40px;
      font-size: 20px;
      line-height: 40px;
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
