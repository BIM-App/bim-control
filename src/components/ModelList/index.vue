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
        <el-link :underline="false" style="fontSize:16px">全部模型</el-link>
      </div>
    </div>
    <ul class="model-list">
      <li v-for="item in modelList" :key="item.Mid">
        <div>{{ item.MName }}</div>
      </li>
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
    // this.selectDetail()
  },
  methods: {
    // 接收兄弟组件传来的值
    receiveData() {
      eventVue.$on('projectList', (data) => {
        // console.log(data)
        this.projectList = data
        this.value = this.projectList[0].pid
        // console.log(this.value)
      })

      // this.selectDetail()
    },
    selectDetail(value) {
      findModelByPIDApi(value).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          this.modelList = res.data.data
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.model {
  margin-top: 20px;
  .top-info{
    padding: 0 22px 0 12px;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    background-color: lightcoral;
  }
  .model-list {
    background-color: skyblue;
  }
}
</style>
