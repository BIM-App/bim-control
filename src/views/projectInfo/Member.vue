<template>
  <div>
    <div class="top-info">
      <h2>{{ projectInfo.pname }}</h2>
      <div class="fr">
        <el-button
          disabled
          size="mini"
          class="addMember"
          type="primary"
          icon="el-icon-plus"
          @click="memberDialogVisible = true"
        >添加成员</el-button>
      </div>
    </div>
    <div class="member-list">
      <div class="table-box">
        <el-table
          :data="tableData"
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
            label="所属公司"
            prop="cname"
          />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.roleinproject !== '项目创建者'"
                size="mini"
                @click="handleEdit(scope.$index, scope.row);
                        open()"
              >编辑</el-button>
              <el-button
                v-if="scope.row.roleinproject !== '项目创建者'"
                size="mini"
                type="danger"
                @click="deleteMember(scope.$index, scope.row);

                "
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 添加项目成员Dialog -->
        <el-dialog
          title="添加项目成员"
          :visible.sync="memberDialogVisible"
          style="margin-top:-40px"
        >
          <el-row :gutter="15">
            <el-form
              ref="memberForm"
              :model="memberForm"
              label-width="100px"
            >
              <el-col :span="22">
                <el-form-item
                  label="用户名"
                  prop="username"
                >
                  <el-input
                    v-model="memberForm.username"
                    autocomplete="off"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item
                  label="用户角色"
                  prop="roleinproject"
                >
                  <el-input
                    v-model="memberForm.roleinproject"
                    autocomplete="off"
                  />
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="memberDialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="
                memberDialogVisible = false;
                addMember()
              "
            >确 定
            </el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { getMember, getUser, setMember } from '@/utils/cookie'
import { findProjectMembersApi } from '@/api/project'
import { deleteMemberApi, updateMemberApi } from '@/api/member'
export default {
  name: 'Member',
  props: {
    projectInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      memberDialogVisible: false,
      tableData: [],
      memberForm: {
        username: '',
        roleinproject: ''
      },
      search: ''
    }
  },
  created() {
    // console.log(getMember()) // for debug
    this.tableData = getMember()
    // 进入项目成员页时查询所有该项目下的成员
    findProjectMembersApi(Number(this.$route.params.pid)).then((res) => {
      console.log(11, res)
      if (res.data instanceof Array) {
        this.tableData = res.data
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    handleEdit(index, row) {
      const _this = this
      console.log(index, row)
      this.$prompt('编辑成员角色', '提示', {
        inputValue: row.roleinproject,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false
      }).then(({ value }) => {
        const data = {
          id: row.id,
          roleinproject: value,
          updater: getUser().id
        }
        // 更新成员信息
        updateMemberApi(data).then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            // 调用根据PID查询项目下所有成员列表接口
            findProjectMembersApi(Number(this.$route.params.pid)).then((res) => {
              console.log(res)
              setMember(res.data)
              _this.tableData = res.data
            }).catch((err) => {
              console.log(err)
            })
            this.$message({
              type: 'success',
              message: '成员信息更新成功'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    // 根据成员id删除项目成员
    deleteMember(index, row) {
      const _this = this
      // console.log(index, row)
      deleteMemberApi(row.id).then((res) => {
        console.log(res)
        if (res.data.status === 204) {
          // 调用根据PID查询项目下所有成员列表接口
          findProjectMembersApi(Number(this.$route.params.pid)).then((res) => {
            console.log(res)
            setMember(res.data)
            _this.tableData = res.data
            _this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 1000,
              offset: 80
            })
          }).catch((err) => {
            console.log(err)
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 添加项目成员
    // addMember() {
    //   const _this = this
    //   const data = {
    //     projectid: Number(this.$route.params.pid),
    //     username: this.memberForm.username,
    //     roleinproject: this.memberForm.roleinproject,
    //     creator: getUser().id
    //   }
    //   // 调用添加项目成员接口
    //   addMembersApi(data).then((res) => {
    //     console.log(res)
    //     if (res.data.status === 201) {
    //     // 清空添加项目成员表单
    //       _this.$refs.memberForm.resetFields()
    //       // 调用根据PID查询项目下所有成员列表接口
    //       findProjectMembersApi(Number(this.$route.params.pid)).then((res) => {
    //         console.log(res)
    //         setMember(res.data)
    //         _this.tableData = res.data
    //         _this.$notify({
    //           title: '成功',
    //           message: '添加成功',
    //           type: 'success',
    //           duration: 1000,
    //           offset: 80
    //         })
    //       }).catch((err) => {
    //         console.log(err)
    //       })
    //     } else if (res.data.status === 404) {
    //       setTimeout(() => {
    //         _this.$alert('添加的用户不存在', '提示', {
    //           confirmButtonText: '确定',
    //           closeOnClickModal: true,
    //           callback: action => {
    //           // this.$message({
    //           //   type: 'info',
    //           //   message: `action: ${action}`
    //           // })
    //           }
    //         })
    //       }, 500)
    //     } else {
    //       console.log('其他错误')
    //     }
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // },
    open() {

    }
  }
}
</script>

<style lang="scss" scoped>
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
