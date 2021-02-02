<template>
  <div>
    <el-table
      :data="participantList"
      style="width: 100%"
    >
      <el-table-column
        label="参建方单位"
        prop="roleinproject"
      />
      <el-table-column
        label="公司名称"
        prop="cname"
      />
      <el-table-column
        align="right"
      >
        <template slot="header" slot-scope="">
          <el-button type="primary" @click="participantDialogVisible = true;findCompany()">添加参建方单位</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row);
                    membersDialogVisible = true"
          >添加成员到项目</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 参建方管理 -->
    <el-dialog
      title="参建方单位管理"
      :visible.sync="participantDialogVisible"
      style="margin-top: -40px"
    >
      <el-row :gutter="15">
        <el-form ref="participant " :model="participant " label-width="100px">
          <el-col :span="15">
            <el-form-item label="施工单位">
              <!-- <el-input v-model="project.description" autocomplete="off" /> -->
              <el-select v-model="value1" filterable placeholder="请选择">
                <el-option
                  v-for="item in companyData"
                  :key="item.cid"
                  :label="item.cname"
                  :value="item.cid"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="15">
            <el-form-item label="监理单位">
              <el-select v-model="value2" filterable placeholder="请选择">
                <el-option
                  v-for="item in companyData"
                  :key="item.cid"
                  :label="item.cname"
                  :value="item.cid"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="15">
            <el-form-item label="业主单位">
              <el-select v-model="value3" filterable placeholder="请选择">
                <el-option
                  v-for="item in companyData"
                  :key="item.cid"
                  :label="item.cname"
                  :value="item.cid"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" participantDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            addParticipant();
            participantDialogVisible = false
          "
        >确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 参建方成员管理 -->
    <el-dialog
      title="参建方成员管理"
      :visible.sync="membersDialogVisible"
      style="margin-top: -40px"
    >
      <el-row :gutter="15">
        <el-form ref="members " :model="members" label-width="100px">
          <el-col :span="25">
            <el-form-item label="">
              <template>
                <el-transfer v-model="memberValue" :titles="[company, project]" :data="participantMember" />
              </template>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" membersDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            membersDialogVisible = false;
            print();
            addProjectMember()
          "
        >确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findProjectInfoApi } from '@/api/project'
import { addProjectMembersApi } from '@/api/member'
import { findCompanyApi, findUsersByCompanyIDApi } from '@/api/company'
import { findParticipantApi, addParticipantApi } from '@/api/participant'
import { getProjectPID, getUser } from '@/utils/cookie'
export default {
  data() {
    return {
      company: '', // 穿梭框左侧标题  当前公司名称
      project: '', // 穿梭框右侧标题 当前项目名称
      memberValue: [], // 将要添加到项目中的成员
      participantDialogVisible: false,
      membersDialogVisible: false,
      companyData: [],
      participant: {},
      members: {},
      participantMember: [], // 参建方员工数据源
      participantList: [],
      value1: '', // 施工单位
      value2: '', // 监理单位
      value3: '', // 业主单位
      search: ''
    }
  },
  created() {
    // 根据项目pid获取参建方列表
    findParticipantApi(getProjectPID()).then((res) => {
      console.log(res)
      if (res.data instanceof Array) {
        this.participantList = res.data
      }
    }).catch((err) => {
      console.log(err)
    })
    // 根据项目pid查询项目信息
    findProjectInfoApi(getProjectPID()).then((res) => {
      console.log(res)
      if (res.data.pid) {
        this.project = res.data.pname
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    print() {
      console.log(this.memberValue)
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.company = row.cname
      findUsersByCompanyIDApi(row.companyid).then((res) => {
        console.log(res)
        if (res.data instanceof Array) {
          const arr = []
          // 只包含username的数组源
          const member = res.data.map(item => item.username)
          member.forEach((username, index) => {
            // console.log(res.data)
            arr.push({
              label: username,
              key: member[index]
            })
          })
          // console.log(arr)
          this.participantMember = arr
          // const member = res.data.map(item => item.username)
          // console.log(member)
          // this.participantMember = res.data
          // console.log(this.participantMember)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    // 查询公司列表
    findCompany() {
      findCompanyApi().then((res) => {
        console.log(res)
        if (res.data instanceof Array) {
          this.companyData = res.data
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 批量添加参建方单位
    addParticipant() {
      const data = [
        {
          creator: getUser().id,
          projectId: getProjectPID()
        },
        {
          companyId: this.value1,
          roleInProject: '施工单位'
        },
        {
          companyId: this.value2,
          roleInProject: '监理单位'
        },
        {
          companyId: this.value3,
          roleInProject: '业主单位'
        }
      ]
      // 添加参建方接口
      addParticipantApi(data).then((res) => {
        console.log(res)
        if (res.data.status === 201) {
          // 根据项目pid查询参建方列表
          findParticipantApi(getProjectPID()).then((res) => {
            console.log(res)
            if (res.data instanceof Array) {
              this.participantList = res.data
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 根据公司cid返回该公司员工(用户)集合
    findUsersByCompanyID() {
      findUsersByCompanyIDApi().then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    // 批量添加参建方成员到项目中
    addProjectMember() {
      const data = [
        {
          creator: getUser().id,
          projectId: getProjectPID()
        }
      ]
      this.memberValue.forEach((username) => {
        data.push({
          // username: this.memberValue[index]
          username: username,
          roleInProject: '暂无'
        })
      })

      // console.log(data)   // 准备添加到项目的成员数据
      addProjectMembersApi(data).then((res) => {
        console.log(res)
        if (res.data.status === 201) {
          this.$notify({
            title: '成功',
            message: '批量添加成功',
            type: 'success',
            duration: 1000,
            offset: 80
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
