<template>
  <div class="container">
    <ul v-for="item in companyData" :key="item.cid" class="company-info" @click="findUsersByCompanyID(item.cid)">
      <li>{{ item.cname }}</li>
      <li>{{ item.representative }}</li>
    </ul>
  </div>
</template>

<script>
import { findCompanyApi, findUsersByCompanyIDApi } from '@/api/company'
import { getUser, setCompanyCID } from '@/utils/cookie'
export default {
  data() {
    return {
      companyData: []
    }
  },
  created() {
    findCompanyApi().then((res) => {
      console.log(res.data)
      if (res.data instanceof Array) {
        this.companyData = res.data.filter((item) => item.creator === getUser().id)
        // console.log(this.companyData)
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    // 查询公司员工列表
    findUsersByCompanyID(cid) {
      findUsersByCompanyIDApi(cid).then(async(res) => {
        console.log(res)
        if (res.data) {
          await setCompanyCID(cid)
        }
        this.$router.push('/system/staffInfo')
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  .company-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 50px;
    width: 200px;
    height: 100px;
    background-color: skyblue;
    li {

    }
  }
}
</style>
