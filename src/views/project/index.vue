<template>
  <div class="project-container">
    <div class="top-info">
      <h2>项目</h2>
      <div class="fr">
        <el-button
          size="mini"
          type="info"
          @click="changeView"
        >
          {{ viewList === true ? "列表视图" : "卡片视图" }}
        </el-button>
        <el-button
          size="mini"
          type="primary"
          @click="getNewProject()"
        >
          新建项目
        </el-button>
      </div>
    </div>
    <view-card v-show="!viewList" />
    <view-list v-show="viewList" />
    <project-new />
  </div>
</template>

<script>
import ViewCard from './ViewCard.vue'
import ViewList from './ViewList.vue'
import ProjectNew from '@/views/project/ProjectNew'
import eventVue from '@/utils/eventVue'
export default {
  components: {
    ViewCard,
    ViewList,
    ProjectNew
  },
  data() {
    return {
      viewList: false,
      dialog: ''
    }
  },
  methods: {
    // 切换视图
    changeView() {
      this.viewList = !this.viewList
      // console.log(this.viewList)
    },
    // 新建项目
    getNewProject() {
      this.dialog = true
      // 把数据发射给兄弟组件
      eventVue.$emit('dialog', this.dialog)
      console.log(this.dialog)
    }
  }
}
</script>

<style lang="scss" scoped>
.project-container {
  margin: 8px;
  background-color: #fff;
  width: 99%;
  height: 99%;
  position: absolute;
}
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
</style>
