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
import $ from '@/utils/jquery'
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

      // 增加viewer3D鼠标右键监听事件
      this.viewer3D.addEventListener(
        window.Glodon.Bimface.Viewer.Viewer3DEvent.ContextMenu, // bimface鼠标右键点击事件
        function(objectData) {
          setTimeout(function() {
            _this.addContextMenu(app)
          }, 0)
        }
      )

      // 点击时获取位置
      this.viewer3D.addEventListener(
        window.Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked,
        function(objectData) {
          // console.log(objectData);
          _this.position = objectData.worldPosition
        }
      )
      // console.log(this.viewer3D);

      // 获取标签
      // this.get3DMarker();

      // 禁用鼠标原生右键事件
      window.oncontextmenu = function(e) {
        e.preventDefault()
      }
    },

    // 加载失败回调函数
    failureCallback(error) {
      console.log(error)
    },
    // 在右键菜单中添加新选项菜单
    addContextMenu(app) {
      const _this = this
      const menu = `
      <div class="bf-sub-menu" id="doms">
        <div class="bf-menu">
          <div class="bf-menu-item user-item" id="finish">
            图片标记
          </div>
          <div class="bf-menu-item user-item" id="starting">
            警告
          </div>
          <div class="bf-menu-item user-item" id="delay">
            危险
          </div>
        </div>
        <div class="bf-menu-item user-item">新建3D标记</div>
      </div>
      `
      if ($('.bf-menu.bf-menu-right')[0]) {
        $('.bf-menu.bf-menu-right').append(menu)
      } else {
        $('.bf-menu.bf-menu-left').append(menu)
      }
      var viewer3D = app.getViewer()
      var arr = viewer3D.getSelectedComponents()
      $('#finish').on('click', function() {
        // var colorRed = new window.Glodon.Web.Graphics.Color(0, 128, 0, 1);
        app.getViewer().removeSelectedId(arr)

        // 添加3D标签
        // _this.addMarker3D();
        // app.getViewer().overrideComponentsColorById(arr, colorRed);
        _this
          .$prompt('请输入此处标签tip内容', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
          .then(({ value }) => {
            _this.addMarker3D(value)
            _this.$message({
              type: 'success',
              message: '添加3D标签成功'
            })
          })
          .catch(() => {
            _this.$message({
              type: 'info',
              message: '取消输入'
            })
          })
        app.getViewer().render()
        $('.bf-menu.bf-menu-right').hide()
      })

      $('#starting').on('click', function() {
        var colorRed = new window.Glodon.Web.Graphics.Color(255, 255, 0, 1)
        app.getViewer().removeSelectedId(arr)
        app.getViewer().overrideComponentsColorById(arr, colorRed)
        app.render()
        $('.bf-menu.bf-menu-right').hide()
      })

      $('#delay').on('click', function() {
        var colorRed = new window.Glodon.Web.Graphics.Color(255, 0, 0, 1)
        app.getViewer().removeSelectedId(arr)
        app.getViewer().overrideComponentsColorById(arr, colorRed)
        app.render()
        $('.bf-menu.bf-menu-right').hide()
      })
    },

    // 添加3D标签
    addMarker3D(tip) {
      const _this = this
      const markerContainerConfig = new window.Glodon.Bimface.Plugins.Marker3D.Marker3DContainerConfig()
      markerContainerConfig.viewer = this.viewer3D
      const markerContainer = new window.Glodon.Bimface.Plugins.Marker3D.Marker3DContainer(
        markerContainerConfig
      )
      const markerConfig = new window.Glodon.Bimface.Plugins.Marker3D.Marker3DConfig()
      markerConfig.src =
        'http://static.bimface.com/resources/3DMarker/warner/warner_red.png'
      markerConfig.worldPosition = _this.position
      markerConfig.size = 40
      // 三维标签的提示
      markerConfig.tooltip = tip
      const marker = new window.Glodon.Bimface.Plugins.Marker3D.Marker3D(
        markerConfig
      )
      // 往容器里添加标签
      markerContainer.addItem(marker)

      // console.log(marker);
      // return console.log(marker);

      // 标签左键点击
      marker.onClick(function(item) {
        // console.log(item)
        // 获取点击图片的position
        var m = item.position
        // 自己设置一个bounding box的对象
        var num = 1.1
        var max = m.x * num
        var may = m.y * num
        var maz = m.z * num
        var mix = m.x / num
        var miy = m.y / num
        var miz = m.z / num
        var maxp = {
          x: max,
          y: may,
          z: maz
        }
        var minp = {
          x: mix,
          y: miy,
          z: miz
        }
        var boundingBox = {
          max: maxp,
          min: minp
        }
        // 缩放到该bounding box
        _this.viewer3D.zoomToBoundingBox(boundingBox)

        // 获取所有标签

        console.log(markerContainer.getAllItems())
      })

      // 标签右键点击
      marker.onRightClick(function(item) {
        // console.log(item)
        _this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          markerContainer.removeItemById(item.id)
          _this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      })

      _this.viewer3D.clearSelectedComponents()
      _this.viewer3D.render()
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
