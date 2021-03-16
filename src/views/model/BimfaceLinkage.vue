<template>
  <div class="bimBox">
    <div
      id="domId"
      class="domId"
    />
  </div>
</template>

<script>
import '@/utils/BimfaceSDKLoader@latest-release'
import { getModelTokenApi } from '@/api/model'
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
    // window.onload = function() {
    //   var loaderConfig = new BimfaceSDKLoaderConfig()
    //   loaderConfig.viewToken = _this.modelToken
    //   BimfaceSDKLoader.load(loaderConfig, _this.successCallback, _this.failureCallback)
    // }
  },
  methods: {
    init() {
      const _this = this

      // var viewAdded = false
      var options = new window.BimfaceSDKLoaderConfig()
      options.viewToken = this.modelToken
      window.BimfaceSDKLoader.load(options, _this.successCallback, _this.failureCallback)
    },

    // 加载成功回调函数
    successCallback(viewMetaData) {
      const _this = this
      var dom4Show = document.getElementById('domId')
      // 设置WebApplication3D的配置项
      var webAppConfig = new window.Glodon.Bimface.Application.WebApplication3DConfig()
      webAppConfig.domElement = dom4Show
      // 创建WebApplication3D，用以显示模型
      var app = new window.Glodon.Bimface.Application.WebApplication3D(webAppConfig)
      app.addView(viewMetaData.viewToken)
      _this.viewer3D = app.getViewer()
      _this.viewer3D.addEventListener(window.Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded, function() {
        // viewAdded = true
        // 三维标签的配置类
        var markerConfig = new window.Glodon.Bimface.Plugins.Marker3D.Marker3DContainerConfig()
        markerConfig.viewer = _this.viewer3D
        _this.marker = new window.Glodon.Bimface.Plugins.Marker3D.Marker3DContainer(markerConfig)
        _this.viewer3D.resize(document.documentElement.clientWidth, document.documentElement.clientHeight - 40)
        _this.viewer3D.render()
      })
    },
    // 加载失败回调函数
    failureCallback(error) {
      console.log(error)
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
.bimBox .domId ::v-deep .bf-person .bf-walk-button:first-child {
  display: none !important;
}
.bimBox > .mapDiv {
  position: absolute;
}
</style>
