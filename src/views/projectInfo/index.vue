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
                <el-input v-model="form.MName" autocomplete="off" />
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
              allUpload();
            "
          >确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 列表渲染 -->
      <el-col v-for="item in modelList" :key="item.MId" :span="4" :offset="1">
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
                    getModelInfo(item.MId);
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
                  @onConfirm="deleteModel(item.MId)"
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
            <img :src="item.MPicture" class="model-image" @click="lookDetail(item)">
            <div class="text">
              <div>{{ item.MName }}</div>
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
          <el-row :gutter="15">
            <el-form ref="editForm" :model="editForm" label-width="100px">
              <el-col :span="15">
                <el-form-item label="模型名称" prop="MName">
                  <el-input v-model="editForm.MName" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="15">
                <el-form-item label="模型描述" prop="MDescription">
                  <el-input
                    v-model="editForm.MDescription"
                    autocomplete="off"
                  />
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="
                editDialogVisible = false;
                submitUpload();
              "
            >确 定
            </el-button>
          </div>
        </el-dialog>
      </el-col>
      <!-- 二三维联动 -->
      <el-dialog
        ref="bimFaceBim"
        title="模型展示"
        :visible.sync="linkageBim"
        width="90%"
        top="5vh"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <bimfacelinkage
          v-if="linkageBim"
          ref="linkBimFace"
          :model-file-id="modelFileId"
          :file-name="fileName"
          :model-token="modelToken"
        />
      </el-dialog>
      <!-- 添加模型 -->
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
  updateModelByMId,
  findmodelByPID,
  findModelByMid
} from '@/api/model'
import { getProjectPID, getUser } from '@/utils/cookie'
import bimfacelinkage from './bimfacelinkage'
export default {
  name: 'Model',
  components: {
    bimfacelinkage
  },
  data() {
    return {
      dialogFormVisible: false,
      editDialogVisible: false,
      linkageBim: false,
      modelList: [],
      form: {
        MId: '',
        MName: '',
        Creator: '',
        PID: '',
        MDescription: '',
        MPicture: '',
        MFile: ''
      },
      editForm: {},
      fileName: '',
      modelFileId: '',
      modelToken: ''
    }
  },
  created() {
    // 根据项目id查模型
    findmodelByPID(getProjectPID())
      .then((res) => {
        console.log(res)
        // console.log(res.data);
        this.modelList = res.data.data
        // console.log(this.modelList);
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    // 获取图片
    handleChangePic(file, fileList) {
      // console.log(file)
      this.form.MPicture = file.raw
      // console.log(this.pictureFile)
    },
    // 获取文件
    handleChangeMod(file, fileList) {
      // console.log(file)
      this.form.MFile = file.raw
      // console.log(this.pictureFile)
    },
    // 提交添加模型表单
    allUpload() {
      const _this = this
      const data = new FormData()
      data.append('PID', getProjectPID())
      data.append('Creator', getUser().id)
      data.append('MName', this.form.MName)
      data.append('MPicture', this.form.MPicture)
      data.append('MDescription', this.form.MDescription)
      data.append('MFile', this.form.MFile)
      // 调用添加模型接口
      addModel(data)
        .then((res) => {
          console.log(229, res)
          if (res.data.code === 200) {
            findmodelByPID(getProjectPID())
              .then((res) => {
                this.modelList = res.data.data
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
    // 提交修改模型模型表单
    submitUpload() {
      const _this = this
      const data = new FormData()
      data.append('MName', this.editForm.MName)
      data.append('MDescription', this.editForm.MDescription)
      // 调用修改模型接口
      updateModelByMId(data)
        .then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            findmodelByPID(getProjectPID())
              .then((res) => {
                this.modelList = res.data.data
              })
              .catch((err) => {
                console.log(err)
              })
            _this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 1000,
              offset: 80
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 根据模型id获取模型信息
    getModelInfo(MId) {
      console.log(MId)
      // 调用根据模型id查模型接口
      findModelByMid(MId)
        .then((res) => {
          this.editForm = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 删除模型
    deleteModel(MId) {
      const _this = this
      // 调用删除模型接口
      delModel(MId).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          findmodelByPID(getProjectPID())
            .then((res) => {
              this.modelList = res.data.data
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
    },
    // 查看模型详情L
    lookDetail(modelList) {
      this.modelFileId = modelList.MId
      this.fileName = modelList.MName
      this.modelToken = modelList.ModelToken
      this.linkageBim = true
    }
  }
}
</script>

<style lang="scss" scoped>
.modelTool {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 5px 0;
  position: sticky;
  font-size: 8px;
  text-align: center;
  // background-color: red;
}
.model-image {
  width: 100%;
  height: 120px;
  background-size: 120px;
  display: block;
  cursor: pointer;
}
.text {
  text-align: center;
  margin: 10px 0;
}
.item {
  margin: 0 5px;
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
