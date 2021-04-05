<template>
  <div class="task-container">
    <div class="top-info">
      <h2>任务</h2>
      <div class="fr">
        <!-- <el-link :underline="false" style="fontSize:16px">全部项目</el-link> -->
        <!-- <el-button size="mini" type="info" @click="changeView">{{ viewList=== true?'卡片视图':'列表视图' }}</el-button> -->
        <el-button
          size="mini"
          type="primary"
          @click="createtask = true"
        >新建任务</el-button>
      </div>
    </div>
    <div class="">
      <div class="table-container">
        <el-table
          class="table"
          :data="tasklist"
        >
          <el-table-column
            v-for="(item, index) in taskOptions"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width || null"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="任务描述"
            prop="description"
          />
          <el-table-column
            label="创建人"
            prop="Creator"
          />
          <el-table-column
            label="指派人"
            prop="Receiver"
          />
          <el-table-column
            label="更新时间"
            prop="UpdatedTime"
          />
          <el-table-column
            label="任务状态"
            prop="TaskStatus"
          >
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.TaskStatus == '已完成'"
                type="success"
                effect="dark"
              >
                {{ scope.row.TaskStatus }}
              </el-tag>
              <el-tag
                v-else-if="scope.row.TaskStatus =='进行中'"
                type="danger"
                effect="dark"
              >
                {{ scope.row.TaskStatus }}
              </el-tag>
              <el-tag
                v-else
                type="warning"
                effect="dark"
              >
                {{ scope.row.TaskStatus }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="info"
                style="margin-right: 20px"
                @click="handleLook(scope.$index, scope.row)"
              >查看
              </el-button>
              <el-dropdown
                size="small"
                trigger="click"
              >
                <el-button
                  type="primary"
                  size="mini"
                >
                  编辑<i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button
                      :disabled="scope.row.TaskStatus == '已完成'"
                      size="mini"
                      type="primary"
                      plain
                      @click="handleEdit(scope.$index, scope.row);
                              taskBindVisible = true"
                    >标记
                    </el-button>
                  </el-dropdown-item>
                  <el-dropdown-item style="padding-top:10px">
                    <el-button
                      disabled
                      size="mini"
                      type="info"
                      plain
                      @click="handleAssign(scope.$index, scope.row)"
                    >指派
                    </el-button>
                  </el-dropdown-item>
                  <el-dropdown-item style="padding-top:10px">
                    <el-button
                      size="mini"
                      type="danger"
                      plain
                      @click="handleDelete(scope.$index, scope.row)"
                    >删除
                    </el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 创建任务 -->
    <el-dialog
      class="createtask"
      title="创建任务"
      :visible.sync="createtask"
    >
      <el-form
        ref="taskform"
        :model="taskform"
        :rules="rules"
      >
        <el-form-item
          label="任务名称"
          :data="taskform"
          prop="TName"
        >
          <el-input
            v-model="taskform.TName"
            style="width: 242px"
          />
        </el-form-item>
        <el-form-item
          label="任务描述"
          prop="Description"
        >
          <el-col :span="15">
            <el-form-item
              label="任务名称"
              prop="TName"
              required
            >
              <el-input
                v-model="taskForm.TName"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="15">
            <el-form-item
              label="任务描述"
              prop="Description"
              required
            >
              <el-input
                v-model="taskForm.Description"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="15">
            <el-form-item
              label="指派人"
              prop="Receiver"
            >
              <el-select
                v-model="taskForm.Receiver"
                size="small"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in memberList"
                  :key="item.id"
                  :label="item.username "
                  :value="item.username"
                >
                  <span style="float: left">{{ item.username }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.cname }}</span>
                </el-option>
              </el-select>
              <!-- <el-input
                v-model="taskForm.Receiver"
                autocomplete="off"
              /> -->
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="createtask = false">取 消</el-button>
        <el-button
          type="primary"
          @click="taskadd(taskform)"
        >提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  findTaskByPID,
  // findTaskByTID,
  addTask,
  delTasksByTid
} from '@/api/task'
import { getUser } from '@/utils/cookie'
import { findModelByMidApi, findModelByPIDApi } from '@/api/model'
import BimfaceLinkage from './BimfaceLinkage'
import { findProjectMembersApi } from '@/api/project'
export default {
  data() {
    return {
      tasklist: [],
      createtask: false,
      taskOptions: [
        { label: '任务名称', prop: 'TName' },
        { label: '任务描述', prop: 'description' },
        { label: '创建人', prop: 'Creator' },
        { label: '创建时间', prop: 'CreatedTime' },
        { label: '任务状态', prop: 'TaskStatus' }
      ],
      taskdetail: {},
      taskform: {
        Pid: '',
        TName: '',
        Description: '',
        Creator: ''
      },
      taskBindVisible: false,
      modelList: [],
      currentModel: {},
      modelFileId: '',
      fileName: '',
      bimVisible: false,
      currentTid: '',
      memberList: []
    }
  },
  created() {
    this.gettask()
    console.log(this.$store.state.project.projectId)
  },
  methods: {
    // 获取参与项目列表
    findProjects() {
      findProjectsApi(getUser().username).then((res) => {
        // console.log('项目列表查询', res)
        if (res.data.length >= 1) {
          this.projectList = res.data
        }
        if (this.$store.state.project.projectId) {
          this.value = this.$store.state.project.projectId
          this.selectDetail(this.$store.state.project.projectId)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 根据项目pid查询任务信息
    findTaskByPID(pid) {
      findTaskByPIDApi(pid).then((res) => {
        console.log(res)
        this.taskList = res.data.data
      }).catch((err) => {
        console.log(err)
      })
    },
    // 根据项目pid查询项目成员列表
    findProjectMembers(pid) {
      findProjectMembersApi(pid).then((res) => {
        console.log(res)
        this.memberList = res.data
      }).catch((err) => {
        console.log(err)
      })
    },
    // 切换当前项目以查看任务
    selectDetail(value) {
      // console.log(value)
      // 根据项目pid查询任务信息
      this.findTaskByPID(value)
      this.findProjectMembers(value)
      this.$store.commit('project/SET_PID', value)
      // console.log(this.$store.state.project.projectId)
    },
    // 新建任务
    addTask() {
      const _this = this
      const data = {
        Pid: String(this.value),
        TName: this.taskForm.TName,
        Description: this.taskForm.Description,
        Receiver: this.taskForm.Receiver,
        Creator: String(this.taskForm.Creator)
      }
      // console.log(data)
      addTaskApi(data).then((res) => {
        console.log(res)
        // 根据项目编号查询任务信息
        if (res.data.code === 200) {
          _this.$refs['taskForm'].resetFields()
          _this.$message({
            showClose: true,
            message: '添加任务成功',
            type: 'success',
            duration: 1500
          })
        }
        _this.findTaskByPID(_this.value)
      }).catch((err) => {
        console.log(err)
      })
    },
    // 任务绑定模型
    getModelInfo(item) {
      console.log(item)
      this.currentModel = item
      this.modelFileId = item.MFile
      this.fileName = item.MName
      // Mid
      const data = {
        Mid: item.MId
      }
      // console.log(this.currentTid, data)
      taskBindModelApi(this.currentTid, data).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          this.findTaskByPID(item.PID)
          this.$message({
            showClose: true,
            message: '任务绑定模型成功',
            type: 'success',
            duration: 1500
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 查询任务标签信息
    handleLook(index, row) {
      console.log(index, row)
      this.currentTid = row.TID
      if (row.MID < 0) {
        this.$alert('请先给此任务绑定模型，并添加标记', '提示', {
          confirmButtonText: '确定',
          callback: (action) => {
            this.$message({
              type: 'info',
              message: `tip: 请先绑定模型`,
              duration: 1500
            })
          }
        })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    opentask(row) {
      console.log(row)
      // this.drawer = true
      // findTaskByTID(row.TID)
      //   .then((res) => {
      //     if (res.status === 200) {
      //       this.taskdetail = res.data
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })
    },
    taskadd(taskform) {
      const data = {
        Pid: String(this.$store.state.project.projectId),
        TName: taskform.TName,
        Description: taskform.Description,
        Creator: String(getUser().id)
      }
      this.$refs.taskform.validate((valid) => {
        if (valid) {
          addTask(data)
            .then((res) => {
              if (res.status === 200) {
                this.gettask()
                this.createtask = false
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    },
    // 指派任务，修改任务信息
    handleAssign(index, row) {
      console.log(row)
      const data = {
        TName: row.TName,
        // Description: this.taskForm.Description,
        Receiver: this.taskForm.Receiver,
        Updater: String(getUser().id)
      }
      console.log(data)
    }
    // handleDelete(index, row) {
    //   const _this = this
    //   console.log(row.TID)
    //   this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     deleteTaskApi(row.TID).then((res) => {
    //       console.log(res)
    //       if (res.data.code === 201) {
    //         _this.findTaskByPID(_this.value)
    //         _this.$message({
    //           showClose: true,
    //           message: '删除任务成功',
    //           type: 'success',
    //           duration: 1500
    //         })
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
  }
}
</script>

<style lang="scss">
.task-container {
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
.color-primary {
  color: #17b6fc;
}
.color-danger {
  color: #fb6365;
}
.color-green {
  color: #73deb3;
}
</style>
