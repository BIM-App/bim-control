<template>
  <div>
    <el-row>
      <!-- 新建项目表单Dialog框 -->
      <el-dialog
        title="新建项目"
        :visible.sync="dialogFormVisible"
        style="margin-top: -60px"
      >
        <el-row :gutter="15">
          <el-form ref="form" :model="form" label-width="100px">
            <!-- 项目名称 -->
            <el-col :span="15">
              <el-form-item label="项目名称" prop="pname" required>
                <el-input v-model="form.pname" autocomplete="off" />
              </el-form-item>
            </el-col>
            <!-- 项目类别 -->
            <el-col :span="10">
              <el-form-item label="项目分类" prop="category">
                <el-input v-model="form.category" autocomplete="off" />
              </el-form-item>
            </el-col>
            <!-- 项目描述信息 -->
            <el-col :span="21">
              <el-form-item label="项目描述信息" prop="description">
                <el-input v-model="form.description" autocomplete="off" />
              </el-form-item>
            </el-col>
            <!-- 省市区街级联地址 -->
            <el-col :span="24">
              <el-form-item label="地址" prop="regionChange">
                <v-region :town="true" @values="regionChange" />
              </el-form-item>
            </el-col>
            <!-- 详细地址 -->
            <el-col :span="21">
              <el-form-item label="详细地址" prop="address">
                <el-input v-model="form.address" autocomplete="off" />
              </el-form-item>
            </el-col>
            <!-- 项目的建设单位 -->
            <el-col :span="21">
              <el-form-item label="项目建设单位" prop="unit">
                <el-input v-model="form.unit" autocomplete="off" />
              </el-form-item>
            </el-col>
            <!-- 项目投资额 -->
            <el-col :span="21">
              <el-form-item label="项目投资额" prop="investamount">
                <el-input v-model="form.investamount" autocomplete="off" />
              </el-form-item>
            </el-col>
            <!-- 计划开始时间 -->
            <el-col :span="25">
              <el-form-item label="计划开始时间" prop="planstarttime">
                <el-date-picker
                  v-model="form.planstarttime"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="timestamp"
                />
              </el-form-item>
            </el-col>
            <!-- 计划结束时间 -->
            <el-col :span="25">
              <el-form-item label="计划结束时间" prop="planendtime">
                <el-date-picker
                  v-model="form.planendtime"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="timestamp"
                />
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              dialogFormVisible = false;
              addProject()
            "
          >确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 动态渲染卡片部分 -->
      <el-col v-for="item in projectList" :key="item.pid" :span="4" :offset="1">
        <div style="margin-top: 40px">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card">
            <img
              :src="item.picture"
              class="project-image"
              title="进入项目详情"
              @click="toProjectInfo(item.pid)"
            >
            <div>
              <!-- <div>项目pid：{{ item.pid }}</div> -->
              <div class="bottom clearfix" />
              <div>项目名称：{{ item.pname }}</div>
              <!-- <div class="bottom clearfix" /> -->
            </div>
          </el-card>
        </div>
      </el-col>
      <!-- 新建项目ICON 点击部分 -->
      <el-tooltip
        class="item"
        effect="dark"
        content="新建项目"
        placement="left"
      >
        <div class="tools" @click="dialogFormVisible = true">
          <i class="el-icon-plus" />
        </div>
      </el-tooltip>
    </el-row>
  </div>
</template>

<script>
import { findProjectsApi } from '@/api/user'
import { addProjectApi } from '@/api/project'
import { getUser, setProjectPID } from '@/utils/cookie'

export default {
  name: 'Project',
  data() {
    return {
      key: '',
      dialogFormVisible: false,
      projectList: [],
      // regionChange: '',
      form: {
        pid: '', // 项目编号
        pname: '', // 项目名称
        picture: '', // 项目预览图，URL
        category: '', // 项目类别
        description: '', // 项目描述信息
        province: '', // 省
        city: '', // 市
        district: '', // 区
        street: '', // 街道
        town: '', // 镇
        address: '', // 详细地址
        unit: '', // 项目的建设单位
        pmid: '', // 项目负责人编号
        video: '', // 项目宣传视频
        investamount: '', // 投资额
        planstarttime: '', // 计划开始时间
        planendtime: '', // 计划完成时间
        creator: '', // 创建者用户编号
        username: ''
      }
    }
  },
  created() {
    const _this = this
    // 根据用户名查询项目
    findProjectsApi(getUser().username).then((res) => {
      // console.log(res.data)
      // FIXME:需要判断
      if (res.data instanceof Array) {
        console.log(res.data)
        // _this.projectList = res.data
        _this.projectList = res.data.filter(item => item !== null)
        console.log(_this.projectList)
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    // 跳转到项目详情页面
    toProjectInfo(pid) {
      setProjectPID(pid)
      this.$router.push(`/project/${pid}/info`)
      // console.log(pid)
    },
    // 获取新建项目的地址部分信息
    regionChange(data) {
      console.log(data)
      this.form.province = data.province ? data.province.value : ''
      this.form.city = data.city ? data.city.value : ''
      this.form.district = data.area ? data.area.value : ''
      this.form.street = data.town ? data.town.value : ''
    },
    // 提交新建项目表单
    addProject() {
      const _this = this
      const data = {
        pname: this.form.pname,
        picture: this.form.picture,
        category: this.form.category,
        description: this.form.description,
        province: this.form.province,
        city: this.form.city,
        district: this.form.district,
        street: this.form.street,
        town: this.form.town,
        address: this.form.address,
        unit: this.form.unit,
        pmid: this.form.pmid,
        video: this.form.video,
        investamount: this.form.investamount,
        planstarttime: this.form.planstarttime,
        planendtime: this.form.planendtime,
        creator: getUser().id,
        username: getUser().username
      }
      addProjectApi(data).then((res) => {
        // console.log(res.data) // for debug
        if (res.data.status === 201) {
          _this.$refs.form.resetFields() // 新建项目成功则清空表单
          findProjectsApi(getUser().username).then((res) => {
            console.log(res)
            // FIXME: 判断
            if (res.data instanceof Array) {
              _this.projectList = res.data
            }
          }).catch((err) => {
            console.log(err)
          })
          _this.$notify({
            title: '成功',
            message: '新建成功',
            type: 'success',
            duration: 1000,
            offset: 80
          })
        }
      })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.project-image {
  width: 100%;
  height: 120px;
  background-size: 120px;
  display: block;
  // border-radius: 4px;
  cursor: pointer;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.card {
  border: 5px solid #EBEEF5;
  border-radius: 5px;
}

.tools {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 2vw;
  top: 30vh;
  width: 50px;
  height: 200px;
  background-color: #66b0ff8c;
  border-radius: 10px;
  cursor: pointer;
  i {
    color: white;
  }
}
</style>
