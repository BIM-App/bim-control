<template>
  <div>
    <el-row>
      <!-- 添加模型表单dialog框 -->
      <el-dialog
        title="添加模型"
        :visible.sync="dialogFormVisible"
        style="margin-top: -60px"
      >
        <el-row :gutter="15">
          <el-form ref="form" :model="form" label-width="100px">
            <!-- 模型名称 -->
            <el-col :span="15">
              <el-form-item label="模型名称" prop="MName">
                <el-input
                  v-model="form.MName"
                  autocomplete="off"
                />
              </el-form-item>
            </el-col>
            <!-- 模型描述 -->
            <el-col :span="21">
              <el-form-item label="项目描述信息" prop="MDescription">
                <el-input v-model="form.MDescription" autocomplete="off" />
              </el-form-item>
            </el-col>
            <!-- 模型预览图 -->
            <el-col :span="24">
              <el-form-item label="模型预览图" prop="MPicture" required>
                <el-upload
                  ref=""
                  action=""
                  :on-change="handleChangePic"
                  :http-request="allUpload"
                  :auto-upload="false"
                  list-type="picture-card"
                >
                  <i class="el-icon-plus" />
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件
                  </div>
                </el-upload>
              </el-form-item>
            </el-col>
            <!-- 上传模型 -->
            <el-col :span="24">
              <el-form-item label="上传模型" prop="MFile">
                <el-upload
                  ref=""
                  action=""
                  :on-change="handleChangeMod"
                  :http-request="allUpload"
                  :auto-upload="false"
                  list-type="text"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
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
              allUpload()
            "
          >确 定
          </el-button>
        </div>
      </el-dialog>

      <el-col v-for="item in modelList" :key="item.mid" :span="4" :offset="1">
        <div style="margin-top: 20px">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div class="modelTool">
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑模型信息"
                placement="bottom-start"
              >
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="
                    editDialogVisible = true;
                    getModelInfo(item.Mid);
                  "
                />
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除模型"
                placement="bottom-start"
              >
                <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  icon="el-icon-info"
                  icon-color="red"
                  title="确定要删除此模型吗？"
                  @onConfirm="deleteModel(item.Mid)"
                >
                  <el-button
                    slot="reference"
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                  />
                </el-popconfirm>
              </el-tooltip>
            </div>
            <a href="#">
              <img :src="item.picture" class="image">
            </a>
            <div>
              <div>{{ item.pname }}</div>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <!-- <el-button type="text" class="button">操作按钮</el-button> -->
              </div>
            </div>
          </el-card>
        </div>
        <!-- 编辑模型信息 -->
        <el-dialog
          title="模型信息"
          :visible.sync="editDialogVisible"
          style="margin-top: -40px"
        >
          <el-col :span="15">
            <el-form-item label="模型名称" prop="MName">
              <el-input v-model="editForm.MName" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="15">
            <el-form-item label="模型描述" prop="MDescription">
              <el-input v-model="editForm.MDescription" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-dialog>
      </el-col>
      <!-- 添加项目 -->
      <el-col
        :span="4"
        class="preCard"
        @click.native="dialogFormVisible = true"
      >
        <div style="margin-top: 15px">
          <el-card>
            <i class="el-icon-plus" />
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  addModel,
  delModel,
  delModelByPID,
  updateModelByMId,
  findmodelByPID,
  findModelByMid
} from '@/api/model'
import { getProjectPID, getUser } from '@/utils/auth'
export default {
  name: 'Model',
  data() {
    return {
      dialogFormVisible: false,
      editDialogVisible: false,
      modelList: [],
      form: {
        MName: '',
        Creator: '',
        PID: '',
        MDescription: '',
        MPicture: '',
        MFile: ''
      },
      editForm: {}
    }
  },
  created() {
    const _this = this
    findmodelByPID(getProjectPID())
      .then((res) => {
        console.log(res)
        // console.log(res.data);
        if (res.data instanceof Array) {
          // console.log(res.data)
          _this.modelList = res.data
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    handleChangePic(file, fileList) {
      // console.log(file)
      this.form.MPicture = file.raw
      // console.log(this.pictureFile)
    },
    handleChangeMod(file, fileList) {
      // console.log(file)
      this.form.MFile = file.raw
      // console.log(this.pictureFile)
    },
    allUpload() {
      const _this = this
      const data = new FormData()
      data.append('PID', getProjectPID())
      data.append('Creator', getUser().id)
      data.append('MName', this.form.MName)
      data.append('MPicture', this.form.MPicture)
      data.append('MDescription', this.form.MDescription)
      data.append('MFile', this.form.MFile)
      addModel(data)
        .then((res) => {
          console.log(229, res)
          if (res.code === 200) {
            findmodelByPID(getProjectPID())
              .then((res) => {
                if (res.data instanceof Array) {
                  _this.modelList = res.data
                }
              })
              .catch((err) => {
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
          console.log(250, err)
        })
    },
    getModelInfo(mid) {
      findModelByMid(mid)
        .then((res) => {
          this.editForm = res.data
          this.editForm.mid = mid
        })
        .catch((err) => {
          console.log(err)
        })
    },
    submitUpload(param) {
      this.$refs.upload.submit()
    },
    deleteModel(mid) {
      const _this = this
      delModel(mid).then((res) => {
        if (res.code === 200) {
          findmodelByPID(getProjectPID())
            .then((res) => {
              // console.log(project)
              // console.log(res.data);
              if (res.data instanceof Array) {
                // console.log(res.data)
                _this.modelList = res.data
              }
            })
            .catch((err) => {
              console.log(err)
            })
          _this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 1000,
            offset: 80
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.modelTool {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 80px;
  margin-bottom: 5px;
  position: sticky;
  bottom: 0;
  font-size: 8px;
  text-align: center;
  // background-color: red;
}
.preCard {
  margin-left: 60px;
  height: 100%;
  .el-card {
    text-align: center;
    border: 2px dashed #d9d9d9;
    .el-icon-plus {
      font-size: 28px;
      color: #8c939d;
      // width: 178px;
      // height: 178px;
      line-height: 178px;
      text-align: center;
    }
  }
}
</style>
