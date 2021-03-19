<template>
  <div
    v-loading="loadModel"
    class="bimBox"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div
      v-if="modelList.length > 1"
      style="padding: 0 0 5px 0; display: flex"
    >
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
    <div class="buttons">
      <button
        type="button"
        class="button"
        @click="add3DMarker()"
      >
        点击构件添加标签
      </button>
      <button
        id="btnClearItems"
        class="button"
        @click="clearItems()"
      >
        清除标签
      </button>
    </div>
    <!-- 定义DOM元素，用于在该DOM元素中显示模型或图纸 -->
    <div
      id="domId"
      class="domId"
    />
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
import { getmodeltokenApi } from '@/api/model'
import { getAccessToken } from '@/utils/cookie'
export default {
  name: 'Linka',
  // eslint-disable-next-line vue/require-prop-types
  props: ['modelFileId', 'fileName'],
  data() {
    return {
      viewer3D: '',
      app: '',
      modelList: [], // 图纸列表
      modelIndex: 0,
      contentFlag: false,
      content: '', // 错误描述
      loadModel: false,
      modelToken: '',
      marker: '',
      isAddItemActtivated: false
    }
  },
  computed: {},
  created() {
    console.log('creator', getAccessToken())
  },
  mounted() {
    var _this = this
    this.loadModel = true
    const data = {
      fileId: this.modelFileId
    }
    console.log(data)
    getmodeltokenApi(data, getAccessToken())
      .then((res) => {
        console.log(res)
        this.loadModel = false
        // const data = JSON.parse(res)
        const data = res
        console.log(data)
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
      })
      .catch((err) => {
        this.loadModel = false
        console.log(err)
      })
    var options = new BimfaceSDKLoaderConfig()
    options.viewToken = _this.viewToken
    BimfaceSDKLoader.load(options, _this.successCallback, _this.failureCallback)
    // this.getToken()
    // this.init();
  },
  methods: {
    // 切换图纸
    modelIndexChange(val) {
      const _this = this
      var l = _this.map.getFloorList() // 获取楼层的小地图列表
      _this.modelList = l
      _this.map.showFloorById(l[val].id) // 显示某一张小地图
    },
    init() {
      const _this = this

      var viewAdded = false
      // 初始化显示组件
      // eslint-disable-next-line no-undefw
      var options = new BimfaceSDKLoaderConfig()
      options.viewToken = this.modelToken
      // eslint-disable-next-line no-undef
      BimfaceSDKLoader.load(options, _this.successCallback, _this.failureCallback)
    },
    // 加载成功回调函数
    successCallback(viewMetaData) {
      var _this = this
      if (viewMetaData.viewType == '3DView') {
        // 获取DOM元素
        var WebAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig()
        WebAppConfig.domElement = document.getElementById('domId')
        var app = new Glodon.Bimface.Application.WebApplication3D(WebAppConfig)
        _this.viewer3D = app.getViewer()
        app.addView(viewMetaData.viewToken)
        // 三维标签的配置类
        var markerConfig = new Glodon.Bimface.Plugins.Marker3D.Marker3DContainerConfig()
        markerConfig.viewer = _this.viewer3D
        _this.marker = new Glodon.Bimface.Plugins.Marker3D.Marker3DContainer(
          markerConfig
        )
        _this.viewer3D.addEventListener(
          Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded,
          function() {
            // 自适应屏幕大小
            window.onresize = function() {
              _this.viewer3D.resize(
                document.documentElement.clientWidth,
                document.documentElement.clientHeight - 40
              )
            }
          }
        )
      }
    },
    // 加载失败回调函数
    failureCallback(error) {
      console.log(error)
    },
    // 增加三维标签
    addItems(objectdata) {
      var _this = this
      var position = objectdata.worldPosition
      var marker3dConfig = new Glodon.Bimface.Plugins.Marker3D.Marker3DConfig()
      marker3dConfig.src =
        'http://static.bimface.com/resources/3DMarker/warner/warner_red.png'
      marker3dConfig.worldPosition = position
      // 三维标签的提示
      marker3dConfig.tooltip = 'this is 3DMarker.'
      var marker3d = new Glodon.Bimface.Plugins.Marker3D.Marker3D(
        marker3dConfig
      )
      marker3d.onClick(function(item) {
        // 获取点击图片的postion
        var m = item.position
        // 自己设置一个boundingbox的对象
        var num = 1.1
        var max = m.x * num
        var may = m.y * num
        var maz = m.z * num
        var mix = m.x / num
        var miy = m.y / num
        var miz = m.z / num
        var maxp = new Object()
        maxp = {
          x: max,
          y: may,
          z: maz
        }
        var minp = new Object()
        minp = {
          x: mix,
          y: miy,
          z: miz
        }
        var boundingbox = new Object()
        boundingbox = {
          max: maxp,
          min: minp
        }
        // 缩放到该boundingbox
        _this.viewer3D.zoomToBoundingBox(boundingbox)
      })
      _this.marker.addItem(marker3d)
      _this.viewer3D.render()
    },
    add3DMarker() {
      var _this = this
      if (_this.isAddItemActtivated) {
        return
      } else {
        // 添加点击监听事件
        _this.viewer3D.addEventListener(
          Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked,
          _this.addItems
        )
        _this.isAddItemActtivated = true
      }
    },
    clearItems() {
      const _this = this
      _this.marker.clear()
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
