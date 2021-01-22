<template>
  <div class="container">
    <div class="box-top">
      <div class="project-image">
        <el-upload
          ref=""
          class="uploadBtn"
          action=""
          :on-change="handleChange"
          :http-request="uploadProjectPicture"
          :auto-upload="true"
          :show-file-list="false"
        >
          <img :src="project.picture" alt="">
        </el-upload>
        <div class="project-title">项目名称 {{ project.pname }}</div>
      </div>
      <ul class="project-info">
        <li class="description">
          项目简介 {{ project.description }}111111111
        </li>
        <li class="unit">
          <span>项目负责人 {{}}张三</span>
          <span>项目参建方 {{}}某某公司</span>
        </li>
        <li class="progress">
          <section>
            开始时间 {{ project.planstarttime }}<br>
            结束时间 {{ project.planendtime }}
          </section>
          <section style="float: right">
            项目时间进度条
            <el-progress v-if="project.planstarttime" :percentage="getPresentInfo(project.planstarttime, project.planendtime)" />
            <el-progress v-else percentage="0" />
          </section>
        </li>
        <li class="tools">
          <el-button type="primary" @click="editDialogVisible = true">修改项目</el-button>
          <el-button type="primary" @click="getMember()">项目成员</el-button>
          <el-button type="primary">添加公司</el-button>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确定要删除此项目吗？"
            @onConfirm="deleteProject()"
          >
            <el-button
              slot="reference"
              type="danger"
            >
              删除项目
            </el-button>
          </el-popconfirm>
        </li>
      </ul>
      <!-- <ul class="project-info">
        <li>项目名称：{{ project.pname }}</li>
        <li>项目类别：{{ project.category }}</li>
        <li>项目描述：{{ project.description }}</li>
        <li>项目地址：{{ project.province+project.city+project.district+project.street }}</li>
        <li>详细地址：{{ project.address }}</li>
        <li>项目开始时间：{{ project.planstarttime }}</li>
        <li>项目结束时间：{{ project.planendtime }}</li>
        <li>项目建设单位：{{ project.unit }}</li>
        <li>项目宣传视频：{{ project.video }}</li>
        <li>项目投资额：{{ project.investamount }}</li>
      </ul> -->
    </div>
    <div class="box-bottom">
      <!-- 动态渲染卡片部分 -->
      <el-col v-for="item in model" :key="item.MId" :span="4" :offset="1">
        <div style="margin-top: 40px">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card">
            <img :src="item.MPicture" class="model-image" @click="lookDetail(item)">
            <div class="text">
              <div>{{ item.MName }}</div>
              <div class="bottom clearfix" />
            </div>
          </el-card>
        </div>
      </el-col>
      <!-- 添加模型 -->
      <el-col
        :span="4"
        class="preCard"
        @click.native="addDialogVisible = true"
      >
        <div style="margin-top: 40px">
          <el-card>
            <i class="el-icon-plus" />
          </el-card>
        </div>
      </el-col>
    </div>
    <!-- 编辑更新项目 -->
    <el-dialog
      title="修改项目"
      :visible.sync="editDialogVisible"
      style="margin-top: -40px"
    >
      <el-row :gutter="15">
        <el-form ref="project" :model="project" label-width="100px">
          <!-- 项目名称 -->
          <el-col :span="15">
            <el-form-item label="项目名称" prop="pname">
              <el-input v-model="project.pname" autocomplete="off" />
            </el-form-item>
          </el-col>
          <!-- 项目类别 -->
          <el-col :span="10">
            <el-form-item label="项目分类" prop="category">
              <el-input v-model="project.category" autocomplete="off" />
            </el-form-item>
          </el-col>
          <!-- 项目描述信息 -->
          <el-col :span="21">
            <el-form-item label="项目描述信息" prop="description">
              <el-input v-model="project.description" autocomplete="off" />
            </el-form-item>
          </el-col>
          <!-- 省市区街级联地址 -->
          <el-col :span="30">
            <el-form-item label="省/直辖市">
              <el-input v-model="project.province" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="30">
            <el-form-item label="市">
              <el-input v-model="project.city" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="30">
            <el-form-item label="区/县">
              <el-input v-model="project.district" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="30">
            <el-form-item label="乡/镇/街道">
              <el-input v-model="project.street" autocomplete="off" />
            </el-form-item>
          </el-col>
          <!-- 详细地址 -->
          <el-col :span="21">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="project.address" autocomplete="off" />
            </el-form-item>
          </el-col>
          <!-- 项目的建设单位 -->
          <el-col :span="21">
            <el-form-item label="项目建设单位" prop="unit">
              <el-input v-model="project.unit" autocomplete="off" />
            </el-form-item>
          </el-col>
          <!-- 项目投资额 -->
          <el-col :span="21">
            <el-form-item label="项目投资额" prop="investamount">
              <el-input
                v-model="project.investamount"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <!-- 计划开始时间 -->
          <el-col :span="25">
            <el-form-item label="计划开始时间" prop="planstarttime">
              <el-input
                v-model="project.planstarttime"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <!-- 计划结束时间 -->
          <el-col :span="25">
            <el-form-item label="计划结束时间" prop="planendtime">
              <el-input v-model="project.planendtime" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            editDialogVisible = false;
            updateProject()
          "
        >确 定
        </el-button>
      </div>
    </el-dialog>

    <!-- 上传中 -->
    <el-dialog
      title="正在上传"
      :visible.sync="loading"
      style="margin-top: -40px"
    >
      <div
        v-loading="loadModel"
        element-loading-text="拼命上传中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        1
      </div>
    </el-dialog>
    <!-- 上传模型 -->
    <el-dialog
      title="上传模型"
      :visible.sync="addDialogVisible"
      style="margin-top: -40px"
    >
      <el-row>
        <el-form ref="form" :model="addModelFrom" label-width="100px">
          <!-- 模型名称 -->
          <el-col :span="15">
            <el-form-item label="模型名称" prop="mName">
              <el-input v-model="addModelFrom.mName" autocomplete="off" />
            </el-form-item>
          </el-col>
          <!-- 模型描述 -->
          <el-col :span="15">
            <el-form-item label="模型描述" prop="mDescription">
              <el-input v-model="addModelFrom.mDescription" autocomplete="off" />
            </el-form-item>
          </el-col>
          <!-- 添加模型 -->
          <el-col :span="24">
            <el-form-item label="上传模型" prop="mFile">
              <el-upload
                ref=""
                action=""
                :on-change="handleChangeMod"
                :auto-upload="false"
                list-type="text"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            allUpload();
          "
        >确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 二三维联动 -->
    <el-dialog
      ref="bimFaceBim"
      title="模型展示"
      :visible.sync="linkageBim"
      width="90%"
      top="2vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <bimfacelinkage
        v-if="linkageBim"
        ref="linkBimFace"
        :model-file-id="modelFileId"
        :file-name="fileName"
        :model-token="modelToken"
      />
    </el-dialog>
  </div>
</template>

<script>
import { findProjectInfoApi, addProjectPictureApi, updateProjectApi, deleteProjectApi, findProjectMembersApi } from '@/api/project'
// eslint-disable-next-line no-unused-vars
import { addModelApi, delModelApi, updateModelByMIdApi, findmodelByPIDApi, findModelByMidApi } from '@/api/model'
import { getUser, getProjectPID, setMember } from '@/utils/cookie'
import bimfacelinkage from './bimfacelinkage'
import { getPresent } from '@/utils/day'
export default {
  components: {
    bimfacelinkage
  },
  data() {
    return {
      present: 10,
      project: {},
      pictureFile: '',
      editDialogVisible: false,
      addDialogVisible: false,
      linkageBim: false,
      loading: false,
      loadModel: false,
      addModelFrom: {
        mName: '',
        creator: '',
        mFile: '',
        mDescription: '',
        PID: ''
      },
      model: {},
      modelFileId: '',
      fileName: '',
      modelToken: ''
    }
  },
  created() {
    const _this = this
    // 调用根据项目id查询项目信息接口
    findProjectInfoApi(getProjectPID()).then((res) => {
      // console.log(res)
      if (res.data.pid) {
        _this.project = res.data
      }
    }).catch((err) => {
      console.log(err)
    })
    // 根据项目pid返回成员列表
    findProjectMembersApi(getProjectPID()).then((res) => {
      // console.log(res.data)
      if (res.data instanceof Array) {
        setMember(res.data)
      }
    }).catch((err) => {
      console.log(err)
    })
    // 根据项目id查模型
    findmodelByPIDApi(getProjectPID()).then((res) => {
      console.log(res)
      this.model = res.data.data
      // console.log(this.modelList);
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
  // 获取进度条
    getPresentInfo(start, end) {
      return getPresent(start, end)
    },
    getMember(pid) {
      pid = getProjectPID()
      this.$router.push(`/project/${pid}/member`)
    },
    // 获取上传的图片
    handleChange(file, fileList) {
      this.pictureFile = file.raw
      // console.log(this.form.Picture);
    },
    // 获取文件
    handleChangeMod(file, fileList) {
      // console.log(file)
      this.addModelFrom.mFile = file.raw
      // console.log(this.pictureFile)
    },
    allUpload() {
      const _this = this
      const data = new FormData()
      data.append('PID', getProjectPID())
      data.append('creator', getUser().id)
      data.append('mName', this.addModelFrom.mName)
      data.append('mDescription', this.addModelFrom.mDescription)
      data.append('mFile', this.addModelFrom.mFile)
      this.loading = true
      this.loadModel = true
      // 调用添加模型接口
      addModelApi(data)
        .then((res) => {
          this.loading = false
          this.addDialogVisible = false
          if (res.data.code === 200) {
            findmodelByPIDApi(getProjectPID())
              .then((res) => {
                this.modelList = res.data.data
              })
              .catch((err) => {
                console.log(err)
              })
            _this.$notify({
              title: '成功',
              message: '新建成功',
              type: 'success',
              duration: 1000,
              offset: 80
            })
          }
        })
        .catch((err) => {
          console.log(250, err)
        })
    },
    // 上传项目预览图
    uploadProjectPicture() {
      const _this = this
      const data = new FormData()
      data.append('uid', getUser().id)
      data.append('pid', getProjectPID())
      data.append('pictureFile', this.pictureFile)
      addProjectPictureApi(data).then((res) => {
        console.log(res)
        if (res.status === 200) {
          findProjectInfoApi(getProjectPID()).then((res) => {
            // console.log(res)
            if (res.data.pid) {
              _this.project = res.data
            }
          }).catch((err) => {
            console.log(err)
          })
          _this.$notify({
            title: '成功',
            message: '上传成功',
            type: 'success',
            duration: 1000,
            offset: 80
          })
        }
      })
        .catch((err) => {
          console.log(err)
        })
    },
    // 编辑更新项目
    updateProject() {
      const _this = this
      updateProjectApi(this.project).then((res) => {
        console.log(res)
        if (res.data.status === 200) {
          _this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 1000,
            offset: 80
          })
        }
      })
        .catch((err) => {
          console.log(err)
        })
    },
    // 删除项目
    deleteProject() {
      const _this = this
      deleteProjectApi(getProjectPID()).then((res) => {
        console.log(res)
        if (res.data.status === 204) {
          _this.$router.replace('/project/index')
          _this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 1000,
            offset: 80
          })
        }
      })
        .catch((err) => {
          console.log(err)
        })
    },
    // 查看模型详情L
    lookDetail(model) {
      this.modelFileId = model.MId
      this.fileName = model.MName
      this.modelToken = model.MFile
      console.log(this.modelToken)
      this.linkageBim = true
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  // display: flex;
  // justify-content: center;
  // flex-direction: column;
  background-color: #fff;
}
.box-top {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 400px;
  background-color: skyblue;
.project-image {
  margin-top: -30px;
  // margin-left: 30px;
  width: 450px;
  height: 300px;
  border: 5px solid red;
  img {
    width: 450px;
    height: 300px;
    // height: 120px;
  //    width: 450px;
  // height: 260px;
    border-radius: 10px;
  }
  .project-title {
    margin-top: 15px;
    font-size: 20px;
    text-align: center;
  }
}
.project-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: -27px;
  width: 720px;
  height: 300px;
  border: 5px solid red;
  background-color: #fff;
  .description {
    // margin-top: 10px;
    height: 80px;
    border: 2px solid red;
  }
  .unit {
    margin-top: 10px;
    span {
      margin-right: 150px;
    }
  }
  .progress {
    display: flex;
    justify-content: space-between;
    // margin-bottom: 20px;
    // width: 450px;
    // border: 2px solid red;
    background-color: fff;
    section {
      width: 50%;
    }
  }
}
.project-tools {
  background-color: #fff;
}
}

.box-bottom {
  margin-top: 100px;
  width: 100%;
  height: 50vh;
  background-color: lightcoral;
}

.model-image {
  width: 100%;
  height: 200px;
  background-size: 200px;
  display: block;
  cursor: pointer;
}
.text {
  text-align: center;
  margin: 10px 0;
}
.item {
  margin: 0 5px;
}
.preCard {
  margin-left: 60px;
  .el-card {
    text-align: center;
    border: 2px dashed #d9d9d9;
    .el-icon-plus {
      font-size: 28px;
      color: #8c939d;
      // width: 178px;
      // height: 178px;
      line-height: 200px;
      text-align: center;
    }
  }
}
.remover{
  width: 0;
  height: 0;
  border-top: 66rpx solid #abb2bf;
  border-left: 66rpx solid transparent;
  position: absolute;
  top: 0;
  right: 0;
}
.icon{
  width: 30rpx;
  height: 30rpx;
  position: absolute;
  top: -60rpx;
  right: 4rpx;
}
</style>
