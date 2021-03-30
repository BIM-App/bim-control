<template>
  <div class="box">
    <div class="top-info">
      <h2>最近项目列表</h2>
      <div class="fr">
        <el-link
          :underline="false"
          style="fontSize:14px"
          @click="goAllProject"
        >全部项目（{{ projectList.length }}）</el-link>
      </div>
    </div>
    <ul class="project-list">
      <li
        v-for="(item,index) in projectList"
        v-show="index<3"
        :key="item.pid"
        @click="goProjectInfo(item.pid)"
      >
        <div>项目名称：{{ item.pname }}</div>
        <div>
          <span>项目创建者UID：{{ item.creator }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { findProjectsApi } from '@/api/user'
import { getUser } from '@/utils/cookie'
import eventVue from '@/utils/eventVue'
export default {
  name: 'ProjectList',
  data() {
    return {
      projectList: []
    }
  },
  created() {
    this.findProjects()
  },
  methods: {
    // 获取参与项目列表
    findProjects() {
      findProjectsApi(getUser().username).then((res) => {
        // console.log('项目列表查询', res)
        this.projectList = res.data.reverse()
        console.log(res.data)
        this.$store.commit('project/SET_PID', res.data[0].pid)
        // 把数据发射给兄弟组件
        eventVue.$emit('projectList', this.projectList)
      }).catch((err) => {
        console.log(err)
      })
    },
    // 跳转对应pid的项目详情
    goProjectInfo(pid) {
      // console.log(pid)
      this.$router.push({ path: `/project/${pid}` })
    },
    // 获取所有项目列表
    goAllProject() {
      this.$router.push(`/project/index`)
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 33%;
  background-color: #fff;
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
  .project-list {
    // height: 50vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    // align-items: center;
    // background-color: skyblue;
    li {
      margin: 10px 15px;
      padding: 20px;
      width: 30%;
      min-width: 150px;
      height: 150px;
      border-radius: 5px;
      background-color: rgb(227, 244, 255);
    }
    li:hover {
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
      border-color: #eee;
      transition: all 0.2s ease-in-out;
      color: #409eff;
      cursor: pointer;
    }
  }
}

.fr {
  float: right;
  font-size: 12px;
  font-weight: 400px;
}
</style>
