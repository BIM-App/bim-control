<template>
  <div class="model">
    <div class="top-info">
      <h2>模型列表</h2>
      <span>当前项目：
        <el-select v-model="value" size="small" placeholder="请选择" @change="selectDetail(value)">
          <el-option
            v-for="item in projectList"
            :key="item.value"
            :label="item.pname"
            :value="item.pid"
          />
        </el-select>
      </span>
      <div class="fr">
        <el-link :underline="false" style="fontSize:16px" @click="goAllModel">全部模型</el-link>
      </div>
    </div>
    <ul class="model-list">
      <li v-for="item in modelList" :key="item.Mid">
        <img :src="item.MPicture">
        <!-- <div>{{ item.MPicture }}</div> -->
      </li>
      <div v-if="!modelList" class="model-tip">
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
      projectList: [''],
      options: [],
      value: ''
    }
  },
  created() {
    this.receiveData()
  },
  methods: {
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
    goAllModel() {
      this.$router.push(`/model/index`)
    }
  }
}
</script>

<style lang="scss" scoped>
.model {
  margin-top: 20px;
  height: 357.6px;
  .top-info{
    padding: 0 22px 0 12px;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    background-color: lightcoral;
  }
  .model-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    background-color: skyblue;
    li {
      margin: 10px 10px;
      padding: 20px;
      // width: 256px;
      // height: 256px;
      border-radius: 5px;
      background: rgb(227,244,255);
      cursor: pointer;
      img {
        width: 256px;
        height: 256px;
      }
    }
    li:hover {
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, .2);
      border-color: #eee;
      transition: all .2s ease-in-out;
    }
    .model-tip {
      margin: 10px 10px;
      padding: 20px;
      // width: 256px;
      // height: 256px;
      border-radius: 5px;
      background: rgb(227,244,255);
      div{
        width: 256px;
        height: 256px;
        text-align: center;
        line-height: 256px;
      }
    }
  }
}
</style>
