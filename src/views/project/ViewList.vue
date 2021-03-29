<template>
  <div>
    <el-table
      :data="allProjectList"
      style="width: 100%"
      @row-click="openDetails"
    >
      <el-table-column
        label="项目名称"
        prop="pname"
      />
      <el-table-column
        label="项目负责人"
        prop="creator"
      />
      <el-table-column align="right">
        <template
          slot="header"
          slot-scope=""
        />
        <!-- <template slot-scope="scope">
          <el-button
            disabled
            size="mini"
            @click.stop="handleEdit(scope.$index, scope.row)"
          >Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click.stop="handleDelete(scope.$index, scope.row)"
          >Delete</el-button>
        </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { findProjectsApi } from '@/api/user'
import { deleteProjectApi } from '@/api/project'
import { getUser } from '@/utils/cookie'
import eventVue from '@/utils/eventVue'
export default {
  data() {
    return {
      allProjectList: []
    }
  },
  created() {
    this.findProjects()
    this.receiveData()
  },
  methods: {
    // 接收共享数据
    receiveData() {
      eventVue.$on('addFlag', (data) => {
        console.log(data)
        this.findProjects()
      })
    },
    // 获取所有参与项目列表
    findProjects() {
      findProjectsApi(getUser().username).then((res) => {
        if (res.data) {
          // console.log(res.data)
          this.allProjectList = res.data
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 打开对应pid项目详情
    openDetails(row, column, event) {
      console.log(row)
      this.$router.push(`/project/${row.pid}`)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    // 删除项目
    handleDelete(index, row) {
      console.log(index, row)
      deleteProjectApi(row.pid).then((res) => {
        console.log(res)
        if (res.data.status === 204) {
          this.$message({
            message: '项目删除成功',
            type: 'success'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table__row {
  cursor: pointer;
}
</style>
