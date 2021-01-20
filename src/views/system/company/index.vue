<template>
  <div>
    <el-button size="medium" type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">注册公司</el-button>
    <ul v-for="item in companyData" :key="item.cid" class="company-info">
      <li>公司名称：{{ item.cname }}</li>
      <li>法定代表人：{{ item.representative }}</li>
      <li>注册资金：{{ item.investamount }}</li>
      <li>公司类型：{{ item.type }}</li>
      <li>公司级别：{{ item.grade }}</li>
      <li>成立日期：{{ item.starttime }}</li>
      <li>组织机构代码证号：{{ item.orgnizationno }}</li>
      <li>公司所在地址：{{ item.address }}</li>
      <li>公司简介：{{ item.description }}</li>
      <li>审核状态：{{ item.checkstatus == 0 ? '审核中' : '已通过' }}</li>
      <li v-if="item.checkstatus == 1">公司邀请码：{{ item.invitationcode }}</li>
      <el-button type="primary">修改公司信息</el-button>
      <el-button type="danger" @click="deleteCompany(item.cid)">删除公司</el-button>
    </ul>
    <el-dialog
      title="注册公司"
      :visible.sync="dialogFormVisible"
      style="margin-top: -40px"
    >
      <el-row :gutter="15">
        <el-form ref="form" :model="form" label-width="100px">
          <el-col :span="21">
            <el-form-item label="公司名称" prop="cname" required="">
              <el-input v-model="form.cname" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="法定代表人" prop="representative" required>
              <el-input v-model="form.representative" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="注册资金" prop="investamount" required>
              <el-input v-model="form.investamount" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="公司类型" prop="type" required>
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="公司级别" prop="grade" required>
              <el-input v-model="form.grade" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="成立日期" prop="starttime" required>
              <el-date-picker
                v-model="form.starttime"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="timestamp"
              />
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="组织机构代码证号" prop="orgnizationno" required>
              <el-input v-model="form.orgnizationno" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="公司所在地址" prop="address" required>
              <el-input v-model="form.address" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="公司简介" prop="description">
              <el-input v-model="form.description" autocomplete="off" />
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
            addCompany()
          "
        >确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUser } from '@/utils/cookie'
import { addCompanyApi, findCompanyApi, deleteCompanyApi } from '@/api/company'
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        cname: '',
        representative: '',
        investamount: '',
        type: '',
        grade: '',
        starttime: '',
        orgnizationno: '',
        address: '',
        description: '',
        creator: getUser().id
      },
      options: [
        {
          value: '有限责任公司',
          label: '有限责任公司'
        },
        {
          value: '股份有限公司',
          label: '股份有限公司'
        },
        {
          value: '有限合伙企业',
          label: '有限合伙企业'
        },
        {
          value: '外商独资公司',
          label: '外商独资公司'
        },
        {
          value: '个人独资企业',
          label: '个人独资企业'
        },
        {
          value: '国有独资公司',
          label: '国有独资公司'
        }
      ],
      companyData: [],
      search: ''
    }
  },
  created() {
    findCompanyApi().then((res) => {
      console.log(res.data)
      if (res.data instanceof Array) {
        this.companyData = res.data.filter((item) => item.creator === getUser().id)
        // console.log(this.companyData)
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    print(cid) {
      console.log(cid)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    // 注册添加公司
    addCompany() {
      const _this = this
      const data = this.form
      addCompanyApi(data).then((res) => {
        console.log(res)
        if (res.data.status === 201) {
          findCompanyApi().then((res) => {
            console.log(res)
            if (res.data instanceof Array) {
              this.companyData = res.data.filter((item) => item.creator === getUser().id)
              // console.log(this.companyData)
            }
          }).catch((err) => {
            console.log(err)
          })
          setTimeout(() => {
            _this.$alert('公司注册成功，系统管理员审核中。', '提示', {
              confirmButtonText: '确定',
              closeOnClickModal: true
            })
          }, 500)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 删除公司
    deleteCompany(cid) {
      deleteCompanyApi(cid).then((res) => {
        console.log(res)
        if (res.data.status === 204) {
          findCompanyApi().then((res) => {
            console.log(res)
            if (res.data instanceof Array) {
              this.companyData = res.data.filter((item) => item.creator === getUser().id)
              // console.log(this.companyData)
            }
          }).catch((err) => {
            console.log(err)
          })
          this.$notify({
            title: '成功',
            message: '删除成功',
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

<style lang="scss" scoped>
.company-info {
  margin: 20px 80px;
  width: 800px;
  background-color: lightgreen;
  li {
    margin-top: 15px;
  }
}
</style>
