<template>
  <div>
    <!-- 卡片视图 -->
    <ul class="cardView">
      <li
        v-for="item in allProjectList"
        :key="item.pid"
        @click="openDetails(item.pid)"
      >
        <div>{{ item.pname }}</div>
        <!-- <div>{{ item.creator }}</div> -->
      </li>
    </ul>
  </div>
</template>

<script>
import { findProjectsApi } from '@/api/user'
import { getUser } from '@/utils/cookie'
import eventVue from '@/utils/eventVue'
export default {
  name: 'ViewCard',
  data() {
    return {
      allProjectList: []
    }
  },
  created() {
    this.findProjects()
    this.receiveData()
  },
  methods: {
    // 接收共享数据
    receiveData() {
      eventVue.$on('addFlag', (data) => {
        console.log(data)
        this.findProjects()
      })
    },
    // 获取所有参与项目列表
    findProjects() {
      findProjectsApi(getUser().username).then((res) => {
        console.log(res)
        if (res.data.status === 404) {
          this.allProjectList = ''
        } else {
          this.allProjectList = res.data
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    openDetails(pid) {
      this.$router.push(`/project/${pid}`)
    }
  }
}
</script>

<style lang="scss">
.cardView {
  // height: 50vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  // align-items: center;
  // background-color: skyblue;
  li {
    margin: 10px 10px;
    padding: 20px;
    width: 300px;
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
</style>
