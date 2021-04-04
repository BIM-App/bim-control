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
        <!-- <h2>项目图片</h2> -->
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
      <section class="des_plan">
        <div class="description">
          <h2>项目描述</h2>
          {{ projectInfo.description }}
        </div>
        <div class="plan-time">
          <h2>项目计划</h2>
          <div class="plan-date">
            <section>
              开始时间
              <i class="el-icon-folder" />
              {{ projectInfo.planstarttime }}
            </section>

            <section>
              结束时间
              <i class="el-icon-folder-checked" />
              {{ projectInfo.planendtime }}
            </section>
            <section class="process">
              项目进度
              <span>
                <el-progress
                  v-if="projectInfo.planstarttime"
                  :percentage="getPresentInfo(projectInfo.planstarttime, projectInfo.planendtime)"
                />
                <el-progress
                  v-else
                  :percentage="0"
                />
              </span>
            </section>
          </div>
        </div>
      </section>
    </div>
    <div class="other_model">
      <div class="project-other">
        <h2>项目其他信息</h2>
        <!-- <li>{{ projectInfo }}</li> -->
        <li>项目类型：{{ projectInfo.category }}</li>
        <li>项目地址：{{ projectInfo.province }}
          {{ projectInfo.city }}
          {{ projectInfo.district }}
          {{ projectInfo.street }}
          {{ projectInfo.town }}
        </li>
        <li>详细地址：{{ projectInfo.address }}</li>
        <li>项目单位：{{ projectInfo.unit }}</li>
        <li>项目投资额：{{ projectInfo.investamount }}</li>
      </div>
      <div class="model">
        <ul class="model-list">
          <li
            v-for="item in modelList"
            :key="item.MId"
            @click="getModelInfo(item);
                    dialogVisible = true"
          >
            <img :src="item.MPicture">
            <div>{{ item.MName }}</div>
          </li>
          <div
            v-if="!modelList "
            class="model-tip"
          >
            <div>当前项目暂无模型</div>
            <!-- <div>请先选择一个项目以查看模型</div> -->
          </div>
        </ul>
      </div>
    </div>
    <router-view :project-info="projectInfo" />
  </div>
</template>

<script>
import { findProjectInfoApi, deleteProjectApi } from '@/api/project'
import { getPresent } from '@/utils/day'
import { findModelByPIDApi } from '@/api/model'
export default {
  data() {
    return {
      projectInfo: {},
      modelList: []
    }
  },
  created() {
    this.findProjectInfo()
  },
  methods: {
    // 获取进度条
    getPresentInfo(start, end) {
      if (getPresent(start, end) >= 100) {
        return 100
      }
    },

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
      this.findModel()
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
    },
    findModel() {
      findModelByPIDApi(Number(this.$route.params.pid)).then((res) => {
        console.log('模型列表查询', res)
        if (Object.keys(res.data.data).length === 0) {
          this.modelList = ''
        } else {
          this.modelList = res.data.data
        }
      }).catch((err) => {
        console.log(err)
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
  display: flex;
  justify-content: space-between;
  padding: 12px;
  .project-image {
    // background-color: rgb(227, 244, 255);
    border-radius: 5px;
    h2 {
      margin: 10px 0;
    }
  }
  .des_plan {
    .description {
      width: 700px;
      background-color: rgb(227, 244, 255);
      overflow: hidden;
      h2 {
        margin: 10px 0;
      }
      height: 150px;
      border-radius: 5px;
      background-color: rgb(227, 244, 255);
      overflow: hidden;
    }
    .plan-time {
      margin: 30px 0;
      border-radius: 5px;
      background-color: rgb(227, 244, 255);
      .plan-date {
        // display: flex;
        margin: 10px 0;
        .process {
          margin: 10px 0;
        }
      }
    }
  }
}
.block {
  width: 500px;
  // border-radius: 5px;
  background-color: rgb(227, 244, 255);
  img {
    max-width: 100%;
    // max-height: 100%;
  }
}
.other_model {
  display: flex;
  justify-content: space-between;
}
.project-other {
  h2 {
    margin: 20px 0;
  }
  margin: 0 10px;
  width: 500px;
  height: 200px;
  border-radius: 5px;
  background-color: rgb(227, 244, 255);
}
.model {
  // background-color: rgb(227, 244, 255);
  .model-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    // background-color: skyblue;
    li {
      margin: 10px 10px;
      padding: 20px;
      // width: 256px;
      // height: 256px;
      border-radius: 5px;
      background: rgb(227, 244, 255);
      cursor: pointer;
      img {
        width: 256px;
        height: 256px;
      }
    }
    li:hover {
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
      border-color: #eee;
      transition: all 0.2s ease-in-out;
    }
    .model-tip {
      margin: 10px 10px;
      padding: 20px;
      // width: 256px;
      // height: 256px;
      border-radius: 5px;
      background: rgb(227, 244, 255);
      div {
        width: 256px;
        height: 256px;
        text-align: center;
        line-height: 256px;
      }
    }
  }
}
</style>
