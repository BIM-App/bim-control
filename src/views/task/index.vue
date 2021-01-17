<template>
  <div class="table-box">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="任务名称" prop="TName" />
      <el-table-column label="任务描述" prop="Description" />
      <el-table-column label="任务照片" prop="Photo" />
      <el-table-column align="right">
        <template slot="header" slot-scope="">
          <div class="right-bar">
            <el-button
              size="medium"
              class="addTask"
              type="primary"
              icon="el-icon-plus"
              @click="taskDialogVisible = true"
            >添加任务</el-button>
            <!-- <el-input
              v-model="search"
              disabled
              size="medium"
              placeholder="输入关键字搜索"
            /> -->
          </div>
        </template>
        <template slot-scope="scope">
          <el-button
            size="medium"
            @click="
              handleEdit(scope.$index, scope.row);
              open();
            "
          >查看</el-button>
          <el-button
            size="medium"
            type="danger"
            @click="delTaskByTid(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加任务信息 -->
    <el-dialog
      title="添加任务信息"
      :visible.sync="taskDialogVisible"
      style="margin-top: -40px"
    >
      <el-row :gutter="15">
        <el-form ref="taskForm" :model="taskForm" label-width="100px">
          <el-col :span="22">
            <el-form-item label="任务名称" prop="tName">
              <el-input v-model="taskForm.tName" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="任务描述" prop="description">
              <el-input v-model="taskForm.description" autocomplete="off" />
            </el-form-item>
          </el-col>
          <!-- 任务照片 -->
          <el-col :span="24">
            <el-form-item label="任务照片" prop="photoFileURL" required>
              <el-upload
                ref="upload"
                action=""
                :on-change="handleChange"
                :http-request="addTaskForm"
                :auto-upload="false"
                list-type="picture-card"
              >
                <i class="el-icon-plus" />
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="taskDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            taskDialogVisible = false;
            addTaskForm();
          "
        >确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMember, getProjectPID, getUser, setMember } from '@/utils/cookie'
import { findProjectMembersApi } from '@/api/project'
import { addTask, findTaskByPid, delTasksByTid } from '@/api/task'
export default {
  data() {
    return {
      taskDialogVisible: false,
      tableData: [],
      taskForm: {
        tName: '',
        description: '',
        photo: []
      },
      search: ''
    }
  },
  created() {
    const _this = this
    const pid = getProjectPID()
    // 调用查询任务列表接口
    console.log(pid)
    findTaskByPid(pid)
      .then((res) => {
        console.log(res)
        if (res.data.code != 404) {
          this.tableData = res.data
          console.log(this.tableData)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  methods: {
    // 获取上传的照片
    handleChange(file, fileList) {
      this.photo = file.raw
      console.log('this.photo:' + this.photo)
    },
    // 添加任务信息
    addTaskForm() {
      const _this = this
      const data = new FormData()
      data.append('pid', getProjectPID())
      data.append('tName', this.taskForm.tName)
      data.append('description', this.taskForm.description)
      data.append('photo', this.photo)
      data.append('creator', getUser().id)
      // 调用添加任务信息接口
      addTask(data)
        .then((res) => {
          if (res.data.code === 200) {
            findTaskByPid(getProjectPID())
              .then((e) => {
                console.log('PID' + getProjectPID())
                this.tableData = e.data
                console.log(this.tableData)
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 根据任务编号tid来删除任务
    delTaskByTid(index, row) {
      const _this = this
      const tid = '/' + row.TId
      delTasksByTid(tid)
        .then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            findTaskByPid(getProjectPID())
              .then((e) => {
                console.log(e)
                if (e.data.code === 404) {
                  this.tableData = ''
                } else {
                  this.tableData = e.data
                  console.log(this.tableData)
                }
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 查看任务
    handleEdit() {}
  }
}
</script>

<style lang="scss" scoped>
.table-box {
  margin: 15px;
  // border: 2px solid red ;
  // .right-bar {
  //   display: flex;
  //   justify-content: space-around;
  //   align-items: center;
  //   .addMember {
  //     margin-right: 20px;
  //   }
  // }
}
</style>
