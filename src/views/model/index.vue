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
            size="mini"
            type="primary"
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
          <!-- <div>{{ item.MPicture }}</div> -->
        </li>
        <div
          v-if="!modelList"
          class="model-tip"
        >
          <div>当前项目暂无模型</div>
        </div>
      </ul>
      <!-- 模型详细视图 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <!-- <span>{{ currentModel }}</span> -->
        <div>MId: {{ currentModel.MId }}</div>
        <div>MFile: {{ currentModel.MFile }}</div>
        <bimface-linkage />
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="dialogVisible = false"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { findProjectsApi } from '@/api/user'
import { findModelByPIDApi } from '@/api/model'
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
      currentModel: {}
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
      findModelByPIDApi(value).then((res) => {
        console.log('模型列表查询', res)
        if (res.data.code === 200) {
          this.modelList = res.data.data
          // console.log(this.modelList)
        }
        if (res.data.code === 404) {
          this.modelList = ''
          // console.log(this.modelList)
        }
      }).catch((err) => {
        console.log(err)
      })
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
