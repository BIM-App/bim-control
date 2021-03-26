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
                @click="handleEdit(scope.$index, scope.row)"
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
    <el-dialog
      title="新建任务"
      :visible.sync="dialogFormVisible"
    >
      <el-row :gutter="15">
        <el-form
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
  </div>
</template>

<script>
import { findProjectsApi } from '@/api/user'
import { addTaskApi, findTaskByPIDApi } from '@/api/task'
import { getUser } from '@/utils/cookie'
export default {
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
      }
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
    // 切换当前项目以查看任务
    selectDetail(value) {
      console.log(value)
      // 根据项目pid查询任务信息
      findTaskByPIDApi(value).then((res) => {
        console.log(res)
        this.taskList = res.data.data
      }).catch((err) => {
        console.log(err)
      })
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
      console.log(data)
      // console.log(JSON.stringify(data))
      addTaskApi((data)).then((res) => {
        console.log(res)
        // 根据项目编号查询任务信息
        findTaskByPIDApi(_this.value).then((res) => {
          console.log(res)
          _this.taskList = res.data.data
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
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
</style>
