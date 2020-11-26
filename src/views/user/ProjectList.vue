<template>
  <div id="projectlist">
    <!-- 功能栏 -->
    <div class="tool">
      <el-button type="text" @click="dialogFormVisible = true">添加</el-button>
    </div>
    <!-- 表单Dialog框 -->
    <el-dialog title="新建项目" :visible.sync="dialogFormVisible">
      <el-row :gutter="15">
        <el-form ref="form" :model="form" label-width="100px">
          <!-- 项目名称 -->
          <el-col :span="15">
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="form.name" autocomplete="off" prefix-icon='el-icon-mobile'>
              </el-input>
            </el-form-item>
          </el-col>
          <!-- 关联图片 -->
          <el-col :span="24">
            <el-form-item label="关联图片" prop="pictureFileURL" required>
              <el-upload class="upload-pic" action="" :on-change="handleChange"
                :http-request="allUpload" ref="upload" :auto-upload="false"
                list-type="picture-card">
                <i class="el-icon-plus"></i>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;submitUpload()">确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 动态渲染列表 -->
    <ul class="cards">
      <li class="card_item" v-for="(item, index) in lists" :key="index">
        项目名称{{item.name}}
        <img :src="item.imgUrl" />
        <el-button type="mini" @click="lists.splice(index,1);subProject()" :data-index="item.id">
          删除 id{{item.id}}
        </el-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ProjectList',
  components: {

  },
  data() {
    return {
      lists: [
        // { id: 1, name: 'zakke', imgUrl: 'https://tva2.sinaimg.cn/large/0072Vf1pgy1foxlo91kiwj31hc0u0k9u.jpg' },
        // { id: 2, name: 'zhangsan', imgUrl: 'https://tva4.sinaimg.cn/large/87c01ec7gy1frmbm526o7j21hc0u0ajj.jpg' },
        // {
        // }
      ],
      dialogFormVisible: false,
      form: {
        name: '',
        pictureFile: '',
      }
    }
  },
  created() {
    // console.log('created');
  },
  updated() {
    // console.log('updated');
  },
  methods: {
    handleChange(file, fileList) {
      this.form.pictureFile = file.raw
      // console.log(this.form.pictureFile);
    },
    allUpload() {
      let formData = new FormData()
      formData.append('name', this.form.name);
      formData.append('pictureFile', this.form.pictureFile)

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios.post('http://47.112.132.91:8080/Test/addPicture', formData, config).then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
    },
    submitUpload(param) {
      this.$refs.upload.submit();
    }
  }
}
</script>

<style lang="scss" scoped>
#projectlist {
  background-color: lightgreen;
  width: 100%;
  height: 100%;
}
.tool {
  margin-bottom: 20px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: pink;
}
.el-upload__tip {
  line-height: 1.2;
}

li {
  list-style: none;
}
.cards {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .card_item {
    flex: 1;
    width: 25vw;
    min-width: 25vw;
    max-width: 25vw;
    height: 35vh;
    background-color: rgb(0, 174, 255);
    margin: 5px;

    img {
      width: inherit;
      height: inherit;
    }
  }
}
</style>
