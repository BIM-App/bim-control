<template>
  <header>
    {{pageName}}
    <div class="user">
      <img src="../assets/mine.jpg" alt="">
      <el-button type="primary" @click="loginOut">退出</el-button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      pageName: 'BIM-dev'
    }
  },
  watch: {
    $route(to, from) {
      this.pageName = this.$route.name
    }
  },
  methods: {
    loginOut() {
      window.localStorage.clear()
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  margin-top: 5px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-right: 10px;
    height: 50px;
    border-radius: 50%;
  }
}
</style>
