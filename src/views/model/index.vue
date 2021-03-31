<template>
  <div class="model-container">
    <div>
      <div class="top-info">
        <h2>模型</h2>
        <span>当前项目：
          <el-select
            v-model="value"
            size="small"
            placeholder="请选择"
            @change="selectDetail(value)"
          >
            <el-option
              v-for="item in projectList"
              :key="item.value"
              :label="item.pname"
              :value="item.pid"
            />
          </el-select>
        </span>
        <div class="fr">
          <el-button
            v-if="value"
            size="mini"
            type="primary"
            @click="addModelDialogVisible= true"
          >上传模型</el-button>
        </div>
      </div>
      <ul class="model-list">
        <li
          v-for="item in modelList"
          :key="item.MId"
          @click="getModelInfo(item);
                  dialogVisible = true"
        >
          <img :src="item.MPicture">
          <div>{{ item.MName }}</div>
        </li>
        <div
          v-if="!modelList "
          class="model-tip"
        >
          <div>当前项目暂无模型</div>
          <!-- <div>请先选择一个项目以查看模型</div> -->
        </div>
      </ul>
      <!-- 模型详细视图 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="90%"
        top="20px"
      >
        <!-- :before-close="handleClose" -->

        <!-- <span>{{ currentModel }}</span> -->
        <!-- <div>MId: {{ currentModel.MId }}</div>
        <div>MFile: {{ currentModel.MFile }}</div> -->
        <bimface-linkage
          v-if="dialogVisible"
          :model-file-id="modelFileId"
          :file-name="fileName"
        />
        <!-- <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="dialogVisible = false"
          >确 定</el-button>
        </span> -->
      </el-dialog>
      <!-- 上传中 -->
      <el-dialog
        title="正在上传"
        :visible.sync="loading"
        style="margin-top: -40px"
      >
        <div
          v-loading="loadModel"
          element-loading-text="拼命上传中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          1
        </div>
      </el-dialog>
      <el-dialog
        title="上传模型"
        :visible.sync="addModelDialogVisible"
        style="margin-top: -40px"
      >
        <el-row>
          <el-form
            ref="form"
            :model="addModelFrom"
            label-width="100px"
          >
            <!-- 模型名称 -->
            <el-col :span="15">
              <el-form-item
                label="模型名称"
                prop="mName"
              >
                <el-input
                  v-model="addModelFrom.mName"
                  autocomplete="off"
                />
              </el-form-item>
            </el-col>
            <!-- 模型描述 -->
            <el-col :span="15">
              <el-form-item
                label="模型描述"
                prop="mDescription"
              >
                <el-input
                  v-model="addModelFrom.mDescription"
                  autocomplete="off"
                />
              </el-form-item>
            </el-col>
            <!-- 添加模型 -->
            <el-col :span="24">
              <el-form-item
                label="上传模型"
                prop="mFile"
              >
                <el-upload
                  ref=""
                  action=""
                  :on-change="handleChangeMod"
                  :auto-upload="false"
                  list-type="text"
                >
                  <el-button
                    size="small"
                    type="primary"
                  >点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click=" addModelDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              allUpload();
            "
          >确 定
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { findProjectsApi } from '@/api/user'
import { findModelByPIDApi, addModelApi } from '@/api/model'
import { getUser } from '@/utils/cookie'
// import eventVue from '@/utils/eventVue'
import BimfaceLinkage from './BimfaceLinkage'
export default {
  components: {
    BimfaceLinkage
  },
  data() {
    return {
      modelList: [],
      projectList: [''],
      options: [],
      value: '',
      dialogVisible: false,
      currentModel: {},
      modelFileId: '',
      fileName: '',
      addModelDialogVisible: false,
      loading: false,
      loadModel: false,
      addModelFrom: {
        mName: '',
        creator: '',
        mFile: '',
        mDescription: '',
        PID: ''
      }
    }
  },
  created() {
    this.findProjects()
  },
  methods: {
    // 获取模型详细视图
    getModelInfo(item) {
      console.log(item)
      this.currentModel = item
      this.modelFileId = item.MFile
      this.fileName = item.MName
    },
    // 获取参与项目列表
    findProjects() {
      findProjectsApi(getUser().username).then((res) => {
        console.log('项目列表查询', res)
        if (res.data.length >= 1) {
          this.projectList = res.data
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 切换当前项目以查看模型
    selectDetail(value) {
      console.log(value)
      findModelByPIDApi(value).then((res) => {
        console.log('模型列表查询', res)
        if (Object.keys(res.data.data).length === 0) {
          this.modelList = ''
        } else {
          this.modelList = res.data.data
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 上传添加模型
    addModel() {
      const _this = this
      const data = new FormData()
      data.append('PID', this.value)
      data.append('creator', getUser().id)
      data.append('mName', this.addModelFrom.mName)
      data.append('mDescription', this.addModelFrom.mDescription)
      data.append('mFile', this.addModelFrom.mFile)
      this.loading = true
      this.loadModel = true
      addModelApi(data).then((res) => {
        this.loading = false
        this.addDialogVisible = false
        // console.log(res)
        if (res.data.code === 200) {
          findModelByPIDApi(_this.value)
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
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取上传的图片
    handleChange(file, fileList) {
      this.pictureFile = file.raw
      // console.log(this.form.Picture);
    },
    // 获取文件
    handleChangeMod(file, fileList) {
      // console.log(file)
      this.addModelFrom.mFile = file.raw
      // console.log(this.pictureFile)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.model-container {
  margin: 8px;
  background-color: #fff;
  width: 99%;
  height: 99%;
  position: absolute;
}
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
.model-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  // background-color: skyblue;
  li {
    margin: 10px 10px;
    padding: 20px;
    // width: 256px;
    // height: 256px;
    border-radius: 5px;
    background: rgb(227, 244, 255);
    cursor: pointer;
    img {
      width: 256px;
      height: 256px;
    }
  }
  li:hover {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
    border-color: #eee;
    transition: all 0.2s ease-in-out;
  }
  .model-tip {
    margin: 10px 10px;
    padding: 20px;
    // width: 256px;
    // height: 256px;
    border-radius: 5px;
    background: rgb(227, 244, 255);
    div {
      width: 256px;
      height: 256px;
      text-align: center;
      line-height: 256px;
    }
  }
}
</style>
