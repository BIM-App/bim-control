<template>
  <div id="projectlist">
    <!-- 功能栏 -->
    <div class="tool">
      <el-button size="mini" type="primary" @click="dialogFormVisible = true">添加</el-button>
    </div>
    <!-- 动态渲染列表 -->
    <ul class="cards">
      <li class="card_item" v-for="(item, index) in lists" :key="index">
        {{item.name}}
        <img :src="item.imgUrl" />

      </li>
    </ul>
    <!-- 表单框 -->
    <el-dialog title="添加项目" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="项目名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人" :label-width="formLabelWidth" prop="creatorUser">
          <el-input v-model="form.creatorUser" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" :label-width="formLabelWidth" prop="pictureFileUrl">
          <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProject (dialogFormVisible = false)">确 定</el-button>
      </div>
    </el-dialog>
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
        { name: 'zakke', imgUrl: 'https://tva2.sinaimg.cn/large/0072Vf1pgy1foxlo91kiwj31hc0u0k9u.jpg' },
        { name: 'zhangsan', imgUrl: 'https://tva4.sinaimg.cn/large/87c01ec7gy1frmbm526o7j21hc0u0ajj.jpg' }
      ],
      dialogFormVisible: false,
      form: {
        name: '',
        creatorUser: '',
        pictureFileURL: ''
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    console.log('created');
  },
  updated() {
    console.log('updated');
  },
  methods: {
    addProject() {
      const _this = this
      this.$axios.post('http://47.112.132.91:8080', {
        name: _this.form.name,
        pictureFileURL: _this.form.pictureFileURL
      }).then((result) => {
        // print服务端返回的数据对象
        console.log(result.data);
        if (result.data.code == 1) {
          this.$alert('项目创建成功', '提示', {
            confirmButtonText: '确定',
            callback: () => {
              // _this.$refs.form.resetFields()
            }
          })
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  },
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
  background-color: purple;
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
