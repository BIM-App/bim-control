<template>
  <div>
    <div class="top-info">
      <h2>任务</h2>
      <div class="fr">
        <!-- <el-link :underline="false" style="fontSize:16px">全部项目</el-link> -->
        <!-- <el-button size="mini" type="info" @click="changeView">{{ viewList=== true?'卡片视图':'列表视图' }}</el-button> -->
        <el-button size="mini" type="primary">新建任务</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">
.top-info {
    padding: 0 22px 0 12px;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      background-color: #eee;
  }
</style>
