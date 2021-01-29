<template>
  <div class="container">
    <div>
      <el-button type="primary" @click="participantDialogVisible = true;findCompany()">添加参建方单位</el-button>
    </div>
    <section v-for="item in participantList" :key="item.cid">
      {{ item.roleinproject }}
      <br>
      {{ item.companyid }}
      {{ item.cname }}
    </section>
    <!-- <section>
      施工单位
    </section>
    <section>
      监理单位
    </section>
    <section>
      业主单位
    </section> -->
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
  </div>
</template>

<script>
import { findCompanyApi } from '@/api/company'
import { findParticipantApi, addParticipantApi } from '@/api/participant'
import { getProjectPID, getUser } from '@/utils/cookie'
export default {
  data() {
    return {
      participantDialogVisible: false,
      companyData: [],
      participant: {},
      participantList: [],
      value1: '', // 施工单位
      value2: '', // 监理单位
      value3: '' // 业主单位
    }
  },
  created() {
    findParticipantApi(getProjectPID()).then((res) => {
      console.log(res)
      if (res.data instanceof Array) {
        this.participantList = res.data
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    print() {
      console.log(this.value1)
      // console.log(this.)
      console.log(this.value2)
      console.log(this.value3)
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
      addParticipantApi(data).then((res) => {
        console.log(res)
        if (res.data.status === 201) {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 40px;
  display: flex;
  justify-content: space-around;
  section {
    margin: 40px;
    background-color: lightgreen;
  }
}
</style>
