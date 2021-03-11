<template>
  <div>
    <el-drawer
      ref="drawer"
      title="新建项目"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      size="800px"
    >
      <div class="demo-drawer__content">
        <el-row :gutter="15">
          <el-form
            ref="form"
            :model="form"
            label-width="100px"
          >
            <!-- 项目名称 -->
            <el-col :span="15">
              <el-form-item
                label="项目名称"
                prop="pname"
                required
              >
                <el-input
                  v-model="form.pname"
                  autocomplete="off"
                />
              </el-form-item>
            </el-col>
            <!-- 项目类别 -->
            <el-col :span="10">
              <el-form-item
                label="项目分类"
                prop="category"
              >
                <el-input
                  v-model="form.category"
                  autocomplete="off"
                />
              </el-form-item>
            </el-col>
            <!-- 项目描述信息 -->
            <el-col :span="21">
              <el-form-item
                label="项目描述信息"
                prop="description"
              >
                <el-input
                  v-model="form.description"
                  autocomplete="off"
                />
              </el-form-item>
            </el-col>
            <!-- 省市区街级联地址 -->
            <el-col :span="24">
              <el-form-item
                label="地址"
                prop="regionChange"
              >
                <v-region
                  :town="true"
                  @values="regionChange"
                />
              </el-form-item>
            </el-col>
            <!-- 详细地址 -->
            <el-col :span="21">
              <el-form-item
                label="详细地址"
                prop="address"
              >
                <el-input
                  v-model="form.address"
                  autocomplete="off"
                />
              </el-form-item>
            </el-col>
            <!-- 项目的建设单位 -->
            <el-col :span="21">
              <el-form-item
                label="项目建设单位"
                prop="unit"
              >
                <el-input
                  v-model="form.unit"
                  autocomplete="off"
                />
              </el-form-item>
            </el-col>
            <!-- 项目投资额 -->
            <el-col :span="21">
              <el-form-item
                label="项目投资额"
                prop="investamount"
              >
                <el-input
                  v-model="form.investamount"
                  autocomplete="off"
                />
              </el-form-item>
            </el-col>
            <!-- 计划时间 -->
            <el-col :span="25">
              <el-form-item
                label="计划时间"
                prop="plantime"
              >
                <el-date-picker
                  v-model="plantime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="timestamp"
                />
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div
          slot="footer"
          class="demo-drawer__footer"
        >
          <el-button @click="cancelForm">取 消</el-button>
          <el-button
            type="primary"
            :loading="loading"
            @click="$refs.drawer.closeDrawer();addProject()"
          >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import eventVue from '@/utils/eventVue'
import { addProjectApi } from '@/api/project'
import { getUser } from '@/utils/cookie'
export default {
  name: 'ProjectNew',
  data() {
    return {
      table: false,
      dialog: false,
      loading: false,
      plantime: '',
      form: {
        // pid: '', // 项目编号
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
      },
      formLabelWidth: '80px',
      timer: null
    }
  },
  created() {
    this.receiveData()
  },
  methods: {
    // 接收数据
    receiveData() {
      eventVue.$on('dialog', (data) => {
        // console.log('project-new接收数据', data)
        this.dialog = data
      })
    },
    // 获取新建项目的地址部分信息
    regionChange(data) {
      console.log(data)
      this.form.province = data.province ? data.province.value : ''
      this.form.city = data.city ? data.city.value : ''
      this.form.district = data.area ? data.area.value : ''
      this.form.street = data.town ? data.town.value : ''
    },
    // 新建项目
    addProject() {
      const data = this.form
      data.planstarttime = this.plantime[0]
      data.planendtime = this.plantime[1]
      data.creator = getUser().id
      data.username = getUser().username
      // console.log(this.plantime)
      addProjectApi(data).then((res) => {
        console.log('1111', res)
      }).catch((err) => {
        console.log(err)
      })
    },
    handleClose(done) {
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true
          this.timer = setTimeout(() => {
            done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
            }, 400)
          }, 2000)
        })
        .catch(_ => {})
    },
    cancelForm() {
      this.loading = false
      this.dialog = false
      clearTimeout(this.timer)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-drawer__header span:focus {
  outline: 0;
}
.demo-drawer__footer {
  // margin-left: 250px;
}
</style>
