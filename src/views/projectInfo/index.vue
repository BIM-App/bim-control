<template>
  <div class="container">
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
    <div class="box-top">
      <div class="project-image">
        <img :src="project.picture" alt="">
        <el-upload
          ref=""
          class="uploadBtn"
          action=""
          :on-change="handleChange"
          :http-request="uploadProjectPicture"
          :auto-upload="true"
          :show-file-list="false"
        >
          <el-button
            size="mini"
            type="primary"
          >上传预览图</el-button>
        </el-upload>
      </div>
      <ul class="project-info">
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
      </ul>
      <ul class="project-tools">
        <li><el-button type="primary" @click="editDialogVisible = true">修改项目</el-button></li>
        <li><el-button type="primary" @click="getMember()">项目成员</el-button></li>
        <li>
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
    </div>
    <div class="box-bottom">
      模型信息部分
    </div>
  </div>
</template>

<script>
import { findProjectInfoApi, addProjectPictureApi, updateProjectApi, deleteProjectApi, findProjectMembersApi } from '@/api/project'
import { getUser, getProjectPID, setMember } from '@/utils/cookie'

export default {
  data() {
    return {
      project: {},
      pictureFile: '',
      editDialogVisible: false
    }
  },
  created() {
    const _this = this
    // 调用根据项目id查询项目信息接口
    findProjectInfoApi(getProjectPID()).then((res) => {
      console.log(res)
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
  },
  methods: {
    getMember(pid) {
      pid = getProjectPID()
      this.$router.push(`/project/${pid}/member`)
    },
    // 获取上传的图片
    handleChange(file, fileList) {
      this.pictureFile = file.raw
      // console.log(this.form.Picture);
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
    // 提交编辑更新项目表单
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
    }
  }
}
</script>

<style lang="scss" scoped>
.box-top {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50vh;
  background-color: skyblue;
.project-image {
  width: 200px;
  // background-color: #fff;
  img {
    width: 100%;
    height: 120px;
    border-radius: 10px;
  }
}
.project-info {
  background-color: #fff;
  li {
    margin-top: 10px;
  }
}
.project-tools {
  background-color: #fff;
}
}

.box-bottom {
  width: 100%;
  height: 50vh;
  background-color: lightcoral;
}
</style>
