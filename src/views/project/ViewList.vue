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
        >
          <!-- <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
          /> -->
        </template>
        <template slot-scope="scope">
          <el-button
            disabled
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button>
          <el-button
            disabled
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { findProjectsApi } from '@/api/user'
import { getUser } from '@/utils/cookie'
export default {
  data() {
    return {
      allProjectList: []
    }
  },
  created() {
    this.findProjects()
  },
  methods: {
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
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table__row {
  cursor: pointer;
}
</style>
