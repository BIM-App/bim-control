<template>
  <div>
    <el-drawer
      title="新建项目"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
import eventVue from '@/utils/eventVue'
export default {
  name: 'ProjectNew',
  data() {
    return {
      drawer: false,
      direction: 'rtl'
    }
  },
  created() {
    this.receiveData()
  },
  methods: {
    // 接收数据
    receiveData() {
      eventVue.$on('drawer', (data) => {
        // console.log('project-new接收数据', data)
        this.drawer = data
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-drawer__header span:focus {
    outline: 0;
  }
</style>
