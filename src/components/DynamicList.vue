<template>
  <div>
    <el-row>
      <el-col :span="4" v-for="item in ListData" :key="item.classId" :offset="1">
        <div style="margin-top: 15px">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
            <div>
              <span>{{ item.id }} {{ item.name }}</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="4" class="preCard" @click.native="dialogFormVisible = true">
        <div style="margin-top: 15px">
          <el-card>
            <i class="el-icon-plus"></i>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <!-- 表单Dialog框 -->
    <el-dialog title="新建项目" :visible.sync="dialogFormVisible">
      <el-row :gutter="15">
        <el-form ref="form" :model="form" label-width="100px">
          <!-- 项目名称 -->
          <el-col :span="15">
            <el-form-item label="项目名称" prop="name" required>
              <el-input
                v-model="form.name"
                autocomplete="off"
                prefix-icon="el-icon-mobile"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <!-- 预览图片 -->
          <el-col :span="15">
            <el-form-item label="预览图片" prop="PictureL">
              <el-upload
                action=""
                :on-change="handleChange"
                :http-request="allUpload"
                ref="upload"
                :auto-upload="false"
                list-type="picture-card"
              >
                <i class="el-icon-plus"></i>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
              </el-upload>
            </el-form-item>
          </el-col>
          <!-- 上传模型 -->
          <el-col :span="15">
            <el-form-item label="上传模型" prop="modelZipURL">
              <el-upload
                action="fake"
                :on-change="handleChange"
                :http-request="allUpload"
                ref="upload"
                :auto-upload="false"
                list-type="text"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <!-- 项目分类 -->
          <el-col :span="10">
            <el-form-item label="项目分类" prop="Category">
              <el-input v-model="form.Category" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <!-- 项目描述信息 -->
          <el-col :span="21">
            <el-form-item label="项目描述信息" prop="Description">
              <el-input v-model="form.Description" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <!-- 省市区级联地址 -->
          <el-col :span="24">
            <el-form-item label="地址" prop="">
              <v-region :town="true" @values="regionChange"></v-region>
            </el-form-item>
          </el-col>
          <!-- 详细地址 -->
          <el-col :span="21">
            <el-form-item label="详细地址" prop="DetailedAddress">
              <el-input v-model="form.DetailedAddress" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <!-- 项目的建设单位 -->
          <el-col :span="21">
            <el-form-item label="项目建设单位" prop="Unit">
              <el-input v-model="form.Unit" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false
            submitUpload()
          "
          >确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import project from '@/api/project'

export default {
  name: 'DynamicList',
  data() {
    return {
      selected: {
        province: '350000',
        city: '350100',
        area: '350104',
        town: '350104008',
      },
      dialogFormVisible: false,
      currentDate: new Date(),
      ListData: [
        { id: 1, name: 'Zakke' },
        { id: 2, name: 'HiDu' },
      ],
      form: {
        PID: '', //项目编号
        PName: '', //项目名称
        Picture: '', //项目预览图，URL
        Category: '', //项目类别
        Description: '', //项目描述信息
        Address: '', //省，市，县，镇/街道   四级联动地址
        DetailedAddress: '', //详细地址
        Unit: '', //项目的建设单位
        modelZip: '',
        member: '',
      },
    }
  },
  methods: {
    regionChange(data) {
      console.log(data)
    },
    handleChange(file, fileList) {
      this.form.Picture = file.raw
      // console.log(this.form.Picture);
    },
    allUpload() {
      let params = new FormData()
      params.append('name', this.form.name)
      params.append('Picture', this.form.Picture)
      params.append('modelZip', this.form.modelZip)
      upload(params)
        .then((result) => {
          console.log(result)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    submitUpload(param) {
      this.$refs.upload.submit()
    },
    goModel(pid) {
      console.log(pid)
    },
  },
  mounted() {
    console.log(this.$store.state)
  },
}
</script>

<style lang="scss" scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
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
  .el-card:hover {
    border-color: #409eff;
  }
}
</style>
