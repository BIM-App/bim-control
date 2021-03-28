<template>
  <div class="task">
    <div class="top-info">
      <h2>任务
        <span v-if="taskList.length">{{ taskList.length }}条</span>
      </h2>
      <span>当前项目：
        <el-select
          v-model="value"
          size="small"
          placeholder="请选择"
          @change="selectDetail(value)"
        >
          <el-option
            v-for="item in projectList"
            :key="item.value"
            :label="item.pname"
            :value="item.pid"
          />
        </el-select>
      </span>
      <div class="fr">
        <el-button
          v-if="value"
          size="mini"
          type="primary"
          @click="dialogFormVisible = true"
        >新建任务
        </el-button>
      </div>
    </div>
    <div class="task-list">
      <div>
        <el-table
          :data="taskList"
          style="width: 100%"
        >
          <el-table-column
            label="任务名称"
            prop="TName"
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
                type="warning"
                effect="dark"
              >
                {{ scope.row.TaskStatus }}
              </el-tag>
              <el-tag
                v-else
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
                @click="handleLook(scope.$index, scope.row)"
              >查看</el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row);
                        taskBindVisible = true"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 新建任务dialog -->
    <el-dialog
      title="新建任务"
      :visible.sync="dialogFormVisible"
    >
      <el-row :gutter="15">
        <el-form
          ref="taskForm"
          :model="taskForm"
          label-position="right"
          label-width="80px"
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
              <el-input
                v-model="taskForm.Receiver"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible = false;
                  addTask()"
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 任务绑定模型dialog -->
    <el-dialog
      title="选择此任务要绑定的模型"
      :visible.sync="taskBindVisible"
    >
      <ul class="model-list">
        <li
          v-for="item in modelList"
          :key="item.MId"
          @click="getModelInfo(item);
                  taskBindVisible = false;
                  bimVisible = true"
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
    </el-dialog>

    <!-- 模型详细视图 -->
    <el-dialog
      title="标记位置"
      :visible.sync="bimVisible"
      width="90%"
      top="20px"
    >
      <!-- :before-close="handleClose" -->

      <!-- <span>{{ currentModel }}</span> -->
      <!-- <div>MId: {{ currentModel.MId }}</div>
        <div>MFile: {{ currentModel.MFile }}</div> -->
      <bimface-linkage
        v-if="bimVisible"
        :model-file-id="modelFileId"
        :current-tid="currentTid"
      />
      <!-- <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="bimVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="bimVisible = false"
          >确 定</el-button>
        </span> -->
    </el-dialog>
  </div>
</template>

<script>
import { findProjectsApi } from '@/api/user'
import { addTaskApi, deleteTaskApi, findTaskByPIDApi, taskBindModelApi } from '@/api/task'
import { getUser } from '@/utils/cookie'
import { findModelByMidApi, findModelByPIDApi } from '@/api/model'
import BimfaceLinkage from './BimfaceLinkage'
export default {
  components: {
    BimfaceLinkage
  },
  data() {
    return {
      projectList: [''],
      options: [],
      value: '',
      taskList: [],
      dialogFormVisible: false,
      taskForm: {
        pid: '',
        TName: '',
        Description: '',
        Receiver: null,
        Creator: getUser().id
      },
      taskBindVisible: false,
      modelList: [],
      currentModel: {},
      modelFileId: '',
      fileName: '',
      bimVisible: false,
      currentTid: ''
    }
  },
  created() {
    this.findProjects()
  },
  methods: {
    // 获取参与项目列表
    findProjects() {
      findProjectsApi(getUser().username).then((res) => {
        // console.log('项目列表查询', res)
        if (res.data.length >= 1) {
          this.projectList = res.data
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    findTaskByPID(pid) {
      // 根据项目pid查询任务信息
      findTaskByPIDApi(pid).then((res) => {
        console.log(res)
        this.taskList = res.data.data
      }).catch((err) => {
        console.log(err)
      })
    },
    // 切换当前项目以查看任务
    selectDetail(value) {
      // console.log(value)
      // 根据项目pid查询任务信息
      this.findTaskByPID(value)
      // findTaskByPIDApi(value).then((res) => {
      //   console.log(res)
      //   this.taskList = res.data.data
      // }).catch((err) => {
      //   console.log(err)
      // })
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
      addTaskApi((data)).then((res) => {
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
      } else {
        findModelByMidApi(row.MID).then((res) => {
          console.log(res)
          this.modelFileId = res.data.data.MFile
          this.bimVisible = true
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    handleEdit(index, row) {
      // console.log(row)
      this.currentTid = row.TID
      // 查询项目模型
      findModelByPIDApi(this.value).then((res) => {
        console.log(res)
        // this.modelList = res.data.data
        if (Object.keys(res.data.data).length === 0) {
          this.modelList = ''
        } else {
          this.modelList = res.data.data
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleDelete(index, row) {
      const _this = this
      console.log(row.TID)
      this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTaskApi(row.TID).then((res) => {
          console.log(res)
          if (res.data.code === 201) {
            _this.findTaskByPID(_this.value)
            _this.$message({
              showClose: true,
              message: '删除任务成功',
              type: 'success',
              duration: 1500
            })
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
.task {
  margin: 8px;
  background-color: #fff;
  width: 99%;
  height: 99%;
  position: absolute;

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
}

.model-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  // background-color: skyblue;
  li {
    margin: 10px 10px;
    padding: 20px;
    border-radius: 5px;
    background: rgb(227, 244, 255);
    cursor: pointer;
    img {
      width: 160px;
      height: 160px;
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
      width: 160px;
      height: 160px;
      text-align: center;
      line-height: 160px;
    }
  }
}
</style>
