<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    123
  </el-dialog>
</template>

<script>
// import eventVue from '@/utils/eventVue'
export default {
  data() {
    return {
      dialogVisible: false,
      viewer3D: '',
      marker: '',
      modelToken: ''
    }
  },
  created() {},
  mounted() {

  },
  methods: {
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
<style>
</style>
