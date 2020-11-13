<template>
  <div class="bimBox">
    <div style="padding:0 0 5px 0;display:flex;">
      <!-- <el-button type="success" @click="exportModalData">导出模型数据</el-button> -->
      <!-- <span v-if="hintContent">{{hintContent}}</span> -->
      <div style="margin-right:5px;">
        <el-select v-if="showType == 1 || showType == 2" size="small" v-model="svfUrlIndex"
          placeholder="请选择" @change="svfChange">
          <el-option v-for="(item,index) in svfUrl" :key="index" :label="item.floorName"
            :value="index"></el-option>
        </el-select>
        <el-select size="small" v-model="ftdUrlIndex" placeholder="请选择"
          v-if="showType == 1 || showType == 3" @change="ftdChange">
          <el-option v-for="(item,index) in ftdUrl" :key="index" :label="item.floorName"
            :value="index"></el-option>
        </el-select>
      </div>
      <el-button size="small" v-if="showType != 4" @click="toLaunchFull">全屏展示</el-button>
      <div v-if="showType == 1 || showType == 3">
        <label for>左</label>
        <el-input v-model="leftRight" min="0" :max="leftMax"
          onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))"
          @input="margChange($event,1)" style="width:90px" size="small" type="number"
          placeholder="请输入左边距范围"></el-input>
        <label for>上</label>
        <el-input v-model="topBottom" min="0"
          onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" :max="topMax"
          @input="margChange($event,2)" style="width:90px" size="small" type="number"
          placeholder="请输入上边距范围"></el-input>
        <label for>右</label>
        <el-input v-model="right" min="0" :max="rightMax"
          onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))"
          @input="margChange($event,3)" style="width:90px" size="small" type="number"
          placeholder="请输入右边距范围"></el-input>
        <label for>下</label>
        <el-input v-model="bottom" min="0" :max="bottomMax"
          onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))"
          @input="margChange($event,4)" style="width:90px" size="small" type="number"
          placeholder="请输入下边距范围"></el-input>
      </div>
    </div>
    <div class="vieww" id="vieww">
      <div v-if="showType == 1 || showType== 2" id="viewer3D" class="viewer-box"></div>
      <div v-if="showType == 1" id="viewer2D" style="z-index: 99;" ref="viewer2D"></div>
      <div v-if="showType == 3" id="viewer22D" ref="viewer2D"></div>
    </div>
  </div>
</template>

<script>
var num1;
var _blockEventMain;
var _blockEventSecondary;
export default {
  name: "linkages",
  data() {
    return {
      titleHeader: "BIM详情",
      creats: 2,
      viewer3D: null,
      viewer2D: null,
      exportes: "", //是否已经导出过模型
      hintContent: "正在载入模型...",
      hintFlag: false,
      svfUrl: [], //所有模型地址
      ftdUrl: [], //所有图纸地址
      svfUrlIndex: 0, //选中的索引
      ftdUrlIndex: 0, //选中的索引
      leftRight: 0,
      topBottom: 0,
      newData: [],
      right: 0,
      bottom: 0,
      scaleCaver: 1,
      layerWidth: "", //初始图标父盒子大小
      layerHeight: "", //初始图标父盒子大小
      newWidth: 400,
      newHeight: 400,
      initMin: "",
      initMax: "",
      calcWidth: 400,
      showType: 1 //1.模型图纸都有  2.只有模型 3.只有图纸
    };
  },
  props: ["modelData"],
  created() { },
  computed: {
    leftMax: function () {
      if (this.right) {
        return 99 - Number(this.right)
      } else {
        return 99;
      }
    },
    topMax: function () {
      if (this.bottom) {
        return 99 - Number(this.bottom)
      } else {
        return 99;
      }
    },
    rightMax: function () {
      if (this.leftRight) {
        return 99 - Number(this.leftRight)
      } else {
        return 99;
      }
    },
    bottomMax: function () {
      if (this.topBottom) {
        return 99 - Number(this.topBottom)
      } else {
        return 99;
      }
    }
  },
  methods: {
    //输入框值变化时
    margChange(e, s) {
      if (s == 1) {
        if (99 - Number(e) - this.right < 0) {
          this.leftRight = 99 - this.right;
        }
      } else if (s == 2) {
        if (99 - Number(e) - this.bottom < 0) {
          this.topBottom = 99 - this.bottom;
        }
      } else if (s == 3) {
        if (99 - Number(e) - this.leftRight < 0) {
          this.right = 99 - this.leftRight;
        }
      } else if (s == 4) {
        if (99 - Number(e) - this.topBottom < 0) {
          this.bottom = 99 - this.topBottom;
        }
      }
      this.newData.ftdList[this.ftdUrlIndex].x = this.leftRight == 0 ? 0 : this.leftRight / 100;
      this.newData.ftdList[this.ftdUrlIndex].y = this.topBottom == 0 ? 0 : this.topBottom / 100;
      this.newData.ftdList[this.ftdUrlIndex].rightX = this.right == 0 ? 0 : this.right / 100;
      this.newData.ftdList[this.ftdUrlIndex].bottomY = this.bottom == 0 ? 0 : this.bottom / 100;
      this.moveMakerBox();

    },
    //返回
    backLefts() {
      if (this.$route.params.info) {
        this.$router.go(-1);
      } else {
        this.$router.push({ name: "tiskDetail" });
      }
    },
    exportModalData() {
      if (this.hintFlag) {
        this.hintFlag = false;
        this.hintContent = "正在导出数据...";
        function getAllDbIds(viewer) {
          let instanceTree = viewer.model.getData().instanceTree.nodeAccess
            .dbIdToIndex;
          let allDbIds = Object.keys(instanceTree);
          return allDbIds;
        }

        let _this = this;
        let arr = [];
        let arrt = getAllDbIds(this.viewer3D);
        let countNum = arrt.length;
        for (var j = 0; j < arrt.length; j++) {
          var _promise = new Promise(function (resolve, reject) {
            let num = Number(arrt[j]);
            _this.viewer3D.getProperties(num, function (arg) {
              //这里是异步回掉
              if (arg.properties.length < 200) {
                let propertieArr = [];
                for (var k = 0; k < arg.properties.length; k++) {
                  if (
                    arg.properties[k].displayName == "类型名称" ||
                    arg.properties[k].displayName == "楼层信息" ||
                    arg.properties[k].displayName == "专业信息" ||
                    arg.properties[k].displayName == "材质信息" ||
                    arg.properties[k].displayName == "人工含量" ||
                    arg.properties[k].displayName == "主材含量" ||
                    arg.properties[k].displayName == "工程量信息" ||
                    arg.properties[k].displayName == "单价信息" ||
                    arg.properties[k].displayName == "长度" ||
                    arg.properties[k].displayName == "面积" ||
                    arg.properties[k].displayName == "体积" ||
                    arg.properties[k].displayName == "壁厚" ||
                    arg.properties[k].displayName == "尺寸"
                  ) {
                    propertieArr.push(arg.properties[k]);
                  }
                }
                arg.properties = propertieArr;
                if (arg.properties.length != 0) {
                  arr.push(arg);
                  resolve(arr);
                }
              }
            });
          });
        }

        Promise.all([_promise]).then(ret => {
          let total = Math.ceil(ret[0].length / 1000);
          let _this = this;
          let num = 0;
          function toLeadModal() {
            _this.$store
              .dispatch({
                type: "demand/leadModalData",
                data: {
                  exports: ret[0].slice(num * 1000, (num + 1) * 1000),
                  modelId: _this.newData.id
                }
              })
              .then(res => {
                num++;
                if (num != total) {
                  toLeadModal();
                } else {
                  _this.hintContent = "模型数据导入完毕!";
                }
              });
          }
          toLeadModal();
        });
      } else {
        this.hintContent = "模型加载中...";
      }
    },
    initBox() {
      this.moveMakerBox();
    },
    moveMakerBox() {
      let _this = this;
      let min = _this.viewer2D.worldToClient(
        new THREE.Vector3(
          _this.viewer2D.model.getBoundingBox().min.x,
          _this.viewer2D.model.getBoundingBox().min.y,
          _this.viewer2D.model.getBoundingBox().max.z
        )
      );

      let max = _this.viewer2D.worldToClient(
        new THREE.Vector3(
          _this.viewer2D.model.getBoundingBox().max.x,
          _this.viewer2D.model.getBoundingBox().max.y,
          _this.viewer2D.model.getBoundingBox().max.z
        )
      );

      let scale = (max.x - min.x) / (_this.initMax.x - _this.initMin.x);

      _this.newWidth =
        _this.calcWidth * scale -
        _this.calcWidth * scale * _this.newData.ftdList[_this.ftdUrlIndex].x -
        _this.calcWidth * scale * _this.newData.ftdList[_this.ftdUrlIndex].rightX;
      _this.newHeight =
        _this.calcWidth * scale -
        _this.calcWidth * scale * _this.newData.ftdList[_this.ftdUrlIndex].y -
        _this.calcWidth * scale * _this.newData.ftdList[_this.ftdUrlIndex].bottomY;

      let leftLater =
        (max.x - min.x) / 2 +
        min.x -
        _this.calcWidth * scale * (0.5 - _this.newData.ftdList[_this.ftdUrlIndex].x);
      let topLater =
        (min.y - max.y) / 2 +
        max.y -
        _this.calcWidth * scale * (0.5 - _this.newData.ftdList[_this.ftdUrlIndex].y);

      if (!document.getElementById("markerlayer")) {
        return;
      }

      document.getElementById("markerlayer").style.left = leftLater + "px";
      document.getElementById("markerlayer").style.top = topLater + "px";
      document.getElementById("markerlayer").style.right = "auto";
      document.getElementById("markerlayer").style.bottom = "auto";
      document.getElementById("markerlayer").style.width =
        _this.newWidth + "px";
      document.getElementById("markerlayer").style.height =
        _this.newHeight + "px";
    },
    back() {
      this.$router.go(-1);
    },
    init(fUrl, sUrl) {
      let initnum = 1;
      var _this = this;
      var viewer3D_data;
      var viewer2D_data;
      var num1;
      var num2;
      var flag = 1;
      var viewModels = [{ id: "racadvanced" }];
      var currentModel = 0;
      //点击后的归一化2d坐标
      let markX;
      let markY;
      //点击后的归一化3d坐标
      let markX3D;
      let markY3D;
      var viewer3D;
      var viewer2D;

      var expireTimeSeconds = 60 * 30;

      var metadata = {
        racadvanced: {
          viewboxes: [{ box: [], floor: 0 }],
          floorHeight: 10,
          floorBase: -5,
          scale: 2.7,
          yoffset: 305.5828538654896,
          xoffset: 173.35610564383717,
          paperZ: -0.8462999999999852
        }
      };

      var options = {
        env: "Local",
        offline: "true",
        useADP: false
      };

      Autodesk.Viewing.Initializer(options, function () {
        var viewer3DContainer = document.getElementById("viewer3D");
        _this.viewer3D = new Autodesk.Viewing.Private.GuiViewer3D(
          viewer3DContainer,
          {}
        );
        viewer3D = _this.viewer3D;

        var viewer2DContainer = document.getElementById("viewer2D");
        _this.viewer2D = new Autodesk.Viewing.Private.GuiViewer3D(
          viewer2DContainer,
          {}
        );
        viewer2D = _this.viewer2D;

        viewer2D.addEventListener(
          Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
          function (event) {
            metadata.racadvanced.viewboxes[0].box = [
              event.model.getBoundingBox().min.x,
              event.model.getBoundingBox().max.y,
              event.model.getBoundingBox().max.x,
              event.model.getBoundingBox().min.y
            ];
            flag++;
            setTimeout(() => {
              let min = viewer2D.worldToClient(
                new THREE.Vector3(
                  viewer2D.model.getBoundingBox().min.x,
                  viewer2D.model.getBoundingBox().min.y,
                  viewer2D.model.getBoundingBox().max.z
                )
              );

              let max = viewer2D.worldToClient(
                new THREE.Vector3(
                  viewer2D.model.getBoundingBox().max.x,
                  viewer2D.model.getBoundingBox().max.y,
                  viewer2D.model.getBoundingBox().max.z
                )
              );

              _this.initMin = min;
              _this.initMax = max;

              if (flag == 3) {
                initializeMarker(); // 初始化标记
              }
            }, 100);
          }
        );

        viewer3D.addEventListener(
          Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT,
          function (event) {
            viewer3D.addEventListener(
              Autodesk.Viewing.FULLSCREEN_MODE_EVENT,
              function (e) {
                if (e.mode == "0") {
                  plus.screen.lockOrientation("portrait");
                }
              }
            );

            viewer3D.setActiveNavigationTool("firstperson");
            if (initnum == 1) {
              initnum++;
              num2 = event.model.getBoundingBox();

              viewer3D_data = {
                x: num2.max.x - num2.min.x,
                y: num2.max.y - num2.min.y
              };
              flag++;
              if (flag == 3) {
                initializeMarker(); // 初始化标记
              }
            }
          }
        );

        viewer3D.start();
        viewer2D.start();

        viewer3D.load(sUrl, null, onLoadSuccess, onLoadError);
        viewer2D.load(fUrl, null, onLoadSuccess2, onLoadError);

        function onLoadSuccess() {
          viewer3D.toolbar.setVisible(false); // 在3d查看器中隐藏工具栏
        }

        function onLoadSuccess2(e) {
          num1 = e.getVisibleBounds();
          viewer2D_data = {
            x: num1.max.x - num1.min.x,
            y: num1.max.y - num1.min.y
          };
          viewer2D.toolbar.setVisible(false); // 在2d查看器中隐藏工具栏
        }

        function onLoadError() { }

        viewer3D.addEventListener(
          Autodesk.Viewing.SELECTION_CHANGED_EVENT,
          function (event) {
            if (_blockEventSecondary) {
              return;
            }
            _blockEventMain = true;
            viewer2D.select(viewer3D.getSelection());
            _blockEventMain = false;
          }
        );

        viewer2D.addEventListener(
          Autodesk.Viewing.SELECTION_CHANGED_EVENT,
          function (event) {
            if (_blockEventMain) {
              return;
            }
            _blockEventSecondary = true;
            viewer3D.select(viewer2D.getSelection());
            _blockEventSecondary = false;
          }
        );
      });

      /* eslint no-undef: "off" */

      var marker;

      //实例化标记UI类并设置查看器事件侦听器
      function initializeMarker() {
        marker = new Marker(viewer2D.container);

        viewer2D.addEventListener(
          Autodesk.Viewing.CAMERA_CHANGE_EVENT,
          function (event) {
            updateMarkerOnCanvas();
          }
        );

        viewer2D.container.addEventListener("click", function (event) {

          //获得归一化的坐标
          markX =
            (event.offsetX -
              document.getElementById("markerlayer").style.left.split("p")[0]) /
            _this.newWidth;
          markY =
            (event.offsetY -
              document.getElementById("markerlayer").style.top.split("p")[0]) /
            _this.newHeight;



          marker.setPosition();

          updateCameraToMarker(false, false);
        });

        viewer3D.addEventListener(
          Autodesk.Viewing.CAMERA_CHANGE_EVENT,
          function (event) {
            updateMarkerToCamera();
          }
        );
      }

      // 当相机在viewer2D中更改时，更新2d画布上的标记
      function updateMarkerOnCanvas() {
        _this.moveMakerBox();

        num2 = viewer3D.model.getBoundingBox();
        var position = viewer3D.navigation.getPosition();
        var paperPos = worldToPaper(position);
        if (paperPos) {
          var newPos2D = projectToViewport(paperPos.pos, viewer2D.getCamera());

          marker.setPosition();
        }
      }

      // 在viewer3D中更新标记到相机的位置和方向
      function updateMarkerToCamera() {
        num2 = viewer3D.model.getBoundingBox();
        // update marker direction to camera target
        var position = viewer3D.navigation.getPosition();

        //获得归一化3d坐标设置2d标记位置
        markX3D = (position.x - num2.min.x) / (num2.max.x - num2.min.x);
        markY3D = (position.y - num2.min.y) / (num2.max.y - num2.min.y);

        document.getElementById("marker").style.left =
          markX3D * _this.newWidth + "px";
        document.getElementById("marker").style.top =
          (1 - markY3D) * _this.newHeight + "px";

        var eye = viewer3D.navigation.getEyeVector();
        marker.setDirection([eye.x, eye.y]);
      }

      // 将viewer3D相机的位置和目标更新到标记
      function updateCameraToMarker(skipPosition, skipTarget) {
        var nav = viewer3D.navigation;
        num2 = viewer3D.model.getBoundingBox();
        nav.toPerspective();

        var up = new THREE.Vector3(0, 0, num2.max.z + 2);
        //设置摄像机的向上方向。给定矢量应与当前视图方向正交
        nav.setCameraUpVector(up);

        var position = marker.getPosition();

        var posit = new THREE.Vector3(
          markX * (num2.max.x - num2.min.x) + num2.min.x,
          num2.max.y - markY * (num2.max.y - num2.min.y),
          3.286
        );
        nav.setPosition(posit);

        if (!skipTarget) {
          position = viewer3D.navigation.getPosition();
          var direction = marker.getDirection();

          // update camera target to marker direction
          viewer3D.navigation.setTarget(
            positionToVector3([
              position.x + direction[0],
              position.y + direction[1],
              6
            ])
          );
        }
      }

      /**
       *  This class can be instantiated as a separate marker UI.
       *  @class
       *  @param {Object} container - The container div for the marker.
       *  @param {Object} customMarker - The customized marker object
       *  @constructor
       */

      // 标记UI的构造函数
      function Marker(container, customMarker) {
        let min = _this.viewer2D.worldToClient(
          new THREE.Vector3(
            _this.viewer2D.model.getBoundingBox().min.x,
            _this.viewer2D.model.getBoundingBox().min.y,
            _this.viewer2D.model.getBoundingBox().max.z
          )
        );

        let max = _this.viewer2D.worldToClient(
          new THREE.Vector3(
            _this.viewer2D.model.getBoundingBox().max.x,
            _this.viewer2D.model.getBoundingBox().max.y,
            _this.viewer2D.model.getBoundingBox().max.z
          )
        );

        let scale = (max.x - min.x) / (_this.initMax.x - _this.initMin.x);

        _this.newWidth =
          _this.calcWidth * scale -
          _this.calcWidth * scale * _this.newData.ftdList[_this.ftdUrlIndex].x -
          _this.calcWidth * scale * _this.newData.ftdList[_this.ftdUrlIndex].rightX;
        _this.newHeight =
          _this.calcWidth * scale -
          _this.calcWidth * scale * _this.newData.ftdList[_this.ftdUrlIndex].y -
          _this.calcWidth * scale * _this.newData.ftdList[_this.ftdUrlIndex].bottomY;
        let leftLater =
          (max.x - min.x) / 2 +
          min.x -
          _this.calcWidth * scale * (0.5 - _this.newData.ftdList[_this.ftdUrlIndex].x);
        let topLater =
          (min.y - max.y) / 2 +
          max.y -
          _this.calcWidth * scale * (0.5 - _this.newData.ftdList[_this.ftdUrlIndex].y);

        var overlayDiv = document.createElement("div");
        overlayDiv.style.left = leftLater + "px";
        overlayDiv.style.top = topLater + "px";
        overlayDiv.style.right = "auto";
        overlayDiv.style.bottom = "auto";
        overlayDiv.style.width = _this.newWidth + "px";
        overlayDiv.style.height = _this.newHeight + "px";
        overlayDiv.style.zIndex = "99999";
        overlayDiv.style.position = "absolute";
        overlayDiv.style.border = "1px solid red";
        overlayDiv.style.pointerEvents = "none";
        overlayDiv.id = "markerlayer";

        // 创建SVG元素
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.style.width = "20px";
        svg.style.height = "20px";
        svg.style.top = "0px";
        svg.style.left = "0px";
        svg.style.position = "absolute";
        svg.style.cursor = "pointer";
        svg.style.pointerEvents = "none";
        svg.id = "marker";

        // create marker triangle
        var arrow =
          customMarker ||
          document.createElementNS("http://www.w3.org/2000/svg", "image");
        if (!customMarker) {
          arrow.setAttribute("points", "0,16 4,0 8,16");
          arrow.style.fill = "#47c9a7";
        }

        // svg.appendChild(arrow);
        overlayDiv.appendChild(svg);
        container.appendChild(overlayDiv);

        this.marker = svg;
        this.layer = overlayDiv;

        function rotateMarker(angle, unit) {
          unit = unit || "deg";
          svg.style.webkitTransform =
            "translate(-10px, -10px)  rotate(" + angle + unit + ")";
          svg.style.MozTransform =
            "translate(-10px, -10px)  rotate(" + angle + unit + ")";
          svg.style.msTransform =
            "translate(-10px, -10px) rotate(" + angle + unit + ")";
          svg.style.OTransform =
            "translate(-10px, -10px)  rotate(" + angle + unit + ")";
          svg.style.transform =
            "translate(-10px, -10px)  rotate(" + angle + unit + ")";
        }

        function translateBy(translateX, translateY) {
          // firefox does not support offsetLeft for SVG element
          var newOffsetLeft = svg.getBBox().x + translateX;
          var newOffsetTop = svg.getBBox().y + translateY;
          svg.style.left = newOffsetLeft + "px";
          svg.style.top = newOffsetTop + "px";
        }

        function translateTo(translateX, translateY) {
          svg.style.left = translateX + "px";
          svg.style.top = translateY + "px";
        }

        var isRotating = false;
        var isTracking = false;
        var DELTA = 10;

        var lastClientX = 0;
        var lastClientY = 0;
        var lastTimestamp = 0;
        var REFRESHINTERVAL = 0;

        var directionMap = new DirectionMap();
        var autoUpdateDirection = true;
        var shouldGeneralizeDirection = true;

        var ANGLETOLERANCE = Math.PI / 8;
        var SUCCESSIVELIMIT = 1;
        var successiveCount = 0;
        var successiveChange = "";

        this.getDirectionMap = function () {
          return directionMap;
        };

        this.alignMarkerDirection = function () {
          var angleToxAxis = directionMap.angleBetween(
            directionMap.currentDirection,
            [1, 0]
          );
          rotateMarker(Math.PI / 2 - angleToxAxis, "rad");
        };
      }

      Marker.prototype.hideMarker = function () {
        this.marker.style.display = "none";
      };

      Marker.prototype.showMarker = function () {
        this.marker.style.display = "block";
      };

      Marker.prototype.getPosition = function () {
        //返回{x: this.marker。offsetLeft y: this.marker.offsetTop};
        //解决方案
        // offsetLeft和offsetTop不适用于Firefox中的svg元素
        var cssLeft = this.marker.style.left;
        var cssTop = this.marker.style.top;

        var offsetLeft = parseFloat(cssLeft.substring(0, cssLeft.length - 2));
        var offsetTop = parseFloat(cssTop.substring(0, cssTop.length - 2));

        return { x: offsetLeft, y: offsetTop };
      };

      Marker.prototype.getDirection = function () {
        return this.getDirectionMap().currentDirection;
      };

      Marker.prototype.setPosition = function () {
        if (this.marker.style.display === "none") {
          this.showMarker();
        }

        var boundingRect = this.marker.getBBox();
        if (markX && markY) {
          this.marker.style.left = markX * _this.newWidth + "px";
          this.marker.style.top = markY * _this.newHeight + "px";
        } else {
          this.marker.style.left = "0px";
          this.marker.style.top = "0px";
        }
      };

      Marker.prototype.setDirection = function (newDirection) {
        var directionMap = this.getDirectionMap();
        directionMap.currentDirection = directionMap.normalizeDirection(
          newDirection
        );
        this.alignMarkerDirection();
      };

      Marker.prototype.addEventListenerOnMarker = function (
        eventName,
        callFunc
      ) {
        var externalEvtHandler = this.getExtHandler();
        if (eventName in externalEvtHandler) {
          externalEvtHandler[eventName].push(callFunc);
        }
      };

      Marker.prototype.removeEventListenerOnMarker = function (
        eventName,
        callFunc
      ) {
        var externalEvtHandler = this.getExtHandler();
        if (eventName in externalEvtHandler) {
          var callFuncs = externalEvtHandler[eventName];
          for (var i = 0; i < callFuncs.length; i++) {
            if (callFunc === callFuncs[i]) {
              callFuncs.splice(i, 1);
              break;
            }
          }
        }
      };

      /**
       *  This class manages the direction data of the marker
       *  @class
       *  @param {number} direction - The unit normlized length for direction vector.
       *  @constructor
       */

      function DirectionMap(direction) {
        var normLen = 300;
        this.getNormLen = function () {
          return normLen;
        };
        this.currentDirection = direction || [0, normLen];

        this.rotateCenter = { x: 0, y: 0 };
        this.generalizedDirections = [
          { name: "EAST", vector: [normLen, 0], xDeg: 0 },
          {
            name: "NORTHEAST",
            vector: [0.7071 * normLen, 0.7071 * normLen],
            xDeg: 45
          },
          { name: "NORTH", vector: [0, normLen], xDeg: 90 },
          {
            name: "NORTHWEST",
            vector: [-0.7071 * normLen, 0.7071 * normLen],
            xDeg: 135
          },
          { name: "WEST", vector: [-1 * normLen, 0], xDeg: 180 },
          {
            name: "SOUTHWEST",
            vector: [-0.7071 * normLen, -0.7071 * normLen],
            xDeg: 225
          },
          { name: "SOUTH", vector: [0, -1 * normLen], xDeg: 270 },
          {
            name: "SOUTHEAST",
            vector: [0.7071 * normLen, -0.7071 * normLen],
            xDeg: 315
          }
        ];
      }

      DirectionMap.prototype.angleBetween = function (d1, d2) {
        var length1 = Math.sqrt(d1[0] * d1[0] + d1[1] * d1[1]);
        var length2 = Math.sqrt(d2[0] * d2[0] + d2[1] * d2[1]);
        if (length1 === 0 || length2 === 0) {
          return 0;
        }
        var angle1 = Math.acos(d1[0] / length1);
        var angle2 = Math.acos(d2[0] / length2);
        if (d1[1] < 0) {
          angle1 = 2 * Math.PI - angle1;
        }
        if (d2[1] < 0) {
          angle2 = 2 * Math.PI - angle2;
        }

        return angle1 - angle2;
      };

      DirectionMap.prototype.normalizeDirection = function (d, normLen) {
        var length = Math.sqrt(d[0] * d[0] + d[1] * d[1]);
        normLen = normLen || this.getNormLen();
        return [normLen * (d[0] / length), normLen * (d[1] / length)];
      };

      DirectionMap.prototype.generalizeDirection = function (d) {
        var angleToxAxis = Math.abs(this.angleBetween(d, [1, 0]));
        var index = Math.floor(angleToxAxis / (Math.PI / 8));

        if (index === 15 || index === 0) {
          return this.generalizedDirections[0];
        } else if (index % 2 === 0) {
          return this.generalizedDirections[index / 2];
        } else {
          return this.generalizedDirections[Math.ceil(index / 2)];
        }
      };

      DirectionMap.prototype.setRotateCenter = function (clientX, clientY) {
        this.rotateCenter.x = clientX;
        this.rotateCenter.y = clientY;
      };

      DirectionMap.prototype.calcMouseDirection = function (clientX, clientY) {
        var subVec = [
          clientX - this.rotateCenter.x,
          this.rotateCenter.y - clientY
        ];
        return this.normalizeDirection(subVec);
      };

      // 将3D世界位置转换为纸张位置，即viewer2D中的位置
      function worldToPaper(position) {
        var floor = Math.floor(
          (position.z - metadata[viewModels[currentModel].id].floorBase) /
          metadata[viewModels[currentModel].id].floorHeight
        );
        floor = floor < 0 ? 0 : floor;
        floor =
          floor >= metadata[viewModels[currentModel].id].viewboxes.length
            ? metadata[viewModels[currentModel].id].viewboxes.length - 1
            : floor;

        var data1 = {
          x:
            ((position.x + Math.abs(num2.min.x)) / viewer3D_data.x) *
            viewer2D_data.x,
          y:
            ((position.y + Math.abs(num2.min.y)) / viewer3D_data.y) *
            viewer2D_data.y,
          z: num2.min.z + 2
        };

        return { pos: data1, boxIndex: floor };
      }

      // 将客户端点转换为纸张位置，即viewer2D中的位置
      function clientToPaper(normedPoint) {
        // 使用hitpoint而不是scale/offset计算
        var hitPoint = viewer2D.utilities.getHitPoint(
          normedPoint.x,
          normedPoint.y
        );
        if (hitPoint == null) {
          hitPoint = viewer2D.navigation.getWorldPoint(
            normedPoint.x,
            normedPoint.y
          );
        }
        return hitPoint;
      }

      // 项目世界/纸张位置到客户画布
      function projectToViewport(position, camera) {
        var p = new THREE.Vector4();

        p.x = position.x;
        p.y = position.y;
        p.z = num2.min.z + 2;
        p.w = -40;

        p.applyMatrix4(camera.matrixWorldInverse);
        p.applyMatrix4(camera.projectionMatrix);

        if (p.w > 0) {
          p.x /= p.w;
          p.y /= p.w;
          p.z /= p.w;
        }

        var point = viewer2D.impl.viewportToClient(p.x, p.y);
        point.x = Math.floor(point.x) + 0.5;
        point.y = Math.floor(point.y) + 0.5;

        return point;
      }

      // array|object to THREE.Vector3
      function positionToVector3(position) {
        var x = parseFloat(position[0] || position.x);
        var y = parseFloat(position[1] || position.y);
        var z = num2.max.z + 2;

        return new THREE.Vector3(x, y, z);
      }
    },
    //只有模型
    initSvf(url) {
      let initnum = 1;
      var _this = this;
      _this.viewer3D = null;
      var viewer3D_data;
      var viewer3D;
      var options = {
        env: "Local",
        offline: "true",
        useADP: false
      };

      Autodesk.Viewing.Initializer(options, function () {
        var viewer3DContainer = document.getElementById("viewer3D");
        _this.viewer3D = new Autodesk.Viewing.Private.GuiViewer3D(
          viewer3DContainer,
          {}
        );
        viewer3D = _this.viewer3D;

        viewer3D.addEventListener(
          Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT,
          function (event) {
            viewer3D.setActiveNavigationTool("firstperson");
            if (initnum == 1) {
              initnum++;
            }
          }
        );

        viewer3D.start();

        viewer3D.load(url, null, onLoadSuccess, onLoadError);

        function onLoadSuccess() {
          // viewer3D.toolbar.setVisible(false); // 在3d查看器中隐藏工具栏
        }

        function onLoadError() { }

        viewer3D.addEventListener(
          Autodesk.Viewing.CAMERA_CHANGE_EVENT,
          function (event) { }
        );
      });
    },
    //只有2维图纸
    initFtd(url) {
      var _this = this;
      var viewer2D_data;
      var viewer2D;
      var num1;
      var marker;
      var markX;
      var markY;
      var options = {
        env: "Local",
        offline: "true",
        useADP: false
      };

      Autodesk.Viewing.Initializer(options, function () {
        var viewer2DContainer = document.getElementById("viewer22D");
        _this.viewer2D = new Autodesk.Viewing.Private.GuiViewer3D(
          viewer2DContainer,
          {}
        );
        viewer2D = _this.viewer2D;

        viewer2D.start();

        viewer2D.load(url, null, onLoadSuccess2, onLoadError);

        function onLoadSuccess2(e) {
          num1 = e.getVisibleBounds();
          viewer2D_data = {
            x: num1.max.x - num1.min.x,
            y: num1.max.y - num1.min.y
          };
          viewer2D.toolbar.setVisible(false); // 在2d查看器中隐藏工具栏
        }

        function onLoadError() { }

        viewer2D.addEventListener(
          Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
          function (event) {
            setTimeout(() => {
              let min = viewer2D.worldToClient(
                new THREE.Vector3(
                  viewer2D.model.getBoundingBox().min.x,
                  viewer2D.model.getBoundingBox().min.y,
                  viewer2D.model.getBoundingBox().max.z
                )
              );

              let max = viewer2D.worldToClient(
                new THREE.Vector3(
                  viewer2D.model.getBoundingBox().max.x,
                  viewer2D.model.getBoundingBox().max.y,
                  viewer2D.model.getBoundingBox().max.z
                )
              );

              _this.initMin = min;
              _this.initMax = max;
              initializeMarker();
            }, 100);

            num1 = event.model.getBoundingBox();

            viewer2D_data = {
              x: num1.max.x - num1.min.x,
              y: num1.max.y - num1.min.y
            };

            viewer2D.addEventListener(
              Autodesk.Viewing.CAMERA_CHANGE_EVENT,
              function (event) {
                updateMarkerOnCanvas();
              }
            );
          }
        );

        viewer2D.addEventListener(
          Autodesk.Viewing.SELECTION_CHANGED_EVENT,
          function (event) { }
        );
      });

      function updateMarkerOnCanvas() {
        _this.moveMakerBox();
      }

      //实例化标记UI类并设置查看器事件侦听器
      function initializeMarker() {
        marker = new Marker(viewer2D.container);
      }

      // 标记UI的构造函数
      function Marker(container, customMarker) {
        let min = _this.viewer2D.worldToClient(
          new THREE.Vector3(
            _this.viewer2D.model.getBoundingBox().min.x,
            _this.viewer2D.model.getBoundingBox().min.y,
            _this.viewer2D.model.getBoundingBox().max.z
          )
        );

        let max = _this.viewer2D.worldToClient(
          new THREE.Vector3(
            _this.viewer2D.model.getBoundingBox().max.x,
            _this.viewer2D.model.getBoundingBox().max.y,
            _this.viewer2D.model.getBoundingBox().max.z
          )
        );

        let scale = (max.x - min.x) / (_this.initMax.x - _this.initMin.x);

        _this.newWidth =
          _this.calcWidth * scale -
          _this.calcWidth * scale * _this.newData.ftdList[_this.ftdUrlIndex].x -
          _this.calcWidth * scale * _this.newData.ftdList[_this.ftdUrlIndex].rightX;
        _this.newHeight =
          _this.calcWidth * scale -
          _this.calcWidth * scale * _this.newData.ftdList[_this.ftdUrlIndex].y -
          _this.calcWidth * scale * _this.newData.ftdList[_this.ftdUrlIndex].bottomY;
        let leftLater =
          (max.x - min.x) / 2 +
          min.x -
          _this.calcWidth * scale * (0.5 - _this.newData.ftdList[_this.ftdUrlIndex].x);
        let topLater =
          (min.y - max.y) / 2 +
          max.y -
          _this.calcWidth * scale * (0.5 - _this.newData.ftdList[_this.ftdUrlIndex].y);

        var overlayDiv = document.createElement("div");
        overlayDiv.style.left = leftLater + "px";
        overlayDiv.style.top = topLater + "px";
        overlayDiv.style.right = "auto";
        overlayDiv.style.bottom = "auto";
        overlayDiv.style.width = _this.newWidth + "px";
        overlayDiv.style.height = _this.newHeight + "px";
        overlayDiv.style.zIndex = "99999";
        overlayDiv.style.position = "absolute";
        overlayDiv.style.pointerEvents = "none";
        overlayDiv.style.border = "1px solid red";
        overlayDiv.id = "markerlayer";

        container.appendChild(overlayDiv);

        // this.layer = overlayDiv;
      }
    },
    close() {
      if (this.viewer3D) {
        this.viewer3D.impl.removeModel(this.viewer3D.model);
        this.viewer3D.impl.unloadModel(this.viewer3D.model);
        this.viewer3D = null;
      }
      if (this.viewer2D) {
        this.viewer2D.impl.removeModel(this.viewer2D.model);
        this.viewer2D.impl.unloadModel(this.viewer2D.model);
        this.viewer2D = null;
      }
    },
    svfChange() {
      let _this = this;
      this.viewer3D.tearDown();
      this.viewer3D.start();
      this.viewer3D.load(
        _this.svfUrl[_this.svfUrlIndex].path,
        null,
        onLoadSuccess,
        onLoadError
      );
      function onLoadSuccess() { }
      function onLoadError() { }
    },
    ftdChange(e) {
      this.leftRight = this.newData.ftdList[this.ftdUrlIndex].x * 100;
      this.topBottom = this.newData.ftdList[this.ftdUrlIndex].y * 100;
      this.right = this.newData.ftdList[this.ftdUrlIndex].rightX * 100;
      this.bottom = this.newData.ftdList[this.ftdUrlIndex].bottomY * 100;
      let _this = this;
      this.viewer2D.tearDown();
      this.viewer2D.start();
      this.viewer2D.load(
        _this.ftdUrl[_this.ftdUrlIndex].path,
        null,
        onLoadSuccess2,
        onLoadError
      );
      function onLoadSuccess2() {
        _this.initBox();
      }
      function onLoadError() { }
    },
    //全屏事件
    launchFullscreen(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
      }
    },
    toLaunchFull() {
      this.launchFullscreen(document.getElementById("vieww"));
    }
  },
  mounted() {
    this.newData = this.modelData;

    this.exportes = localStorage.getItem("isexport");
    this.svfUrl = this.newData.svfList;
    this.ftdUrl = this.newData.ftdList;

    if (this.svfUrl.length != 0 && this.ftdUrl.length != 0) {
      this.calcWidth = 400;
      this.leftRight = this.newData.ftdList[0].x * 100;
      this.topBottom = this.newData.ftdList[0].y * 100;
      this.right = this.newData.ftdList[0].rightX * 100;
      this.bottom = this.newData.ftdList[0].bottomY * 100;

      this.svfUrlIndex = 0;
      this.ftdUrlIndex = 0;

      this.showType = 1;

      this.init(
        this.ftdUrl[this.ftdUrlIndex].path,
        this.svfUrl[this.svfUrlIndex].path
      );
    }
    if (this.svfUrl.length != 0 && this.ftdUrl.length == 0) {
      this.svfUrlIndex = 0;
      // this.viewer33D = true;
      // this.viewer22D = false;
      this.showType = 2;
      this.initSvf(this.svfUrl[this.svfUrlIndex].path);
    }
    if (this.svfUrl.length == 0 && this.ftdUrl.length != 0) {
      this.calcWidth = 600;
      this.leftRight = this.newData.ftdList[0].x * 100;
      this.topBottom = this.newData.ftdList[0].y * 100;
      this.right = this.newData.ftdList[0].rightX * 100;
      this.bottom = this.newData.ftdList[0].bottomY * 100;
      this.ftdUrlIndex = 0;
      // this.viewer33D = false;
      // this.viewer22D = true;
      this.showType = 3;
      this.initFtd(this.ftdUrl[this.ftdUrlIndex].path);
    }
    if (this.svfUrl.length == 0 && this.ftdUrl.length == 0) {
      this.showType = 4;
    }
  }
};
</script>

<style lang="scss" scoped>
.bimBox {
  min-height: 62vh;
  background: #fff;
}
.vieww {
  height: 75vh;
  position: relative;
  width: 100%;
}
#viewer3D {
  height: 100%;
  /deep/ {
    .adsk-viewing-viewer {
      position: relative;
      height: 100% !important;
      &.touch {
        .menuItem {
          padding: 5px;
        }
      }
    }
    #guiviewer3d-toolbar {
      margin: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
#viewer22D {
  width: 600px;
  height: 600px;
  margin: 0 auto;
  position: relative;
}
#viewer2D {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 400px;
  height: 400px;
  /deep/ {
    .adsk-viewing-viewer {
      position: relative;
    }
    .canvas-wrap {
      z-index: -1;
    }
    canvas {
      position: absolute;
      z-index: -1;
    }
    #marker {
      background: url(http://jl.bqbim.com/point.png);
      background-size: 100% 100%;
    }
    .menu {
      display: none !important;
    }
  }
  .viewcube {
    display: none !important;
  }
}
</style>

