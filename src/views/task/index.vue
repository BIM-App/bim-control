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
          <el-input
            v-model="taskform.Description"
            style="width: 242px"
          />
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
    console.log(this.$store.state.project.projectId)
  },
  methods: {
    // 获取所有任务列表
    goAllTask() {
      this.$router.push(`/task/index`)
    },
    gettask() {
      findTaskByPID(this.$store.state.project.projectId)
        .then((res) => {
          this.tasklist = res.data
        })
        .catch((err) => {
          console.log(err)
        })
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
    deltask(tid) {
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
