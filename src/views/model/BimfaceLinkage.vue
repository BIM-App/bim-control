<template>
  <div class="bimBox">
    <el-button
      size="mini"
      type="danger"
      style="float: right"
      @click="delModel(modelId)"
    >删除模型</el-button>
    <div
      id="domId"
      class="domId"
    />
  </div>
</template>

<script>
import '@/utils/BimfaceSDKLoader@latest-release'
import { delModelApi, getMapListApi, getModelTokenApi } from '@/api/model'
import { getAccessToken } from '@/utils/cookie'
export default {
  name: 'BimfaceLinkage',
  props: {
    modelFileId: {
      type: String,
      default: ''
    },
    fileName: {
      type: String,
      default: ''
    },
    modelId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      viewer3D: '',
      marker: '',
      modelToken: ''
    }
  },
  created() {

  },
  mounted() {
    // const _this = this
    const data = {
      fileId: this.modelFileId
    }
    console.log(data)

    getMapListApi(this.modelFileId, getAccessToken()).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })

    console.log(getAccessToken())
    // 获取模型viewToken
    getModelTokenApi(data, getAccessToken()).then((res) => {
      console.log(res)
      const data = res
      // console.log(data)
      if (data.data) {
        this.modelToken = data.data.data
        console.log(this.modelToken)
        this.init()
      } else {
        this.contentFlag = true
      }
      if (data.code === 'authentication.failed') {
        this.content = 'BIMFACE系统异常,请联系管理员'
      }
      if (data.code === 'system.error') {
        this.content = 'API访问合法性校验失败,请联系管理员'
      }
      if (data.code === 'file.has.not.translated') {
        this.content = '文件未转换,请联系管理员'
      }
      if (data.code === 'file.translate.failed') {
        this.content = '文件转换失败,请联系管理员'
      }
      if (data.code === 'file.is.translating') {
        this.content = '文件转换中,请稍后'
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    init() {
      // 设置BIMFACE JSSDK加载器的配置信息
      const loaderConfig = new window.BimfaceSDKLoaderConfig()

      // 指定加载器的viewToken
      loaderConfig.viewToken = this.modelToken
      // console.log(loaderConfig);

      // 加载BIMFACE JSSDK加载器
      window.BimfaceSDKLoader.load(loaderConfig, this.successCallback, this.failureCallback
      )
    },

    // 加载配置成功回调函数
    successCallback(viewMetaData) {
      const _this = this
      console.log(viewMetaData)
      // 获取DOM元素
      const domShow = document.querySelector('#domId')
      // 创建WebApplication3DConfig
      const webAppConfig = new window.Glodon.Bimface.Application.WebApplication3DConfig()
      // 设置创建WebApplication3DConfig的dom元素值
      webAppConfig.domElement = domShow
      // 创建WebApplication3D
      const app = new window.Glodon.Bimface.Application.WebApplication3D(
        webAppConfig
      )
      // 添加待显示的模型
      app.addView(viewMetaData.viewToken)
      // 获取viewer3D对象
      this.viewer3D = app.getViewer()

      // 点击时获取位置
      this.viewer3D.addEventListener(
        window.Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked,
        function(objectData) {
          // console.log(objectData);
          _this.position = objectData.worldPosition
        }
      )
      // console.log(this.viewer3D);

      // 禁用鼠标原生右键事件
      // window.oncontextmenu = function(e) {
      //   e.preventDefault()
      // }
    },

    // 加载失败回调函数
    failureCallback(error) {
      console.log(error)
    },
    // 根据mid删除模型
    delModel(mid) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delModelApi(mid).then((res) => {
          console.log(res)
          if (res.data.status === 204) {
            this.$message({
              message: '项目删除成功',
              type: 'success'
            })
            this.$router.push({ path: '/model/index' })
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bimBox {
  min-height: 60vh;
  width: 100%;
  position: relative;
}
.bimBox .domId {
  width: 100%;
  height: 80vh;
}
.bimBox .domId ::v-deep .bf-map {
  z-index: -1;
  opacity: 0;
}

.bimBox > .mapDiv {
  position: absolute;
}
</style>
