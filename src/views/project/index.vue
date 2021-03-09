<template>
  <div>
    <div class="top-info">
      <h2>项目</h2>
      <div class="fr">
        <!-- <el-link :underline="false" style="fontSize:16px">全部项目</el-link> -->
        <el-button size="mini" type="info" @click="changeView">{{ viewList=== true?'卡片视图':'列表视图' }}</el-button>
        <el-button size="mini" type="primary">新建项目</el-button>
      </div>
    </div>
    <view-card v-show="!viewList" />
    <view-list v-show="viewList" />
  </div>
</template>

<script>
import ViewCard from './ViewCard.vue'
import ViewList from './ViewList.vue'
export default {
  components: {
    ViewCard,
    ViewList
  },
  data() {
    return {
      viewList: false
    }
  },
  methods: {
    changeView() {
      this.viewList = !this.viewList
      // console.log(this.viewList)
    }
  }
}
</script>

<style lang="scss" scoped>
.top-info {
    padding: 0 22px 0 12px;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      background-color: #eee;
  }
</style>
