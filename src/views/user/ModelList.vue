<template>
  <div class="app-container" id="cardBtm">
    <el-container class="content_right">
      <el-card class="right_card_b" id="card_b">
        <div class="modalDivItem" :key="ind" v-for="(ite,ind) in fileList">
          <h6 class="modalTitle">
            {{ite.modelName}}
            <span>
              <svg-icon v-if="ite.ftdTrue" icon-class="twoDcrt" />
              <svg-icon v-if="ite.svfTrue" icon-class="threeDcrt" />
            </span>
          </h6>
          <div class="imgDiv" @click="lookDetail(ite)">
            <img :src="ite.imgUrl" alt />
          </div>
        </div>
      </el-card>
    </el-container>

    <el-dialog title="模型展示" :visible.sync="linkageDia" width="90%" top="5vh" class="linkage"
      @close="closeDia" :close-on-click-modal="false" :close-on-press-escape="false">
      <linkagepopup v-if="linkageDia" :linkageDia="linkageDia" :modelData="modelData" ref="linkage">
      </linkagepopup>
    </el-dialog>
  </div>
</template>

<script>
import linkagepopup from "../linkagePopup.vue";
export default {
  name: "Login",
  components: {
    linkagepopup
  },
  data() {
    return {
      linkageDia: false,
      modelData: "",
      fileList: [
        {
          id: "08d78ffb-2ba2-b171-dc36-2e94eb32dc5f",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "123",
          type: "整体",
          category: "建筑",
          remark: "",
          folder:
            "http://jl.bqbim.com/FileStorages/ModelFile/三角形20200103111400.zip",
          imgUrl:
            "http://jl.bqbim.com/FileStorages/ModelFile/2019110116553620200103111249.png",
          ftdPath:
            '[{"FloorName":"图纸: 导航地图 - 01","Path":"http://jl.bqbim.com/FileStorages/ModelFile/三角形20200103111400/189521920-CYTD20190430rvt/aed6bf9f-07c1-90e6-a8de-fc2b1e51cbf0_f2d/primaryGraphics.f2d","Type":2,"Tower":"三角形","Category":"建筑","X":"0.14","Y":"0.32","RightX":"0.1","BottomY":"0.31"}]',
          ftdList: [
            {
              floorName: "图纸: 导航地图 - 01",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/三角形20200103111400/189521920-CYTD20190430rvt/aed6bf9f-07c1-90e6-a8de-fc2b1e51cbf0_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "三角形",
              category: "建筑",
              x: "0.14",
              y: "0.32",
              rightX: "0.1",
              bottomY: "0.31",
            },
          ],
          svfPath:
            '[{"FloorName":"3D","Path":"http://jl.bqbim.com/FileStorages/ModelFile/三角形20200103111400/189521920-CYTD20190430rvt/Resource/3D/3D/3D.svf","Type":3,"Tower":"三角形","Category":"建筑"}]',
          svfList: [
            {
              floorName: "3D",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/三角形20200103111400/189521920-CYTD20190430rvt/Resource/3D/3D/3D.svf",
              type: 3,
              tower: "三角形",
              category: "建筑",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
          ],
        },
        {
          id: "08d7c8d9-f161-75c0-0559-1e28a2ae5ccc",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "中海锦城-8-1F",
          type: "整体",
          category: "建筑",
          remark: "中海锦城-8-1F",
          folder:
            "http://jl.bqbim.com/FileStorages/ModelFile/1F-2D20200315081103.zip",
          imgUrl:
            "http://jl.bqbim.com/FileStorages/ModelFile/1F20200315081055.png",
          ftdPath:
            '[{"FloorName":"8号楼-01一层平面图-Model","Path":"http://jl.bqbim.com/FileStorages/ModelFile/1F-2D20200315081103/2D/primaryGraphics.f2d","Type":2,"Tower":"1F-2D","Category":"建筑","X":"0.02","Y":"0.03","RightX":"0.04","BottomY":"0.05"}]',
          ftdList: [
            {
              floorName: "8号楼-01一层平面图-Model",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/1F-2D20200315081103/2D/primaryGraphics.f2d",
              type: 2,
              tower: "1F-2D",
              category: "建筑",
              x: "0.02",
              y: "0.03",
              rightX: "0.04",
              bottomY: "0.05",
            },
          ],
          svfPath: "[]",
          svfList: [],
        },
        {
          id: "08d7c8da-2bd3-a562-18e5-b7365ba926c0",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "中海锦城-8-2F",
          type: "整体",
          category: "建筑",
          remark: "中海锦城-8-2F",
          folder:
            "http://jl.bqbim.com/FileStorages/ModelFile/2F-2D20200315081244.zip",
          imgUrl: "http://jl.bqbim.com/FileStorages/ModelFile/2F.png",
          ftdPath:
            '[{"FloorName":"8号楼-02二层平面图-Model","Path":"http://jl.bqbim.com/FileStorages/ModelFile/2F-2D20200315081244/2D/primaryGraphics.f2d","Type":2,"Tower":"2F-2D","Category":"建筑"}]',
          ftdList: [
            {
              floorName: "8号楼-02二层平面图-Model",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/2F-2D20200315081244/2D/primaryGraphics.f2d",
              type: 2,
              tower: "2F-2D",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
          ],
          svfPath: "[]",
          svfList: [],
        },
        {
          id: "08d7c8db-4631-aacf-cc6b-1cc17f7ed6db",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "中海锦城-8-3F",
          type: "整体",
          category: "建筑",
          remark: "中海锦城-8-3F",
          folder: "http://jl.bqbim.com/FileStorages/ModelFile/3F-2D.zip",
          imgUrl: "http://jl.bqbim.com/FileStorages/ModelFile/3F.png",
          ftdPath:
            '[{"FloorName":"8号楼-03三层平面图-Model","Path":"http://jl.bqbim.com/FileStorages/ModelFile/3F-2D/2D/primaryGraphics.f2d","Type":2,"Tower":"3F-2D","Category":"建筑"}]',
          ftdList: [
            {
              floorName: "8号楼-03三层平面图-Model",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/3F-2D/2D/primaryGraphics.f2d",
              type: 2,
              tower: "3F-2D",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
          ],
          svfPath: "[]",
          svfList: [],
        },
        {
          id: "08d7c8db-68fe-7056-4377-f384de029c1f",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "中海锦城-8-5F-16F",
          type: "整体",
          category: "建筑",
          remark: "中海锦城-8-5F-16F",
          folder: "http://jl.bqbim.com/FileStorages/ModelFile/5F-16F-2D.zip",
          imgUrl: "http://jl.bqbim.com/FileStorages/ModelFile/5F-16F.png",
          ftdPath:
            '[{"FloorName":"8号楼-05五-十六层平面图-Model","Path":"http://jl.bqbim.com/FileStorages/ModelFile/5F-16F-2D/2D/primaryGraphics.f2d","Type":2,"Tower":"5F-16F-2D","Category":"建筑"}]',
          ftdList: [
            {
              floorName: "8号楼-05五-十六层平面图-Model",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/5F-16F-2D/2D/primaryGraphics.f2d",
              type: 2,
              tower: "5F-16F-2D",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
          ],
          svfPath: "[]",
          svfList: [],
        },
        {
          id: "08d7c8db-859f-e9e7-7b44-cf09dee586d7",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "中海锦城-8-17F",
          type: "整体",
          category: "建筑",
          remark: "中海锦城-8-17F",
          folder: "http://jl.bqbim.com/FileStorages/ModelFile/17F-2D.zip",
          imgUrl: "http://jl.bqbim.com/FileStorages/ModelFile/17F.png",
          ftdPath:
            '[{"FloorName":"8号楼-06十七层平面图-Model","Path":"http://jl.bqbim.com/FileStorages/ModelFile/17F-2D/2D/primaryGraphics.f2d","Type":2,"Tower":"17F-2D","Category":"建筑"}]',
          ftdList: [
            {
              floorName: "8号楼-06十七层平面图-Model",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/17F-2D/2D/primaryGraphics.f2d",
              type: 2,
              tower: "17F-2D",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
          ],
          svfPath: "[]",
          svfList: [],
        },
        {
          id: "08d7c8db-fa69-9990-f310-32f65a07337b",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "中海锦城-8-18F",
          type: "整体",
          category: "建筑",
          remark: "中海锦城-8-18F",
          folder: "http://jl.bqbim.com/FileStorages/ModelFile/18F-2D.zip",
          imgUrl: "http://jl.bqbim.com/FileStorages/ModelFile/18F.png",
          ftdPath:
            '[{"FloorName":"8号楼-07十八层平面图-Model","Path":"http://jl.bqbim.com/FileStorages/ModelFile/18F-2D/2D/primaryGraphics.f2d","Type":2,"Tower":"18F-2D","Category":"建筑"}]',
          ftdList: [
            {
              floorName: "8号楼-07十八层平面图-Model",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/18F-2D/2D/primaryGraphics.f2d",
              type: 2,
              tower: "18F-2D",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
          ],
          svfPath: "[]",
          svfList: [],
        },
        {
          id: "08d7c8dc-19a6-37b0-d3d3-5b9a298baa8e",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "中海锦城-8-19F",
          type: "整体",
          category: "建筑",
          remark: "中海锦城-8-19F",
          folder: "http://jl.bqbim.com/FileStorages/ModelFile/19F-2D.zip",
          imgUrl: "http://jl.bqbim.com/FileStorages/ModelFile/19F.png",
          ftdPath:
            '[{"FloorName":"8号楼-08十九层平面图-Model","Path":"http://jl.bqbim.com/FileStorages/ModelFile/19F-2D/2D/primaryGraphics.f2d","Type":2,"Tower":"19F-2D","Category":"建筑"}]',
          ftdList: [
            {
              floorName: "8号楼-08十九层平面图-Model",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/19F-2D/2D/primaryGraphics.f2d",
              type: 2,
              tower: "19F-2D",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
          ],
          svfPath: "[]",
          svfList: [],
        },
        {
          id: "08d7c8dc-2f50-c52c-c2cf-45df6a3b6141",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "中海锦城-8-20F",
          type: "整体",
          category: "建筑",
          remark: "中海锦城-8-20F",
          folder: "http://jl.bqbim.com/FileStorages/ModelFile/20F-2D.zip",
          imgUrl: "http://jl.bqbim.com/FileStorages/ModelFile/20F.png",
          ftdPath:
            '[{"FloorName":"8号楼-09二十层平面图-Model","Path":"http://jl.bqbim.com/FileStorages/ModelFile/20F-2D/2D/primaryGraphics.f2d","Type":2,"Tower":"20F-2D","Category":"建筑"}]',
          ftdList: [
            {
              floorName: "8号楼-09二十层平面图-Model",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/20F-2D/2D/primaryGraphics.f2d",
              type: 2,
              tower: "20F-2D",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
          ],
          svfPath: "[]",
          svfList: [],
        },
        {
          id: "08d7c8dc-4554-53ef-745a-dc5fa3eaf6da",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "中海锦城-8-21F-31F",
          type: "整体",
          category: "建筑",
          remark: "中海锦城-8-21F-31F",
          folder: "http://jl.bqbim.com/FileStorages/ModelFile/21F-31F-2D.zip",
          imgUrl: "http://jl.bqbim.com/FileStorages/ModelFile/21F-31F.png",
          ftdPath:
            '[{"FloorName":"8号楼-10二十一-三十一层平面图-Model","Path":"http://jl.bqbim.com/FileStorages/ModelFile/21F-31F-2D/2D/primaryGraphics.f2d","Type":2,"Tower":"21F-31F-2D","Category":"建筑"}]',
          ftdList: [
            {
              floorName: "8号楼-10二十一-三十一层平面图-Model",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/21F-31F-2D/2D/primaryGraphics.f2d",
              type: 2,
              tower: "21F-31F-2D",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
          ],
          svfPath: "[]",
          svfList: [],
        },
        {
          id: "08d7c8dc-57a8-a3d6-52d3-ea9a01b0b45a",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "中海锦城-8-32F",
          type: "整体",
          category: "建筑",
          remark: "中海锦城-8-32F",
          folder: "http://jl.bqbim.com/FileStorages/ModelFile/32F-2D.zip",
          imgUrl: "http://jl.bqbim.com/FileStorages/ModelFile/32F.png",
          ftdPath:
            '[{"FloorName":"8号楼-11三十二层平面图-Model","Path":"http://jl.bqbim.com/FileStorages/ModelFile/32F-2D/2D/primaryGraphics.f2d","Type":2,"Tower":"32F-2D","Category":"建筑","X":"0.4","Y":"0.4","RightX":"5","BottomY":"6"}]',
          ftdList: [
            {
              floorName: "8号楼-11三十二层平面图-Model",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/32F-2D/2D/primaryGraphics.f2d",
              type: 2,
              tower: "32F-2D",
              category: "建筑",
              x: "0.4",
              y: "0.4",
              rightX: "5",
              bottomY: "6",
            },
          ],
          svfPath: "[]",
          svfList: [],
        },
        {
          id: "08d7c8dc-6c86-607b-4a36-8e4bd70494d4",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "中海锦城-8-33F-34F",
          type: "整体",
          category: "建筑",
          remark: "中海锦城-8-33F-34F",
          folder: "http://jl.bqbim.com/FileStorages/ModelFile/33F-34F-2D.zip",
          imgUrl: "http://jl.bqbim.com/FileStorages/ModelFile/33F-34F.png",
          ftdPath:
            '[{"FloorName":"8号楼-12三十三-三十四层平面图-Model","Path":"http://jl.bqbim.com/FileStorages/ModelFile/33F-34F-2D/2D/primaryGraphics.f2d","Type":2,"Tower":"33F-34F-2D","Category":"建筑"}]',
          ftdList: [
            {
              floorName: "8号楼-12三十三-三十四层平面图-Model",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/33F-34F-2D/2D/primaryGraphics.f2d",
              type: 2,
              tower: "33F-34F-2D",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
          ],
          svfPath: "[]",
          svfList: [],
        },
        {
          id: "08d7c8dc-86e9-01ac-6da2-4408a023bbf1",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "中海锦城-8-机房顶层",
          type: "整体",
          category: "建筑",
          remark: "中海锦城-8-机房顶层",
          folder: "http://jl.bqbim.com/FileStorages/ModelFile/机房顶层-2D.zip",
          imgUrl: "http://jl.bqbim.com/FileStorages/ModelFile/机房顶层.png",
          ftdPath:
            '[{"FloorName":"8号楼-14机房顶层平面图-Model","Path":"http://jl.bqbim.com/FileStorages/ModelFile/机房顶层-2D/2D/primaryGraphics.f2d","Type":2,"Tower":"机房顶层-2D","Category":"建筑"}]',
          ftdList: [
            {
              floorName: "8号楼-14机房顶层平面图-Model",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/机房顶层-2D/2D/primaryGraphics.f2d",
              type: 2,
              tower: "机房顶层-2D",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
          ],
          svfPath: "[]",
          svfList: [],
        },
        {
          id: "08d7c8dc-9cc6-6bd6-0f4f-740ebc68384d",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "中海锦城-8-屋顶层",
          type: "整体",
          category: "建筑",
          remark: "中海锦城-8-屋顶层",
          folder: "http://jl.bqbim.com/FileStorages/ModelFile/屋顶层-2D.zip",
          imgUrl: "http://jl.bqbim.com/FileStorages/ModelFile/屋顶层.png",
          ftdPath:
            '[{"FloorName":"8号楼-13屋顶层平面图-Model","Path":"http://jl.bqbim.com/FileStorages/ModelFile/屋顶层-2D/2D/primaryGraphics.f2d","Type":2,"Tower":"屋顶层-2D","Category":"建筑"}]',
          ftdList: [
            {
              floorName: "8号楼-13屋顶层平面图-Model",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/屋顶层-2D/2D/primaryGraphics.f2d",
              type: 2,
              tower: "屋顶层-2D",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
          ],
          svfPath: "[]",
          svfList: [],
        },
        {
          id: "08d7cfc6-172b-f41c-be59-edd00183871b",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "电气九号",
          type: "整体",
          category: "电气",
          remark: "",
          folder:
            "http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629.zip",
          imgUrl:
            "http://jl.bqbim.com/FileStorages/ModelFile/QQ图片2020032314114820200324033638.png",
          ftdPath:
            '[{"FloorName":"楼层平面: 7层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/388b5f39-1bc3-1fe8-96fb-5d1387afc7af_f2d/primaryGraphics.f2d","Type":2,"Tower":"9号楼","Category":"电气","X":"0.06","Y":"0.3111","RightX":"0.3","BottomY":"0.3"},{"FloorName":"楼层平面: 4层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/3ffa8935-6149-b9ad-d476-4d7849b050e6_f2d/primaryGraphics.f2d","Type":2,"Tower":"9号楼","Category":"电气","X":"0.1","Y":"0.1","RightX":"0.1","BottomY":"0.1"},{"FloorName":"楼层平面: 9层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/4de8fd3f-29b0-93f2-bc82-873c60c1da47_f2d/primaryGraphics.f2d","Type":2,"Tower":"9号楼","Category":"电气","X":"0.2","Y":"0.2","RightX":"0.2","BottomY":"0.2"},{"FloorName":"楼层平面: 8层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/79f50991-7477-3ec7-e9ed-4c840eadec3d_f2d/primaryGraphics.f2d","Type":2,"Tower":"9号楼","Category":"电气","X":"0.4","Y":"0.4","RightX":"0.4","BottomY":"0.4"},{"FloorName":"楼层平面: 5层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/7a7a9be5-af02-77a7-3a6a-510e7e9e71eb_f2d/primaryGraphics.f2d","Type":2,"Tower":"9号楼","Category":"电气","X":"0","Y":"0","RightX":"0","BottomY":"0"},{"FloorName":"楼层平面: 2层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/c1289441-6bb0-3c85-452d-77bc8aefda30_f2d/primaryGraphics.f2d","Type":2,"Tower":"9号楼","Category":"电气","X":"0","Y":"0","RightX":"0","BottomY":"0"},{"FloorName":"楼层平面: 3层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/daf903d0-eba8-6cc6-0a08-a323aee8bdb6_f2d/primaryGraphics.f2d","Type":2,"Tower":"9号楼","Category":"电气","X":"0","Y":"0","RightX":"0","BottomY":"0"},{"FloorName":"楼层平面: 6层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/fa74d0a5-f301-13b4-25cd-a84ff154cd5a_f2d/primaryGraphics.f2d","Type":2,"Tower":"9号楼","Category":"电气","X":"0","Y":"0","RightX":"0","BottomY":"0"}]',
          ftdList: [
            {
              floorName: "楼层平面: 7层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/388b5f39-1bc3-1fe8-96fb-5d1387afc7af_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "9号楼",
              category: "电气",
              x: "0.06",
              y: "0.3111",
              rightX: "0.3",
              bottomY: "0.3",
            },
            {
              floorName: "楼层平面: 4层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/3ffa8935-6149-b9ad-d476-4d7849b050e6_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "9号楼",
              category: "电气",
              x: "0.1",
              y: "0.1",
              rightX: "0.1",
              bottomY: "0.1",
            },
            {
              floorName: "楼层平面: 9层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/4de8fd3f-29b0-93f2-bc82-873c60c1da47_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "9号楼",
              category: "电气",
              x: "0.2",
              y: "0.2",
              rightX: "0.2",
              bottomY: "0.2",
            },
            {
              floorName: "楼层平面: 8层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/79f50991-7477-3ec7-e9ed-4c840eadec3d_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "9号楼",
              category: "电气",
              x: "0.4",
              y: "0.4",
              rightX: "0.4",
              bottomY: "0.4",
            },
            {
              floorName: "楼层平面: 5层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/7a7a9be5-af02-77a7-3a6a-510e7e9e71eb_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "9号楼",
              category: "电气",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 2层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/c1289441-6bb0-3c85-452d-77bc8aefda30_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "9号楼",
              category: "电气",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 3层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/daf903d0-eba8-6cc6-0a08-a323aee8bdb6_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "9号楼",
              category: "电气",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 6层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/fa74d0a5-f301-13b4-25cd-a84ff154cd5a_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "9号楼",
              category: "电气",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
          ],
          svfPath:
            '[{"FloorName":"2F","Path":"http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/Resource/三维视图/2F 1277511/2F.svf","Type":3,"Tower":"9号楼","Category":"电气"},{"FloorName":"3F","Path":"http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/Resource/三维视图/3F 1333881/3F.svf","Type":3,"Tower":"9号楼","Category":"电气"},{"FloorName":"4F","Path":"http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/Resource/三维视图/4F 1333915/4F.svf","Type":3,"Tower":"9号楼","Category":"电气"},{"FloorName":"5F","Path":"http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/Resource/三维视图/5F 1333960/5F.svf","Type":3,"Tower":"9号楼","Category":"电气"},{"FloorName":"6F","Path":"http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/Resource/三维视图/6F 1334047/6F.svf","Type":3,"Tower":"9号楼","Category":"电气"},{"FloorName":"7F","Path":"http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/Resource/三维视图/7F 1334169/7F.svf","Type":3,"Tower":"9号楼","Category":"电气"},{"FloorName":"8F","Path":"http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/Resource/三维视图/8F 1334228/8F.svf","Type":3,"Tower":"9号楼","Category":"电气"},{"FloorName":"9F","Path":"http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/Resource/三维视图/9F 1334287/9F.svf","Type":3,"Tower":"9号楼","Category":"电气"}]',
          svfList: [
            {
              floorName: "2F",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/Resource/三维视图/2F 1277511/2F.svf",
              type: 3,
              tower: "9号楼",
              category: "电气",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
            {
              floorName: "3F",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/Resource/三维视图/3F 1333881/3F.svf",
              type: 3,
              tower: "9号楼",
              category: "电气",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
            {
              floorName: "4F",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/Resource/三维视图/4F 1333915/4F.svf",
              type: 3,
              tower: "9号楼",
              category: "电气",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
            {
              floorName: "5F",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/Resource/三维视图/5F 1333960/5F.svf",
              type: 3,
              tower: "9号楼",
              category: "电气",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
            {
              floorName: "6F",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/Resource/三维视图/6F 1334047/6F.svf",
              type: 3,
              tower: "9号楼",
              category: "电气",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
            {
              floorName: "7F",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/Resource/三维视图/7F 1334169/7F.svf",
              type: 3,
              tower: "9号楼",
              category: "电气",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
            {
              floorName: "8F",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/Resource/三维视图/8F 1334228/8F.svf",
              type: 3,
              tower: "9号楼",
              category: "电气",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
            {
              floorName: "9F",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/9号楼20200324033629/Resource/三维视图/9F 1334287/9F.svf",
              type: 3,
              tower: "9号楼",
              category: "电气",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
          ],
        },
        {
          id: "08d806f0-5281-3b8c-03b0-5694ae1ca64f",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "保利模型",
          type: "整体",
          category: "建筑",
          remark: "",
          folder: "http://jl.bqbim.com/FileStorages/ModelFile/保利建筑.zip",
          imgUrl:
            "http://jl.bqbim.com/FileStorages/ModelFile/12320200602082724.jpg",
          ftdPath: "[]",
          ftdList: [],
          svfPath:
            '[{"FloorName":"3D","Path":"http://jl.bqbim.com/FileStorages/ModelFile/保利建筑/baolingxingheb24f-construction.rvt/Resource/三维视图/3D/3D.svf","Type":3,"Tower":"保利建筑","Category":"建筑","X":null,"Y":null}]',
          svfList: [
            {
              floorName: "3D",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/保利建筑/baolingxingheb24f-construction.rvt/Resource/三维视图/3D/3D.svf",
              type: 3,
              tower: "保利建筑",
              category: "建筑",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
          ],
        },
        {
          id: "08d806f0-611a-4131-4a21-c933d67f8475",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "保利结构模型",
          type: "整体",
          category: "结构",
          remark: "",
          folder: "http://jl.bqbim.com/FileStorages/ModelFile/保利结构.zip",
          imgUrl:
            "http://jl.bqbim.com/FileStorages/ModelFile/12320200602082750.jpg",
          ftdPath: "[]",
          ftdList: [],
          svfPath:
            '[{"FloorName":"3D","Path":"http://jl.bqbim.com/FileStorages/ModelFile/保利结构/baolingxingheb24f-building.rvt/Resource/三维视图/3D/3D.svf","Type":3,"Tower":"保利结构","Category":"结构","X":null,"Y":null}]',
          svfList: [
            {
              floorName: "3D",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/保利结构/baolingxingheb24f-building.rvt/Resource/三维视图/3D/3D.svf",
              type: 3,
              tower: "保利结构",
              category: "结构",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
          ],
        },
        {
          id: "08d80774-4fb0-6a5d-cbf1-8d03fd09e70d",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "保利建筑",
          type: "整体",
          category: "建筑",
          remark: "",
          folder:
            "http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt.zip",
          imgUrl: "http://jl.bqbim.com/FileStorages/ModelFile/钢筋节点部分.png",
          ftdPath:
            '[{"FloorName":"结构平面: 5F","Path":"http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/58bd89ab-321a-b564-2cd8-5161b4c4cbf1_f2d/primaryGraphics.f2d","Type":2,"Tower":"baolingxinghe-b2-f4-constr.rvt","Category":"建筑","X":"0.32","Y":"0.4","RightX":"0","BottomY":"0"},{"FloorName":"剖面: 剖面 2","Path":"http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/617a5580-b2f9-6315-cc63-64f04603c4da_f2d/primaryGraphics.f2d","Type":2,"Tower":"baolingxinghe-b2-f4-constr.rvt","Category":"建筑","X":"0","Y":"0","RightX":"0","BottomY":"0"},{"FloorName":"剖面: 剖面 1","Path":"http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/6880d589-8647-f6fd-f4db-d0f540d2c073_f2d/primaryGraphics.f2d","Type":2,"Tower":"baolingxinghe-b2-f4-constr.rvt","Category":"建筑","X":"0.365","Y":"0.29","RightX":"0.37","BottomY":"0.45"},{"FloorName":"结构平面: 梁平面图","Path":"http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/825ec4ca-2b3a-8aed-8c06-550b3be77eed_f2d/primaryGraphics.f2d","Type":2,"Tower":"baolingxinghe-b2-f4-constr.rvt","Category":"建筑","X":"0","Y":"0","RightX":"0","BottomY":"0"},{"FloorName":"结构平面: 4F","Path":"http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/87bab82a-3f17-d1df-3a50-e2969de8b6c0_f2d/primaryGraphics.f2d","Type":2,"Tower":"baolingxinghe-b2-f4-constr.rvt","Category":"建筑","X":"0","Y":"0","RightX":"0","BottomY":"0"},{"FloorName":"结构平面: 剪力墙柱平面布置","Path":"http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/aec55243-2b7a-52ba-e884-588e3b6b1497_f2d/primaryGraphics.f2d","Type":2,"Tower":"baolingxinghe-b2-f4-constr.rvt","Category":"建筑","X":"0","Y":"0","RightX":"0","BottomY":"0"},{"FloorName":"结构平面: 楼板平面图","Path":"http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/e323f984-707a-5aa8-42f2-8a9e82b76367_f2d/primaryGraphics.f2d","Type":2,"Tower":"baolingxinghe-b2-f4-constr.rvt","Category":"建筑","X":"0","Y":"0","RightX":"0","BottomY":"0"}]',
          ftdList: [
            {
              floorName: "结构平面: 5F",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/58bd89ab-321a-b564-2cd8-5161b4c4cbf1_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "baolingxinghe-b2-f4-constr.rvt",
              category: "建筑",
              x: "0.32",
              y: "0.4",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "剖面: 剖面 2",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/617a5580-b2f9-6315-cc63-64f04603c4da_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "baolingxinghe-b2-f4-constr.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "剖面: 剖面 1",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/6880d589-8647-f6fd-f4db-d0f540d2c073_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "baolingxinghe-b2-f4-constr.rvt",
              category: "建筑",
              x: "0.365",
              y: "0.29",
              rightX: "0.37",
              bottomY: "0.45",
            },
            {
              floorName: "结构平面: 梁平面图",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/825ec4ca-2b3a-8aed-8c06-550b3be77eed_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "baolingxinghe-b2-f4-constr.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "结构平面: 4F",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/87bab82a-3f17-d1df-3a50-e2969de8b6c0_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "baolingxinghe-b2-f4-constr.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "结构平面: 剪力墙柱平面布置",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/aec55243-2b7a-52ba-e884-588e3b6b1497_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "baolingxinghe-b2-f4-constr.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "结构平面: 楼板平面图",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/e323f984-707a-5aa8-42f2-8a9e82b76367_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "baolingxinghe-b2-f4-constr.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
          ],
          svfPath:
            '[{"FloorName":"4F三维","Path":"http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/Resource/三维视图/4F三维 458017/4F三维.svf","Type":3,"Tower":"baolingxinghe-b2-f4-constr.rvt","Category":"建筑","X":null,"Y":null},{"FloorName":"板三维","Path":"http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/Resource/三维视图/板三维 1793864/板三维.svf","Type":3,"Tower":"baolingxinghe-b2-f4-constr.rvt","Category":"建筑","X":null,"Y":null},{"FloorName":"柱三维","Path":"http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/Resource/三维视图/柱三维 1793844/柱三维.svf","Type":3,"Tower":"baolingxinghe-b2-f4-constr.rvt","Category":"建筑","X":null,"Y":null},{"FloorName":"梁三维","Path":"http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/Resource/三维视图/梁三维 1793854/梁三维.svf","Type":3,"Tower":"baolingxinghe-b2-f4-constr.rvt","Category":"建筑","X":null,"Y":null},{"FloorName":"钢筋节点","Path":"http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/Resource/三维视图/钢筋节点 1787169/钢筋节点.svf","Type":3,"Tower":"baolingxinghe-b2-f4-constr.rvt","Category":"建筑","X":null,"Y":null}]',
          svfList: [
            {
              floorName: "4F三维",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/Resource/三维视图/4F三维 458017/4F三维.svf",
              type: 3,
              tower: "baolingxinghe-b2-f4-constr.rvt",
              category: "建筑",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
            {
              floorName: "板三维",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/Resource/三维视图/板三维 1793864/板三维.svf",
              type: 3,
              tower: "baolingxinghe-b2-f4-constr.rvt",
              category: "建筑",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
            {
              floorName: "柱三维",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/Resource/三维视图/柱三维 1793844/柱三维.svf",
              type: 3,
              tower: "baolingxinghe-b2-f4-constr.rvt",
              category: "建筑",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
            {
              floorName: "梁三维",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/Resource/三维视图/梁三维 1793854/梁三维.svf",
              type: 3,
              tower: "baolingxinghe-b2-f4-constr.rvt",
              category: "建筑",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
            {
              floorName: "钢筋节点",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-constr.rvt/baolingxinghe-b2-f4-constr.rvt/Resource/三维视图/钢筋节点 1787169/钢筋节点.svf",
              type: 3,
              tower: "baolingxinghe-b2-f4-constr.rvt",
              category: "建筑",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
          ],
        },
        {
          id: "08d80774-6430-bccc-b9ba-4240eb94cd30",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "保利结构",
          type: "整体",
          category: "结构",
          remark: "",
          folder:
            "http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-building.rvt.zip",
          imgUrl: "http://jl.bqbim.com/FileStorages/ModelFile/建筑3D.png",
          ftdPath:
            '[{"FloorName":"楼层平面: 5F","Path":"http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-building.rvt/baolingxinghe-b2-f4-building.rvt/bb75005a-6de8-29bc-b275-e287493e9d8d_f2d/primaryGraphics.f2d","Type":2,"Tower":"baolingxinghe-b2-f4-building.rvt","Category":"结构","X":"0.11","Y":"0.11","RightX":"0.16","BottomY":"0.17"},{"FloorName":"楼层平面: 4F","Path":"http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-building.rvt/baolingxinghe-b2-f4-building.rvt/fdc5b74b-eb72-b516-3556-da6a21022c2a_f2d/primaryGraphics.f2d","Type":2,"Tower":"baolingxinghe-b2-f4-building.rvt","Category":"结构","X":"0.11","Y":"0.18","RightX":"0.11","BottomY":"0.15"}]',
          ftdList: [
            {
              floorName: "楼层平面: 5F",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-building.rvt/baolingxinghe-b2-f4-building.rvt/bb75005a-6de8-29bc-b275-e287493e9d8d_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "baolingxinghe-b2-f4-building.rvt",
              category: "结构",
              x: "0.11",
              y: "0.11",
              rightX: "0.16",
              bottomY: "0.17",
            },
            {
              floorName: "楼层平面: 4F",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-building.rvt/baolingxinghe-b2-f4-building.rvt/fdc5b74b-eb72-b516-3556-da6a21022c2a_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "baolingxinghe-b2-f4-building.rvt",
              category: "结构",
              x: "0.11",
              y: "0.18",
              rightX: "0.11",
              bottomY: "0.15",
            },
          ],
          svfPath:
            '[{"FloorName":"{三维}","Path":"http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-building.rvt/baolingxinghe-b2-f4-building.rvt/Resource/三维视图/{三维} 229351/{三维}.svf","Type":3,"Tower":"baolingxinghe-b2-f4-building.rvt","Category":"结构","X":null,"Y":null}]',
          svfList: [
            {
              floorName: "{三维}",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/baolingxinghe-b2-f4-building.rvt/baolingxinghe-b2-f4-building.rvt/Resource/三维视图/{三维} 229351/{三维}.svf",
              type: 3,
              tower: "baolingxinghe-b2-f4-building.rvt",
              category: "结构",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
          ],
        },
        {
          id: "08d81360-b5fc-16bc-69cf-edff0548fe82",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "每层分开的整体",
          type: "整体",
          category: "建筑",
          remark: "",
          folder: "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt.zip",
          imgUrl:
            "http://jl.bqbim.com/FileStorages/ModelFile/12320200618041928.jpg",
          ftdPath:
            '[{"FloorName":"楼层平面: 5层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/0131b039-5161-13a3-0abf-3351c21c5707_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"天花板投影平面: 2层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/03c446a5-7433-4f43-0eb1-2faf76260fdd_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"面积平面 (总建筑面积): 标高 1","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/065b188b-5d28-eb11-3e85-262c1b457496_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 25层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/078070e9-6c38-7b06-ef41-7a9fcea02845_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 20层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/0d8215af-202b-f844-7a0f-3cfbd239f2b0_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"面积平面 (人防分区面积): 2层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/0f1ce400-6521-ad59-9e36-23bb6b13910a_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 7层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/20ba6bce-3f1b-4287-82f5-78fb97fa1d25_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 23层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/2906ba42-5459-7fbb-9f4a-5cc0348ab4c0_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 21层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/2c491b40-e55f-3f08-dea4-6a0b7dcc530c_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 12层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/3980ea10-1854-2eb1-07fe-aedf8c4c02ea_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 24层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/408358be-016c-96cc-7966-8ee7eb52975c_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 11层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/4bb60e34-e273-5c9a-a0cd-d9a34654ec86_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"面积平面 (净面积): 标高 1","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/4e1156c1-b40a-285e-86ed-4a6889df05b8_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 10层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/50332988-11ed-40ef-bd38-9be85a5b6cd7_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 15层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/517f6f82-fe07-a74e-72f3-4fce65d207b3_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"面积平面 (人防分区面积): 标高 1","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/521709d6-81a2-fc80-e98a-e1428cc5d067_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 14层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/5a29111c-bb32-1fae-db3e-fde42d21ed25_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"面积平面 (防火分区面积): 标高 1","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/5c5919bd-0033-49c8-dfd6-dbbc05fb6ccc_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"立面: 西","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/5ce55f91-a91a-855a-0737-ff1e07d481da_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"立面: 南","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/5e305568-f8be-617a-8c81-deae77ff7391_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"面积平面 (净面积): 2层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/7598f3f6-6783-b425-9ca9-cc134f496297_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 屋面","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/75bb1905-4f27-ea9c-3593-c655c1186689_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 4层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/89de7faa-2db7-1f68-a62e-49b810c5c359_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 9层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/8aade54d-3074-27dd-1897-c746250b2fe2_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"面积平面 (防火分区面积): 2层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/904208b7-7151-cc2d-6eee-ae95056d4fc8_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"立面: 东","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/907b1025-c61e-64bb-28d5-151a23cc4ef8_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 6层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/92a0820a-3db1-46d1-99f1-763a31792c77_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 2层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/959b56ba-46dc-1498-a301-317278118c90_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 机房楼面","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/99a99be3-a13e-1e5e-7274-592977b2a02f_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"天花板投影平面: 标高 1","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/a128bbb6-46d9-3f2d-d3c7-879d943764bb_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 场地","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/adbcf774-91e7-0939-1fee-c39b3d9242eb_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 8层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/c962b254-6577-73b5-2f10-6280a4afcb53_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 18层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/cc5d72cf-132b-c7f5-c334-2c666955ce03_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 13层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/ce1602f9-cb91-b67e-8172-4d41e1fc122b_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 26层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/ce27908f-8478-2862-e950-22e034a5ad8e_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 构架","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/d86e38bd-43e8-4923-430c-fc59f35ae13d_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 22层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/d94f67d9-5875-d87c-4a5d-3160839c645a_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"面积平面 (总建筑面积): 2层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/dcea68e6-c66a-3450-5035-2dfdd231b848_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 3层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/deaf12d4-aa78-3e84-32e7-9b873622a9e2_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 17层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/ee4163c9-dd29-aa4b-44e4-fb2b4784b327_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 16层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/eea87e6a-c3df-39f4-a77e-e1758dc8137c_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"立面: 北","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/efbeaa28-4e05-f48e-2a00-4b2c005e5766_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 19层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/f24ccdd4-d651-2a7f-c6b9-752e35be3144_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 负一层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/f99d5084-38df-ce61-ccf8-52f6bf1ea87e_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 1层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/fa1df1b6-17eb-afc5-60e1-62af70fed8d5_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 正负零","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/fc4260c9-d596-1a51-3b5b-1f2e2be58e3f_f2d/primaryGraphics.f2d","Type":2,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null}]',
          ftdList: [
            {
              floorName: "楼层平面: 5层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/0131b039-5161-13a3-0abf-3351c21c5707_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "天花板投影平面: 2层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/03c446a5-7433-4f43-0eb1-2faf76260fdd_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "面积平面 (总建筑面积): 标高 1",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/065b188b-5d28-eb11-3e85-262c1b457496_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 25层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/078070e9-6c38-7b06-ef41-7a9fcea02845_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 20层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/0d8215af-202b-f844-7a0f-3cfbd239f2b0_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "面积平面 (人防分区面积): 2层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/0f1ce400-6521-ad59-9e36-23bb6b13910a_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 7层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/20ba6bce-3f1b-4287-82f5-78fb97fa1d25_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 23层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/2906ba42-5459-7fbb-9f4a-5cc0348ab4c0_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 21层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/2c491b40-e55f-3f08-dea4-6a0b7dcc530c_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 12层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/3980ea10-1854-2eb1-07fe-aedf8c4c02ea_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 24层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/408358be-016c-96cc-7966-8ee7eb52975c_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 11层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/4bb60e34-e273-5c9a-a0cd-d9a34654ec86_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "面积平面 (净面积): 标高 1",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/4e1156c1-b40a-285e-86ed-4a6889df05b8_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 10层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/50332988-11ed-40ef-bd38-9be85a5b6cd7_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 15层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/517f6f82-fe07-a74e-72f3-4fce65d207b3_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "面积平面 (人防分区面积): 标高 1",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/521709d6-81a2-fc80-e98a-e1428cc5d067_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 14层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/5a29111c-bb32-1fae-db3e-fde42d21ed25_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "面积平面 (防火分区面积): 标高 1",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/5c5919bd-0033-49c8-dfd6-dbbc05fb6ccc_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "立面: 西",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/5ce55f91-a91a-855a-0737-ff1e07d481da_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "立面: 南",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/5e305568-f8be-617a-8c81-deae77ff7391_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "面积平面 (净面积): 2层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/7598f3f6-6783-b425-9ca9-cc134f496297_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 屋面",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/75bb1905-4f27-ea9c-3593-c655c1186689_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 4层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/89de7faa-2db7-1f68-a62e-49b810c5c359_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 9层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/8aade54d-3074-27dd-1897-c746250b2fe2_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "面积平面 (防火分区面积): 2层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/904208b7-7151-cc2d-6eee-ae95056d4fc8_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "立面: 东",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/907b1025-c61e-64bb-28d5-151a23cc4ef8_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 6层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/92a0820a-3db1-46d1-99f1-763a31792c77_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 2层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/959b56ba-46dc-1498-a301-317278118c90_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 机房楼面",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/99a99be3-a13e-1e5e-7274-592977b2a02f_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "天花板投影平面: 标高 1",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/a128bbb6-46d9-3f2d-d3c7-879d943764bb_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 场地",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/adbcf774-91e7-0939-1fee-c39b3d9242eb_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 8层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/c962b254-6577-73b5-2f10-6280a4afcb53_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 18层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/cc5d72cf-132b-c7f5-c334-2c666955ce03_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 13层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/ce1602f9-cb91-b67e-8172-4d41e1fc122b_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 26层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/ce27908f-8478-2862-e950-22e034a5ad8e_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 构架",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/d86e38bd-43e8-4923-430c-fc59f35ae13d_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 22层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/d94f67d9-5875-d87c-4a5d-3160839c645a_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "面积平面 (总建筑面积): 2层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/dcea68e6-c66a-3450-5035-2dfdd231b848_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 3层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/deaf12d4-aa78-3e84-32e7-9b873622a9e2_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 17层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/ee4163c9-dd29-aa4b-44e4-fb2b4784b327_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 16层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/eea87e6a-c3df-39f4-a77e-e1758dc8137c_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "立面: 北",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/efbeaa28-4e05-f48e-2a00-4b2c005e5766_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 19层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/f24ccdd4-d651-2a7f-c6b9-752e35be3144_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 负一层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/f99d5084-38df-ce61-ccf8-52f6bf1ea87e_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 1层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/fa1df1b6-17eb-afc5-60e1-62af70fed8d5_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 正负零",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/fc4260c9-d596-1a51-3b5b-1f2e2be58e3f_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "building.rvt",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
          ],
          svfPath:
            '[{"FloorName":"{三维}","Path":"http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/Resource/三维视图/{三维} 96277/{三维}.svf","Type":3,"Tower":"building.rvt","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null}]',
          svfList: [
            {
              floorName: "{三维}",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/building.rvt/building.rvt/Resource/三维视图/{三维} 96277/{三维}.svf",
              type: 3,
              tower: "building.rvt",
              category: "建筑",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
          ],
        },
        {
          id: "08d81f40-ef57-2110-4926-cae24f445b3e",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "保利星河2楼结构图",
          type: "整体",
          category: "建筑",
          remark: "",
          folder:
            "http://jl.bqbim.com/FileStorages/ModelFile/保利星河2建筑图.dwg.zip",
          imgUrl:
            "http://jl.bqbim.com/FileStorages/ModelFile/12320200703070450.jpg",
          ftdPath:
            '[{"FloorName":"保利星河2建筑图-Model","Path":"http://jl.bqbim.com/FileStorages/ModelFile/保利星河2建筑图.dwg/保利星河2建筑图.dwg/b037defa-b396-478e-abd5-dc66b8fbaff2_f2d/primaryGraphics.f2d","Type":2,"Tower":"保利星河2建筑图.dwg","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null}]',
          ftdList: [
            {
              floorName: "保利星河2建筑图-Model",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/保利星河2建筑图.dwg/保利星河2建筑图.dwg/b037defa-b396-478e-abd5-dc66b8fbaff2_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "保利星河2建筑图.dwg",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
          ],
          svfPath: "[]",
          svfList: [],
        },
        {
          id: "08d822f4-1e5d-ed54-cb53-e5ac2be4f53d",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "保利新河",
          type: "整体",
          category: "平面图-详图",
          remark: "",
          folder:
            "http://jl.bqbim.com/FileStorages/ModelFile/保利星河2楼结构图2.dwg20200708120455.zip",
          imgUrl:
            "http://jl.bqbim.com/FileStorages/ModelFile/12320200708120459.jpg",
          ftdPath:
            '[{"FloorName":"保利星河2楼结构图2-Model","Path":"http://jl.bqbim.com/FileStorages/ModelFile/保利星河2楼结构图2.dwg20200708120455/保利星河2楼结构图2.dwg/c9e57794-6f3a-2a97-330b-8b2d65d9028b_f2d/primaryGraphics.f2d","Type":2,"Tower":"保利星河2楼结构图2.dwg","Category":"平面图-详图","X":null,"Y":null,"RightX":null,"BottomY":null}]',
          ftdList: [
            {
              floorName: "保利星河2楼结构图2-Model",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/保利星河2楼结构图2.dwg20200708120455/保利星河2楼结构图2.dwg/c9e57794-6f3a-2a97-330b-8b2d65d9028b_f2d/primaryGraphics.f2d",
              type: 2,
              tower: "保利星河2楼结构图2.dwg",
              category: "平面图-详图",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
          ],
          svfPath: "[]",
          svfList: [],
        },
        {
          id: "08d823db-8937-3058-aadf-8f79de1eca2b",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "地铁站-秦莱里",
          type: "整体",
          category: "建筑",
          remark: "地铁站-秦莱里",
          folder:
            "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里.zip",
          imgUrl: "http://jl.bqbim.com/FileStorages/ModelFile/123.png",
          ftdPath:
            '[{"FloorName":"天花板投影平面: -2F(+5.25)","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_天花板投影平面_-2F(_5.25)/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"天花板投影平面: 站台板顶(0.00)","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_天花板投影平面_站台板顶(0.00)/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: -1F(+10.698)","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_楼层平面_-1F(_10.698)/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: -2F(+5.25)","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_楼层平面_-2F(_5.25)/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 地面（+15.8）","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_楼层平面_地面（_15.8）/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 场地","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_楼层平面_场地/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 底板底(-4.15)","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_楼层平面_底板底(-4.15)/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 站台板顶(0.00)","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_楼层平面_站台板顶(0.00)/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"立面: 东","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_立面_东/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"立面: 北","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_立面_北/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"立面: 南","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_立面_南/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"立面: 西","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_立面_西/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"结构平面: -1F(+10.698)","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_结构平面_-1F(_10.698)/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"结构平面: -2F(+5.25)","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_结构平面_-2F(_5.25)/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"结构平面: 地面（+15.8）","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_结构平面_地面（_15.8）/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"结构平面: 底板底(-4.15)","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_结构平面_底板底(-4.15)/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"结构平面: 站台板顶(0.00)","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_结构平面_站台板顶(0.00)/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"面积平面 (人防分区面积): -2F(+5.25)","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_面积平面_(人防分区面积)_-2F(_5.25)/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"面积平面 (人防分区面积): 站台板顶(0.00)","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_面积平面_(人防分区面积)_站台板顶(0.00)/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"面积平面 (净面积): -2F(+5.25)","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_面积平面_(净面积)_-2F(_5.25)/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"面积平面 (净面积): 站台板顶(0.00)","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_面积平面_(净面积)_站台板顶(0.00)/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"面积平面 (总建筑面积): -2F(+5.25)","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_面积平面_(总建筑面积)_-2F(_5.25)/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"面积平面 (总建筑面积): 站台板顶(0.00)","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_面积平面_(总建筑面积)_站台板顶(0.00)/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"面积平面 (防火分区面积): -2F(+5.25)","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_面积平面_(防火分区面积)_-2F(_5.25)/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"面积平面 (防火分区面积): 站台板顶(0.00)","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_面积平面_(防火分区面积)_站台板顶(0.00)/primaryGraphics.f2d","Type":2,"Tower":"地铁站-秦莱里","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null}]',
          ftdList: [
            {
              floorName: "天花板投影平面: -2F(+5.25)",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_天花板投影平面_-2F(_5.25)/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "天花板投影平面: 站台板顶(0.00)",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_天花板投影平面_站台板顶(0.00)/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: -1F(+10.698)",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_楼层平面_-1F(_10.698)/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: -2F(+5.25)",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_楼层平面_-2F(_5.25)/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 地面（+15.8）",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_楼层平面_地面（_15.8）/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 场地",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_楼层平面_场地/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 底板底(-4.15)",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_楼层平面_底板底(-4.15)/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 站台板顶(0.00)",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_楼层平面_站台板顶(0.00)/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "立面: 东",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_立面_东/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "立面: 北",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_立面_北/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "立面: 南",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_立面_南/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "立面: 西",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_立面_西/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "结构平面: -1F(+10.698)",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_结构平面_-1F(_10.698)/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "结构平面: -2F(+5.25)",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_结构平面_-2F(_5.25)/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "结构平面: 地面（+15.8）",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_结构平面_地面（_15.8）/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "结构平面: 底板底(-4.15)",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_结构平面_底板底(-4.15)/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "结构平面: 站台板顶(0.00)",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_结构平面_站台板顶(0.00)/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "面积平面 (人防分区面积): -2F(+5.25)",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_面积平面_(人防分区面积)_-2F(_5.25)/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "面积平面 (人防分区面积): 站台板顶(0.00)",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_面积平面_(人防分区面积)_站台板顶(0.00)/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "面积平面 (净面积): -2F(+5.25)",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_面积平面_(净面积)_-2F(_5.25)/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "面积平面 (净面积): 站台板顶(0.00)",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_面积平面_(净面积)_站台板顶(0.00)/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "面积平面 (总建筑面积): -2F(+5.25)",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_面积平面_(总建筑面积)_-2F(_5.25)/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "面积平面 (总建筑面积): 站台板顶(0.00)",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_面积平面_(总建筑面积)_站台板顶(0.00)/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "面积平面 (防火分区面积): -2F(+5.25)",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_面积平面_(防火分区面积)_-2F(_5.25)/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "面积平面 (防火分区面积): 站台板顶(0.00)",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-秦莱里/f2d_面积平面_(防火分区面积)_站台板顶(0.00)/primaryGraphics.f2d",
              type: 2,
              tower: "地铁站-秦莱里",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
          ],
          svfPath: "[]",
          svfList: [],
        },
        {
          id: "08d823dc-2334-1da2-4f0c-ad43ac454574",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "地铁站厅模型",
          type: "整体",
          category: "建筑",
          remark: "地铁站厅模型",
          folder: "http://jl.bqbim.com/FileStorages/ModelFile/地铁站厅模型.zip",
          imgUrl:
            "http://jl.bqbim.com/FileStorages/ModelFile/12320200709034604.png",
          ftdPath: "[]",
          ftdList: [],
          svfPath:
            '[{"FloorName":"{3D}","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站厅模型/地铁站厅模型/Resource/三维视图/{3D} 155486/{3D}.svf","Type":3,"Tower":"地铁站厅模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null}]',
          svfList: [
            {
              floorName: "{3D}",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站厅模型/地铁站厅模型/Resource/三维视图/{3D} 155486/{3D}.svf",
              type: 3,
              tower: "地铁站厅模型",
              category: "建筑",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
          ],
        },
        {
          id: "08d823f5-4ad7-851b-dc51-e0efe9ea313e",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "地铁站-云溪站",
          type: "整体",
          category: "建筑",
          remark: "地铁站-云溪站",
          folder:
            "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-云溪站.zip",
          imgUrl:
            "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-云溪站.png",
          ftdPath: "[]",
          ftdList: [],
          svfPath:
            '[{"FloorName":"{3D}","Path":"http://jl.bqbim.com/FileStorages/ModelFile/地铁站-云溪站/地铁站-云溪站/Resource/三维视图/{3D} 245848/{3D}.svf","Type":3,"Tower":"地铁站-云溪站","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null}]',
          svfList: [
            {
              floorName: "{3D}",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/地铁站-云溪站/地铁站-云溪站/Resource/三维视图/{3D} 245848/{3D}.svf",
              type: 3,
              tower: "地铁站-云溪站",
              category: "建筑",
              x: null,
              y: null,
              rightX: null,
              bottomY: null,
            },
          ],
        },
        {
          id: "08d823fe-22a4-dcb1-4c4a-b896c60c8c25",
          projectID: "8beb7f79-f2ad-40ff-b711-4b009ce4598b",
          modelName: "建筑立面模型",
          type: "整体",
          category: "建筑",
          remark: "建筑立面模型",
          folder: "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型.zip",
          imgUrl: "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型.png",
          ftdPath:
            '[{"FloorName":"楼层平面: 10层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_10层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 11层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_11层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 12层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_12层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 13层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_13层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 14层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_14层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 15层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_15层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 16层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_16层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 17层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_17层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 18层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_18层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 19层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_19层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 1F","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_1F/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 20层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_20层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 21层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_21层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 22层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_22层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 23层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_23层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 24层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_24层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 25层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_25层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 26层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_26层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 2层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_2层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 3层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_3层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 4层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_4层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 5层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_5层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 6层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_6层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 7层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_7层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 8层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_8层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 9层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_9层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 地下室板顶","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_地下室板顶/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 大屋面层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_大屋面层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 室外地坪层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_室外地坪层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 屋架标高一","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_屋架标高一/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 屋架标高二","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_屋架标高二/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 机房层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_机房层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 负一层","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_负一层/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"楼层平面: 辅助","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_辅助/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"立面: 东","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_立面_东/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"立面: 北","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_立面_北/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"立面: 南","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_立面_南/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null},{"FloorName":"立面: 西","Path":"http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_立面_西/primaryGraphics.f2d","Type":2,"Tower":"建筑立面模型","Category":"建筑","X":null,"Y":null,"RightX":null,"BottomY":null}]',
          ftdList: [
            {
              floorName: "楼层平面: 10层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_10层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 11层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_11层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 12层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_12层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 13层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_13层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 14层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_14层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 15层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_15层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 16层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_16层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 17层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_17层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 18层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_18层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 19层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_19层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 1F",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_1F/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 20层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_20层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 21层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_21层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 22层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_22层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 23层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_23层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 24层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_24层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 25层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_25层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 26层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_26层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 2层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_2层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 3层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_3层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 4层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_4层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 5层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_5层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 6层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_6层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 7层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_7层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 8层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_8层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 9层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_9层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 地下室板顶",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_地下室板顶/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 大屋面层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_大屋面层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 室外地坪层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_室外地坪层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 屋架标高一",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_屋架标高一/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 屋架标高二",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_屋架标高二/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 机房层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_机房层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 负一层",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_负一层/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "楼层平面: 辅助",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_楼层平面_辅助/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "立面: 东",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_立面_东/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "立面: 北",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_立面_北/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "立面: 南",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_立面_南/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
            {
              floorName: "立面: 西",
              path:
                "http://jl.bqbim.com/FileStorages/ModelFile/建筑立面模型/f2d_立面_西/primaryGraphics.f2d",
              type: 2,
              tower: "建筑立面模型",
              category: "建筑",
              x: "0",
              y: "0",
              rightX: "0",
              bottomY: "0",
            },
          ],
          svfPath: "[]",
          svfList: [],
        },
      ],
    };
  },
  watch: {},
  methods: {
    //查询模型详情
    lookDetail(val) {
      this.modelData = val;
      this.linkageDia = true;
    },
    closeDia() {
      this.$refs.linkage.close();
    },
  },
};
</script>

<style lang="scss">
.app-container {
  margin: 0 0 0 200px;
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: row;
  height: 100%;
  background-color: #d6d6d6;
  .content_right {
    display: flex;
    flex-direction: column;
    .right_card_t {
      /deep/.el-card__body {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .lab {
          font-weight: 400;
          font-size: 14px;
          margin-right: 4px;
        }
        .titl {
          font-size: 18px;
          font-weight: 700;
          color: #ff0000;
        }
      }
    }
    .right_card_b {
      margin-top: 10px;
      flex: 1;
      // overflow-y: auto;
      /deep/.el-card__body {
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        .el-checkbox-group {
          flex: 1;
        }
      }
      .modalDivItem {
        width: 20%;
        display: inline-block;
        position: relative;
        padding: 4px;
        .del {
          position: absolute;
          right: 2px;
          top: 12px;
          color: #409eff;
        }
        .modalTitle {
          margin: 9px 0;
          width: 100%;
          text-align: center;
          font-weight: 400;
          font-size: 16px;
        }
        .imgDiv {
          height: 250px;
          position: relative;
          box-shadow: 0px 0px 0px 1px #ccc;
          img {
            max-width: 99%;
            max-height: 99%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .describe {
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }
        > .bind {
          position: absolute;
          right: 0;
          top: 0;
          padding: 5px 10px;
        }
      }
      .check_lab {
        /deep/.el-checkbox__label {
          display: none;
        }
      }
    }
  }
}
//添加模型内样式
.addDialog {
  /deep/.el-dialog__header {
    background: #409eff;
    position: relative;
    height: 40px;
    .el-dialog__title {
      font-size: 16px;
      color: #fff;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 10px;
    }
    > .el-dialog__headerbtn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 10px;
      > .el-dialog__close {
        color: #fff;
      }
    }
  }
  /deep/.el-dialog__body {
    display: flex;
    .fleRight {
      flex: 1;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 70px;
    height: 70px;
    line-height: 70px;
    text-align: center;
  }
  .avatar {
    width: 70px;
    height: 70px;
    display: block;
  }
  .flexDiv {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .labelSp {
      width: 20%;
      text-align: right;
      padding-right: 20px;
    }
    .div_right {
      flex: 1;
    }
  }
}
/deep/ .toolt {
  max-width: 250px;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
.linkage {
  /deep/.el-dialog__header {
    background: #409eff;
    position: relative;
    height: 40px;
    .el-dialog__title {
      font-size: 16px;
      color: #fff;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 10px;
    }
    > .el-dialog__headerbtn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 10px;
      > .el-dialog__close {
        color: #fff;
      }
    }
  }
  /deep/.el-dialog__body {
    height: 85vh;
    overflow: auto;
    padding: 10px;
  }
}
.editTree {
  /deep/.el-dialog__header {
    text-align: center;
    background: #409eff;
    .el-dialog__title {
      font-size: 20px;
      color: #fff;
    }
    > .el-dialog__headerbtn {
      > .el-dialog__close {
        color: #fff;
      }
    }
  }
  /deep/.el-dialog__body {
    height: 82vh;
    padding: 10px;
  }
}
</style>
