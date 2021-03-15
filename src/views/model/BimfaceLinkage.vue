<template>
  <div class="bimBox">
    <div
      id="domId"
      class="domId"
    />
    123
  </div>
</template>

<script>
export default {
  name: 'BimfaceLinkage',
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

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
