<template>
  <div>{{pageName}}</div>
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

}
</script>

<style>
</style>