/* eslint-disable no-undef */
<template>
  <div
    v-loading="loadModel"
    class="bimBox"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div v-if="modelList.length > 1" style="padding: 0 0 5px 0; display: flex">
      <el-select
        v-model="modelIndex"
        size="small"
        placeholder="请选择"
        @change="modelIndexChange"
      >
        <el-option
          v-for="(item, index) in modelList"
          :key="index"
          :label="item.name"
          :value="index"
        />
      </el-select>
    </div>
    <div
      v-show="contentFlag"
      style="text-align: center; font-size: 18px; color: #ccc"
    >
      {{ content }}
    </div>
    <div id="domId" class="domId" />
    <div
      v-show="modelList.length != 0"
      class="mapDiv"
      style="
        right: 12px;
        bottom: 10px;
        width: 300px;
        height: 240px;
        background-color: #323237;
      "
    >
      <div
        id="map"
        style="width: 100%; height: 100%; background-color: #323237"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Linka',
  // eslint-disable-next-line vue/require-prop-types
  props: ['modelFileId', 'fileName', 'isIntegrate'],
  data() {
    return {
      viewer3D: '',
      app: '',
      modelList: [], // 图纸列表
      modelIndex: 0,
      contentFlag: false,
      content: '', // 错误描述
      modelToken: '',
      loadModel: false
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.getToken()
    // this.init();
  },
  methods: {
    // // 切换图纸
    // modelIndexChange(val) {
    //   const _this = this
    //   var l = _this.map.getFloorList() // 获取楼层的小地图列表
    //   _this.modelList = l
    //   _this.map.showFloorById(l[val].id) // 显示某一张小地图
    // },
    init() {
      const _this = this
      // eslint-disable-next-line no-unused-vars
      var viewAdded = false
      // 初始化显示组件
      // eslint-disable-next-line no-undef
      var options = new BimfaceSDKLoaderConfig()
      options.viewToken = this.modelToken
      // eslint-disable-next-line no-undef
      BimfaceSDKLoader.load(options, successCallback, failureCallback)
      function successCallback(viewMetaData) {
        // eslint-disable-next-line eqeqeq
        if (viewMetaData.viewType == '3DView') {
          // ======== 判断是否为3D模型 ========
          // 获取DOM元素
          var dom4Show = document.getElementById('domId')
          // eslint-disable-next-line no-undef
          var webAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig()
          webAppConfig.domElement = dom4Show
          // 创建WebApplication
          if (!_this.app) {
            // eslint-disable-next-line no-undef
            _this.app = new Glodon.Bimface.Application.WebApplication3D(
              webAppConfig
            )
          }
          // 添加待显示的模型
          _this.app.addView(_this.modelToken)
          // 从WebApplication获取viewer3D对象
          _this.viewer3D = _this.app.getViewer()

          // 监听添加view完成的事件
          _this.viewer3D.addEventListener(
            // eslint-disable-next-line no-undef
            Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded,
            function() {
              console.log(_this.fileName)
              const aa = _this.fileName.split('.')
              console.log(aa[aa.length - 1])
              // eslint-disable-next-line eqeqeq
              if (aa[aa.length - 1] == 'rvt') {
                // eslint-disable-next-line no-undef
                var mapConfig = Glodon.Bimface.Plugins.Map.MapConfig()
                mapConfig.domElement = document.getElementById('map') // 页面的dom元素
                mapConfig.viewer = _this.viewer3D // 三维模型
                if (!_this.map) {
                  // eslint-disable-next-line no-undef
                  _this.map = new Glodon.Bimface.Plugins.Map.Map(mapConfig)
                }
                var l = _this.map.getFloorList() // 获取楼层的小地图列表
                _this.modelList = l
                _this.map.showFloorById(l[0].id) // 显示某一张小地图
              }

              // 自适应屏幕大小
              window.onresize = function() {
                _this.viewer3D.resize(
                  document.documentElement.clientWidth,
                  document.documentElement.clientHeight - 40
                )
              }
              viewAdded = true
              // 渲染3D模型
              // let a = Glodon.Bimface.Viewer.NavigationMode3D.Walk;
              // _this.viewer3D.setNavigationMode(a); //开启漫游
              // _this.viewer3D.setFlySpeedRate(1); //漫游速度
              _this.viewer3D.render()
            }
          )
        } else {
          // 是图纸时的函数
          const dom4Show = document.getElementById('domId')
          // eslint-disable-next-line no-undef
          const webAppConfig = new Glodon.Bimface.Application.WebApplicationDrawingConfig()
          webAppConfig.domElement = dom4Show
          // 创建WebApplication
          if (!_this.app) {
            // eslint-disable-next-line no-undef
            _this.app = new Glodon.Bimface.Application.WebApplicationDrawing(
              webAppConfig
            )
          }
          // 添加待显示图纸
          _this.app.load(_this.modelToken)
          // 从WebApplication获取viewer2D对象
          _this.viewer3D = _this.app.getViewer()
          _this.viewer3D.addEventListener(
            // eslint-disable-next-line no-undef
            Glodon.Bimface.Viewer.ViewerDrawingEvent.Loaded,
            function(data) {
              window.onresize = function() {
                _this.viewer3D.resize(
                  document.documentElement.clientWidth,
                  document.documentElement.clientHeight - 40
                )
              }
            }
          )
        }
      }
      function failureCallback(error) {
        console.log(error)
      }
    },
    getToken() {
      console.log(this.fileName, '模型展示')
      this.loadModel = true
      this.$store
        .dispatch({
          type: 'demand/getBimFaceToken',
          data: {
            id: this.modelFileId,
            IsIntegrateId: this.isIntegrate
          }
        })
        .then((res) => {
          this.loadModel = false
          const data = JSON.parse(res)
          if (data.data) {
            this.modelToken = data.data
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
        })
        .catch((err) => {
          this.loadModel = false
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.bimBox {
  min-height: 60vh;
  width: 100%;
  position: relative;
  .domId {
    width: 100%;
    height: 80vh;
    /deep/.bf-map {
      // display: none !important;
      z-index: -1;
      opacity: 0;
    }
    /deep/.bf-person {
      .bf-walk-button {
        &:first-child {
          display: none !important;
        }
      }
    }
  }
  > .mapDiv {
    position: absolute;
  }
}
</style>
