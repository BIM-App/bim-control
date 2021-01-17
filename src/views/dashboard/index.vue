<template>
  <div class="dashboard-container">
    <el-col :span="5">
      <div shadow="hover" class="card">
        <div class="el-icon-user icon" />
        <div class="info">
          <div class="title">{{ role }}</div>
          <div>角色权限</div>
        </div>
      </div>
    </el-col>
    <el-col :span="5">
      <div shadow="hover" class="card">
        <div class="el-icon-box icon" />
        <div class="info">
          <div class="title">{{ projects }}</div>
          <div>项目数量</div>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
import { findProjectsApi } from '@/api/user'
import { getUser, getRole } from '@/utils/cookie'
export default {
  name: 'Dashboard',
  data() {
    return {
      projects: 0,
      role: ''
    }
  },
  created() {
    const _this = this
    // 调用查询用户下项目接口，根据用户名查询项目
    findProjectsApi(getUser().username)
      .then((res) => {
        // console.log(res.data.length)
        if (res.data.length) {
          _this.projects = res.data.length
        }
        _this.role = getRole()
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.card {
  margin-left: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(239,241,244);
  border-radius: 10px;
  .icon {
      font-size: 80px;
  }
  .info {
    margin: 20px 10px;
    font-size: 20px;
    color: gray;
    // background-color: green;
    .title {
      margin-bottom: 10px;
      font-size: 30px;
      text-align: center;
      color: rgb(102,102,102);
    }
  }
}
</style>
