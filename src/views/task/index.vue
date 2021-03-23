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
        >新建任务</el-button>
      </div>
    </div>
    <div class="">
      <div class="table-container">
        <el-table
          class="table"
          :data="tasklist"
          border
        >
          <el-table-column
            v-for="(item, index) in taskOptions"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width || null"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="opentask(scope.row)"
              >查看</el-button>
              <span class="Verticalline">|</span>
              <el-button
                type="text"
                @click="deltask(scope.row.TID)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  findTaskByPID,
  findTaskByTID,
  addTask,
  delTasksByTid
} from '@/api/task'
import { getUser, getProjectPID } from '@/utils/cookie'
export default {
  data() {
    return {
      tasklist: [],
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
      rules: {
        TName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
        Description: [
          { required: true, message: '请输入任务描述', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.gettask()
    console.log(this.$store.state.project.projectPid)
  },
  methods: {
    // 获取所有任务列表
    goAllTask() {
      this.$router.push(`/task/index`)
    },
    gettask() {
      findTaskByPID(getProjectPID())
        .then((res) => {
          if (res.status === 200) {
            this.tasklist = res.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    opentask(row) {
      this.drawer = true
      findTaskByTID(row.TID)
        .then((res) => {
          if (res.status === 200) {
            this.taskdetail = res.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    taskadd(taskform) {
      this.$refs[taskform].validate((valid) => {
        if (valid) {
          const _this = this
          const data = {
            Pid: String(getProjectPID()),
            TName: _this.taskform.TName,
            Description: _this.taskform.Description,
            Creator: String(getUser().id)
          }
          addTask(data)
            .then((res) => {
              if (res.status === 200) {
                _this.gettask()
                _this.createtask = false
              }
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    deltask(tid) {
      console.log(tid)
      delTasksByTid(tid)
        .then((res) => {
          if (res.status === 200) {
            this.gettask()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
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
</style>
