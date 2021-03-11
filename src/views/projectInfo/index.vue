<template>
  <div>
    <div class="top-info">
      <h2>{{ projectInfo.pname }}</h2>
      <div class="fr">
        <el-button
          size="mini"
          type="primary"
        >
          123
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
    </div>
  </div>
</template>

<script>
import { findProjectInfoApi } from '@/api/project'
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
