<template>
  <div class="container">
    <div
      v-show="this.$route.name === 'ProjectInfo'"
      class="top-info"
    >
      <h2>{{ projectInfo.pname }}</h2>
      <div class="fr">
        <el-button
          size="mini"
          type="primary"
          @click="goMember"
        >
          项目成员管理
        </el-button>
        <el-button
          size="mini"
          type="primary"
          @click="goParticipant"
        >
          参建方单位
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
    <div
      v-show="this.$route.name === 'ProjectInfo'"
      class="project-info"
    >
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
    <router-view :project-info="projectInfo" />
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
    goMember() {
      this.$router.push({ path: `${this.$route.params.pid}/member` })
    },
    // 跳转对应项目的参建方
    goParticipant() {
      this.$router.push({ path: `${this.$route.params.pid}/participant` })
    },
    findProjectInfo() {
      // 路由params传参 this.$route.params
      findProjectInfoApi(Number(this.$route.params.pid)).then((res) => {
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
        deleteProjectApi(Number(this.$route.params.pid)).then((res) => {
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
.container {
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
.project-info {
  padding: 12px;
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
