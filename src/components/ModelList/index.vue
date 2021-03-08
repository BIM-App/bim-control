<template>
  <div class="model">
    <div class="top-info">
      <h2>模型列表（{{ modelList.length }}）</h2>
      <div class="fr">
        <el-link :underline="false" style="fontSize:16px">全部模型</el-link>
      </div>
    </div>
    <ul class="model-list">
      123
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ModelList',
  data() {
    return {
      modelList: []
    }
  }
}
</script>

<style lang="scss" scoped>
.model {
  margin-top: 20px;
  background-color: lightcoral;
  .top-info{
    padding: 0 22px 0 12px;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    // background-color: red;
  }
}
</style>
