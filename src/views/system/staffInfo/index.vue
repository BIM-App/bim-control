<template>
  <div class="table-box">
    <el-table
      :data="UserData"
      style="width: 100%"
    >
      <el-table-column
        label="用户名"
        prop="username"
      />
      <el-table-column
        label="角色"
        prop="roleinproject"
      />
      <el-table-column
        align="right"
      >
        <template slot="header" slot-scope="">
          <div class="right-bar" />
        </template>
        <template slot-scope="scope">
          <el-button
            v-if="!scope.$index ==0"
            size="medium"
            @click="handleEdit(scope.$index, scope.row);
                    open()"
          >编辑</el-button>
          <el-button
            v-if="!scope.$index ==0"
            size="medium"
            type="danger"
            @click="deleteMember(scope.$index, scope.row);

            "
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { findUsersByCompanyIDApi } from '@/api/company'
import { getCompanyCID } from '@/utils/cookie'
export default {
  data() {
    return {
      UserData: []
    }
  },
  created() {
    findUsersByCompanyIDApi(getCompanyCID()).then((res) => {
      console.log(res)
      if (res.data instanceof Array) {
        this.UserData = res.data
      }
      // console.log(this.UserData)
    }).catch((err) => {
      console.log(err)
    })
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
