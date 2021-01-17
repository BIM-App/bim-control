<template>
  <div>
    <el-row>
      <!-- 新建项目表单Dialog框 -->
      <el-dialog
        title="新建项目"
        :visible.sync="dialogFormVisible"
        style="margin-top: -60px"
      >
        <el-row :gutter="15">
          <el-form ref="form" :model="form" label-width="100px">
            <!-- 项目名称 -->
            <el-col :span="15">
              <el-form-item label="项目名称" prop="pname" required>
                <el-input v-model="form.pname" autocomplete="off" />
              </el-form-item>
            </el-col>
            <!-- 项目类别 -->
            <el-col :span="10">
              <el-form-item label="项目分类" prop="category">
                <el-input v-model="form.category" autocomplete="off" />
              </el-form-item>
            </el-col>
            <!-- 项目描述信息 -->
            <el-col :span="21">
              <el-form-item label="项目描述信息" prop="description">
                <el-input v-model="form.description" autocomplete="off" />
              </el-form-item>
            </el-col>
            <!-- 省市区街级联地址 -->
            <el-col :span="24">
              <el-form-item label="地址" prop="regionChange">
                <v-region :town="true" @values="regionChange" />
              </el-form-item>
            </el-col>
            <!-- 详细地址 -->
            <el-col :span="21">
              <el-form-item label="详细地址" prop="address">
                <el-input v-model="form.address" autocomplete="off" />
              </el-form-item>
            </el-col>
            <!-- 项目的建设单位 -->
            <el-col :span="21">
              <el-form-item label="项目建设单位" prop="unit">
                <el-input v-model="form.unit" autocomplete="off" />
              </el-form-item>
            </el-col>
            <!-- 项目投资额 -->
            <el-col :span="21">
              <el-form-item label="项目投资额" prop="investamount">
                <el-input v-model="form.investamount" autocomplete="off" />
              </el-form-item>
            </el-col>
            <!-- 计划开始时间 -->
            <el-col :span="25">
              <el-form-item label="计划开始时间" prop="planstarttime">
                <el-date-picker
                  v-model="form.planstarttime"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="timestamp"
                />
              </el-form-item>
            </el-col>
            <!-- 计划结束时间 -->
            <el-col :span="25">
              <el-form-item label="计划结束时间" prop="planendtime">
                <el-date-picker
                  v-model="form.planendtime"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="timestamp"
                />
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              dialogFormVisible = false;
              addProject()
            "
          >确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 动态渲染卡片部分 -->
      <el-col v-for="item in projectList" :key="item.pid" :span="4" :offset="1">
        <div style="margin-top: 20px">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div class="projectTool">
              <el-tooltip
                class="item"
                effect="dark"
                content="修改项目"
                placement="bottom-start"
              >
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="
                    editDialogVisible = true;
                    getProjectInfo(item.pid);
                  "
                />
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="上传项目预览图"
                placement="bottom-start"
              >
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
                    type="warning"
                    icon="el-icon-picture-outline"
                    circle
                    @click="
                      pictureDialogVisible = true;
                      getProjectInfo(item.pid);
                    "
                  />
                </el-upload>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="项目成员"
                placement="bottom-start"
              >
                <el-button
                  size="mini"
                  type="info"
                  icon="el-icon-user"
                  circle
                  @click="
                    getProjectMember(item.pid);
                    toLink(item.pid);
                  "
                />
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除项目"
                placement="bottom-start"
              >
                <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  icon="el-icon-info"
                  icon-color="red"
                  title="确定要删除此项目吗？"
                  @onConfirm="deleteProject(item.pid)"
                >
                  <el-button
                    slot="reference"
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                  />
                </el-popconfirm>
              </el-tooltip>
            </div>
            <img
              :src="item.picture"
              class="project-image"
              title="进入项目详情"
              @click="toInfo(item.pid)"
            >
            <div>
              <div>项目pid：{{ item.pid }}</div>
              <div>项目名称：{{ item.pname }}</div>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <!-- <el-button type="text" class="button">操作按钮</el-button> -->
              </div>
            </div>
          </el-card>
        </div>
        <!-- 编辑更新项目 -->
        <el-dialog
          title="修改项目"
          :visible.sync="editDialogVisible"
          style="margin-top: -40px"
        >
          <el-row :gutter="15">
            <el-form ref="editForm" :model="editForm" label-width="100px">
              <!-- 项目名称 -->
              <el-col :span="15">
                <el-form-item label="项目名称" prop="pname">
                  <el-input v-model="editForm.pname" autocomplete="off" />
                </el-form-item>
              </el-col>
              <!-- 项目类别 -->
              <el-col :span="10">
                <el-form-item label="项目分类" prop="category">
                  <el-input v-model="editForm.category" autocomplete="off" />
                </el-form-item>
              </el-col>
              <!-- 项目描述信息 -->
              <el-col :span="21">
                <el-form-item label="项目描述信息" prop="description">
                  <el-input v-model="editForm.description" autocomplete="off" />
                </el-form-item>
              </el-col>
              <!-- 省市区街级联地址 -->
              <el-col :span="30">
                <el-form-item label="省/直辖市">
                  <el-input v-model="editForm.province" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="30">
                <el-form-item label="市">
                  <el-input v-model="editForm.city" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="30">
                <el-form-item label="区/县">
                  <el-input v-model="editForm.district" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="30">
                <el-form-item label="乡/镇/街道">
                  <el-input v-model="editForm.street" autocomplete="off" />
                </el-form-item>
              </el-col>
              <!-- 详细地址 -->
              <el-col :span="21">
                <el-form-item label="详细地址" prop="address">
                  <el-input v-model="editForm.address" autocomplete="off" />
                </el-form-item>
              </el-col>
              <!-- 项目的建设单位 -->
              <el-col :span="21">
                <el-form-item label="项目建设单位" prop="unit">
                  <el-input v-model="editForm.unit" autocomplete="off" />
                </el-form-item>
              </el-col>
              <!-- 项目投资额 -->
              <el-col :span="21">
                <el-form-item label="项目投资额" prop="investamount">
                  <el-input
                    v-model="editForm.investamount"
                    autocomplete="off"
                  />
                </el-form-item>
              </el-col>
              <!-- 计划开始时间 -->
              <el-col :span="25">
                <el-form-item label="计划开始时间" prop="planstarttime">
                  <el-input
                    v-model="editForm.planstarttime"
                    autocomplete="off"
                  />
                </el-form-item>
              </el-col>
              <!-- 计划结束时间 -->
              <el-col :span="25">
                <el-form-item label="计划结束时间" prop="planendtime">
                  <el-input v-model="editForm.planendtime" autocomplete="off" />
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
      </el-col>
      <!-- 新建项目ICON 点击部分 -->
      <el-col
        :span="4"
        class="preCard"
        @click.native="dialogFormVisible = true"
      >
        <div style="margin-top: 15px">
          <el-card>
            <i class="el-icon-plus" />
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { findProjectsApi } from '@/api/user'
import {
  addProjectApi,
  deleteProjectApi,
  findProjectInfoApi,
  updateProjectApi,
  addProjectPictureApi,
  findProjectMembersApi
} from '@/api/project'
import { getUser, setMember, setProjectPID } from '@/utils/cookie'

export default {
  name: 'Project',
  data() {
    return {
      key: '',
      dialogFormVisible: false,
      editDialogVisible: false,
      pictureDialogVisible: false,
      currentDate: new Date(),
      projectList: [],
      // regionChange: '',
      form: {
        pid: '', // 项目编号
        pname: '', // 项目名称
        picture: '', // 项目预览图，URL
        category: '', // 项目类别
        description: '', // 项目描述信息
        province: '', // 省
        city: '', // 市
        district: '', // 区
        street: '', // 街道
        town: '', // 镇
        address: '', // 详细地址
        unit: '', // 项目的建设单位
        pmid: '', // 项目负责人编号
        video: '', // 项目宣传视频
        investamount: '', // 投资额
        planstarttime: '', // 计划开始时间
        planendtime: '', // 计划完成时间
        creator: '', // 创建者用户编号
        username: ''
      },
      editForm: {} // 编辑项目的表单
    }
  },
  created() {
    const _this = this
    // 根据用户名查询项目
    findProjectsApi(getUser().username).then((res) => {
      console.log(res.data)
      // FIXME:需要判断
      if (res.data instanceof Array) {
        // console.log(res.data)
        _this.projectList = res.data
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    // 跳转到项目详情页面，页面内即模型联动
    toInfo(pid) {
      setProjectPID(pid)
      this.$router.push(`/project/${pid}/info`)
      console.log(pid)
    },
    // 跳转到成员管理路由
    toLink(pid) {
      setProjectPID(pid)
      this.$router.push(`/project/${pid}/member`)
    },
    // 获取上传的图片
    handleChange(file, fileList) {
      this.pictureFile = file.raw
      // console.log(this.form.Picture);
    },
    // 获取新建项目的地址部分信息
    regionChange(data) {
      console.log(data)
      this.form.province = data.province ? data.province.value : ''
      this.form.city = data.city ? data.city.value : ''
      this.form.district = data.area ? data.area.value : ''
      this.form.street = data.town ? data.town.value : ''
    },
    // 获取项目信息
    getProjectInfo(pid) {
      findProjectInfoApi(pid).then((res) => {
        // console.log(res.data)
        this.editForm = res.data
        this.editForm.pid = pid
      }).catch((err) => {
        console.log(err)
      })
    },
    // 提交新建项目表单
    addProject() {
      const _this = this
      const data = {
        pname: this.form.pname,
        picture: this.form.picture,
        category: this.form.category,
        description: this.form.description,
        province: this.form.province,
        city: this.form.city,
        district: this.form.district,
        street: this.form.street,
        town: this.form.town,
        address: this.form.address,
        unit: this.form.unit,
        pmid: this.form.pmid,
        video: this.form.video,
        investamount: this.form.investamount,
        planstarttime: this.form.planstarttime,
        planendtime: this.form.planendtime,
        creator: getUser().id,
        username: getUser().username
      }
      addProjectApi(data).then((res) => {
        // console.log(res.data) // for debug
        if (res.data.status === 201) {
          _this.$refs.form.resetFields() // 新建项目成功则清空表单
          findProjectsApi(getUser().username).then((res) => {
            console.log(res)
            // FIXME: 判断
            if (res.data instanceof Array) {
              _this.projectList = res.data
            }
          }).catch((err) => {
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
          console.log(err)
        })
    },
    // 提交编辑更新项目表单
    updateProject() {
      const _this = this
      const data = {
        pid: this.editForm.pid,
        pname: this.editForm.pname,
        picture: this.editForm.picture,
        category: this.editForm.category,
        description: this.editForm.description,
        province: this.editForm.province,
        city: this.editForm.city,
        district: this.editForm.district,
        street: this.editForm.street,
        town: this.editForm.town,
        address: this.editForm.address,
        unit: this.editForm.unit,
        pmid: this.editForm.pmid,
        video: this.editForm.video,
        investamount: this.editForm.investamount,
        planstarttime: this.editForm.planstarttime,
        planendtime: this.editForm.planendtime,
        updater: getUser().id
      }
      updateProjectApi(data).then((res) => {
        // console.log(res)
        if (res.data.status === 200) {
          findProjectsApi(getUser().username).then((res) => {
            console.log(res)
            // FIXME:判断
            if (res.data instanceof Array) {
              _this.projectList = res.data
            }
          }).catch((err) => {
            console.log(err)
          })
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
    deleteProject(pid) {
      const _this = this
      deleteProjectApi(pid).then((res) => {
        // console.log(res)
        if (res.data.status === 204) {
          findProjectsApi(getUser().username).then((res) => {
            console.log(res)
            // TODO:等待分析
            if (res.data.status === 404) {
              _this.projectList = []
            } else {
              _this.projectList = res.data
            }
          }).catch((err) => {
            console.log(err)
          })
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
    // 上传项目预览图
    uploadProjectPicture() {
      const _this = this
      const data = new FormData()
      data.append('uid', getUser().id)
      data.append('pid', this.editForm.pid)
      data.append('pictureFile', this.pictureFile)
      addProjectPictureApi(data).then((res) => {
        console.log(res)
        if (res.status === 200) {
          findProjectsApi(getUser().username).then((res) => {
            console.log(res)
            // FIXME:
            if (res.data instanceof Array) {
              _this.projectList = res.data
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
    // 查询项目成员列表
    getProjectMember(pid) {
      findProjectMembersApi(pid).then((res) => {
        // console.log(res)
        if (res.status === 200) {
          // this.tableData = res.data
          setMember(res.data)
          setProjectPID(pid)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.project-image {
  width: 100%;
  height: 120px;
  background-size: 120px;
  display: block;
  cursor: pointer;
}
.projectTool {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 80px;
  margin-bottom: 5px;
  position: sticky;
  bottom: 0;
  font-size: 8px;
  text-align: center;
  // background-color: red;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.preCard {
  margin-left: 60px;
  height: 100%;
  .el-card {
    text-align: center;
    border: 2px dashed #d9d9d9;
    .el-icon-plus {
      font-size: 28px;
      color: #8c939d;
      // width: 178px;
      // height: 178px;
      line-height: 178px;
      text-align: center;
    }
  }

  .el-card:hover {
    border-color: #409eff;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
