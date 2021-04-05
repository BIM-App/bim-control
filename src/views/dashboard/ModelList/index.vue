<template>
  <div class="model">
    <div class="top-info">
      <!-- <h2>模型列表</h2> -->
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
        <el-link
          :underline="false"
          style="fontSize:14px"
          @click="goAllModel"
        >全部模型</el-link>
      </div>
    </div>
    <ul class="model-list">
      <li
        v-for="item in modelList"
        :key="item.MId"
        @click="test(item.MId)"
      >
        <img :src="item.MPicture">
        <div style="text-align:center">{{ item.MName }}</div>
      </li>
      <div
        v-if="modelList == {}"
        class="model-tip"
      >
        <div>当前项目暂无模型</div>
      </div>
    </ul>
  </div>
</template>

<script>
import { findModelByPIDApi } from '@/api/model'
import eventVue from '@/utils/eventVue'
export default {
  name: 'ModelList',
  data() {
    return {
      modelList: [],
      projectList: [],
      options: [],
      value: ''
    }
  },
  created() {
    this.receiveData()
  },
  methods: {
    test(MId) {
      console.log(MId)
    },
    // 接收兄弟组件传来的值
    receiveData() {
      eventVue.$on('projectList', (data) => {
        // console.log(data)
        this.projectList = data
        this.value = this.projectList[0].pid
        this.selectDetail(this.value)
      })
    },
    // 切换当前项目以查看模型
    selectDetail(value) {
      eventVue.$emit('currentProjectId', value)
      findModelByPIDApi(value).then((res) => {
        console.log('模型列表查询', res)
        // this.modelList = res.data.data
        if (Object.keys(res.data.data).length === 0) {
          this.modelList = ''
        } else {
          this.modelList = res.data.data
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    goAllModel() {
      this.$router.push(`/model/index`)
    }
  }
}
</script>

<style lang="scss" scoped>
.model {
  width: 100%;
  height: 67%;
  margin-top: 8px;
  background-color: #fff;
  // height: 357.6px;
  // border-radius: 10px;
  // border: 3px solid gainsboro;
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
    justify-content: space-between;
    // background-color: skyblue;
    li {
      margin: 10px 10px;
      padding: 20px;
      width: 30%;
      min-width: 150px;
      border-radius: 5px;
      background: rgb(227, 244, 255);
      cursor: pointer;
      img {
        min-width: 233px;
        height: 233px;
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
}
</style>
