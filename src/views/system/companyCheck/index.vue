<template>
  <el-table
    :data="companyData"
    style="width: 100%"
  >
    <el-table-column
      label="公司名称"
      prop="cname"
    />
    <el-table-column
      label="法定代表人"
      prop="representative"
    />
    <el-table-column
      label="审核状态"
      prop="checkstatus"
    />
    <el-table-column
      align="right"
    >
      <template slot="header">
        <!-- <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"
        /> -->
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="updateCheckStatus(scope.$index, scope.row)"
        >通过</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { findCompanyApi, updateCheckStatusApi } from '@/api/company'
import { getUser } from '@/utils/cookie'
export default {
  data() {
    return {
      companyData: [],
      search: '',
      checkPass: false
    }
  },
  created() {
    findCompanyApi().then((res) => {
      // console.log(res.data)
      if (res.data instanceof Array) {
        this.companyData = res.data
        // this.companyData.forEach(
        //   item => { item.checkstatus === 0 ? item.checkstatus = '审核中' : item.checkstatus = '已通过' }
        // )
      }
      // console.log(this.companyData)
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    // 更新审核状态
    updateCheckStatus(index, row) {
      // console.log(index, row)
      const data = {
        cid: row.cid,
        checkstatus: 1,
        updater: getUser().id
      }
      updateCheckStatusApi(data).then((res) => {
        console.log(res)
        if (res.data.status === 200) {
          findCompanyApi().then((res) => {
            console.log(res.data)
            if (res.data instanceof Array) {
              this.companyData = res.data
              // this.companyData.forEach(
              //   item => { item.checkstatus === 0 ? item.checkstatus = '审核中' : item.checkstatus = '已通过' }
              // )
            }
            console.log(this.companyData)
          }).catch((err) => {
            console.log(err)
          })
          this.$message({
            type: 'success',
            message: '审核状态更新成功'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
