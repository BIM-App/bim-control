<template>
  <div class="top">
    <div class="top-info">
      <h2>最近项目列表</h2>
      <div class="fr">
        <!-- <el-button type="mini">zhu</el-button> -->
        <el-link :underline="false" style="fontSize:16px">全部项目（{{ projectList.length }}）</el-link>
      </div>
    </div>
    <ul class="project-list">
      <li v-for="(item,index) in projectList" v-show="index<3" :key="item.pid" @click="goProjectInfo(item.pid)">
        <div> {{ item.pname }}</div>
        <div>
          <span>{{ item.creator }}</span>
          <span>item</span>
          <span />
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
        console.log(res)
        if (res.data.length >= 1) {
          this.projectList = res.data.reverse()
          // 把数据发射给兄弟组件
          eventVue.$emit('projectList', this.projectList)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 跳转对应pid的项目详情
    goProjectInfo(pid) {
      console.log(pid)
      this.$router.push(`/project/${pid}/info`)
    }
  }
}
</script>

<style lang="scss" scoped>
.top{
  width: 960px;
  .top-info {
    padding: 0 0px 0 12px;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      background-color: lightcoral;
  }
  .project-list {
    // height: 50vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    // align-items: center;
    background-color: skyblue;
    li {
      margin: 10px 10px;
      padding: 20px;
      width: 300px;
      height: 150px;
      border-radius: 5px;
      background-color: rgb(227,244,255);
    }
    li:hover {
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, .2);
        border-color: #eee;
        transition: all .2s ease-in-out;
        color: #409EFF;
        cursor: pointer;
    }
  }
}

.fr {
  float: right;
}
</style>
