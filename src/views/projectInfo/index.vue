<template>
  <div>
    <div class="top-info">
      <h2>{{ projectInfo.pname }}</h2>
      <div class="fr">
        <el-button
          size="mini"
          type="primary"
        >
          测试
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteProject"
        >
          删除项目
        </el-button>
      </div>
    </div>
    <div class="project-info">
      <section class="project-image">
        <div class="block">
          <el-carousel height="250px">
            <el-carousel-item>
              <img
                :src="projectInfo.picture"
                alt=""
              >
            </el-carousel-item>
          </el-carousel>
        </div>
      </section>
      <section>
        {{ projectInfo.description }}
      </section>
      <section>
        {{ projectInfo }}
      </section>
    </div>
  </div>
</template>

<script>
import { findProjectInfoApi, deleteProjectApi } from '@/api/project'
export default {
  data() {
    return {
      projectInfo: {}
    }
  },
  created() {
    this.findProjectInfo()
  },
  methods: {
    findProjectInfo() {
      // 路由params传参 this.$route.params
      findProjectInfoApi(this.$route.params.pid).then((res) => {
        console.log('项目详情', res)
        if (res.data) {
          this.projectInfo = res.data
          console.log(this.projectInfo)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    deleteProject() {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProjectApi(this.$route.params.pid).then((res) => {
          // console.log(res)
          if (res.data.status === 204) {
            this.$message({
              message: '项目删除成功',
              type: 'success'
            })
            this.$router.push({ path: '/project/index' })
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.top-info {
  padding: 0 20px 0 12px;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  background-color: #eee;
}
.block {
  width: 500px;
  background-color: pink;
  img {
    max-width: 100%;
    // max-height: 100%;
  }
}
</style>
