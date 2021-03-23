<template>
  <div class="taskAside">
    <div class="top-info">
      <div>
        任务列表（{{ taskList.length }}）
        <span class="datanav">！当前项目：{{ "测试项目" }}</span>
      </div>
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
        <div class="taskname">{{ item.tname }}</div>
        <div class="taskmsg">{{ item.description }}</div>
        <div class="taskCreator">发布人：{{ item.Creator }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  data() {
    return {
      taskList: [
        {
          tname: '这是一条测试任务',
          description: 'xxx项目的xxxx位置出现xxxxx问题，请尽快修复',
          Creator: 'kzz'
        },
        {
          tname: '这是一条测试任务',
          description: 'xxx项目的xxxx位置出现xxxxx问题，请尽快修复',
          Creator: 'kzz'
        },
        {
          tname: '这是一条测试任务',
          description: 'xxx项目的xxxx位置出现xxxxx问题，请尽快修复',
          Creator: 'kzz'
        },
        {
          tname: '这是一条测试任务',
          description: 'xxx项目的xxxx位置出现xxxxx问题，请尽快修复',
          Creator: 'kzz'
        },
        {
          tname: '这是一条测试任务',
          description: 'xxx项目的xxxx位置出现xxxxx问题，请尽快修复',
          Creator: 'kzz'
        },
        {
          tname: '这是一条测试任务',
          description: 'xxx项目的xxxx位置出现xxxxx问题，请尽快修复',
          Creator: 'kzz'
        },
        {
          tname: '这是一条测试任务',
          description: 'xxx项目的xxxx位置出现xxxxx问题，请尽快修复',
          Creator: 'kzz'
        }
      ]
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
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: auto;
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
    .datanav {
      font-size: 12px;
      font-weight: 400;
      color: #f04844;
      padding: 0 30px 0 -10px;
    }
  }
  .task-list {
    // padding-right: 50px;
    li {
      margin: 16px;
      padding: 8px;
      // height: 40px;
      font-size: 16px;
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
.taskname {
  // color: #4b5053;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 16px;
}
.taskmsg {
  margin: 8px 0;
  color: #4b5053;
  font-size: 15px;
  margin-bottom: 15px;
}
.taskCreator {
  color: #72777a;
  font-size: 12px;
  line-height: 1.8;
}
</style>
