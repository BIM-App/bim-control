<template>
  <div class="bimBox">
    <div class="buttons">
      <button
        id="addMarker"
        class="button"
        @click="add3DMarker()"
      >添加标签</button>
    </div>
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
      modelToken: '',
      isAddItemActivated: false,
      viewAdded: false
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
        _this.viewAdded = true
        // 三维标签的配置类
        var markerConfig = new window.Glodon.Bimface.Plugins.Marker3D.Marker3DContainerConfig()
        markerConfig.viewer = _this.viewer3D
        _this.marker = new window.Glodon.Bimface.Plugins.Marker3D.Marker3DContainer(markerConfig)
        _this.viewer3D.resize(document.documentElement.clientWidth, document.documentElement.clientHeight - 40)
        _this.viewer3D.render()

        var position = {
          'x': -5193.213563484793,
          'y': -2835.930128298731,
          'z': 12248.339452835695
        }
        // 标签配置
        var marker3dConfig = new window.Glodon.Bimface.Plugins.Marker3D.Marker3DConfig()
        marker3dConfig.src = 'http://static.bimface.com/resources/3DMarker/warner/warner_red.png'
        marker3dConfig.worldPosition = position
        // 三维标签的提示
        marker3dConfig.tooltip = 'This is 3DMarker.'
        var marker3d = new window.Glodon.Bimface.Plugins.Marker3D.Marker3D(marker3dConfig)
        // var marker3d2 = new window.Glodon.Bimface.Plugins.Marker3D.Marker3D(marker3dConfig)
        console.log(_this.marker)
        _this.marker.addItem(marker3d)
      })
    },
    // 加载失败回调函数
    failureCallback(error) {
      console.log(error)
    },
    add3DMarker(type) {
      if (!this.viewAdded) {
        return
      }
      if (this.isAddItemActivated) {
        // 清空所有三维标签
        this.viewer3D.removeEventListener(window.Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked, this.addItems)
        this.setButtonText('addMarker', '创建标签')
      } else {
        // 添加点击监听事件，创建三维标签
        this.viewer3D.addEventListener(window.Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked, this.addItems)
        this.setButtonText('addMarker', '结束添加')
      }
      this.isAddItemActivated = !this.isAddItemActivated
      this.viewer3D.render()
    },
    addItems(objectData) {
      var position = objectData.worldPosition
      // position = {
      //   "x": -5193.213563484793,
      //   "y": -2835.930128298731,
      //   "z": 12248.339452835695
      // }
      //       {
      //     "x": 4155.687160304049,
      //     "y": -3675.6933260200867,
      //     "z": 11763.574756892845
      // }
      console.log(position)
      var markerConfig = new window.Glodon.Bimface.Plugins.Marker3D.Marker3DContainerConfig()
      markerConfig.viewer = this.viewer3D
      var marker = new window.Glodon.Bimface.Plugins.Marker3D.Marker3DContainer(markerConfig)
      this.viewer3D.resize(document.documentElement.clientWidth, document.documentElement.clientHeight - 40)
      this.viewer3D.render()
      var marker3dConfig = new window.Glodon.Bimface.Plugins.Marker3D.Marker3DConfig()
      marker3dConfig.src = 'http://static.bimface.com/resources/3DMarker/warner/warner_red.png'
      // if (markerType == 'image') {
      //   marker3dConfig.src = "http://static.bimface.com/resources/3DMarker/warner/warner_red.png";
      // } else if (markerType == 'canvas') {
      //   if (!canvas) {
      //     canvas = createCanvas();
      //   }
      //   marker3dConfig.canvas = canvas;
      //   marker3dConfig.size = 100;
      // }
      marker3dConfig.worldPosition = position
      // 三维标签的提示
      marker3dConfig.tooltip = 'This is 3DMarker.'
      var marker3d = new window.Glodon.Bimface.Plugins.Marker3D.Marker3D(marker3dConfig)
      marker.addItem(marker3d)
      this.viewer3D.clearSelectedComponents()
      this.viewer3D.render()
    },
    setButtonText(btnId, text) {
      var dom = document.getElementById(btnId)
      // eslint-disable-next-line eqeqeq
      if (dom != null && dom.nodeName == 'BUTTON') {
        dom.innerText = text
      }
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

.button {
  margin: 5px 0 5px 5px;
  width: 120px;
  height: 30px;
  background: #32d3a6;
  color: #ffffff;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  outline: none;
}
</style>
